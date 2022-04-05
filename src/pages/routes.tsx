import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Home';
import Intro from './Intro';
import SignInfoStep from './SignUp/SignInfoStep';
import AccountInfoStep from './SignUp/AccountInfoStep';

export type RootStackParamList = {
  Home: undefined;
  Intro: undefined;
  SignInfoStep: undefined;
  AccountInfoStep: undefined;
};

export default function Routes() {
  const Stack = createNativeStackNavigator();
  const screenOptions = {
    headerShown: false,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro" screenOptions={screenOptions}>
        <Stack.Screen name="Intro" component={Intro} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignUp/SignInfoStep" component={SignInfoStep} />
        <Stack.Screen
          name="SignUp/AccountInfoStep"
          component={AccountInfoStep}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
