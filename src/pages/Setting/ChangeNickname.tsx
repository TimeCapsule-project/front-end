import React, { Fragment, useState } from 'react';
import RouteHeader from 'components/RouteHeader';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { darkBlue, sandGray, tomatoRed } from 'assets/styles/colors';
import { SettingCommonRow } from 'components/SettingComponents';
import { TextInputTemplate } from 'components/InputRow/template';
import { mixinStyles } from 'assets/styles/mixin';
import TemplateText from 'components/TemplateText';

function ChangeNickname() {
  const [newNickname, setNewNickname] = useState<string>('');
  const [useable, setUseable] = useState<boolean | undefined>(true);

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
            value={'닉네임입니당'}
          />
          <TextInputTemplate
            label={'새로운 닉네임'}
            labelStyle={styles.inputLabelStyle}
            inputProps={{
              placeholder: '영문, 숫자 혼합 5자리 이상',
              onChangeText: (e: string) => console.log(e),
            }}
            buttonProps={{
              style: styles.button,
              text: '중복 확인',
              textStyle: styles.inputButtonText,
              onPress: () => console.log('test'),
            }}
            containerStyle={styles.inputContainerMargin}
          />
          {typeof useable === 'boolean' && (
            <TemplateText
              familyType="bold"
              style={useable ? styles.useableText : styles.unuseableText}>
              {useable
                ? '사용할 수 있는 닉네임입니다.'
                : '이미 사용 중인 닉네임입니다.'}
            </TemplateText>
          )}
        </View>
        <TouchableOpacity style={styles.submitButton}>
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
  unuseableText: { color: tomatoRed, marginLeft: 25, marginTop: -20 },
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
