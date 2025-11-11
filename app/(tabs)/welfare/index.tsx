import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';



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
      <ScrollView style={styles.content}>
        <TouchableOpacity onPress={() => router.push('/(tabs)/welfare/quotes')}>
          <View
         
            style={[styles.quoteCard,{backgroundColor: colors.primary}]}
          >
            {quote ? (
              <>
                <Text style={styles.quoteText}>&quot;{quote.q}&quot;</Text>
                <Text style={styles.quoteAuthor}>- {quote.a}</Text>
              </>
            ) : (
              <Text style={styles.quoteText}>Loading...</Text>
            )}
          </View>
        </TouchableOpacity>

        <View style={styles.counselorSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <TouchableOpacity onPress={() => router.push('/(tabs)/welfare/screens/counselors?type=Peer')}>
              <ImageBackground 
                source={require('@/assets/images/studentCounsel.jpg')} 
                style={styles.counselorCard}
                imageStyle={{ borderRadius: 15 }}
              >
                <View style={styles.cardOverlay} />
                <Text style={styles.counselorCardTitle}>Student Peer Counselor</Text>
              </ImageBackground>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/(tabs)/welfare/screens/counselors?type=Departmental')}>
              <ImageBackground 
                source={require('@/assets/images/counselor.jpg')} 
                style={styles.counselorCard}
                imageStyle={{ borderRadius: 15 }}
              >
                <View style={styles.cardOverlay} />
                <Text style={styles.counselorCardTitle}>Professional Counselor</Text>
              </ImageBackground>
            </TouchableOpacity>
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.reportButton} onPress={() => router.push('/(tabs)/welfare/screens/concern')}>
          <Text style={styles.reportButtonText}>Report a Concern</Text>
        </TouchableOpacity>

        <View style={styles.mentalHealthSection}>
          <Text type="subtitle" style={styles.mentalHealthTitle}>Your Mental Health Matters</Text>
          <Text style={styles.mentalHealthText}>
            Taking care of your mental health is just as important as taking care of your physical health. It&apos;s okay to not be okay, and it&apos;s okay to ask for help. Our counselors are here to support you through any challenges you may be facing.
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
    width: 300,
    height: 200,
    marginHorizontal: 10,
    borderRadius: 15,
    justifyContent: 'flex-end',
    padding: 15,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 15,
  },
  counselorCardTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  reportButton: {
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 10,
    margin: 20,
    alignItems: 'center',
  },
  reportButtonText: {
    color: 'white',
    fontSize: 18,
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
