import React, { useCallback } from 'react';
import { Text, TextProps } from 'react-native';

type PropsType = {
  familyType?: 'power' | 'bold' | 'light';
};

const TemplateText: React.FC<PropsType & TextProps> = props => {
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
      {children}
    </Text>
  );
};

export default TemplateText;
