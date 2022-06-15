import React, { createRef, useCallback, useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { useSetRecoilState } from 'recoil';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

import { latLngState } from 'states/atoms';
import { LatLngDefaultData } from 'states/types';
import { getFont } from 'utils/getFont';
import { postMessage } from 'utils/postMessage';
import { onMessage, OnMessageParam } from 'utils/onMessage';
import { mixinStyles } from 'assets/styles/mixin';
import { defaultStyles } from 'assets/styles/default';
import { darkBlue, yellow } from 'assets/styles/colors';
import { RootStackParamList } from 'pages/routes';
import { TextInputTemplate } from 'components/InputRow/template';
import CustomModal from 'components/CustomModal';
import RouteHeader from 'components/RouteHeader';
import TemplateText from 'components/TemplateText';
import Poi from 'components/SvgComponents/poi';
import Search from 'components/SvgComponents/search';
import MyPosition from 'components/SvgComponents/myPosition';

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
  const { params } = useRoute<LocationCapsuleScreenRouteProp>();

  const webview = createRef<any>();

  const [visible, setVisible] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [curLatlng, setLatlng] = useState<LatLngDefaultData | undefined>();
  const [dest, setDest] = useState<LatLngDefaultData | undefined>(
    params?.latlng,
  );

  const setLatLngState = useSetRecoilState(latLngState);

  const _onPressSubmit = useCallback(() => setVisible(true), []);

  const _onPressConfirm = useCallback(() => {
    setLatLngState({ lat: 36, lng: 121212 }); // TODO: change
    navigation.goBack();
  }, [navigation, setLatLngState]);

  const _onMessage = useCallback((message: OnMessageParam) => {
    onMessage(message, (data: any) => {
      setLatlng(data);
      setAddress(data);
    });
  }, []);

  const _touchMapPostMessage = useCallback(
    () => postMessage({ webview, config: { type: '' } }),
    [webview],
  );

  useEffect(() => {
    if (params?.latlng) {
      postMessage({
        webview,
        config: { type: 'DRAW_DESTINATION', data: params?.latlng },
      });
    }
  }, [params?.latlng, webview]);

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
          {address}
        </TemplateText>
      </View>
    );
  }, [address]);

  return (
    <View style={styles.container}>
      <CustomModal
        visible={visible}
        setVisible={setVisible}
        confirmPress={_onPressConfirm}
        contentRenderer={_modalContentRenderer}
        confirmText={'설정'}
        cancelText={'취소'}
      />
      <View>
        <RouteHeader
          label={
            params?.latlng ? '캡슐 오픈 장소 확인하기' : '캡슐 장소 설정하기'
          }
          textAlign="center"
          containerStyle={styles.headerStyle}
        />
        {!params?.latlng && (
          <TextInputTemplate
            iconComponentFunc={Search}
            inputWrapStyle={styles.inputWrap}
            inputProps={{
              placeholder: '지번, 도로명, 건물명으로 검색',
              style: styles.input,
              value: searchText,
              onChangeText: setSearchText,
            }}
          />
        )}
      </View>
      <WebView
        ref={webview}
        onTouchEnd={_touchMapPostMessage}
        containerStyle={styles.webviewContainer}
        source={{ uri: webviewUrl }}
        onMessage={_onMessage}
        javaScriptEnabled={true} // JS 통신하기 위함
        geolocationEnabled={true} // GPS 현재 위치 받아오기 위함
      />
      <View>
        <TouchableOpacity onPress={() => {}} style={styles.myPositionButton}>
          <MyPosition />
        </TouchableOpacity>
        <View style={styles.bottonCard}>
          <TemplateText familyType="power" style={styles.text}>
            {address}
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
  inputWrap: {
    marginHorizontal: 25,
    marginTop: 30,
  },
  input: {
    fontFamily: getFont('bold'),
    paddingLeft: 50,
    zIndex: 1,
    backgroundColor: '#fff',
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
