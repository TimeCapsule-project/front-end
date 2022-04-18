import { StyleSheet } from 'react-native';
import { mixinStyles } from 'assets/styles/mixin';
import { globalStyles } from 'assets/styles/global';
import { darkBlue, sandGray, yellow } from 'assets/styles/colors';

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  headerStyle: {
    backgroundColor: sandGray,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    letterSpacing: 2,
    fontSize: 18,
    color: 'black',
  },
  logo: {
    alignItems: 'center',
    marginBottom: 45,
  },
  ////////////////////////////////////////////////////////////////
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

export default styles;
