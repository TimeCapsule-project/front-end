import React, { Fragment, useCallback, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  View,
  FlexStyle,
  Alert,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { mixinStyles } from 'assets/styles/mixin';
import { darkBlue, yellow } from 'assets/styles/colors';
import { RootStackParamList } from 'pages/routes';
import RouteHeader from 'components/RouteHeader';
import TemplateText from 'components/TemplateText';
import { DateTimeType } from 'components/DateTimePickerModal';
import { useWriteCapsuleMutation } from './hooks/useWriteCapsuleMutation';
import CustomModal from 'components/CustomModal';

export type PreviewData = {
  content?: string;
  date: DateTimeType;
  to: string;
  from: string;
  color: string;
  lat: number;
  lng: number;
};

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
  const { params } = useRoute<WriteCapsuleScreenRouteProp>();

  const [visible, setVisible] = useState<boolean>(false);

  const _onSuccessSubmit = useCallback((data: any) => {
    console.log(data);
  }, []);

  const { mutate } = useWriteCapsuleMutation(_onSuccessSubmit);

  const _onPressSubmit = useCallback(() => setVisible(true), []);

  const _onPressConfirm = () =>
    mutate({
      title: '???',
      content: params.data?.content || '',
      nickname: params.data?.from, // 내 닉네임
      recipient: params.data?.to, // 캡슐 받을 친구
      duration: `${params.data?.date.date} ${params.data?.date.time}`, // 2022-04-05
      latitude: params.data?.lat, // 위도
      longitude: params.data?.lng, // 경도
    });

  const _modalContentRenderer = useCallback(() => {
    return (
      <View style={styles.modalContentContainer}>
        <Image
          style={styles.modalImage}
          source={require('../../assets/images/thumbnail.png')}
        />
        <TemplateText familyType="bold">
          {'캡슐을 묻게 되면 내용을 수정할 수 없어요! 캡슐을 묻으시겠습니까?'}
        </TemplateText>
      </View>
    );
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
        label="타임 캡슐 미리보기"
        textAlign="center"
        containerStyle={styles.headerStyle}
      />
      <ScrollView contentContainerStyle={styles.mainContainer}>
        <View style={styles.contentView}>
          <View>
            <TemplateText familyType="power" style={styles.usuableDateText}>
              {`${params.data?.date.date}. ${params.data?.date.time} 이후 개봉 가능`}
            </TemplateText>
            <PersonText person={params.data?.to} label="To. " />
            <TemplateText familyType="bold" style={styles.contentText}>
              {params.data?.content || '입력한 내용이 없습니다.'}
            </TemplateText>
          </View>
          <PersonText
            person={params.data?.from}
            label="From. "
            aligh="flex-end"
          />
        </View>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={_onPressSubmit}>
          <TemplateText familyType="power" style={styles.submitButtonText}>
            {'캡슐 묻기'}
          </TemplateText>
        </TouchableOpacity>
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
  ///////
  modalContentContainer: {
    alignItems: 'center',
    padding: 20,
  },
  modalImage: {
    width: 75,
    height: 45,
  },
});

export default WriteCapsulePreview;
