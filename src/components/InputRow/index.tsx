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
        style={[props.style, { marginLeft: 10 }]}
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
        <Text style={[styles.buttonText, props.textStyle || {}]}>
          {props.text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function InputRow({
  label,
  labelStyle,
  type,
  inputProps,
  buttonProps,
  containerStyle,
}: PropsType) {
  return (
    <View style={[styles.container, containerStyle || {}]}>
      <Text style={labelStyle || {}}>{label}</Text>
      <View style={styles.inputWrap}>
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
    flex: 1,
  },
  dateTimeWrap: { flexDirection: 'row' },
  dateTimeInput2: { marginLeft: 15 },
  button: {
    ...mixinStyles.flexCenter,
    width: 100,
    height: '100%',
    borderRadius: 4,
  },
  buttonText: {
    fontFamily: 'GangwonEduAllBold',
  },
});

export default InputRow;
