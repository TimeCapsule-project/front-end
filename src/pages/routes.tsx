import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootSiblingParent } from 'react-native-root-siblings';

import Home from './Home';
import Intro from './Intro';
import Setting from './Setting';
import FindPassword from './FindPassword';
import SignInfoStep from './SignUp/SignInfoStep';
import ChangeNickname from './Setting/ChangeNickname';
import AccountInfoStep, { AccountInfoData } from './SignUp/AccountInfoStep';
import WriteCapsulePreview, { PreviewFrom } from './WriteCapsule/preview';
import WriteCapsule from './WriteCapsule';
import SearchNickname from './SearchNickname';
import LocationCapsule from './LocationCapsule';

import { CapsuleType, LatLngDefaultData } from 'states/types';

export type RootStackParamList = {
  Home: undefined;
  Intro: undefined;
  Setting: undefined;
  FindPassword: undefined;
  LocationCapsule: { latlng?: LatLngDefaultData };
  SearchNickname: {
    type: 'search' | 'select';
    personInfo?: { source: any; id: number; name: string };
  };
  WriteCapsule: { type: CapsuleType };
  WriteCapsulePreview: { type: PreviewFrom; id?: number };
  'SignUp/SignInfoStep': AccountInfoData;
  'SignUp/AccountInfoStep': undefined;
  'Setting/ChangeNickname': undefined;
  'Setting/ChangePassword': undefined;
};

export default function Routes() {
  const Stack = createNativeStackNavigator();
  const screenOptions = {
    headerShown: false,
  };

  const linking = {
    prefixes: ['timecapsuleapp://'],
    config: {
      screens: {
        Intro: 'Intro',
      },
    },
  };

  return (
    <RootSiblingParent>
      <NavigationContainer linking={linking}>
        <Stack.Navigator initialRouteName="Intro" screenOptions={screenOptions}>
          <Stack.Screen name="Intro" component={Intro} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen name="FindPassword" component={FindPassword} />
          <Stack.Screen name="WriteCapsule" component={WriteCapsule} />
          <Stack.Screen name="LocationCapsule" component={LocationCapsule} />
          <Stack.Screen name="SearchNickname" component={SearchNickname} />
          <Stack.Screen name="SignUp/SignInfoStep" component={SignInfoStep} />
          <Stack.Screen
            name="SignUp/AccountInfoStep"
            component={AccountInfoStep}
          />
          <Stack.Screen
            name="WriteCapsulePreview"
            component={WriteCapsulePreview}
          />
          <Stack.Screen
            name="Setting/ChangeNickname"
            component={ChangeNickname}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
}
