import { API_KEY, LASTFM_API_URL } from '@env';
import {
  ArtistInfo,
  GetAlbumInfoResponse,
  TopAlbumsResponse,
  TopArtistsResponse,
} from '../types.ts';

export const getTopArtists = async (): Promise<TopArtistsResponse> => {
  const response = await fetch(
    `${LASTFM_API_URL}?method=chart.getTopArtists&api_key=${API_KEY}&format=json`,
  );

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return await response.json();
};

export const getTopAlbums = async (
  artist: string,
  page: number,
): Promise<TopAlbumsResponse> => {
  try {
    const response = await fetch(
      `${LASTFM_API_URL}?method=artist.getTopAlbums&artist=${encodeURIComponent(
        artist,
      )}&api_key=${API_KEY}&page=${page}&autocorrect=1&format=json`,
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const getAlbumInfo = async (
  artist: string,
  album: string,
): Promise<GetAlbumInfoResponse> => {
  try {
    const response = await fetch(
      `${LASTFM_API_URL}?method=album.getinfo&api_key=${API_KEY}&artist=${artist}&album=${album}&format=json`,
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

export const getArtistInfo = async (artist: string): Promise<ArtistInfo> => {
  try {
    const response = await fetch(
      `${LASTFM_API_URL}?method=artist.getinfo&artist=${artist}&api_key=${API_KEY}&format=json`,
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};
