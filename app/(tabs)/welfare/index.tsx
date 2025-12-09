import colors from '@/constants/colors';
import { useRandomQuote } from '@/hooks/useRandomQuote';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const welfareItems = [
  {
    id: '1',
    title: 'Peer Counselors',
    subtitle: 'Talk to a fellow student',
    icon: 'people' as keyof typeof Ionicons.glyphMap,
    route: '/(tabs)/welfare/screens/counselors?type=Peer',
    color: colors.primary,
  },
  {
    id: '2',
    title: 'Professional Counselors',
    subtitle: 'Licensed mental health professionals',
    icon: 'medical' as keyof typeof Ionicons.glyphMap,
    route: '/(tabs)/welfare/screens/counselors?type=Departmental',
    color: '#10B981',
  },
  {
    id: '3',
    title: 'SCISA Bursary',
    subtitle: 'Financial assistance information',
    icon: 'wallet' as keyof typeof Ionicons.glyphMap,
    route: '/(tabs)/welfare/bursary',
    color: '#8B5CF6',
  },
  {
    id: '4',
    title: 'Report a Concern',
    subtitle: 'Share your concerns confidentially',
    icon: 'alert-circle' as keyof typeof Ionicons.glyphMap,
    route: '/(tabs)/welfare/screens/concern',
    color: colors.secondary,
  },
];

const WelfareScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const quote = useRandomQuote();

  return (
    <View style={styles.container}>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Inspirational Quote */}
        {quote && (
          <Animated.View entering={FadeInDown.duration(500)}>
            <TouchableOpacity
              style={styles.quoteCard}
              onPress={() => router.push('/(standalone)/(welfare)/quotes')}
              activeOpacity={0.8}
            >
              <Ionicons name="sparkles" size={24} color={colors.white} style={styles.quoteIcon} />
              <Text style={styles.quoteText}>&quot;{quote.q}&quot;</Text>
              <Text style={styles.quoteAuthor}>— {quote.a}</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        {/* Welfare Services */}
        {welfareItems.map((item, index) => (
          <Animated.View
            key={item.id}
            entering={FadeInDown.delay(index * 100 + 200).duration(500)}
          >
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(item.route as any)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon} size={24} color={colors.white} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          </Animated.View>
        ))}

        {/* Mental Health Message */}
        <Animated.View entering={FadeInDown.delay(600).duration(500)} style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <Ionicons name="heart" size={32} color={colors.secondary} />
          </View>
          <Text style={styles.infoTitle}>Your Mental Health Matters</Text>
          <Text style={styles.infoText}>
            Taking care of your mental health is just as important as your physical health. 
            It&apos;s okay to not be okay, and it&apos;s okay to ask for help. Our counselors 
            are here to support you.
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

export default WelfareScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 15,
    color: colors.text.secondary,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  quoteCard: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  quoteIcon: {
    marginBottom: 12,
  },
  quoteText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.white,
    lineHeight: 26,
    marginBottom: 12,
  },
  quoteAuthor: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
    fontStyle: 'italic',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  infoCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.gray[200],
    alignItems: 'center',
  },
  infoIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  infoText: {
    fontSize: 14,
    color: colors.text.secondary,
    lineHeight: 22,
    textAlign: 'center',
  },
});
