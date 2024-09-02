import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  artistItem: {
    padding: 10,
  },
  selectedArtistItem: {
    borderBottomWidth: 2,
    borderColor: 'blue',
  },
  albumItem: {
    flex: 1,
    margin: 10,
  },
  albumImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  noImageContainer: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  albumName: {
    textAlign: 'center',
    marginTop: 10,
  },
  albumListContainer: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
  },
});
