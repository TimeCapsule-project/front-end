import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  Switch,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { darkBlue } from 'assets/styles/colors';
import TemplateText from 'components/TemplateText';
import NavigateArrow from 'components/SvgComponents/navigateArrow';

interface RenderOptionParams {
  type: 'none' | 'navigate' | 'switch';
  func: (e: any) => void;
};

interface CommonRowProps {
  label: string;
  value?: string;
  option?: RenderOptionParams;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  borderBottom?: boolean;
}

function SettingCommonRow({
  label,
  value,
  option,
  style,
  labelStyle,
  borderBottom = true,
}: CommonRowProps) {
  const RenderOption = ({ type, func }: RenderOptionParams) => {
    switch (type) {
      case 'navigate':
        return (
          <TouchableOpacity onPress={func}>
            <NavigateArrow />
          </TouchableOpacity>
        );
      case 'switch':
        return (
          <Switch
            trackColor={{ false: '#E2E2E2', true: '#6DDA47' }}
            thumbColor={'#ffffff'}
            ios_backgroundColor="#E2E2E2"
            onValueChange={func}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View
      style={[
        styles.rowContainer,
        borderBottom ? [styles.borderBottom, style] : style,
      ]}>
      <View>
        <TemplateText
          familyType="power"
          style={[styles.rowLabel, labelStyle || {}]}>
          {label || ''}
        </TemplateText>
      </View>
      <View style={styles.options}>
        {value && (
          <TemplateText familyType="power" style={styles.rowValue}>
            {value || ''}
          </TemplateText>
        )}
        {option && <RenderOption {...option} />}
      </View>
    </View>
  );
}

interface ConnectedProfileProps {
  email: string;
  source: ImageSourcePropType;
}

function ConnectedProfile({ email, source }: ConnectedProfileProps) {
  return (
    <View style={styles.connectedProfileContainer}>
      <View style={styles.profileLabelWrap}>
        <TemplateText familyType="power" style={styles.rowLabel}>
          {'연결된 계정'}
        </TemplateText>
        <TemplateText familyType="power" style={styles.rowLabelEmail}>
          {email}
        </TemplateText>
      </View>
      <View>
        <Image
          source={source}
          width={68}
          height={68}
          style={styles.profilePicture}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 25,
    marginHorizontal: 25,
  },
  borderBottom: {
    borderBottomColor: '#D4BA55',
    borderBottomWidth: 1,
  },
  rowLabel: {
    fontSize: 18,
    color: darkBlue,
  },
  rowLabelEmail: {
    fontSize: 16,
    marginTop: 10,
    color: '#000',
  },
  rowValue: {
    fontSize: 18,
    marginRight: 10,
    color: '#000',
  },
  connectedProfileContainer: {
    backgroundColor: '#DED7D0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 25,
    paddingVertical: 15,
    marginTop: 25,
  },
  profileLabelWrap: {},
  profilePicture: {
    borderRadius: 34,
    width: 68,
    height: 68,
  },
  options: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export { SettingCommonRow, ConnectedProfile };
