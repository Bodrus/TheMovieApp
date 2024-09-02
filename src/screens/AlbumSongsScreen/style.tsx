import { StyleSheet } from 'react-native';

export default StyleSheet.create({
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
