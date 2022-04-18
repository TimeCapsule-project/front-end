import { StyleSheet } from 'react-native';
import { mixinStyles } from 'assets/styles/mixin';
import { darkBlue, yellow } from 'assets/styles/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputWrap: {
    position: 'relative',
    flexDirection: 'row',
  },
  defaultInput: {
    backgroundColor: 'white',
  },
  icon: {
    position: 'absolute',
    left: 15,
    top: '25%',
    zIndex: 1,
  },
  switchWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#C2AD5C',
  },
  switchLabel: {
    color: darkBlue,
  },
  dateTimeWrap: { flexDirection: 'row' },
  dateTimeInput2: { marginLeft: 10 },
  button: {
    ...mixinStyles.flexCenter,
    height: '100%',
    borderRadius: 4,
  },
});

export const templateStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    width: '100%',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#bbbbbb',
    backgroundColor: '#E2E2E2',
    fontFamily: 'GangwonEduPower',
  },
  inputWrap: {
    height: 45,
  },
  inputLabelStyle: {
    color: darkBlue,
    marginBottom: 5,
  },
  inputButtonText: {
    color: '#FFFFFF',
  },
  button: {
    minWidth: 100,
    marginLeft: 5,
    backgroundColor: darkBlue,
  },
  signUpButton: {
    ...mixinStyles.flexCenter,
    borderRadius: 4,
    marginTop: 48,
    height: 45,
    width: '100%',
    backgroundColor: yellow,
  },
  signUpButtonText: {
    color: '#ffffff',
  },
});
