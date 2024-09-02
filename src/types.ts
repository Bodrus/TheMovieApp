// types/lastfm.ts

export interface Image {
  '#text': string;
  size: 'small' | 'medium' | 'large' | 'extralarge' | 'mega';
}

export interface Artist {
  name: string;
  listeners: string;
  mbid: string;
  url: string;
  streamable: string;
  image: Image[];
}

export interface TopArtistsResponse {
  artists: {
    artist: Artist[];
  };
}

export interface Album {
  name: string;
  playcount: string;
  mbid: string;
  url: string;
  artist: {
    name: string;
    mbid: string;
    url: string;
  };
  image: Image[];
}

export interface TopAlbumsResponse {
  topalbums: {
    album: Album[];
    '@attr': {
      page: string;
      perPage: string;
      totalPages: string;
      total: string;
    };
  };
}

export interface Tag {
  name: string;
  url: string;
}

export interface Track {
  name: string;
  duration: number;
  mbid?: string;
  url: string;
  streamable: {
    fulltrack: string;
    '#text': string;
  };
  artist: Artist;
  rank: number;
}

export interface Wiki {
  published: string;
  summary: string;
  content: string;
}

export interface AlbumInfo {
  name: string;
  artist: string;
  mbid: string;
  url: string;
  image: Image[];
  listeners: string;
  playcount: string;
  tracks: {
    track: Track[];
  };
  wiki?: Wiki;
}

export interface GetAlbumInfoResponse {
  album: AlbumInfo;
}
