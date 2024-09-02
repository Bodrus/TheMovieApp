import React from 'react';
import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import { AuthorizedStackParamList, Routes } from '../../navigation/types.ts';
import styles from './style.tsx';
import { useArtistInfo } from '../../hooks/useLastFM.ts';
import { showMessage } from 'react-native-flash-message';

type AlbumDetailScreenProps = {
  route: RouteProp<AuthorizedStackParamList, Routes.AlbumDetails>;
};

const AlbumDetailScreen: React.FC<AlbumDetailScreenProps> = ({ route }) => {
  const { data, artist } = route.params;
  const { data: artistInfo, isLoading, error } = useArtistInfo(artist);

  if (error) {
    showMessage({ message: 'error load errorArtist', type: 'danger' });
  }

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
      {isLoading && <ActivityIndicator size="large" />}
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
