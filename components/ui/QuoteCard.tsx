import React, { useRef } from 'react';
import { View, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import ViewShot from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

const { height } = Dimensions.get('window');

const QuoteCard = ({ item }) => {
  const viewShotRef = useRef(null);

  const saveQuote = async () => {
    try {
      const uri = await viewShotRef.current.capture();
      await MediaLibrary.saveToLibraryAsync(uri);
      Alert.alert('Success', 'Quote saved to your gallery!');
    } catch (error) {
      console.error('Error saving quote:', error);
      Alert.alert('Error', 'Failed to save quote.');
    }
  };

  return (
    <View style={styles.quoteCardContainer}>
      <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}>
        <LinearGradient colors={item.gradient} style={styles.quoteCard}>
          <ThemedText style={styles.quoteText}>&quot;{item.q}&quot;</ThemedText>
          <ThemedText style={styles.quoteAuthor}>- {item.a}</ThemedText>
          <ThemedText style={styles.watermark}>scisa_quotes</ThemedText>
        </LinearGradient>
      </ViewShot>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => Alert.alert('Favorited!')} style={styles.iconButton}>
          <Ionicons name="heart-outline" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={saveQuote} style={styles.iconButton}>
          <Ionicons name="download-outline" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  quoteCardContainer: {
    height: height,
    width: '100%',
  },
  quoteCard: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  quoteText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  quoteAuthor: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  watermark: {
    position: 'absolute',
    bottom: 20,
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    alignItems: 'center',
  },
  iconButton: {
    marginBottom: 20,
  },
});

export default QuoteCard;