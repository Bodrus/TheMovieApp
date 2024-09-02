import { useInfiniteQuery, useQuery } from '../domain/queryClient.ts';
import {
  getAlbumInfo,
  getArtistInfo,
  getTopAlbums,
  getTopArtists,
} from '../api/lastfm.ts';

export const useTopArtists = () => {
  return useQuery({
    queryKey: ['topArtists'],
    queryFn: getTopArtists,
  });
};

export const useTopAlbums = (artist?: string | null) => {
  return useInfiniteQuery({
    queryKey: ['topAlbums', artist],
    queryFn: ({ pageParam = 1 }) =>
      artist
        ? getTopAlbums(artist, pageParam)
        : Promise.reject('No artist provided'),
    initialPageParam: 1,
    getNextPageParam: lastPage => {
      const currentPage = Number(lastPage.topalbums['@attr'].page);
      const totalPages = Number(lastPage.topalbums['@attr'].totalPages);
      return currentPage < totalPages ? currentPage + 1 : undefined;
    },
    enabled: !!artist,
  });
};

export const useArtistInfo = (artist: string) => {
  return useQuery({
    queryKey: ['artistInfo', artist],
    queryFn: () => getArtistInfo(artist),
    enabled: !!artist,
  });
};

export const useAlbumInfo = (artist: string, album: string) => {
  return useQuery({
    queryKey: ['artistInfo', artist, album],
    queryFn: () => getAlbumInfo(artist, album),
    enabled: !!artist && !!album,
  });
};
