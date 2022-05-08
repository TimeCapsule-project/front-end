import React, { useEffect, useMemo } from 'react';
import { SafeAreaView } from 'react-native';
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import SplashScreen from 'react-native-splash-screen';

import { globalStyles } from './src/assets/styles/global';
import Routes from './src/pages/routes';

function App() {
  const queryClient = useMemo(() => new QueryClient(), []);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView style={globalStyles.container}>
        <RecoilRoot>
          <Routes />
        </RecoilRoot>
      </SafeAreaView>
    </QueryClientProvider>
  );
}

export default App;
