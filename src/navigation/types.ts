import { Wiki } from '../types.ts';

export type UnauthorizedStackParamList = {
  Login: undefined;
};

export type AuthorizedStackParamList = {
  Albums: undefined;
  AlbumSongs: { album: string; artist: string };
  AlbumDetails: { data: Wiki };
};

export type RootStackParamList = {
  Unauthorized: undefined;
  Authorized: undefined;
};
