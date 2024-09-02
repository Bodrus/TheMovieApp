import React, { useState } from 'react';
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
import { Album, Artist } from '../../types.ts';
import styles from './style.tsx';
import { useTopAlbums, useTopArtists } from '../../hooks/useLastFM.ts';
import { showMessage } from 'react-native-flash-message';

const AlbumsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<AuthorizedStackParamList>>();

  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  const {
    data: artists,
    isLoading: loadingArtists,
    error: errorArtist,
  } = useTopArtists();
  const {
    data: albums,
    isLoading: loadingAlbums,
    fetchNextPage,
    error: errorAlbums,
  } = useTopAlbums(selectedArtist || 'Bon Jovi');

  const handleLoadMore = () => {
    fetchNextPage();
  };

  if (errorAlbums) {
    showMessage({ message: 'error load Albums', type: 'danger' });
  }

  if (errorArtist) {
    showMessage({ message: 'error load errorArtist', type: 'danger' });
  }

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
    const imageUrl = item.image[3]['#text'];

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
          data={artists?.artists.artist}
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
          data={albums?.pages.flatMap(page => page.topalbums.album)}
          keyExtractor={item => item.name}
          renderItem={renderAlbumItem}
          contentContainerStyle={styles.albumListContainer}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

export default AlbumsScreen;
