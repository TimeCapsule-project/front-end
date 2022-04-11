import React from 'react';
import { Image, Text, View } from 'react-native';
import RouteHeader from 'components/RouteHeader';
import styles from './style';

const thumbnailSource = '../../assets/images/thumbnail.png';

type PropsType = {
  backBtnText?: string;
  logoTitle?: string;
};

const LogoTitle = React.memo(({ title }: { title: string }) => (
  <View style={styles.logo}>
    <Image source={require(thumbnailSource)} width={168} height={133} />
    <Text style={styles.titleText}>{title || '새 계정 만들기'}</Text>
  </View>
));

const FormContainer: React.FC<PropsType> = ({
  children,
  backBtnText,
  logoTitle,
}) => {
  return (
    <View style={styles.container}>
      <RouteHeader backButtonText={backBtnText || '돌아가기'} />
      <LogoTitle title={logoTitle || ''} />
      {children}
    </View>
  );
};

export default FormContainer;
