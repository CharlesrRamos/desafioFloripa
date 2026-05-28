/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import {
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { colors } from './src/theme';


function App() {

  return (
    <SafeAreaProvider>
      <NavigationContainer>
      <StatusBar barStyle= "light-content" backgroundColor={colors.background} />
      <RootNavigator />
      </NavigationContainer>
    
    </SafeAreaProvider>
  );
}


export default App;
