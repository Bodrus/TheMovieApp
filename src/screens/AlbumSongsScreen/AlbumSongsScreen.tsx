// screens/AlbumSongsScreen.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
} from 'react-native';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import { AuthorizedStackParamList } from '../../navigation/types.ts';
import { getAlbumInfo } from '../../api/lastfm.ts';
import { AlbumInfo, Track, Wiki } from '../../types.ts';

type AlbumSongsScreenProps = {
  route: RouteProp<AuthorizedStackParamList, 'AlbumSongs'>;
};

const AlbumSongsScreen: React.FC<AlbumSongsScreenProps> = ({ route }) => {
  const navigation = useNavigation<NavigationProp<AuthorizedStackParamList>>();

  const { album, artist } = route.params;
  const [albumInfo, setAlbumInfo] = useState<AlbumInfo>();

  const fetchAlbumDetail = async (album: string, artist: string) => {
    try {
      const data = await getAlbumInfo(artist, album);
      setAlbumInfo(data.album);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchAlbumDetail(album, artist);
  }, [album, artist]);

  const handlePress = (data: Wiki) => () =>
    navigation.navigate('AlbumDetails', { data });

  return (
    <ScrollView style={styles.container}>
      <Image
        source={{ uri: albumInfo?.image[3]['#text'] }}
        style={styles.albumImage}
      />
      {albumInfo?.wiki && (
        <Button title="Go to details" onPress={handlePress(albumInfo.wiki)} />
      )}
      {albumInfo?.tracks.track.map((item: Track) => (
        <View style={styles.trackItem}>
          <Text>{item.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  albumImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginHorizontal: -10,
  },
  trackListContainer: {
    paddingTop: 10,
  },
  trackItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});

export default AlbumSongsScreen;
