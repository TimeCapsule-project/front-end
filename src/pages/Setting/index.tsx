import Toast from 'react-native-root-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { USER_PROFILE_KEY } from 'constants/asyncStorage';
import { logout } from 'utils/auth';
import { UserInfo } from 'hooks/api/types';
import { useRemoveAccount } from 'hooks/api/useRemoveAccount';
import { sandGray, tomatoRed } from 'assets/styles/colors';
import { RootStackParamList } from 'pages/routes';

import {
  SettingCommonRow,
  ConnectedProfile,
} from 'components/SettingComponents';
import RouteHeader from 'components/RouteHeader';
import TemplateText from 'components/TemplateText';
import CustomModal from 'components/CustomModal';
import { useToggleAllowSearchNickname } from 'hooks/api/useToggleAllowSearchNickname';

type SignInfoStepNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'SignUp/SignInfoStep'
>;

type SignInfoStepRouteProp = RouteProp<
  RootStackParamList,
  'SignUp/SignInfoStep'
>;

function Setting() {
  const navigation = useNavigation<SignInfoStepNavigationProp>();
  const route = useRoute<SignInfoStepRouteProp>();

  const [visible, setVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'logout' | 'delete'>('logout');
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  const initUserInfo = async () => {
    const _userInfo = JSON.parse(
      (await AsyncStorage.getItem(USER_PROFILE_KEY)) || '',
    );
    setUserInfo(_userInfo);
  };

  useEffect(() => {
    initUserInfo();
  }, []);

  const _onSuccessRemoveAccount = useCallback(
    () => Toast.show('계정이 삭제되었습니다.'),
    [],
  );

  const _onSuccessToggleAllowSearchNickname = useCallback(() => {}, []);

  const { mutate } = useRemoveAccount(_onSuccessRemoveAccount);

  const { refetch: toggleAllowSearch } = useToggleAllowSearchNickname(
    _onSuccessToggleAllowSearchNickname,
  );

  const _onPressConfirm = useCallback(() => {
    if (modalType === 'logout') {
      return logout(navigation);
    }
    userInfo?.userId && mutate(userInfo?.userId);
  }, [modalType, userInfo?.userId, mutate, navigation]);

  const goPage = useCallback(
    (path: string, params?: any) => navigation.navigate(path, params),
    [navigation],
  );

  const _modalRenderer = useCallback(() => {
    return (
      <View style={styles.modalContentContainer}>
        <Image
          style={styles.modalImage}
          source={require('../../assets/images/thumbnail.png')}
        />
        <TemplateText familyType="bold" style={styles.modalAddressText}>
          {modalType === 'logout'
            ? '로그아웃 하시겠습니까?'
            : '계정을 삭제하시겠습니까?'}
        </TemplateText>
      </View>
    );
  }, [modalType]);

  return (
    <Fragment>
      <CustomModal
        visible={visible}
        setVisible={setVisible}
        confirmPress={_onPressConfirm}
        contentRenderer={_modalRenderer}
        confirmText={modalType === 'logout' ? '로그아웃' : '삭제'}
        cancelText={'취소'}
      />
      <RouteHeader
        label="설정"
        textAlign="center"
        containerStyle={styles.headerStyle}
      />
      <View style={styles.mainContainer}>
        <View style={styles.flexSpaceBetween}>
          <ConnectedProfile
            email={userInfo?.userEmail}
            source={require('../../assets/images/capsules/1.png')}
          />
          <SettingCommonRow
            label={'닉네임'}
            value={userInfo?.userNickname}
            option={{
              type: 'navigate',
              func: () => goPage('Setting/ChangeNickname'),
            }}
          />
          <SettingCommonRow
            label={'닉네임 검색 허용'}
            option={{
              type: 'switch',
              func: toggleAllowSearch,
            }}
          />
          <SettingCommonRow
            label={'로그아웃'}
            labelStyle={styles.logoutTextColor}
            option={{
              type: 'navigate',
              func: () => {
                setModalType('logout');
                setVisible(true);
              },
            }}
          />
        </View>
        <View style={styles.removeAccountWrap}>
          <TouchableOpacity
            style={styles.removeAccount}
            onPress={() => {
              setModalType('delete');
              setVisible(true);
            }}>
            <TemplateText familyType="power" style={styles.removeAccountText}>
              {'계정 삭제하기'}
            </TemplateText>
          </TouchableOpacity>
        </View>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  headerStyle: { backgroundColor: sandGray },
  mainContainer: {
    flex: 1,
    backgroundColor: sandGray,
    justifyContent: 'space-between',
  },
  flexSpaceBetween: { justifyContent: 'space-between' },
  removeAccountWrap: { alignItems: 'center' },
  removeAccount: {
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D4BA55',
    marginVertical: 50,
  },
  removeAccountText: {
    textAlign: 'center',
    color: tomatoRed,
    fontSize: 18,
  },
  logoutTextColor: { color: '#4C6063' },
  modalContentContainer: {
    alignItems: 'center',
    padding: 20,
  },
  modalImage: {
    width: 75,
    height: 45,
  },
  modalAddressText: {
    paddingTop: 15,
    fontSize: 15,
  },
});

export default Setting;
