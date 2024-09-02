// navigation/UnauthorizedStack.tsx
import React from 'react';
import LoginScreen from '../screens/LoginScreen/LoginScreen.tsx';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UnauthorizedStackParamList } from './types.ts';

const UnauthorizedStack =
  createNativeStackNavigator<UnauthorizedStackParamList>();

const UnauthorizedNavigator = () => (
  <UnauthorizedStack.Navigator>
    <UnauthorizedStack.Screen name="Login" component={LoginScreen} />
  </UnauthorizedStack.Navigator>
);

export default UnauthorizedNavigator;
