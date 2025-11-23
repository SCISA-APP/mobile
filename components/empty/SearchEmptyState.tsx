import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface SearchEmptyStateProps {
  message?: string;
  imageSource?: any; // pass the gif/image
}

const SearchEmptyState: React.FC<SearchEmptyStateProps> = ({
  message = 'Search for a product...',
  imageSource,
}) => {
  return (
    <View style={styles.container}>
      {imageSource && (
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      )}
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

export default SearchEmptyState;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
     paddingBottom: 130,
  },
  text: {
    fontSize: 16,
    color: '#888',
    marginTop: 16,
    textAlign: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
});
