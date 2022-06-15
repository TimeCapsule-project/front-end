import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import { USER_PROFILE_KEY } from 'constants/asyncStorage';
import { mixinStyles } from 'assets/styles/mixin';
import { darkBlue, sandGray, tomatoRed } from 'assets/styles/colors';
import { SettingCommonRow } from 'components/SettingComponents';
import { TextInputTemplate } from 'components/InputRow/template';
import RouteHeader from 'components/RouteHeader';
import TemplateText from 'components/TemplateText';
import { useCheckDuplicateNickname } from 'hooks/api/useCheckDuplicateNickname';
import { validator } from 'utils/validator';
import Toast from 'react-native-root-toast';
import { useChangeNickname } from 'hooks/api/useChangeNickname';

function ChangeNickname() {
  const [nickname, setNickname] = useState<string>('');
  const [newNickname, setNewNickname] = useState<string>('');
  const [useable, setUseable] = useState<boolean | undefined>(undefined);

  const initNickname = useCallback(async () => {
    const _userInfo = JSON.parse(
      (await AsyncStorage.getItem(USER_PROFILE_KEY)) || '',
    );
    setNickname(_userInfo?.userNickname || '');
  }, []);

  const _onSuccessSubmit = useCallback(() => initNickname(), [initNickname]);

  const _onSuccessCheckDuplNickname = useCallback(() => setUseable(true), []);

  const _onErrorCheckDuplNickname = useCallback(() => setUseable(false), []);

  const { refetch: check } = useCheckDuplicateNickname(
    newNickname,
    _onSuccessCheckDuplNickname,
    _onErrorCheckDuplNickname,
  );

  const { mutate } = useChangeNickname(newNickname, _onSuccessSubmit);

  const _onPressDuplNickname = useCallback(() => {
    if (validator(newNickname, 'id')) {
      return check();
    }
    Toast.show('닉네임이 유효하지 않습니다.');
  }, [check, newNickname]);

  const _onPressSubmit = useCallback(() => {
    if (useable) {
      mutate();
      setUseable(undefined);
    }
    Toast.show('닉네임 중복 확인이 필요합니다.');
  }, [mutate, useable]);

  useEffect(() => {
    initNickname();
  }, [initNickname]);

  return (
    <Fragment>
      <RouteHeader
        label="닉네임 변경"
        textAlign="center"
        containerStyle={styles.headerStyle}
      />
      <View style={styles.mainContainer}>
        <View>
          <SettingCommonRow
            borderBottom={false}
            label={'현재 닉네임'}
            value={nickname || 'loading...'}
          />
          <TextInputTemplate
            label={'새로운 닉네임'}
            labelStyle={styles.inputLabelStyle}
            inputProps={{
              placeholder: '영문, 숫자 혼합 5자리 이상',
              onChangeText: (e: string) => setNewNickname(e),
            }}
            buttonProps={{
              style: styles.button,
              text: '중복 확인',
              textStyle: styles.inputButtonText,
              onPress: () => _onPressDuplNickname(),
            }}
            containerStyle={styles.inputContainerMargin}
          />
          {typeof useable === 'boolean' && (
            <TemplateText
              familyType="bold"
              style={useable ? styles.useableText : styles.unuseableText}>
              {typeof useable === 'boolean'
                ? useable
                  ? '사용할 수 있는 닉네임입니다.'
                  : '이미 사용 중인 닉네임입니다.'
                : ''}
            </TemplateText>
          )}
        </View>
        <TouchableOpacity style={styles.submitButton} onPress={_onPressSubmit}>
          <TemplateText familyType="power" style={styles.inputButtonText}>
            {'완료'}
          </TemplateText>
        </TouchableOpacity>
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
  commonRow: { flexDirection: 'row' },
  inputContainerMargin: { paddingHorizontal: 25, marginTop: 25 },
  button: {
    ...mixinStyles.flexCenter,
    borderRadius: 5,
    marginLeft: 10,
    backgroundColor: darkBlue,
    minWidth: 100,
  },
  inputButtonText: {
    color: '#ffffff',
  },
  inputLabelStyle: { fontSize: 18 },
  useableText: { color: darkBlue, marginLeft: 25, marginTop: -12 },
  unuseableText: { color: tomatoRed, marginLeft: 25, marginTop: -12 },
  submitButton: {
    ...mixinStyles.flexCenter,
    height: 45,
    borderRadius: 5,
    marginBottom: 45,
    marginHorizontal: 25,
    backgroundColor: darkBlue,
  },
});

export default ChangeNickname;
