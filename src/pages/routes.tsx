import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './Home';
import Intro from './Intro';
import SignInfoStep from './SignUp/SignInfoStep';
import AccountInfoStep from './SignUp/AccountInfoStep';
import WriteCapsule from './WriteCapsule';
import FindPassword from './FindPassword';

export type RootStackParamList = {
  Home: undefined;
  Intro: undefined;
  FindPassword: undefined;
  WriteCapsule: { type: string };
  'SignUp/SignInfoStep': undefined;
  'SignUp/AccountInfoStep': undefined;
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
        <Stack.Screen
          name="SignUp/AccountInfoStep"
          component={AccountInfoStep}
        />
        <Stack.Screen name="SignUp/SignInfoStep" component={SignInfoStep} />
        <Stack.Screen name="FindPassword" component={FindPassword} />
        <Stack.Screen name="WriteCapsule" component={WriteCapsule} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
