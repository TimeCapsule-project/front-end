import React, { useCallback, useReducer, useState } from 'react';
import {
  StyleSheet,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import 'dayjs/locale/ko';
import dayjs from 'dayjs';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import TemplateText from 'components/TemplateText';
import { getParsedDate } from 'utils/getParsedDate';

dayjs.locale('ko');

export type PickerMode = 'date' | 'time';

export type DateTimeType = { date: string; time: string };

type State = DateTimeType;

type Action =
  | {
      type: 'DATE';
      value: string;
    }
  | {
      type: 'TIME';
      value: string;
    }
  | {
      type: 'ALL';
      value: State;
    };

interface PropsType {
  style?: StyleProp<ViewStyle>;
  disableType?: PickerMode;
  defaultValue?: Date;
  onChange: (value: State) => void;
};

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'DATE':
      return { ...state, date: action.value };
    case 'TIME':
      return { ...state, time: action.value };
    case 'ALL':
      return action.value;
    default:
      return state;
  }
};

function DateTimePickerModal({
  style,
  onChange,
  disableType,
  defaultValue,
}: PropsType) {
  const [show, setShow] = useState<boolean>(false);
  const [mode, setMode] = useState<PickerMode>('date');
  const [originDate, setOriginDate] = useState<Date>(
    dayjs(defaultValue || undefined).toDate(),
  );
  const [date, dispatch] = useReducer(reducer, getParsedDate(defaultValue));

  const _onChange = useCallback(
    (_: DateTimePickerEvent, selectedDate?: Date) => {
      // setShow(Platform.OS === 'ios');
      setShow(false);

      if (selectedDate) {
        let data = getParsedDate(selectedDate || originDate);
        if (disableType === 'date') {
          dispatch({ type: 'TIME', value: data.time });
          onChange({ date: '', time: data.time });
        } else if (disableType === 'time') {
          dispatch({ type: 'DATE', value: data.date });
          onChange({ date: data.date, time: '' });
        } else {
          dispatch({ type: 'ALL', value: data });
          onChange(data);
        }

        setOriginDate(selectedDate);
      }
    },
    [disableType, onChange, originDate],
  );

  const _changeMode = useCallback((_mode: PickerMode) => {
    setShow(true);
    setMode(_mode);
  }, []);

  return (
    <View style={styles.container}>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={originDate}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={_onChange}
        />
      )}
      {disableType !== 'date' && (
        <TouchableOpacity
          style={[styles.view, !disableType && styles.paddingRight]}
          onPress={() => _changeMode('date')}>
          <TemplateText style={style} familyType="bold">
            {date.date}
          </TemplateText>
        </TouchableOpacity>
      )}
      {disableType !== 'time' && (
        <TouchableOpacity
          style={[styles.view, !disableType && styles.paddingLeft]}
          onPress={() => _changeMode('time')}>
          <TemplateText style={style} familyType="bold">
            {date.time}
          </TemplateText>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  view: {
    width: '50%',
  },
  paddingLeft: {
    paddingLeft: 8,
  },
  paddingRight: {
    paddingRight: 8,
  }
});

export default DateTimePickerModal;
