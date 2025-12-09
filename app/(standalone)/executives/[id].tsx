import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import {
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ExecutiveDetailScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { name, position, email, phone, image, bio, verified } = params;

  const handleCall = () => {
    if (phone) Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = () => {
    if (email) Linking.openURL(`mailto:${email}`);
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
          {verified === 'true' && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={32} color={colors.primary} />
            </View>
          )}
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.position}>{position}</Text>

          {bio && bio !== '' && (
            <View style={styles.bioContainer}>
              <Text style={styles.bioLabel}>About</Text>
              <Text style={styles.bioText}>{bio}</Text>
            </View>
          )}

          {/* Contact Section */}
          <View style={styles.contactSection}>
            <Text style={styles.contactLabel}>Contact Information</Text>

            <View style={styles.contactItem}>
              <View style={styles.contactIconContainer}>
                <Ionicons name="mail" size={20} color={colors.primary} />
              </View>
              <View style={styles.contactTextContainer}>
                <Text style={styles.contactType}>Email</Text>
                <Text style={styles.contactValue}>{email}</Text>
              </View>
            </View>

            <View style={styles.contactItem}>
              <View style={styles.contactIconContainer}>
                <Ionicons name="call" size={20} color={colors.primary} />
              </View>
              <View style={styles.contactTextContainer}>
                <Text style={styles.contactType}>Phone</Text>
                <Text style={styles.contactValue}>{phone}</Text>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleEmail}>
              <Ionicons name="mail-outline" size={20} color={colors.white} />
              <Text style={styles.primaryButtonText}>Send Email</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.secondaryButton} onPress={handleCall}>
              <Ionicons name="call-outline" size={20} color={colors.primary} />
              <Text style={styles.secondaryButtonText}>Call</Text>
            </TouchableOpacity>
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
    paddingHorizontal: 16,
    paddingBottom: 12,
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
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: colors.gray[200],
    borderWidth: 4,
    borderColor: colors.white,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 24,
    right: '50%',
    marginRight: -96,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 2,
  },
  infoSection: {
    paddingHorizontal: 24,
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  position: {
    fontSize: 16,
    color: colors.text.secondary,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 32,
  },
  bioContainer: {
    marginBottom: 32,
  },
  bioLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 12,
  },
  bioText: {
    fontSize: 15,
    color: colors.text.secondary,
    lineHeight: 24,
  },
  contactSection: {
    marginBottom: 32,
  },
  contactLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  contactIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactTextContainer: {
    flex: 1,
  },
  contactType: {
    fontSize: 12,
    color: colors.text.secondary,
    fontWeight: '500',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 15,
    color: colors.text.primary,
    fontWeight: '600',
  },
  actionButtons: {
    gap: 12,
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
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
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.primary,
  },
});
