import CustomButton from '@/components/buttons/CustomButton';
import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EditProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState<any>(null);
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    program: '',
    year: '',
    phone: '',
    avatarUri: '',
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const data = await AsyncStorage.getItem('@student_user');
      if (data) {
        const userData = JSON.parse(data);
        setStudent(userData);
        setFormData({
          full_name: userData.full_name || '',
          email: userData.email || '',
          program: userData.program || '',
          year: userData.year || '',
          phone: userData.phone || '',
          avatarUri: userData.avatarUri || '',
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please grant camera roll permissions to change your profile picture.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setFormData({ ...formData, avatarUri: result.assets[0].uri });
    }
  };

  const handleSave = async () => {
    // Validate required fields
    if (!formData.full_name.trim()) {
      Alert.alert('Validation Error', 'Please enter your full name.');
      return;
    }

    if (!formData.email.trim()) {
      Alert.alert('Validation Error', 'Please enter your email.');
      return;
    }

    setLoading(true);

    try {
      // Update local storage
      const updatedUser = {
        ...student,
        ...formData,
      };

      await AsyncStorage.setItem('@student_user', JSON.stringify(updatedUser));

      Alert.alert('Success', 'Profile updated successfully!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error) {
      console.error('Error saving profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const firstInitial = formData.full_name ? formData.full_name.charAt(0).toUpperCase() : 'U';

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profile</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar Section */}
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            {formData.avatarUri ? (
              <Image source={{ uri: formData.avatarUri }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarText}>{firstInitial}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity style={styles.changePhotoButton} onPress={pickImage}>
            <Ionicons name="camera" size={16} color={colors.primary} />
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        <View style={styles.formSection}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              value={formData.full_name}
              onChangeText={(text) => setFormData({ ...formData, full_name: text })}
              placeholder="Enter your full name"
              placeholderTextColor={colors.text.disabled}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="Enter your email"
              placeholderTextColor={colors.text.disabled}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              placeholder="Enter your phone number"
              placeholderTextColor={colors.text.disabled}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Program</Text>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              value={formData.program}
              editable={false}
              placeholder="Your program"
              placeholderTextColor={colors.text.disabled}
            />
            <Text style={styles.helperText}>Contact admin to change your program</Text>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Year</Text>
            <TextInput
              style={[styles.input, styles.disabledInput]}
              value={formData.year}
              editable={false}
              placeholder="Your year"
              placeholderTextColor={colors.text.disabled}
            />
            <Text style={styles.helperText}>Contact admin to change your year</Text>
          </View>
        </View>

        {/* Save Button */}
        <View style={styles.buttonContainer}>
          <CustomButton
            label={loading ? "Saving..." : "Save Changes"}
            onPress={handleSave}
            leftIcon={<Ionicons name="checkmark" size={20} color={colors.white} />}
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
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  avatarContainer: {
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarFallback: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '700',
    color: colors.white,
  },
  changePhotoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.surface,
    borderRadius: 20,
  },
  changePhotoText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
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
  input: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 14,
    fontSize: 15,
    color: colors.text.primary,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  disabledInput: {
    backgroundColor: colors.gray[100],
    color: colors.text.secondary,
  },
  helperText: {
    fontSize: 12,
    color: colors.text.secondary,
    marginTop: 6,
    fontStyle: 'italic',
  },
  buttonContainer: {
    marginTop: 8,
  },
});
