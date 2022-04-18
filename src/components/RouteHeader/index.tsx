import React, { useCallback } from 'react';
import {
  Dimensions,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TemplateText from 'components/TemplateText';
import LeftArrow from 'components/SvgComponents/leftArrow';
import { darkBlue } from 'assets/styles/colors';

type PropsType = {
  label: string;
  containerStyle?: ViewStyle;
  textAlign?: TextStyle['textAlign'];
};

function RouteHeader({ containerStyle, label, textAlign = 'auto' }: PropsType) {
  const navigation = useNavigation();

  const _onPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.backButton}>
        <TouchableOpacity style={styles.backButtonImgWrap} onPress={_onPress}>
          <LeftArrow />
        </TouchableOpacity>
        <TemplateText familyType="power" style={[styles.label, { textAlign }]}>
          {label}
        </TemplateText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    height: 37,
    width: '100%',
    paddingHorizontal: 15,
  },
  backButton: { flexDirection: 'row', alignItems: 'center' },
  backButtonImgWrap: { marginLeft: -7 },
  label: {
    width: Dimensions.get('screen').width - 57,
    paddingRight: 13,
    marginLeft: -10,
    color: darkBlue,
  },
});

export default React.memo(RouteHeader);
