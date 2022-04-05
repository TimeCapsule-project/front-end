import { mixinStyles } from '../../assets/styles/mixin';
import { StyleSheet } from 'react-native';

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
    backgroundColor: '#E3BE39',
  },
});

export default styles;
