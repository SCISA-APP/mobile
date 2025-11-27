import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert,
} from 'react-native';
import CustomInput from '@/components/inputs/CustomInput';
import CustomButton from '@/components/buttons/CustomButton';
import colors from '../../constants/colors';
import ForgotPasswordGif from '../../assets/images/ForgotPassword.gif';
import { useRouter } from 'expo-router';
import { isValidEmail } from '@/utils/validators';

const ForgotPasswordScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

      if (!isValidEmail(email)) {
    Alert.alert('Error', 'Please enter a valid email address');
    return;
  }
  
    // 🔐 Password reset logic goes here (Firebase, API, etc.)
    console.log('Reset password for:', email);
    Alert.alert('Success', 'Password reset link sent to your email!');
    router.back(); // optional: go back to login screen
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0} // adjust if needed
    >
      <View style={styles.inner}>
        <Image
          source={ForgotPasswordGif}
          style={styles.gif}
          resizeMode="contain"
        />

        <Text style={styles.title}>Forgot Password?</Text>
        <Text style={styles.subtitle}>Enter your email to reset your password</Text>

        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="Email Address"
            icon="mail-outline"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <CustomButton label="Reset Password" onPress={handleResetPassword} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  gif: {
    width: 200,
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: colors.muted,
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
});
