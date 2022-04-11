import React, { useMemo, useState } from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInputChangeEventData,
  View,
} from 'react-native';
import { DispatchType } from '..';
import { darkBlue } from '../../../assets/styles/colors';
import InputRow from '../../InputRow';
import Container from './Container';

type TimeSettingCardProps = {
  dispatch: DispatchType;
  parentHeight: number;
};

type OnChangeDateParams = { date: string; time: string };

function TimeSettingCard({ dispatch, parentHeight }: TimeSettingCardProps) {
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [location, setLocation] = useState<string>('');

  const maxHeight = useMemo(() => parentHeight * 0.7 - 47, [parentHeight]);

  const _onChangeDate = ({ date: _date, time: _time }: OnChangeDateParams) => {
    dispatch({
      type: 'TIME_SETTING',
      timeSetting: { date: _date, time: _time, location },
    });
    setDate(_date);
    setTime(_time);
  };

  const _onChangeLocation = (
    e: NativeSyntheticEvent<TextInputChangeEventData>,
  ) => {
    dispatch({
      type: 'TIME_SETTING',
      timeSetting: {
        date,
        time,
        location: e.nativeEvent.text,
      },
    });
    setLocation(e.nativeEvent.text);
  };

  return (
    <Container
      title={'Time Setting'}
      style={[styles.container, { height: maxHeight }]}>
      <View style={styles.settingBox}>
        <InputRow
          type="dateTime"
          label={'개봉 가능 날짜 / 시간'}
          inputProps={{
            onChangeDateTimeText: _onChangeDate,
            style: styles.inputStyle,
          }}
          labelStyle={styles.inputLabelStyle}
          containerStyle={styles.inputContainerStyle}
        />
        <View style={styles.spacingHorizenLine} />
        <InputRow
          type="text"
          label={'개봉 가능 위치'}
          inputProps={{
            onChange: _onChangeLocation,
            style: styles.inputStyle,
          }}
          labelStyle={styles.inputLabelStyle}
          containerStyle={styles.inputContainerStyle}
        />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: darkBlue },
  settingBox: {
    height: 200,
    marginHorizontal: 15,
    paddingHorizontal: 30,
    paddingTop: 20,
    borderRadius: 35,
    backgroundColor: '#628489',
  },
  inputContainerStyle: {
    alignItems: 'center',
    paddingLeft: 15,
  },
  inputLabelStyle: {
    width: 65,
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputStyle: {
    backgroundColor: 'white',
    justifyContent: 'center',
    flex: 1,
    height: 37,
    marginLeft: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  spacingHorizenLine: {
    marginVertical: 10,
    height: 1,
    width: '100%',
    backgroundColor: darkBlue,
  },
});

export default TimeSettingCard;
