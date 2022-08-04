import 'react-native-gesture-handler'
import React from "react";

import { NavigationContainer } from '@react-navigation/native';
import { StateProvider } from './src/context/StateContext';

import AuthStack from './src/stacks/AuthStack';



export default () => {
  return (
    <StateProvider>
      <NavigationContainer>
          <AuthStack />
      </NavigationContainer>
    </StateProvider>
  )
}