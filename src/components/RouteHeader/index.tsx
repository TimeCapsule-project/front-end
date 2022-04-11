import React, { useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TemplateText from 'components/TemplateText';
import LeftArrow from 'components/SvgComponents/leftArrow';
import { darkBlue } from 'assets/styles/colors';

type PropsType = {
  backButtonText: string;
};

function RouteHeader({ backButtonText }: PropsType) {
  const navigation = useNavigation();

  const _onPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={_onPress}>
        <LeftArrow />
        <TemplateText familyType="power" style={styles.backButtonText}>
          {backButtonText}
        </TemplateText>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'flex-start', height: 37, width: '100%' },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  backButtonText: { marginLeft: -10, color: darkBlue },
});

export default RouteHeader;
