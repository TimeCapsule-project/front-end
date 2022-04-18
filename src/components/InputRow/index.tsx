import React, { useState } from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  Switch,
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
  type: string;
  label: string;
  inputProps: InputProps['inputProps'];
  buttonProps?: ButtonProps;
  labelFont?: FontFamily;
  labelStyle?: StyleProp<TextStyle>;
  inputWrapStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  switchInfo?: {
    label: string;
    value: boolean;
    onSwitch: (active: boolean) => void;
  };
  iconComponentFunc?: () => JSX.Element;
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
  iconComponentFunc,
  switchInfo,
}: PropsType) {
  const Icon = iconComponentFunc;
  return (
    <View style={[styles.container, containerStyle || {}]}>
      <View>
        <TemplateText
          familyType={labelFont || 'power'}
          style={labelStyle || {}}>
          {label}
        </TemplateText>
      </View>
      {switchInfo && (
        <View style={styles.switchWrap}>
          <TemplateText familyType="bold" style={styles.switchLabel}>
            {switchInfo.label}
          </TemplateText>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={switchInfo.value ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={switchInfo.onSwitch}
            value={switchInfo.value}
          />
        </View>
      )}
      <View style={[styles.inputWrap, inputWrapStyle || {}]}>
        {Icon && (
          <View style={styles.icon}>
            <Icon />
          </View>
        )}
        <Input type={type} inputProps={inputProps} />
        {buttonProps && <Button {...buttonProps} />}
      </View>
    </View>
  );
}

export default InputRow;
