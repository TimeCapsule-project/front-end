import React, { useCallback, useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Swiper from 'react-native-swiper';

import { mixinStyles } from '../../assets/styles/mixin';
import { darkBlue, sandGray } from '../../assets/styles/colors';
import { RootStackParamList } from '../../pages/routes';
import TemplateText from '../../components/TemplateText';
import { useResetRecoilState } from 'recoil';
import {
  latLngState,
  sendNicknameState,
  writeCapsuleState,
} from 'states/atoms';

type PropsType = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

interface RenderSwiperProps {
  onIndexChanged: (i: number) => void;
}

const AnywhereCard = React.memo(function () {
  return (
    <View style={styles.anyWhereCard}>
      <TemplateText familyType="power" style={styles.anyWhereCardTitle}>
        {'Anywhere'}
      </TemplateText>
      <TemplateText familyType="light" style={styles.text}>
        {'오픈시간이 되면,'}
      </TemplateText>
      <TemplateText familyType="bold" style={styles.text}>
        {'어디서나'}
      </TemplateText>
      <TemplateText familyType="light" style={styles.text}>
        {'열 수 있는 타임캡슐'}
      </TemplateText>
    </View>
  );
});

const SpecialCard = React.memo(function () {
  return (
    <View style={styles.specialPriceCard}>
      <TemplateText familyType="power" style={styles.specialPlaceCardTitle}>
        {'Special Place'}
      </TemplateText>
      <TemplateText familyType="light" style={[styles.text, styles.fontColor]}>
        {'우리만의'}
      </TemplateText>
      <TemplateText familyType="bold" style={[styles.text, styles.fontColor]}>
        {'특별한 장소 에서'}
      </TemplateText>
      <TemplateText familyType="light" style={[styles.text, styles.fontColor]}>
        {'열 수 있는 타임캡슐'}
      </TemplateText>
    </View>
  );
});

const RenderSwiper = React.memo(function ({
  onIndexChanged,
}: RenderSwiperProps) {
  return (
    <Swiper onIndexChanged={onIndexChanged}>
      <AnywhereCard />
      <SpecialCard />
    </Swiper>
  );
});

function CapsuleTypeSwiper({ navigation }: PropsType) {
  const [index, setIndex] = useState<number>(0);
  const setWriteCapsuleReset = useResetRecoilState(writeCapsuleState);
  const setSendNicknameReset = useResetRecoilState(sendNicknameState);
  const setLatlngReset = useResetRecoilState(latLngState);

  const _onIndexChanged = useCallback((_index: number) => setIndex(_index), []);

  const _goWriteCapsule = useCallback(
    async (_index: number) => {
      setWriteCapsuleReset();
      setSendNicknameReset();
      setLatlngReset();

      _index === 0
        ? navigation.navigate('WriteCapsule', { type: 'anywhere' })
        : navigation.navigate('WriteCapsule', { type: 'special' });
    },
    [navigation, setLatlngReset, setSendNicknameReset, setWriteCapsuleReset],
  );

  return (
    <View style={styles.container}>
      <RenderSwiper onIndexChanged={_onIndexChanged} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => _goWriteCapsule(index)}>
        <TemplateText familyType="power" style={styles.buttonText}>
          {'선택하기'}
        </TemplateText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 25,
    paddingBottom: Dimensions.get('screen').height * 0.125,
  },
  anyWhereCard: {
    flex: 1,
    padding: 25,
    borderRadius: 20,
    backgroundColor: sandGray,
  },
  anyWhereCardTitle: {
    fontSize: 48,
    marginBottom: 10,
    color: darkBlue,
  },
  text: {
    color: darkBlue,
    fontSize: 28,
    lineHeight: 32,
  },
  fontColor: {
    color: '#FFFFFF',
  },
  specialPriceCard: {
    flex: 1,
    padding: 25,
    borderRadius: 20,
    backgroundColor: darkBlue,
  },
  specialPlaceCardTitle: {
    width: 200,
    fontSize: 48,
    marginBottom: 10,
    color: '#FFFFFF',
  },
  button: {
    ...mixinStyles.flexCenter,
    width: '50%',
    height: 45,
    marginTop: 25,
    borderRadius: 4,
    backgroundColor: darkBlue,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default CapsuleTypeSwiper;
