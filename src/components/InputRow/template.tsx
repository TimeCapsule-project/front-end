import React from 'react';
import InputRow, { PropsType } from './index';
import { templateStyles } from './style';

type TextInputTemplatePropsType = Omit<PropsType, 'type'>

export function TextInputTemplate(props: TextInputTemplatePropsType) {
  return (
    <InputRow
      {...props}
      type="text"
      labelStyle={[templateStyles.inputLabelStyle, props?.labelStyle]}
      inputWrapStyle={[templateStyles.inputWrap, props?.inputWrapStyle]}
      containerStyle={[templateStyles.inputContainer, props?.containerStyle]}
      inputProps={{
        ...props.inputProps,
        style: [templateStyles.input, props.inputProps?.style],
      }}
    />
  );
}
