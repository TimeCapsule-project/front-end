import React from 'react';
import InputRow, { PropsType } from './index';
import { templateStyles } from './style';

const commonOptions = {
  containerStyle: templateStyles.inputContainer,
  labelStyle: templateStyles.inputLabelStyle,
  inputWrapStyle: templateStyles.inputWrap,
  type: 'text',
};

export function TextInputTemplate(props: Omit<PropsType, 'type'>) {
  return (
    <InputRow
      {...commonOptions}
      {...props}
      inputProps={{
        style: [templateStyles.input, props.inputProps?.style],
        ...props.inputProps,
      }}
    />
  );
}
