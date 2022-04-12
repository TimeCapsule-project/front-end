import React from 'react';
import { StyleSheet, View } from 'react-native';
import { darkBlue } from 'assets/styles/colors';
import TemplateText from 'components/TemplateText';
import SettingSvg from 'components/SvgComponents/setting';
import MegaphoneSvg from 'components/SvgComponents/megaphone';
import ActiveBellSvg from 'components/SvgComponents/activeBell';

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
        <SettingSvg />
      </View>
    </View>
  );
}

export default Header;
