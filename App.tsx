import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import { globalStyles } from './src/assets/styles/global';
import Routes from './src/pages/routes';

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Routes />
    </SafeAreaView>
  );
}

export default App;
