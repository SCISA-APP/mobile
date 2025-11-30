import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomButton from '../buttons/CustomButton';

interface SearchEmptyStateProps {
  message?: string;
  imageSource?: any;
  buttonText?: string;
  onPress?: () => void;
  buttonIcon?: React.ReactNode; 
}

const SearchEmptyState: React.FC<SearchEmptyStateProps> = ({
  message = 'Search for a product...',
  imageSource,
  buttonText,
  onPress,
  buttonIcon,
}) => {
  return (
    <View style={styles.container}>
      {imageSource && (
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      )}

      <Text style={styles.text}>{message}</Text>

      {buttonText && onPress && (
        <View style={styles.buttonContainer}>
          <CustomButton
            label={buttonText}
            onPress={onPress}
            leftIcon={buttonIcon}
          />
        </View>
      )}
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
    paddingHorizontal: 20,
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
  buttonContainer: {
    marginTop: 20,
    width: '70%',
  },
});
