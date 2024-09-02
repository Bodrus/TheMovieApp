import { API_KEY, LASTFM_API_URL } from '@env';

export const buildUrl = (
  method: string,
  params: Record<string, string | number>,
): string => {
  const queryParams = new URLSearchParams({
    method,
    api_key: API_KEY,
    format: 'json',
    ...params,
  });

  return `${LASTFM_API_URL}?${queryParams.toString()}`;
};
