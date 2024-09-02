import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  ListRenderItem,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { AuthorizedStackParamList, Routes } from '../../navigation/types.ts';
import { getTopArtists, getTopAlbums } from '../../api/lastfm.ts';
import { Album, Artist } from '../../types.ts';
import styles from './style.tsx';

const AlbumsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<AuthorizedStackParamList>>();

  const [artists, setArtists] = useState<Artist[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loadingArtists, setLoadingArtists] = useState(true);
  const [loadingAlbums, setLoadingAlbums] = useState(false);
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [loadingMore, setLoadingMore] = useState(false); // Состояние загрузки следующей страницы
  const [page, setPage] = useState(1); // Текущая страница

  const fetchAlbums = async (pageNumber: number = 1) => {
    if (selectedArtist) {
      if (pageNumber === 1) {
        setLoadingAlbums(true);
        setAlbums([]); // Очищаем альбомы при смене исполнителя
      } else {
        setLoadingMore(true);
      }
      try {
        const data = await getTopAlbums(
          selectedArtist.toLowerCase(),
          pageNumber,
        );
        setAlbums(prevAlbums => [...prevAlbums, ...data.topalbums.album]);
        setLoadingAlbums(false);
        setLoadingMore(false);
      } catch (err) {
        setError('Failed to fetch top albums');
        setLoadingAlbums(false);
        setLoadingMore(false);
      }
    }
  };

  const handleLoadMore = () => {
    if (!loadingMore) {
      setPage(prevPage => prevPage + 1);
      fetchAlbums(page + 1);
    }
  };

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const data = await getTopArtists();
        setArtists(data.artists.artist);
        setLoadingArtists(false);
      } catch (err) {
        setError('Failed to fetch top artists');
        setLoadingArtists(false);
      }
    };

    fetchArtists();
  }, []);

  useEffect(() => {
    fetchAlbums();
  }, [selectedArtist]);

  const renderArtistItem: ListRenderItem<Artist> = ({ item }) => (
    <TouchableOpacity
      onPress={() => setSelectedArtist(item.name)}
      style={[
        styles.artistItem,
        selectedArtist === item.name && styles.selectedArtistItem,
      ]}>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderAlbumItem: ListRenderItem<Album> = ({ item }) => {
    const imageUrl = item.image[2]['#text'];
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate(Routes.AlbumSongs, {
            album: item.name,
            artist: item.artist.name,
          })
        }>
        <View style={styles.albumItem}>
          {imageUrl ? (
            <Image source={{ uri: imageUrl }} style={styles.albumImage} />
          ) : (
            <View style={styles.noImageContainer}>
              <Text>No Image Available</Text>
            </View>
          )}
          <Text style={styles.albumName}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {loadingArtists ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={artists}
          horizontal
          keyExtractor={item => item.name}
          renderItem={renderArtistItem}
          showsHorizontalScrollIndicator={false}
        />
      )}

      {loadingAlbums ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={albums}
          keyExtractor={item => item.name}
          renderItem={renderAlbumItem}
          contentContainerStyle={styles.albumListContainer}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5} // Процент видимой области списка перед вызовом onEndReached
          ListFooterComponent={
            loadingMore ? <ActivityIndicator size="small" /> : null
          }
        />
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default AlbumsScreen;
