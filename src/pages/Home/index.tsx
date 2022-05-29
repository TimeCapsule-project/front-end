import dayjs from 'dayjs';
import Toast from 'react-native-root-toast';
import Geolocation from 'react-native-geolocation-service';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { darkBlue, sandGray, yellow } from 'assets/styles/colors';
import { RootStackParamList } from 'pages/routes';
import { useGetSendCapsuleList } from 'hooks/api/useGetSendCapsuleList';
import { useGetArrivedCapsuleList } from 'hooks/api/useGetArrivedCapsuleList';
import { ListViewItem } from 'components/ListView/Item';
import { capsuleColors } from 'constants/capsuleColors';
import tabHeaderItems from 'constants/tabHeaderItems';

import Header from 'components/Header';
import TabMenu from 'components/TabMenu';
import ListView from 'components/ListView';
import CustomModal from 'components/CustomModal';
import TemplateText from 'components/TemplateText';
import CapsuleTypeSwiper from 'components/CapsuleTypeSwiper';
import MiniLocationSvg from 'components/SvgComponents/miniLocation';
import { mixinStyles } from 'assets/styles/mixin';
import { activeLocationPermission } from 'utils/permission/permissionUtil';
import { useCheckCanOpenLocation } from 'hooks/api/useCheckCanOpenLocation';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

function Home() {
  const navigation = useNavigation<HomeNavigationProp>();

  const [items, setItems] = useState<ListViewItem[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [currentInfo, setCurrentInfo] = useState<any>({});
  const [currentPos, setCurrentPos] = useState<[number, number]>();
  const [allowPermission, setAllowPermission] = useState<boolean>(false);
  const [canOpenLocation, setCanOpenLocation] = useState<boolean>(false);

  const _onSuccessCheckCanOpen = useCallback(
    _canOpenLocation => setCanOpenLocation(_canOpenLocation),
    [],
  );

  const { refetch: checkCanOpen } = useCheckCanOpenLocation(
    {
      capsuleId: currentInfo?.capsuleId,
      latitude: String(currentPos?.[0] || -1),
      longitude: String(currentPos?.[1] || -1),
    },
    _onSuccessCheckCanOpen,
  );

  const _onSuccessCapsuleList = useCallback(
    (data: ListViewItem[]) => setItems(data),
    [],
  );

  const { isLoading: isLoadingSendCapsules, refetch: getSendCapsules } =
    useGetSendCapsuleList(1, _onSuccessCapsuleList);

  const { isLoading: isLoadingArrivedCapsules, refetch: getArrivedCapsules } =
    useGetArrivedCapsuleList(1, _onSuccessCapsuleList);

  const _onTabChange = useCallback(
    (index: number) => {
      if (index === 0) {
        getSendCapsules();
      } else if (index === 1) {
        getArrivedCapsules();
      }
      setTabIndex(index);
    },
    [getArrivedCapsules, getSendCapsules],
  );

  const setGeolocationPos = useCallback(async () => {
    const usuableGeoService = await activeLocationPermission();
    if (usuableGeoService) {
      setAllowPermission(true);
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setCurrentPos([latitude, longitude]);
        },
        error => {
          Toast.show('현재 위치를 불러오지 못했습니다. 권한을 확인해주세요.');
          console.error(error.message);
        },
      );
    }
  }, []);

  useEffect(() => {
    setGeolocationPos();
  }, [setGeolocationPos]);

  useEffect(() => {
    currentPos && checkCanOpen();
  }, [checkCanOpen, currentPos]);

  useEffect(() => {
    _onTabChange(0);
  }, [_onTabChange]);

  const _onPressConfirm = useCallback(() => {
    setVisible(false);
    navigation.navigate('WriteCapsulePreview', {
      type: 'list',
      id: currentInfo?.capsuleId,
    });
  }, [currentInfo?.capsuleId, navigation]);

  const _onClickItem = useCallback((data: { capsuleId: number }) => {
    console.log(data);
    setVisible(true);
    setCurrentInfo(data);
  }, []);

  const renderOpenTimeNotifyText = useCallback(
    (isTimeOver: boolean, openDateText: string) => {
      if (!isTimeOver) {
        return (
          <View style={styles.notifyTextWrap}>
            <TemplateText
              familyType="power"
              style={[
                styles.textBrown,
                styles.fontSizeSmall,
                styles.width100Percent,
              ]}>
              {'타임캡슐 오픈은'}
            </TemplateText>
            <TemplateText
              familyType="power"
              style={[styles.textYellow, styles.fontSizeSmall]}>
              {openDateText}
            </TemplateText>
            <TemplateText
              familyType="power"
              style={[styles.textBrown, styles.fontSizeSmall]}>
              {'부터 가능합니다'}
            </TemplateText>
          </View>
        );
      }
      return (
        <View style={styles.notifyTextWrap2}>
          <TemplateText
            familyType="power"
            style={[styles.textBrown, styles.fontSizeBig]}>
            {'타임캡슐 '}
          </TemplateText>
          <TemplateText
            familyType="power"
            style={[styles.textYellow, styles.fontSizeBig]}>
            {'오픈 '}
          </TemplateText>
          <TemplateText
            familyType="power"
            style={[styles.textBrown, styles.fontSizeBig]}>
            {'가능 !'}
          </TemplateText>
        </View>
      );
    },
    [],
  );

  const _modalContentRenderer = () => {
    const date = dayjs(currentInfo.duration);
    const isTimeOver = date.isValid() ? date.diff(dayjs()) < 0 : false;
    const openTimeText = date.isValid()
      ? date.format('YYYY년 MM월 DD일 A HH시 mm분')
      : 'invalid Date';

    const disableButton = currentInfo.location
      ? !canOpenLocation || (tabIndex === 1 && !isTimeOver) // Special Place
      : tabIndex === 1 && !isTimeOver; // Anywhere Place

    return (
      <View style={styles.modalContentContainer}>
        {tabIndex === 0 && (
          <TemplateText
            familyType="bold"
            style={[
              styles.isOpenedText,
              currentInfo.opened ? styles.darkBlue : styles.lightDarkBlue,
            ]}>
            {currentInfo.opened ? '읽음' : '읽지 않음'}
          </TemplateText>
        )}
        <Image
          style={styles.modalImg}
          source={capsuleColors[0].source}
          width={110}
          height={110}
        />
        <TemplateText familyType="bold" style={styles.modalImageText}>
          {`${tabIndex === 0 ? 'To.' : 'From.'} ${currentInfo.nickname}`}
        </TemplateText>
        {renderOpenTimeNotifyText(isTimeOver, openTimeText)}
        {currentInfo.location ? (
          <View style={styles.locationTextWrap}>
            <MiniLocationSvg />
            <TemplateText familyType="power" style={styles.locationText}>
              {allowPermission
                ? `타임캡슐 ${
                    canOpenLocation
                      ? '오픈이 가능한 위치입니다.'
                      : '오픈 가능 위치가 아닙니다.'
                  }`
                : '위치 기반 서비스에 동의해주세요.'}
            </TemplateText>
          </View>
        ) : (
          <View style={styles.spacingLineBox} />
        )}
        <TouchableOpacity
          onPress={_onPressConfirm}
          disabled={disableButton}
          // eslint-disable-next-line react-native/no-inline-styles
          style={[styles.modalButton, { opacity: disableButton ? 0.3 : 1 }]}>
          <TemplateText familyType="power" style={styles.modalButtonText}>
            {tabIndex === 0 ? '내용 확인하기' : '오픈'}
          </TemplateText>
        </TouchableOpacity>
      </View>
    );
  };

  const viewList = useMemo(
    () => [
      <ListView
        items={items}
        loading={isLoadingSendCapsules}
        onClickItem={_onClickItem}
        onEndReached={() => {}}
      />,
      <ListView
        items={items}
        loading={isLoadingArrivedCapsules}
        onClickItem={_onClickItem}
        onEndReached={() => {}}
      />,
      <CapsuleTypeSwiper navigation={navigation} />,
    ],
    [
      _onClickItem,
      isLoadingArrivedCapsules,
      isLoadingSendCapsules,
      items,
      navigation,
    ],
  );

  return (
    <View style={styles.container}>
      <CustomModal
        visible={visible}
        setVisible={setVisible}
        contentRenderer={_modalContentRenderer}
      />
      <Header />
      <TabMenu
        headerItems={tabHeaderItems}
        viewList={viewList}
        onTabChange={_onTabChange}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: sandGray,
  },
  modalContentContainer: {
    position: 'relative',
    padding: 20,
    alignItems: 'center',
  },
  notifyTextWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  notifyTextWrap2: {
    flexDirection: 'row',
  },
  isOpenedText: { position: 'absolute', right: 15, top: 15 },
  lightDarkBlue: { color: '#C2D5D8' },
  darkBlue: { color: darkBlue },
  modalImg: {},
  modalImageText: { fontSize: 16, marginBottom: 15 },
  modalButtonText: { color: '#ffffff', fontSize: 16 },
  modalButton: {
    ...mixinStyles.flexCenter,
    borderRadius: 25,
    height: 45,
    minWidth: Dimensions.get('screen').width - 100,
    backgroundColor: yellow,
  },
  textBrown: { textAlign: 'center', color: '#3D280C' },
  textYellow: { textAlign: 'center', color: yellow },
  fontSizeSmall: { fontSize: 13 },
  fontSizeBig: { fontSize: 20 },
  width100Percent: { width: '100%' },
  locationTextWrap: { flexDirection: 'row', marginVertical: 10 },
  locationText: {
    borderBottomWidth: 1,
    borderBottomColor: darkBlue,
    color: darkBlue,
    fontSize: 11,
    marginLeft: 5,
  },
  spacingLineBox: {
    width: 70,
    height: 1,
    marginVertical: 20,
    backgroundColor: yellow,
  },
});

export default Home;
