
import { ThemedText } from '@/components/themed-text';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';

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

  useEffect(() => {
    fetch('https://zenquotes.io/api/quotes')
      .then(response => response.json())
      .then(data => {
        setQuotes(data.map(q => ({ ...q, gradient: gradients[Math.floor(Math.random() * gradients.length)] })));
      })
      .catch(error => {
        console.error('Error fetching quotes:', error);
      });
  }, []);

  const renderQuote = ({ item }) => (
    <TouchableOpacity onPress={() => {}}>
      <LinearGradient
        colors={item.gradient}
        style={styles.quoteCard}
      >
        <ThemedText style={styles.quoteText}>"{item.q}"</ThemedText>
        <ThemedText style={styles.quoteAuthor}>- {item.a}</ThemedText>
      </LinearGradient>
    </TouchableOpacity>
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
});
