import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CounselorDetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { name, type, department, image, bio, specialties } = params;
  const specialtiesArray = specialties ? JSON.parse(specialties as string) : [];

  const handleBookSession = () => {
    // Navigate to booking screen or show booking modal
    router.push('/(tabs)/welfare/screens/bookings');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: 5 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: image as string }} style={styles.profileImage} />
          <View style={styles.typeBadge}>
            <Text style={styles.typeBadgeText}>{type} Counselor</Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.name}>{name}</Text>
          {department && <Text style={styles.department}>{department}</Text>}

          {/* Specialties */}
          {specialtiesArray.length > 0 && (
            <View style={styles.specialtiesSection}>
              <Text style={styles.sectionLabel}>Specialties</Text>
              <View style={styles.specialtiesGrid}>
                {specialtiesArray.map((specialty: string, index: number) => (
                  <View key={index} style={styles.specialtyChip}>
                    <Ionicons name="checkmark-circle" size={16} color={colors.primary} />
                    <Text style={styles.specialtyChipText}>{specialty}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Bio */}
          {bio && bio !== '' && (
            <View style={styles.bioSection}>
              <Text style={styles.sectionLabel}>About</Text>
              <Text style={styles.bioText}>{bio}</Text>
            </View>
          )}

          {/* Action Button */}
          <TouchableOpacity style={styles.primaryButton} onPress={handleBookSession}>
            <Ionicons name="calendar" size={20} color={colors.white} />
            <Text style={styles.primaryButtonText}>Book a Session</Text>
          </TouchableOpacity>

          {/* Info Card */}
          <View style={styles.infoCard}>
            <View style={styles.infoIconContainer}>
              <Ionicons name="shield-checkmark" size={24} color={colors.primary} />
            </View>
            <Text style={styles.infoCardTitle}>Confidential & Safe</Text>
            <Text style={styles.infoCardText}>
              All counseling sessions are completely confidential and conducted in a safe, 
              supportive environment.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 8,
    backgroundColor: colors.white,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  imageContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    position: 'relative',
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: colors.gray[200],
    borderWidth: 4,
    borderColor: colors.white,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  typeBadge: {
    marginTop: 12,
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  typeBadgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.white,
  },
  infoSection: {
    paddingHorizontal: 24,
  },
  name: {
    fontSize: 26,
    fontWeight: '700',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  department: {
    fontSize: 15,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  specialtiesSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 12,
  },
  specialtiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  specialtyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    gap: 6,
  },
  specialtyChipText: {
    fontSize: 13,
    color: colors.text.primary,
    fontWeight: '600',
  },
  bioSection: {
    marginBottom: 24,
  },
  bioText: {
    fontSize: 15,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    marginBottom: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.white,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  infoIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 8,
  },
  infoCardText: {
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 20,
    textAlign: 'center',
  },
});
