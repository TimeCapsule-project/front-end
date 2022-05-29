import React, { useCallback } from 'react';
import { Text, TextProps } from 'react-native';
interface PropsType {
  familyType?: FontFamily;
}

export type FontFamily = 'power' | 'bold' | 'light';

export type TemplateTextProps = React.FC<PropsType & TextProps>;

const TemplateText: TemplateTextProps = props => {
  const { familyType, children } = props;

  const fontFamilyParser = useCallback(() => {
    switch (familyType) {
      case 'power':
        return 'GangwonEduPower';
      case 'bold':
        return 'GangwonEduAllBold';
      case 'light':
      default:
        return 'GangwonEduAllLight';
    }
  }, [familyType]);

  return (
    <Text {...props} style={[props.style, { fontFamily: fontFamilyParser() }]}>
      {typeof children === 'string' ? children : ''}
    </Text>
  );
};

export default TemplateText;
