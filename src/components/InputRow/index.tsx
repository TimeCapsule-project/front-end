import React, { useState } from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import TemplateText, { FontFamily } from 'components/TemplateText';
import { styles } from './style';

type InputPropsType = TextInputProps &
  Partial<{
    onChangeDateTimeText(params: { date: string; time: string }): void;
  }>;

interface InputProps {
  type: string;
  inputProps: InputPropsType;
}

interface ButtonProps {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  text: string;
  onPress(event: GestureResponderEvent): void;
}

export interface PropsType {
  inputProps: InputProps['inputProps'];
  buttonProps?: ButtonProps;
  labelFont?: FontFamily;
  labelStyle?: StyleProp<TextStyle>;
  inputWrapStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  type: string;
  label: string;
}

function Input({ type, inputProps }: InputProps) {
  switch (type) {
    case 'map':
      return <LocationInput {...inputProps} />;
    case 'dateTime':
      return <DateTimeInput {...inputProps} />;
    case 'text':
    default:
      return <TextInputWrapper {...inputProps} />;
  }
}

function DateTimeInput(props: InputPropsType) {
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

  return (
    <View style={styles.dateTimeWrap}>
      <TextInput
        {...props}
        style={[styles.defaultInput, props.style]}
        onChangeText={(text: string) => {
          const { onChangeDateTimeText } = props;
          onChangeDateTimeText && onChangeDateTimeText({ date: text, time });
          setDate(text);
        }}
      />
      <TextInput
        {...props}
        style={[styles.defaultInput, props.style, styles.dateTimeInput2]}
        onChangeText={(text: string) => {
          const { onChangeDateTimeText } = props;
          onChangeDateTimeText && onChangeDateTimeText({ date, time: text });
          setTime(text);
        }}
      />
    </View>
  );
}

function TextInputWrapper(props: InputPropsType) {
  return <TextInput {...props} style={[styles.defaultInput, props.style]} />;
}

function LocationInput(props: InputPropsType) {
  return <TextInput {...props} style={[styles.defaultInput, props.style]} />;
}

function Button(props: ButtonProps) {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={[styles.button, props.style || {}]}>
        <TemplateText familyType="power" style={props.textStyle || {}}>
          {props.text}
        </TemplateText>
      </View>
    </TouchableOpacity>
  );
}

function InputRow({
  label,
  labelFont,
  labelStyle,
  inputWrapStyle,
  type,
  inputProps,
  buttonProps,
  containerStyle,
}: PropsType) {
  return (
    <View style={[styles.container, containerStyle || {}]}>
      <View>
        <TemplateText
          familyType={labelFont || 'power'}
          style={labelStyle || {}}>
          {label}
        </TemplateText>
      </View>
      <View style={[styles.inputWrap, inputWrapStyle || {}]}>
        <Input type={type} inputProps={inputProps} />
        {buttonProps && <Button {...buttonProps} />}
      </View>
    </View>
  );
}

export default InputRow;
