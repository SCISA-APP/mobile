import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  ViewStyle,
  TextStyle,
  ImageStyle,
  Image,
  Alert,
} from 'react-native';
import colors from '../../constants/colors';
import { useRouter } from 'expo-router';
import CustomInput from '@/components/inputs/CustomInput';
import CustomButton from '@/components/buttons/CustomButton';
import CustomDropdown from '@/components/inputs/CustomDropdown';
import SignUpGif from '../../assets/images/SignUp.gif';
import { signUpUser } from '@/utils/authUtils/signUpWithEmailUtil';

const programs = [
  'Computer Science',
  'Physics',
  'Actuarial Science',
  'Chemistry',
  'Environmental Science',
  'Biological Science',
  'Biochemistry',
  'Mathematics',
  'Optometry',
  'Meteorological and Climate Sciences',
  'Food Science and Technology',
  'Statistics',
];

const years = [100, 200, 300, 400, 500, 600];

const SignUp = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [program, setProgram] = useState<string | number>('');
  const [year, setYear] = useState<string | number>('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    console.log('🚀 handleSignUp called');
    console.log('Form values:', { fullName, email, program, year, passwordLength: password.length });

    // Validation
    if (!fullName.trim()) {
      console.log('❌ Validation failed: No full name');
      Alert.alert('Error', 'Please enter your full name');
      return;
    }
    if (!email.trim()) {
      console.log('❌ Validation failed: No email');
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    if (!password || password.length < 6) {
      console.log('❌ Validation failed: Password too short');
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }
    if (!program) {
      console.log('❌ Validation failed: No program');
      Alert.alert('Error', 'Please select your program');
      return;
    }
    if (!year) {
      console.log('❌ Validation failed: No year');
      Alert.alert('Error', 'Please select your year');
      return;
    }

    console.log('✅ Validation passed');
    setLoading(true);
    console.log('Loading state set to true');

    try {
      console.log('Getting push token...');

      console.log('Calling signUpUser...');
      const result = await signUpUser({
        email: email.trim(),
        password,
        fullName: fullName.trim(),
        program: program.toString(),
        year: Number(year),
      });

      console.log('signUpUser result:', result);

      if (result.error) {
        console.error('❌ Signup returned error:', result.error);
        Alert.alert('Signup Failed', result.error);
        return;
      }

      console.log('✅ Signup successful!');
      Alert.alert(
        'Success!',
        'Account created successfully! Please check your email to verify your account before logging in.',
        [
          {
            text: 'OK',
            onPress: () => {
              console.log('Navigating to login...');
              router.replace('/(auth)/login');
            },
          },
        ]
      );
    } catch (err) {
      console.error('💥 Caught error in handleSignUp:', err);
      console.error('Error details:', JSON.stringify(err, null, 2));
      Alert.alert('Error', 'An unexpected error occurred. Please try again.');
    } finally {
      console.log('Setting loading to false');
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.inner}>
        <Image source={SignUpGif} style={styles.gif} resizeMode="contain" />

        <Text style={styles.title}>Create Account</Text>

        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="Full Name"
            icon="person-outline"
            value={fullName}
            onChangeText={(text) => {
              console.log('Full name changed:', text);
              setFullName(text);
            }}
            editable={!loading}
          />
          <CustomInput
            placeholder="Email Address"
            icon="mail-outline"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => {
              console.log('Email changed:', text);
              setEmail(text);
            }}
            autoCapitalize="none"
            editable={!loading}
          />
          <CustomInput
            placeholder="Password"
            icon="lock-closed-outline"
            secure
            value={password}
            onChangeText={(text) => {
              console.log('Password changed, length:', text.length);
              setPassword(text);
            }}
            editable={!loading}
          />
        </View>

        <View style={{ width: '100%', zIndex: 20 }}>
          <CustomDropdown
            placeholder="Program"
            data={programs}
            value={program}
            onValueChange={(value) => {
              console.log('Program selected:', value);
              setProgram(value);
            }}
            icon="school-outline"
            disabled={loading}
          />
        </View>

        <View style={{ width: '100%', marginBottom: 20, zIndex: 10 }}>
          <CustomDropdown
            placeholder="Year / Level"
            data={years}
            value={year}
            onValueChange={(value) => {
              console.log('Year selected:', value);
              setYear(value);
            }}
            icon="calendar-outline"
            disabled={loading}
          />
        </View>

        <CustomButton 
          label={loading ? "Creating Account..." : "Sign Up"} 
          onPress={() => {
            console.log('Sign Up button pressed');
            handleSignUp();
          }}
          disabled={loading}
        />

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity 
            onPress={() => router.push('/(auth)/login')}
            disabled={loading}
          >
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create<{
  container: ViewStyle;
  inner: ViewStyle;
  gif: ImageStyle;
  title: TextStyle;
  loginContainer: ViewStyle;
  loginText: TextStyle;
  loginLink: TextStyle;
  inputContainer: ViewStyle;
}>({
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
    fontSize: 26,
    fontWeight: '700',
    color: colors.primaryDark,
    marginBottom: 24,
  },
  inputContainer: {
    width: '100%',
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  loginText: {
    color: colors.primary,
    fontSize: 14,
  },
  loginLink: {
    color: colors.secondaryDark,
    fontSize: 14,
    fontWeight: '600',
  },
});