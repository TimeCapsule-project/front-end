import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRecoilValue } from 'recoil';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { getFont } from 'utils/getFont';
import { getParsedDate } from 'utils/getParsedDate';
import { mixinStyles } from 'assets/styles/mixin';
import { darkBlue, yellow } from 'assets/styles/colors';
import { RootStackParamList } from 'pages/routes';
import { DateTimeType } from 'components/DateTimePickerModal';
import {
  DateTimeInputTemplate,
  TextInputTemplate,
} from 'components/InputRow/template';
import People from 'components/SvgComponents/people';
import Search from 'components/SvgComponents/search';
import SmallPencel from 'components/SvgComponents/smallPencel';
import RouteHeader from 'components/RouteHeader';
import SelectCapsule from 'components/SelectCapsule';
import TemplateText from 'components/TemplateText';
import { useRandomNickname } from './hooks/useRandomNickname';
import { latLngSelector } from '../../states/selectors';

type WriteCapsuleScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'WriteCapsule'
>;

type WriteCapsuleScreenRouteProp = RouteProp<
  RootStackParamList,
  'WriteCapsule'
>;

function WriteCapsule() {
  const navigation = useNavigation<WriteCapsuleScreenNavigationProp>();
  const route = useRoute<WriteCapsuleScreenRouteProp>();

  const initDateData = useMemo(() => {
    const origin = new Date();
    return { origin: new Date(), data: getParsedDate(origin) };
  }, []);

  const [capsuleType] = useState<string>(route.params.type);
  const [color, setColor] = useState<string>('#40a629');
  const [content, setContent] = useState<string>('');
  const [dateTime, setDateTime] = useState<DateTimeType>(initDateData.data);
  const [isEnableNickname, setEnableNickname] = useState<boolean>(false);
  const [isEnableAllDay, setEnableAllDay] = useState<boolean>(false);
  const [to, setTo] = useState<string>('');
  const [from, setFrom] = useState<string>('');
  const [randomNickname, setRandomNickname] = useState<string>('');

  const latLng = useRecoilValue(latLngSelector);

  const _onSuccessGetRandomNickname = useCallback((data: string) => {
    setRandomNickname(data);
  }, []);

  const { refetch: getRandomNickname } = useRandomNickname(
    _onSuccessGetRandomNickname,
  );

  const _onPressSwitchRandomNickname = useCallback(
    async (active: boolean) => {
      if (!active) {
        getRandomNickname();
      }
      setEnableNickname(active);
    },
    [getRandomNickname],
  );

  const _goPreview = () =>
    navigation.navigate('WriteCapsulePreview', {
      data: {
        color,
        content,
        date: dateTime,
        to: 'TODO_검색_API_미완',
        from: isEnableNickname ? randomNickname : from,
        lat: latLng.lat,
        lng: latLng.lng,
      },
    });

  const _goLocation = useCallback(
    () => navigation.navigate('LocationCapsule'),
    [navigation],
  );

  const _onChangeDate = useCallback(
    (data: DateTimeType) => data && setDateTime(data),
    [],
  );

  useEffect(() => {
    getRandomNickname();
  }, [getRandomNickname]);

  return (
    <Fragment>
      <RouteHeader
        label="타임 캡슐 생성"
        textAlign="center"
        containerStyle={styles.headerStyle}
      />
      <KeyboardAwareScrollView contentContainerStyle={styles.mainContainer}>
        <SelectCapsule updateColor={setColor} />
        <TextInputTemplate
          label={'캡슐 받을 친구 선택하기'}
          iconComponentFunc={People}
          inputProps={{
            editable: false,
            placeholder: '닉네임 검색하기',
            style: styles.input,
            onChangeText: setTo,
          }}
          containerStyle={styles.inputContainer}
        />
        <TextInputTemplate
          label={'내 닉네임 정하기'}
          iconComponentFunc={isEnableNickname ? undefined : SmallPencel}
          inputProps={
            isEnableNickname
              ? {
                  editable: false,
                  value: randomNickname,
                  style: styles.inputNickname,
                }
              : {
                  editable: true,
                  placeholder: '직접 입력',
                  style: styles.input,
                  onChangeText: setFrom,
                }
          }
          containerStyle={styles.inputContainerMargin}
          switchInfo={{
            label: '랜덤 닉네임 사용',
            value: isEnableNickname,
            onSwitch: _onPressSwitchRandomNickname,
          }}
        />
        {capsuleType === 'special' && (
          <TouchableOpacity onPress={_goLocation} style={styles.locationButton}>
            <TextInputTemplate
              label={'캡슐 장소 설정하기'}
              iconComponentFunc={Search}
              inputProps={{
                editable: false,
                placeholder: '지번, 도로명, 건물명으로 검색',
                style: styles.input,
              }}
            />
          </TouchableOpacity>
        )}
        <DateTimeInputTemplate
          label={'캡슐 개봉 날짜/시간 정하기'}
          inputWrapStyle={styles.inputDateTimeWrap}
          inputProps={{
            style: styles.inputDateTime,
          }}
          dateTimeOptions={{
            disableType: isEnableAllDay ? 'time' : undefined,
            defaultDate: initDateData.origin,
            onChange: _onChangeDate,
          }}
          switchInfo={{
            label: '하루종일',
            value: isEnableAllDay,
            onSwitch: setEnableAllDay,
          }}
        />
        <TextInputTemplate
          label={'작성하기'}
          inputProps={{
            style: styles.inputTextArea,
            multiline: true,
            selectTextOnFocus: true,
            placeholder: '최대 1000자 까지 작성할 수 있어요 !',
            maxLength: 1000,
            value: content,
            onChangeText: setContent,
          }}
          inputWrapStyle={styles.inputTextAreaContainer}
        />
        <TouchableOpacity style={styles.previewButton} onPress={_goPreview}>
          <TemplateText familyType="power" style={styles.previewButtonText}>
            {'미리보기'}
          </TemplateText>
        </TouchableOpacity>
      </KeyboardAwareScrollView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: 15,
    backgroundColor: yellow,
    alignItems: 'center',
  },
  headerStyle: {
    backgroundColor: yellow,
  },
  inputContainer: {
    marginTop: 40,
  },
  inputContainerMargin: {
    marginTop: 15,
  },
  input: {
    fontFamily: getFont('bold'),
    paddingLeft: 50,
  },
  inputNickname: {
    fontFamily: getFont('bold'),
    color: darkBlue,
    textAlign: 'center',
  },
  inputDateTimeWrap: { height: 40 },
  inputDateTime: {
    paddingVertical: 10,
    textAlign: 'center',
    color: darkBlue,
  },
  inputTextAreaContainer: {
    height: 270,
  },
  inputTextArea: {
    textAlignVertical: 'top',
    fontFamily: getFont('bold'),
  },
  locationButton: {
    width: '100%',
  },
  previewButton: {
    ...mixinStyles.flexCenter,
    width: '50%',
    height: 45,
    marginTop: 10,
    marginBottom: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'transparents',
  },
  previewButtonText: {
    color: 'black',
  },
});

export default WriteCapsule;
