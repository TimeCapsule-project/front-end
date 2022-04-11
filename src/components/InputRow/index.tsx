import TemplateText from 'components/TemplateText';
import React, { useState } from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { mixinStyles } from '../../assets/styles/mixin';

type InputPropsType = TextInputProps &
  Partial<{
    onChangeDateTimeText(params: { date: string; time: string }): void;
  }>;

type InputProps = { type: string; inputProps: InputPropsType };

type ButtonProps = {
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  text: string;
  onPress(event: GestureResponderEvent): void;
};

type PropsType = {
  inputProps: InputProps['inputProps'];
  buttonProps?: ButtonProps;
  labelStyle?: StyleProp<TextStyle>;
  inputWrapStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  type: string;
  label: string;
};

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
        onChangeText={(text: string) => {
          const { onChangeDateTimeText } = props;
          onChangeDateTimeText && onChangeDateTimeText({ date: text, time });
          setDate(text);
        }}
      />
      <TextInput
        {...props}
        style={[props.style, styles.dateTimeInput2]}
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
  return <TextInput {...props} />;
}

function LocationInput(props: InputPropsType) {
  return <TextInput {...props} />;
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
        <TemplateText familyType="power" style={labelStyle || {}}>
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

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputWrap: {
    flexDirection: 'row',
  },
  dateTimeWrap: { flexDirection: 'row' },
  dateTimeInput2: { marginLeft: 10 },
  button: {
    ...mixinStyles.flexCenter,
    height: '100%',
    borderRadius: 4,
  },
});

export default InputRow;
