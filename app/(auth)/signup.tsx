import CustomButton from '@/components/buttons/CustomButton';
import CustomDropdown from '@/components/inputs/CustomDropdown';
import CustomInput from '@/components/inputs/CustomInput';
import { programs, years } from '@/assets/data/programYearData';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/supabaseConfig';
import { addStudentUser } from '@/utils/authUtils/addStudentUser';
import { signUpWithEmail } from '@/utils/authUtils/signUpWithEmailUtil';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  ImageStyle,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import SignUpGif from '../../assets/images/SignUp.gif';
import colors from '../../constants/colors';
import SignUpSuccessModal from '@/components/modals/SignUpSuccessModal';

// Practical email validator — catches missing '@', missing domain,
// and malformed/incomplete TLDs (e.g. "user@school.comf" still passes
// this regex since "comf" is a legal-looking TLD string; see note below
// on why we *also* keep a known-TLD check for cases like this).
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;  

// Common, well-known TLDs. Not exhaustive, but it catches the typo
// pattern you're describing (.comf, .con, .cmo, etc.) when the typo'd
// TLD isn't itself a real one.
const COMMON_TLDS = new Set([
  'com', 'org', 'net', 'edu', 'gov', 'mil', 'int', 'co', 'io',
  'ca', 'us', 'uk', 'info', 'biz', 'me', 'app', 'dev',
]);

const isValidEmail = (value: string) => {
  const trimmed = value.trim();

  if (!EMAIL_REGEX.test(trimmed)) return false;

  // Extra check on the TLD specifically, so "school.comf" is rejected
  // even though it matches the general shape of a valid email.
  const domainPart = trimmed.split('@')[1] ?? '';
  const tld = domainPart.split('.').pop()?.toLowerCase() ?? '';

  return COMMON_TLDS.has(tld);
};

const SignUp = () => {
  const router = useRouter();
  const { setIsSigningUp } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [program, setProgram] = useState<string | number>('');
  const [year, setYear] = useState<string | number>('');
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSignUp = async () => {
    if (!fullName || !email || !password || !program || !year) {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert(
        'Invalid Email',
        'Please enter a valid email address (e.g. name@example.com).'
      );
      return;
    }

    setLoading(true);

    try {
      // Block AuthGuard BEFORE Supabase fires onAuthStateChange
      setIsSigningUp(true);

      const user = await signUpWithEmail(email, password);

      await addStudentUser({
        uid: user.id,
        fullName,
        email,
        program: String(program),
        year,
        permission: 'student',
      });

      setShowSuccessModal(true);
    } catch (error: any) {
      setIsSigningUp(false);
      const message = error.message || '';
      if (message.includes('already registered') || message.includes('already exists')) {
        Alert.alert('Email Taken', 'An account with this email already exists.');
      } else if (message.includes('Password should be')) {
        Alert.alert('Weak Password', 'Password must be at least 6 characters.');
      } else if (message.includes('Invalid email')) {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
      } else {
        Alert.alert('Sign Up Failed', message || 'Something went wrong.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = async () => {
    setShowSuccessModal(false);

    // Sign out FIRST — this clears the Supabase session so AuthGuard
    // sees no session when we lower the flag and navigate to login.
    // Without this, lowering isSigningUp with a live session immediately
    // triggers the `session && inAuthGroup` branch → redirect to tabs.
    await supabase.auth.signOut();

    // Now safe to lower the flag: session is null, AuthGuard stays idle
    setIsSigningUp(false);

    router.replace('/(auth)/login');
  };

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.inner}>
          <Image source={SignUpGif} style={styles.gif} resizeMode="contain" />

          <Text style={styles.title}>Create Account</Text>

          <View style={styles.inputContainer}>
            <CustomInput
              placeholder="Full Name (As on your Student Card)"
              icon="person-outline"
              value={fullName}
              onChangeText={setFullName}
            />
            <CustomInput
              placeholder="Email Address"
              icon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
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

          <CustomButton
            label={loading ? 'Creating account...' : 'Sign Up'}
            onPress={handleSignUp}
          />

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      <SignUpSuccessModal visible={showSuccessModal} onClose={handleModalClose} />
    </>
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