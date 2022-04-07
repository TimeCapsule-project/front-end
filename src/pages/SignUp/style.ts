import { StyleSheet } from 'react-native';
import { yellow } from '../../assets/styles/colors';
import { mixinStyles } from '../../assets/styles/mixin';

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
  },
  inputLabel: {
    fontFamily: 'GangwonEduAllPower',
  },
  inputButton: {
    fontFamily: 'GangwonEduAllPower',
  },
  signUpButton: {
    ...mixinStyles.flexCenter,
    width: '100%',
    height: 45,
    marginTop: 68,
    color: '#271616',
    backgroundColor: yellow,
  },
});

export default styles;
