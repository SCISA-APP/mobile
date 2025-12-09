import CustomButton from '@/components/buttons/CustomButton';
import colors from '@/constants/colors';
import { supabase } from '@/supabaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ChangePasswordScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const validatePassword = (password: string): { valid: boolean; message?: string } => {
    if (password.length < 8) {
      return { valid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!/[A-Z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/[0-9]/.test(password)) {
      return { valid: false, message: 'Password must contain at least one number' };
    }
    return { valid: true };
  };

  const handleChangePassword = async () => {
    // Validate fields
    if (!formData.currentPassword) {
      Alert.alert('Validation Error', 'Please enter your current password.');
      return;
    }

    if (!formData.newPassword) {
      Alert.alert('Validation Error', 'Please enter a new password.');
      return;
    }

    if (!formData.confirmPassword) {
      Alert.alert('Validation Error', 'Please confirm your new password.');
      return;
    }

    // Validate new password
    const passwordValidation = validatePassword(formData.newPassword);
    if (!passwordValidation.valid) {
      Alert.alert('Validation Error', passwordValidation.message);
      return;
    }

    // Check if passwords match
    if (formData.newPassword !== formData.confirmPassword) {
      Alert.alert('Validation Error', 'New passwords do not match.');
      return;
    }

    // Check if new password is different from current
    if (formData.currentPassword === formData.newPassword) {
      Alert.alert('Validation Error', 'New password must be different from current password.');
      return;
    }

    setLoading(true);

    try {
      // Update password using Supabase
      const { error } = await supabase.auth.updateUser({
        password: formData.newPassword,
      });

      if (error) {
        throw error;
      }

      Alert.alert(
        'Success',
        'Your password has been changed successfully!',
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error: any) {
      console.error('Error changing password:', error);
      Alert.alert(
        'Error',
        error.message || 'Failed to change password. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Change Password</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Info Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <Ionicons name="shield-checkmark" size={24} color={colors.primary} />
          </View>
          <Text style={styles.infoText}>
            Choose a strong password to keep your account secure
          </Text>
        </View>

        {/* Form Section */}
        <View style={styles.formSection}>
          {/* Current Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Current Password *</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={formData.currentPassword}
                onChangeText={(text) => setFormData({ ...formData, currentPassword: text })}
                placeholder="Enter current password"
                placeholderTextColor={colors.text.disabled}
                secureTextEntry={!showCurrentPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                <Ionicons
                  name={showCurrentPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color={colors.text.secondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* New Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>New Password *</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={formData.newPassword}
                onChangeText={(text) => setFormData({ ...formData, newPassword: text })}
                placeholder="Enter new password"
                placeholderTextColor={colors.text.disabled}
                secureTextEntry={!showNewPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowNewPassword(!showNewPassword)}
              >
                <Ionicons
                  name={showNewPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color={colors.text.secondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Confirm Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm New Password *</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                placeholder="Confirm new password"
                placeholderTextColor={colors.text.disabled}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Ionicons
                  name={showConfirmPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color={colors.text.secondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Password Requirements */}
          <View style={styles.requirementsCard}>
            <Text style={styles.requirementsTitle}>Password Requirements:</Text>
            <View style={styles.requirement}>
              <Ionicons name="checkmark-circle" size={16} color={colors.success} />
              <Text style={styles.requirementText}>At least 8 characters</Text>
            </View>
            <View style={styles.requirement}>
              <Ionicons name="checkmark-circle" size={16} color={colors.success} />
              <Text style={styles.requirementText}>One uppercase letter</Text>
            </View>
            <View style={styles.requirement}>
              <Ionicons name="checkmark-circle" size={16} color={colors.success} />
              <Text style={styles.requirementText}>One lowercase letter</Text>
            </View>
            <View style={styles.requirement}>
              <Ionicons name="checkmark-circle" size={16} color={colors.success} />
              <Text style={styles.requirementText}>One number</Text>
            </View>
          </View>
        </View>

        {/* Change Password Button */}
        <View style={styles.buttonContainer}>
          <CustomButton
            label={loading ? "Changing Password..." : "Change Password"}
            onPress={handleChangePassword}
            leftIcon={<Ionicons name="lock-closed" size={20} color={colors.white} />}
          />
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
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.gray[200],
    gap: 12,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  formSection: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  passwordInput: {
    flex: 1,
    padding: 14,
    fontSize: 15,
    color: colors.text.primary,
  },
  eyeButton: {
    padding: 14,
  },
  requirementsCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginTop: 4,
  },
  requirementsTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 12,
  },
  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  requirementText: {
    fontSize: 13,
    color: colors.text.secondary,
  },
  buttonContainer: {
    marginTop: 8,
  },
});
