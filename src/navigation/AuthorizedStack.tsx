// navigation/AuthorizedStack.tsx
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AlbumsScreen from '../screens/AlbumsScreen';
import AlbumSongsScreen from '../screens/AlbumSongsScreen';
import { AuthorizedStackParamList } from './types.ts';
import AlbumDetailScreen from '../screens/AlbumDetailScreen';

const AuthorizedStack = createNativeStackNavigator<AuthorizedStackParamList>();

const AuthorizedNavigator = () => (
  <AuthorizedStack.Navigator>
    <AuthorizedStack.Screen name="Albums" component={AlbumsScreen} />
    <AuthorizedStack.Screen
      name="AlbumSongs"
      component={AlbumSongsScreen}
      options={({ route }) => ({ title: route.params.album })}
    />
    <AuthorizedStack.Screen name="AlbumDetails" component={AlbumDetailScreen} />
  </AuthorizedStack.Navigator>
);

export default AuthorizedNavigator;
