import React, { useCallback, useMemo, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Container from './Container';

import { DispatchType } from '..';
import { darkBlue, sandPink } from '../../../assets/styles/colors';
import { mixinStyles } from '../../../assets/styles/mixin';
import CheckWhite from '../../SvgComponents/checkWhite';

type MessageCardProps = {
  submit(): void;
  dispatch: DispatchType;
  parentHeight: number;
};

function MessageCard({ submit, dispatch, parentHeight }: MessageCardProps) {
  const [content, setContent] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');

  const maxHeight = useMemo(() => parentHeight * 0.7 - 47 * 2, [parentHeight]);
  const _onChangeMsgText = useCallback(
    (text: string) => {
      let _text = text.length > 10 ? text.substring(0, 10) : text;
      setContent(_text);
      dispatch({
        type: 'WRITE_MESSAGE',
        message: { content: _text, nickname },
      });
    },
    [dispatch, nickname],
  );

  const _onChangeFromText = useCallback(
    (text: string) => {
      setNickname(text);
      dispatch({ type: 'WRITE_MESSAGE', message: { content, nickname: text } });
    },
    [content, dispatch],
  );

  const _onPressSubmit = useCallback(() => {
    submit();
  }, [submit]);

  return (
    <Container title={'To.'} style={[styles.container, { height: maxHeight }]}>
      <View style={styles.contentBox}>
        <TextInput
          multiline
          style={styles.textArea}
          value={content}
          placeholder={'최대 1000자 까지 보낼 수 있어요!'}
          onChangeText={_onChangeMsgText}
        />
        <View style={styles.from}>
          <Text style={styles.fromLabel}>{'from.'}</Text>
          <TextInput
            style={styles.fromText}
            value={nickname}
            placeholderTextColor={'#ffffff'}
            placeholder={'닉네임을 입력해주세요.'}
            onChangeText={_onChangeFromText}
          />
        </View>
        <View style={styles.checkButtonWrap}>
          <TouchableOpacity style={styles.checkButton} onPress={_onPressSubmit}>
            <CheckWhite />
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: sandPink },
  contentBox: {
    flex: 1,
    flexDirection: 'column',
    marginHorizontal: 30,
    paddingBottom: 75,
  },
  textArea: {
    flex: 1,
    padding: 15,
    borderWidth: 2,
    borderColor: darkBlue,
    backgroundColor: '#ffffff',
  },
  from: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  fromLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#ffffff',
  },
  fromText: {
    paddingTop: 6,
    fontSize: 12,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    color: '#ffffff',
  },
  checkButtonWrap: {
    flex: 1,
    alignItems: 'center',
  },
  checkButton: {
    ...mixinStyles.flexCenter,
    width: 70,
    height: 70,
    marginTop: 15,
    borderRadius: 35,
    backgroundColor: '#E4BE3A',
  },
});

export default MessageCard;
