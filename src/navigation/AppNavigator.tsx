import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList, Routes } from './types';

import { useAuthStore } from '../stores/useAuthStore.ts';

import AuthorizedNavigator from './AuthorizedStack.tsx';
import UnauthorizedNavigator from './UnauthorizedStack.tsx';

const RootStack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <RootStack.Screen
            name={Routes.Authorized}
            component={AuthorizedNavigator}
          />
        ) : (
          <RootStack.Screen
            name={Routes.Unauthorized}
            component={UnauthorizedNavigator}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
