import React, { useCallback, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { darkBlue, yellow } from 'assets/styles/colors';
import { RootStackParamList } from 'pages/routes';
import CustomModal from 'components/CustomModal';
import RouteHeader from 'components/RouteHeader';
import TemplateText from 'components/TemplateText';
import MyPosition from 'components/SvgComponents/myPosition';
import Poi from 'components/SvgComponents/poi';
import { mixinStyles } from 'assets/styles/mixin';
import { defaultStyles } from 'assets/styles/default';

type LocationCapsuleScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'LocationCapsule'
>;

type LocationCapsuleScreenRouteProp = RouteProp<
  RootStackParamList,
  'LocationCapsule'
>;

const webviewUrl = 'https://unrivaled-cheesecake-e0f811.netlify.app';

function LocationCapsule() {
  const navigation = useNavigation<LocationCapsuleScreenNavigationProp>();
  const route = useRoute<LocationCapsuleScreenRouteProp>();

  const [visible, setVisible] = useState<boolean>(false);

  const _onPressSubmit = useCallback(() => setVisible(true), []);

  const _modalContentRenderer = useCallback(() => {
    return (
      <View style={styles.modalContentContainer}>
        <Poi />
        <TemplateText familyType="bold" style={styles.modalImageText}>
          {'주소 확인'}
        </TemplateText>
        <Image
          style={styles.modalImage}
          source={require('../../assets/images/thumbnail.png')}
        />
        <TemplateText familyType="power" style={styles.modalAddressText}>
          {'주소 테스트으으으으으으'}
        </TemplateText>
      </View>
    );
  }, []);

  return (
    <View style={styles.container}>
      <CustomModal
        visible={visible}
        setVisible={setVisible}
        contentRenderer={_modalContentRenderer}
        confirmPress={() => {}}
        confirmText={'설정'}
        cancelText={'취소'}
      />
      <View>
        <RouteHeader
          label="캡슐 장소 설정하기"
          textAlign="center"
          containerStyle={styles.headerStyle}
        />
        <TemplateText>{'TEST'}</TemplateText>
      </View>
      <WebView
        containerStyle={styles.webviewContainer}
        source={{ uri: webviewUrl }}
        javaScriptEnabled={true}
      />
      <View>
        <TouchableOpacity onPress={() => {}} style={styles.myPositionButton}>
          <MyPosition />
        </TouchableOpacity>
        <View style={styles.bottonCard}>
          <TemplateText familyType="power" style={styles.text}>
            {'경기 팔달구 월드컵로 46'}
          </TemplateText>
          <TemplateText
            familyType="bold"
            style={[styles.text, styles.noticeText]}>
            {'설정한 장소의 300m 반경 범위 내에서 타임캡슐을 해제할 수 있어요!'}
          </TemplateText>
          <TouchableOpacity
            onPress={_onPressSubmit}
            style={styles.submitButton}>
            <TemplateText
              familyType="power"
              style={[styles.text, styles.buttonText]}>
              {'이 위치로 장소 설정'}
            </TemplateText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'space-between',
  },
  webviewContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  headerStyle: {
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  bottonCard: {
    padding: 25,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    backgroundColor: yellow,
    alignItems: 'center',
  },
  noticeText: {
    paddingTop: 20,
    width: 200,
    fontSize: 15,
    letterSpacing: 0.7,
  },
  buttonText: {
    fontSize: 15,
    color: '#fff',
  },
  submitButton: {
    ...defaultStyles.button,
    backgroundColor: darkBlue,
    borderRadius: 5,
    marginTop: 30,
  },
  text: {
    color: darkBlue,
    textAlign: 'center',
    fontSize: 20,
  },
  myPositionButton: {
    ...mixinStyles.flexCenter,
    backgroundColor: '#fff',
    width: 60,
    height: 60,
    marginLeft: 15,
    marginBottom: 20,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  /////////////////////////
  modalContentContainer: {
    alignItems: 'center',
    padding: 20,
  },
  modalImage: {
    width: 75,
    height: 45,
  },
  modalImageText: {
    paddingTop: 3,
    fontSize: 12,
  },
  modalAddressText: {
    paddingTop: 15,
    fontSize: 15,
    color: darkBlue,
  },
});

export default LocationCapsule;
