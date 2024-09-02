export const fetchFromLastFM = async <T>(url: string): Promise<T> => {
  const response: Response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch from LastFM: ${response.status} ${response.statusText}`,
    );
  }
  return await response.json();
};
