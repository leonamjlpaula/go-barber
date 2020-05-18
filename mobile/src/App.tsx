import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import AppProvider from './hooks';
import Routes from './routes';

const App: React.FC = () => (
  <NavigationContainer>
    <AppProvider>
      <StatusBar barStyle="light-content" backgroundColor="#312e38" />
      <Routes />
    </AppProvider>
  </NavigationContainer>
);

export default App;
