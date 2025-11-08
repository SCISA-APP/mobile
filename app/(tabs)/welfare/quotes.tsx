import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as MediaLibrary from 'expo-media-library';
import { useRouter } from 'expo-router';
import React, { createRef, useEffect, useState } from 'react';
import { Dimensions, FlatList, Share, StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import ViewShot from 'react-native-view-shot';

const { height } = Dimensions.get('window');

const gradients = [
  ['#FF6B35', '#FF9B5C'],
  ['#0072ff', '#00c6ff'],
  ['#2193b0', '#6dd5ed'],
  ['#0052d4', '#4364f7', '#6fb1fc'],
  ['#1c92d2', '#f2fcfe'],
];

const QuotesScreen = () => {
  const router = useRouter();
  const [quotes, setQuotes] = useState([]);
  const viewShotRefs = React.useRef([]);

  useEffect(() => {
    fetch('https://zenquotes.io/api/quotes')
      .then(response => response.json())
      .then(data => {
        setQuotes(data.map(q => ({ ...q, gradient: gradients[Math.floor(Math.random() * gradients.length)] })));
        viewShotRefs.current = data.map(() => createRef());
      })
      .catch(error => {
        console.error('Error fetching quotes:', error);
      });
  }, []);

  const captureAndShare = async (index) => {
    try {
      const uri = await viewShotRefs.current[index].current.capture();
      await Share.share({ url: uri });
    } catch (error) {
      console.error('Error sharing quote:', error);
      Alert.alert('Error', 'Could not share quote.');
    }
  };

  const captureAndSave = async (index) => {
    try {
      const uri = await viewShotRefs.current[index].current.capture();
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        await MediaLibrary.saveToLibraryAsync(uri);
        Alert.alert('Success', 'Quote saved to gallery!');
      } else {
        Alert.alert('Permission Denied', 'Please grant permission to save images to your gallery.');
      }
    } catch (error) {
      console.error('Error saving quote:', error);
      Alert.alert('Error', 'Could not save quote.');
    }
  };

  const renderQuote = ({ item, index }) => (
    <ViewShot ref={viewShotRefs.current[index]} options={{ format: 'jpg', quality: 0.9 }}>
      <LinearGradient
        colors={item.gradient}
        style={styles.quoteCard}
      >
        <ThemedText style={styles.quoteText}>&quot;{item.q}&quot;</ThemedText>
        <ThemedText style={styles.quoteAuthor}>- {item.a}</ThemedText>
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => captureAndShare(index)} style={styles.icon}>
            <Ionicons name="share-social-outline" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => captureAndSave(index)} style={styles.icon}>
            <Ionicons name="download-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ViewShot>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <FlatList
        data={quotes}
        renderItem={renderQuote}
        keyExtractor={(item) => item.q}
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToInterval={height}
        showsVerticalScrollIndicator={false}
        pagingEnabled
      />
    </View>
  );
};

export default QuotesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  quoteCard: {
    height: height,
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
  iconContainer: {
    position: 'absolute',
    bottom: 120,
    right: 20,
    flexDirection: 'column',
  },
  icon: {
    marginVertical: 10,
  },
});