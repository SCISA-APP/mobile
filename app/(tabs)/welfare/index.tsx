import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import React from 'react';
import QuoteCard from '@/components/cards/QouteCard';
import WelfareCardGrid from '@/components/cards/WelfareCardGrid';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRandomQuote } from '@/hooks/useRandomQuote';

const WelfareScreen = () => {
  const router = useRouter();
  const quote = useRandomQuote();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>

        {/* Quote Section */}
        <QuoteCard
          quote={quote}
          onPress={() => router.push('/(standalone)/(welfare)/quotes')}
        />

        {/* NEW: Card Grid Section */}
        <WelfareCardGrid />

        {/* Mental Health Message */}
        <View style={styles.mentalHealthSection}>
          <Text style={styles.mentalHealthTitle}>Your Mental Health Matters</Text>
          <Text style={styles.mentalHealthText}>
            Taking care of your mental health is just as important as taking
            care of your physical health. It&apos;s okay to not be okay, and it&apos;s okay
            to ask for help. Our counselors are here to support you through any
            challenges you may be facing.
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

  mentalHealthSection: {
    padding: 20,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  mentalHealthTitle: {
    textAlign: 'center',
    marginBottom: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  mentalHealthText: {
    textAlign: 'center',
    lineHeight: 22,
  },
});
