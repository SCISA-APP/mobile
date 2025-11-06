

import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const WelfareScreen = () => {
  const router = useRouter();
  const [quote, setQuote] = useState<{ q: string; a: string } | null>(null);

  useEffect(() => {
    fetch('https://zenquotes.io/api/random')
      .then(response => response.json())
      .then(data => {
        setQuote(data[0]);
      })
      .catch(error => {
        console.error('Error fetching quote:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <View  style={[styles.header,{backgroundColor: colors.primary}]}>
        <Text type="title" style={styles.headerText}>Welfare Hub</Text>
      </View>

      <ScrollView style={styles.content}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/welfare/quotes')}>
          <View
         
            style={[styles.quoteCard,{backgroundColor: colors.primary}]}
          >
            {quote ? (
              <>
                <Text style={styles.quoteText}>"{quote.q}"</Text>
                <Text style={styles.quoteAuthor}>- {quote.a}</Text>
              </>
            ) : (
              <Text style={styles.quoteText}>Loading...</Text>
            )}
          </View>
        </TouchableOpacity>

        <View style={styles.counselorSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => router.push('/(tabs)/welfare/screens/counselors')}>
              <View style={styles.counselorCard}>
                <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.counselorImage} />
                <Text style={styles.counselorCardTitle}>Student Peer Counselor</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/(tabs)/welfare/screens/counselors')}>
              <View style={styles.counselorCard}>
                <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.counselorImage} />
                <Text style={styles.counselorCardTitle}>Professional Counselor</Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <View style={styles.mentalHealthSection}>
          <Text type="subtitle" style={styles.mentalHealthTitle}>Your Mental Health Matters</Text>
          <Text style={styles.mentalHealthText}>
            Taking care of your mental health is just as important as taking care of your physical health. It's okay to not be okay, and it's okay to ask for help. Our counselors are here to support you through any challenges you may be facing.
          </Text>
        </View>
      </ScrollView>
   </View>
  );
};

export default WelfareScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  headerText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  quoteCard: {
    margin: 20,
    padding: 30,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quoteText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  quoteAuthor: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  counselorSection: {
    marginVertical: 20,
  },
  counselorCard: {
    width: 200,
    marginHorizontal: 10,
    borderRadius: 15,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  counselorImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  counselorCardTitle: {
    padding: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  mentalHealthSection: {
    padding: 20,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  mentalHealthTitle: {
    textAlign: 'center',
    marginBottom: 15,
  },
  mentalHealthText: {
    textAlign: 'center',
    lineHeight: 22,
  },
});
