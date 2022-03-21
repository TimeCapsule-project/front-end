import { StyleSheet } from 'react-native';
import { orange } from './colors';
import { mixinStyles } from './mixin';

export const defaultStyles = StyleSheet.create({
  contentWrap: {
    backgroundColor: orange,
  },
  button: {
    ...mixinStyles.flexCenter,
    width: '100%',
    height: 50,
    borderRadius: 25,
    backgroundColor: '#333',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
});
