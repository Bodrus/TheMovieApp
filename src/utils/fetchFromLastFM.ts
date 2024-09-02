import { LASTFM_API_URL } from '@env';

export const fetchFromLastFM = async <T>(endpoint: string): Promise<T> => {
  const response: Response = await fetch(`${LASTFM_API_URL}${endpoint}`);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch from LastFM: ${response.status} ${response.statusText}`,
    );
  }
  return response.json();
};
