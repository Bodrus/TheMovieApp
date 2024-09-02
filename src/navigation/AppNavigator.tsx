import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from './types';

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
          <RootStack.Screen name="Authorized" component={AuthorizedNavigator} />
        ) : (
          <RootStack.Screen
            name="Unauthorized"
            component={UnauthorizedNavigator}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
