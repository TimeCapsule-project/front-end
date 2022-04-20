import React from 'react';
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
import DateTimePickerModal, {
  PickerMode,
  DateTimeType,
} from 'components/DateTimePickerModal';
import { styles } from './style';

type InputPropsType = TextInputProps &
  Partial<{
    onChangeDateTimeText(params: DateTimeType): void;
  }>;

interface InputProps {
  type: string;
  inputProps: InputPropsType;
  dateTimeOptions?: {
    disableType?: PickerMode;
    onChange: (data: Partial<DateTimeType>) => void;
  };
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
  dateTimeOptions?: InputProps['dateTimeOptions'];
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

function Input({ type, inputProps, dateTimeOptions }: InputProps) {
  switch (type) {
    case 'map':
      return <LocationInput {...inputProps} />;
    case 'dateTime':
      return <DateTimeInput {...inputProps} options={dateTimeOptions} />;
    case 'text':
    default:
      return <TextInputWrapper {...inputProps} />;
  }
}

function DateTimeInput(
  props: InputPropsType & { options: InputProps['dateTimeOptions'] },
) {
  return (
    <View style={styles.dateTimeWrap}>
      <DateTimePickerModal
        style={[styles.defaultInput, props.style]}
        onChange={
          props.options?.onChange ||
          ((data: Partial<DateTimeType>) => console.log(data))
        }
        disableType={props.options?.disableType}
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
  dateTimeOptions,
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
            trackColor={{ false: '#E2E2E2', true: '#6DDA47' }}
            thumbColor={'#ffffff'}
            ios_backgroundColor="#E2E2E2"
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
        <Input
          type={type}
          inputProps={inputProps}
          dateTimeOptions={dateTimeOptions}
        />
        {buttonProps && <Button {...buttonProps} />}
      </View>
    </View>
  );
}

export default InputRow;
