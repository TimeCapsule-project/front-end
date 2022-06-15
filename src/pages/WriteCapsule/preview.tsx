import React, { Fragment, useCallback, useEffect, useState } from 'react';
import {
  View,
  Image,
  FlexStyle,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRecoilState } from 'recoil';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import {
  latLngState,
  sendNicknameState,
  writeCapsuleState,
} from 'states/atoms';
import { CapsuleType } from 'states/types';
import { RootStackParamList } from 'pages/routes';
import { mixinStyles } from 'assets/styles/mixin';
import { darkBlue, yellow } from 'assets/styles/colors';
import { useCapsuleDetail } from 'hooks/api/useCapsuleDetail';
import { useWriteCapsuleMutation } from 'hooks/api/useWriteCapsuleMutation';
import RouteHeader from 'components/RouteHeader';
import TemplateText from 'components/TemplateText';
import CustomModal from 'components/CustomModal';
import ReturnSvg from 'components/SvgComponents/return';
import SendMail from 'components/SvgComponents/sendMail';

export type PreviewFrom = 'link' | 'list' | 'write';

type WriteCapsuleScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'WriteCapsulePreview'
>;

type WriteCapsuleScreenRouteProp = RouteProp<
  RootStackParamList,
  'WriteCapsulePreview'
>;

const PersonText = React.memo(
  ({
    label,
    person,
    aligh,
  }: { [key: string]: string } & { aligh?: FlexStyle['justifyContent'] }) => (
    <View
      style={[
        styles.personTextView,
        { justifyContent: aligh || 'flex-start' },
      ]}>
      <TemplateText familyType="power" style={styles.personLabel}>
        {label}
      </TemplateText>
      <TemplateText familyType="power" style={styles.person}>
        {person}
      </TemplateText>
    </View>
  ),
);

function WriteCapsulePreview() {
  const navigation = useNavigation<WriteCapsuleScreenNavigationProp>();
  const {
    params: { type, id },
  } = useRoute<WriteCapsuleScreenRouteProp>();

  // preview data
  const [capsule, setCapsule] = useRecoilState(writeCapsuleState);
  const [sendNickname, setSendNickname] = useRecoilState(sendNicknameState);
  const [latlng] = useRecoilState(latLngState);

  const [isOpen, setOpen] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const _onSuccessSubmit = useCallback(
    (_: any) => navigation.navigate('Home'),
    [navigation],
  );

  const { mutate } = useWriteCapsuleMutation(_onSuccessSubmit);

  const _onPressSubmit = useCallback(() => setVisible(true), []);

  const _onPressCancel = useCallback(() => {}, []);

  const _onPressGoWrite = useCallback(
    () => navigation.navigate('WriteCapsule', { type: 'anywhere' }),
    [navigation],
  );

  const _onPressConfirm = () =>
    mutate({
      recipient: sendNickname.userId, // to
      type: capsule.capsuleType,
      content: capsule.content || '',
      nickname: capsule.from,
      latitude: latlng.lat,
      longitude: latlng.lng,
      duration: `${capsule.date.date.replace(/[.]/g, '-')}T${
        capsule.isAllDay ? '00:00:00' : `${capsule.date.time.split(' ')[1]}:00`
      }`,
      capsuleColorIndex: capsule.capsuleColorIndex || 0,
    });

  const _modalContentRenderer = useCallback(() => {
    return (
      <View style={styles.modalContentContainer}>
        <Image
          style={styles.modalImage}
          source={require('../../assets/images/thumbnail.png')}
        />
        <TemplateText familyType="bold" style={styles.modalContentText}>
          {'캡슐을 묻게 되면 내용을 수정할 수 없어요! 캡슐을 묻으시겠습니까?'}
        </TemplateText>
      </View>
    );
  }, []);

  const _onSuccessCapsuleDetail = useCallback(
    (data: any) => {
      const datetime = data.duration.split('T');
      setCapsule({
        capsuleType: CapsuleType.ANYWHERE,
        capsuleColorIndex: 0,
        content: data.content,
        date: {
          date: datetime[0].replace(/[-]/g, '.'),
          time: datetime[1],
        },
        isAllDay: false,
        from: data.nickname,
      });
      setSendNickname({
        userId: -1,
        nickname: data.recipient,
      });
      setOpen(data.opened);
    },
    [setCapsule, setSendNickname],
  );

  const { refetch: getDetail } = useCapsuleDetail(
    id || -1,
    _onSuccessCapsuleDetail,
  );

  useEffect(() => {
    if (type === 'list') {
      getDetail();
    }
  }, [getDetail, type]);

  const renderButtons = useCallback(() => {
    switch (type) {
      case 'write':
        return (
          <TouchableOpacity
            style={styles.submitButton}
            onPress={_onPressSubmit}>
            <TemplateText familyType="power" style={styles.submitButtonText}>
              {'캡슐 묻기'}
            </TemplateText>
          </TouchableOpacity>
        );
      case 'list':
        return (
          <View style={styles.buttonWrap}>
            <TouchableOpacity
              style={styles.saveImageButton}
              onPress={_onPressGoWrite}>
              <SendMail />
              <TemplateText
                familyType="power"
                style={styles.saveImageButtonText}>
                {'답장 보내기'}
              </TemplateText>
            </TouchableOpacity>
          </View>
        );
      default:
        return (
          <View style={styles.buttonWrap}>
            {!isOpen && (
              <TouchableOpacity
                style={styles.saveImageButton}
                onPress={_onPressCancel}>
                <ReturnSvg />
                <TemplateText
                  familyType="power"
                  style={styles.saveImageButtonText}>
                  {'발신 취소하기'}
                </TemplateText>
              </TouchableOpacity>
            )}
          </View>
        );
    }
  }, []);

  return (
    <Fragment>
      <CustomModal
        visible={visible}
        setVisible={setVisible}
        confirmPress={_onPressConfirm}
        contentRenderer={_modalContentRenderer}
        confirmText={'확인'}
        cancelText={'취소'}
      />
      <RouteHeader
        label={type === 'list' ? '타임 캡슐 확인' : '타임 캡슐 미리보기'}
        textAlign="center"
        containerStyle={styles.headerStyle}
      />
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <View style={styles.contentView}>
          <View>
            <TemplateText familyType="power" style={styles.usuableDateText}>
              {`${capsule.date.date}${
                capsule.isAllDay ? '' : `. ${capsule.date.time} 이후`
              } 개봉 가능`}
            </TemplateText>
            <PersonText person={sendNickname.nickname} label="To. " />
            <TemplateText familyType="bold" style={styles.contentText}>
              {capsule.content || '입력한 내용이 없습니다.'}
            </TemplateText>
          </View>
          <PersonText person={capsule.from} label="From. " aligh="flex-end" />
        </View>
        {renderButtons()}
      </ScrollView>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: yellow,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 30,
    alignItems: 'center',
    backgroundColor: yellow,
  },
  contentView: {
    flex: 1,
    justifyContent: 'space-between',
    width: '100%',
    borderWidth: 3,
    paddingBottom: 25,
    paddingHorizontal: 25,
    backgroundColor: 'white',
  },
  contentText: {
    padding: 12,
    fontSize: 18,
    color: darkBlue,
  },
  usuableDateText: {
    paddingVertical: 20,
    textAlign: 'center',
    color: yellow,
  },
  personTextView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  personLabel: {
    fontSize: 18,
    color: 'black',
  },
  person: {
    fontSize: 18,
    color: darkBlue,
  },
  submitButton: {
    ...mixinStyles.flexCenter,
    width: '50%',
    height: 45,
    marginTop: 15,
    marginBottom: 40,
    borderRadius: 4,
    backgroundColor: darkBlue,
  },
  submitButtonText: {
    color: 'white',
  },
  saveImageButton: {
    ...mixinStyles.flexCenter,
    justifyContent: 'space-between',
    height: 50,
    marginTop: 25,
  },
  saveImageButtonText: {
    color: darkBlue,
  },
  buttonWrap: {
    marginBottom: 40,
  },
  ///////
  modalContentContainer: {
    alignItems: 'center',
    padding: 20,
  },
  modalImage: {
    width: 110,
    height: 90,
  },
  modalContentText: {
    width: 240,
    marginTop: 10,
    fontSize: 15,
    textAlign: 'center',
  },
});

export default WriteCapsulePreview;
