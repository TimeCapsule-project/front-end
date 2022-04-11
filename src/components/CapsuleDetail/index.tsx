import React, { useCallback, useState } from 'react';
import Swiper from 'react-native-swiper';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { mixinStyles } from '../../assets/styles/mixin';
import { darkBlue, sandGray } from '../../assets/styles/colors';
import { RootStackParamList } from '../../pages/routes';
import TemplateText from '../../components/TemplateText';

type PropsType = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignInfoStep'>;
};

function CapsuleDetail({ navigation }: PropsType) {
  const [type, setType] = useState<'anywhere' | 'special'>('anywhere');

  const goWrite = useCallback(() => 
    () => navigation.navigate('anywhere' ? 'SignInfoStep' : ''),
    [navigation]
  );

  return (
    <View style={styles.container}>
      <Swiper style={styles.wrapper}>
        <View style={styles.anyWhereCard}>
          <TemplateText familyType="power" style={styles.anyWhereCardTitle}>
            {'Anywhere'}
          </TemplateText>
          <TemplateText familyType="light" style={styles.text}>
            {'오픈시간이 되면,'}
          </TemplateText>
          <TemplateText familyType="bold" style={styles.boldText}>
            {'어디서나'}
          </TemplateText>
          <TemplateText familyType="light" style={styles.text}>
            {'열 수 있는 타임캡슐'}
          </TemplateText>
        </View>
        <View style={styles.specialPriceCard}>
          <TemplateText familyType="power" style={styles.specialPlaceCardTitle}>
            {'Special Place'}
          </TemplateText>
          <TemplateText
            familyType="light"
            style={[styles.text, styles.fontColor]}>
            {'우리만의'}
          </TemplateText>
          <TemplateText
            familyType="bold"
            style={[styles.boldText, styles.fontColor]}>
            {'특별한 장소 에서'}
          </TemplateText>
          <TemplateText
            familyType="light"
            style={[styles.text, styles.fontColor]}>
            {'열 수 있는 타임캡슐'}
          </TemplateText>
        </View>
      </Swiper>
      <TouchableOpacity style={styles.button} onPress={goWrite}>
        <TemplateText familyType="power" style={styles.buttonText}>
          {'선택하기'}
        </TemplateText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { justifyContent: 'center' },
  wrapper: { flex: 1 },
  anyWhereCard: {
    padding: 25,
    borderRadius: 20,
    backgroundColor: sandGray,
  },
  anyWhereCardTitle: {
    fontSize: 48,
    color: darkBlue,
    fontWeight: 'bold',
  },
  boldText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 28,
  },
  fontColor: {
    color: '#FFFFFF',
  },
  specialPriceCard: {
    padding: 25,
    borderRadius: 20,
    backgroundColor: darkBlue,
  },
  specialPlaceCardTitle: {
    width: 200,
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  button: {
    ...mixinStyles.flexCenter,
    width: '50%',
    marginTop: 25,
    borderRadius: 4,
    backgroundColor: darkBlue,
  },
  buttonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default CapsuleDetail;
