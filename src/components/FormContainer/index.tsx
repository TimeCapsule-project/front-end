import React, { Fragment } from 'react';
import { Image, View } from 'react-native';
import RouteHeader from 'components/RouteHeader';
import TemplateText from 'components/TemplateText';
import styles from './style';

const thumbnailSource = '../../assets/images/thumbnail.png';

type PropsType = {
  backBtnText?: string;
  logoTitle?: string;
  children: React.ReactNode;
};

const LogoTitle = React.memo(({ title }: { title: string }) => (
  <View style={styles.logo}>
    <Image source={require(thumbnailSource)} width={168} height={133} />
    <TemplateText familyType="bold" style={styles.titleText}>
      {title || '새 계정 만들기'}
    </TemplateText>
  </View>
));

const FormContainer: React.FC<PropsType> = ({
  children,
  backBtnText,
  logoTitle,
}) => {
  return (
    <Fragment>
      <RouteHeader
        label={backBtnText || '돌아가기'}
        containerStyle={styles.headerStyle}
      />
      <View style={styles.container}>
        <LogoTitle title={logoTitle || ''} />
        {children}
      </View>
    </Fragment>
  );
};

export default FormContainer;
