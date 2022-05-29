import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { darkBlue } from 'assets/styles/colors';
import TemplateText from 'components/TemplateText';
import SettingSvg from 'components/SvgComponents/setting';
import MegaphoneSvg from 'components/SvgComponents/megaphone';
import ActiveBellSvg from 'components/SvgComponents/activeBell';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    marginLeft: 20,
    marginRight: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: darkBlue,
    paddingLeft: 12,
    overflow: 'hidden',
  },
  leftBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  rightBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

function Header() {
  const navigation = useNavigation();

  const _goSetting = useCallback(() => {
    navigation.navigate('Setting');
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.leftBox}>
        <MegaphoneSvg />
        <TemplateText familyType="power" style={styles.newsText}>
          {'크리스마스까지 D-100 ! (TODO)'}
        </TemplateText>
      </View>
      <View style={styles.rightBox}>
        <ActiveBellSvg />
        <TouchableOpacity onPress={_goSetting}>
          <SettingSvg />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Header;
