import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface QuickAccessItem {
  id: string;
  title: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
  color: string;
}

const quickAccessItems: QuickAccessItem[] = [
  {
    id: '1',
    title: 'Leadership',
    subtitle: 'College & Department Executives',
    icon: 'people',
    route: '/(standalone)/executives',
    color: colors.primary,
  },
  {
    id: '2',
    title: 'Academic Calendar',
    subtitle: 'Important dates & deadlines',
    icon: 'calendar',
    route: '/(standalone)/academics/academicCalendar',
    color: colors.secondary,
  },
  {
    id: '3',
    title: 'Timetable',
    subtitle: 'View your class schedule',
    icon: 'time',
    route: '/(standalone)/academics/timetable',
    color: '#10B981',
  },
  {
    id: '4',
    title: 'Counseling',
    subtitle: 'Talk to a peer counselor',
    icon: 'heart',
    route: '/(tabs)/welfare/screens/counselors',
    color: '#F59E0B',
  },
  {
    id: '5',
    title: 'Bursary',
    subtitle: 'Financial assistance info',
    icon: 'wallet',
    route: '/(tabs)/welfare/bursary',
    color: '#8B5CF6',
  },
  {
    id: '6',
    title: 'Resources',
    subtitle: 'Past questions & materials',
    icon: 'book',
    route: '/(standalone)/academics/academicResources',
    color: '#EC4899',
  },
];

export default function QuickAccessCard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quick Access</Text>
        <Text style={styles.headerSubtitle}>Frequently used features</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {quickAccessItems.map((item, index) => (
          <Animated.View
            key={item.id}
            entering={FadeInDown.delay(index * 80).duration(400)}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push(item.route as any)}
              style={styles.card}
            >
              <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
                <Ionicons name={item.icon} size={20} color={colors.white} />
              </View>
              <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
              <Text style={styles.cardSubtitle} numberOfLines={2}>{item.subtitle}</Text>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: 12,
  },
  header: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 2,
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.text.secondary,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 10,
  },
  card: {
    width: 120,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 3,
  },
  cardSubtitle: {
    fontSize: 11,
    color: colors.text.secondary,
    lineHeight: 14,
  },
});
