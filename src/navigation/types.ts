import { Wiki } from '../types.ts';

export enum Routes {
  Login = 'Login',
  Albums = 'Albums',
  AlbumSongs = 'AlbumSongs',
  AlbumDetails = 'AlbumDetails',
  Unauthorized = 'Unauthorized',
  Authorized = 'Authorized',
}

export type UnauthorizedStackParamList = {
  [Routes.Login]: undefined;
};

export type AuthorizedStackParamList = {
  [Routes.Albums]: undefined;
  [Routes.AlbumSongs]: { album: string; artist: string };
  [Routes.AlbumDetails]: { data: Wiki; artist: string };
};

export type RootStackParamList = {
  [Routes.Unauthorized]: undefined;
  [Routes.Authorized]: undefined;
};
