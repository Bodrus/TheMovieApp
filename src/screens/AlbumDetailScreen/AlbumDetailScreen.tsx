import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import { AuthorizedStackParamList, Routes } from '../../navigation/types.ts';
import { getArtistInfo } from '../../api/lastfm.ts';
import { ArtistInfo } from '../../types.ts';
import styles from './style.tsx';

type AlbumDetailScreenProps = {
  route: RouteProp<AuthorizedStackParamList, Routes.AlbumDetails>;
};

const AlbumDetailScreen: React.FC<AlbumDetailScreenProps> = ({ route }) => {
  const { data, artist } = route.params;
  const [artistInfo, setArtistInfo] = useState<ArtistInfo>();

  const fetchArtistInfo = async (artist: string) => {
    try {
      const data = await getArtistInfo(artist);
      setArtistInfo(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchArtistInfo(artist);
  }, [artist]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wikiContainer}>
        <Text style={styles.wikiTitle}>About this Album</Text>
        <Text style={styles.wikiPublished}>{data.published}</Text>
        <Text style={styles.wikiSummary}>
          <Text style={styles.textBold}>Summary: </Text>
          {data.summary || ''}
        </Text>
        <Text style={styles.wikiSummary}>
          <Text style={styles.textBold}>Content: </Text>
          {data.content || ''}
        </Text>
      </View>
      {artistInfo && (
        <View style={styles.wikiContainer}>
          <Text style={styles.wikiTitle}>About this Artist</Text>
          <Text style={styles.wikiSummary}>
            <Text style={styles.textBold}>Summary: </Text>
            {artistInfo.artist.bio.summary || ''}
          </Text>
          <Text style={styles.wikiSummary}>
            <Text style={styles.textBold}>Content: </Text>
            {artistInfo.artist.bio.content || ''}
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

export default AlbumDetailScreen;
