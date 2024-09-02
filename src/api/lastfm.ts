import { API_KEY } from '@env';
import {
  ArtistInfo,
  GetAlbumInfoResponse,
  TopAlbumsResponse,
  TopArtistsResponse,
} from '../types.ts';
import { fetchFromLastFM } from '../utils/fetchFromLastFM.ts';

export const getTopArtists = async (): Promise<TopArtistsResponse> => {
  const endpoint = `?method=chart.getTopArtists&api_key=${API_KEY}&format=json`;
  return fetchFromLastFM<TopArtistsResponse>(endpoint);
};

export const getTopAlbums = async (
  artist: string,
  page: number,
): Promise<TopAlbumsResponse> => {
  const endpoint = `?method=artist.getTopAlbums&artist=${encodeURIComponent(
    artist,
  )}&api_key=${API_KEY}&page=${page}&autocorrect=1&format=json`;
  return fetchFromLastFM<TopAlbumsResponse>(endpoint);
};

export const getAlbumInfo = async (
  artist: string,
  album: string,
): Promise<GetAlbumInfoResponse> => {
  const endpoint = `?method=album.getinfo&api_key=${API_KEY}&artist=${artist}&album=${album}&format=json`;
  return fetchFromLastFM<GetAlbumInfoResponse>(endpoint);
};

export const getArtistInfo = async (artist: string): Promise<ArtistInfo> => {
  const endpoint = `?method=artist.getinfo&artist=${artist}&api_key=${API_KEY}&format=json`;
  return fetchFromLastFM<ArtistInfo>(endpoint);
};
