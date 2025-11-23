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
} from 'react-native';
import colors from '../../constants/colors';
import { useRouter } from 'expo-router';
import CustomInput from '@/components/inputs/CustomInput';
import CustomButton from '@/components/buttons/CustomButton';
import CustomDropdown from '@/components/inputs/CustomDropdown'; 
import SignUpGif from '../../assets/images/SignUp.gif'; 

// --- DATA DECLARED AT THE TOP ---
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

  const handleSignUp = () => {
    if (!fullName || !email || !password || !program || !year) {
      alert('Please fill all fields');
      return;
    }

    console.log({ fullName, email, password, program, year });
    router.push('/home');
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
            onChangeText={setFullName}
          />
          <CustomInput
            placeholder="Email Address"
            icon="mail-outline"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <CustomInput
            placeholder="Password"
            icon="lock-closed-outline"
            secure
            value={password}
            onChangeText={setPassword}
          />
        </View>

        {/* Dropdowns */}
        <View style={{ width: '100%', zIndex: 20 }}>
          <CustomDropdown
            placeholder="Program"
            data={programs}
            value={program}
            onValueChange={setProgram}
            icon="school-outline"
          />
        </View>

        <View style={{ width: '100%', marginBottom: 20, zIndex: 10 }}>
          <CustomDropdown
            placeholder="Year / Level"
            data={years}
            value={year}
            onValueChange={setYear}
            icon="calendar-outline"
          />
        </View>

        <CustomButton label="Sign Up" onPress={handleSignUp} />

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
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
