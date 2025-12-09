import { academicsButtonsData } from '@/assets/data/academics/AcademicButton';
import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const getIconName = (title: string): keyof typeof Ionicons.glyphMap => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('timetable')) return 'time';
  if (lowerTitle.includes('calendar')) return 'calendar';
  if (lowerTitle.includes('exam') || lowerTitle.includes('arrangement')) return 'document-text';
  return 'book';
};

const iconColors = [colors.primary, colors.secondary, '#10B981', '#F59E0B'];

const AcademicsScreen: React.FC = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerTitle}>Academics</Text>
        <Text style={styles.headerSubtitle}>Your academic resources</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {academicsButtonsData.map((btn, index) => (
          <Animated.View
            key={index}
            entering={FadeInDown.delay(index * 100).duration(500)}
          >
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(btn.route as const)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconContainer, { backgroundColor: iconColors[index % iconColors.length] }]}>
                <Ionicons name={getIconName(btn.title)} size={28} color={colors.white} />
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{btn.title || 'Academic Resources'}</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AcademicsScreen;

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
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.text.primary,
    flex: 1,
  },
});
