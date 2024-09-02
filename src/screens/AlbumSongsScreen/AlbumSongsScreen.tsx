import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Button,
  ActivityIndicator,
} from 'react-native';
import { AuthorizedStackParamList, Routes } from '../../navigation/types.ts';
import { Track, Wiki } from '../../types.ts';
import styles from './style.ts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAlbumInfo } from '../../hooks/useLastFM.ts';
import { showMessage } from 'react-native-flash-message';

const AlbumSongsScreen = ({
  navigation,
  route,
}: NativeStackScreenProps<AuthorizedStackParamList, Routes.AlbumSongs>) => {
  const { album, artist } = route.params;

  const { data: albumInfo, isLoading, error } = useAlbumInfo(artist, album);

  if (error) {
    showMessage({ message: 'error load list of songs', type: 'danger' });
  }

  const handlePress = (data: Wiki) => () =>
    navigation.navigate(Routes.AlbumDetails, { data, artist });

  return (
    <>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView style={styles.container}>
          <Image
            source={{ uri: albumInfo?.album?.image[3]['#text'] }}
            style={styles.albumImage}
          />
          {albumInfo?.album.wiki && (
            <Button
              title="Go to details"
              onPress={handlePress(albumInfo.album.wiki)}
            />
          )}
          {albumInfo?.album.tracks.track.map((item: Track) => (
            <View style={styles.trackItem} key={item.name}>
              <Text>{item.name}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </>
  );
};

export default AlbumSongsScreen;
