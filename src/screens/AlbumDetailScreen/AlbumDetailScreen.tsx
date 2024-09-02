import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';

import { AuthorizedStackParamList } from '../../navigation/types.ts';

type AlbumDetailScreenProps = {
  route: RouteProp<AuthorizedStackParamList, 'AlbumDetails'>;
};

const AlbumDetailScreen: React.FC<AlbumDetailScreenProps> = ({ route }) => {
  const { data } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wikiContainer}>
        <Text style={styles.wikiTitle}>About this Album</Text>
        <Text style={styles.wikiPublished}>{data.published}</Text>
        <Text style={styles.wikiSummary}>
          <Text style={styles.textBold}>Summary: </Text>
          {data.summary}
        </Text>
        <Text style={styles.wikiSummary}>
          <Text style={styles.textBold}>Content: </Text>
          {data.content}
        </Text>
      </View>
    </ScrollView>
  );
};

export default AlbumDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  wikiContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  wikiTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  wikiPublished: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  wikiSummary: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  textBold: {
    fontWeight: 'bold',
  },
});
