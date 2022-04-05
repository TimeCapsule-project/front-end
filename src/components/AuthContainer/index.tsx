import React, { Fragment } from 'react';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LeftArrow from '../SvgComponents/leftArrow';

const thumbnailSource = '../../assets/images/thumbnail.png';

type PropsType = {
  backBtnOption: {
    text: string;
    func(event: GestureResponderEvent): void;
  };
};

const BackButton = React.memo((backBtnOption: PropsType['backBtnOption']) => (
  <TouchableOpacity onPress={backBtnOption.func} style={styles.backButton}>
    <LeftArrow />
    <Text>{backBtnOption.text || '뒤로가기'}</Text>
  </TouchableOpacity>
));

const LogoTitle = React.memo(() => (
  <Fragment>
    <Image source={require(thumbnailSource)} width={168} height={133} />
    <Text style={styles.titleText}>{'새 계정 만들기'}</Text>
  </Fragment>
));

const AuthContainer: React.FC<PropsType> = ({ children, backBtnOption }) => {
  return (
    <View style={styles.container}>
      <BackButton {...backBtnOption} />
      <LogoTitle />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontFamily: 'GangwonEduAllLight',
  },
});

export default AuthContainer;
