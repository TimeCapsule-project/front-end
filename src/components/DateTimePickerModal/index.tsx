import React, { useState } from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

type PickerMode = 'date' | 'time';

type PropsType = {
  onChange: (value: any) => void;
};

function DateTimePickerModal({ onChange }: PropsType) {
  const [show, setShow] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<PickerMode>('date');

  const _onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const _date = selectedDate || new Date();
    setShow(Platform.OS === 'ios');
    setDate(_date);
    onChange(_date);
  };

  const _changeMode = (_mode: PickerMode) => {
    setShow(true);
    setMode(_mode);
  };

  return (
    <View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="spinner"
          onChange={_onChange}
        />
      )}
      <TouchableOpacity onPress={() => _changeMode('date')}>
        <Text>{'날짜'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => _changeMode('time')}>
        <Text>{'시간'}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default DateTimePickerModal;
