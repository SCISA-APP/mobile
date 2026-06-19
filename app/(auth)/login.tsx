import CustomButton from '@/components/buttons/CustomButton';
import CustomInput from '@/components/inputs/CustomInput';
import LoginErrorModal from '@/components/modals/LoginErrorModal';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/supabaseConfig';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  ImageStyle,
  KeyboardAvoidingView,
  Platform,
  Alert,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import AuthenticationGif from '../../assets/images/Authentication.gif';
import colors from '../../constants/colors';

const LoginScreen = () => {
  const router = useRouter();
  const { cacheStudentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false); // ← new

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Information', 'Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      const user = data.user;

      const { data: userData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError || !userData) {
        Alert.alert('Account Error', 'User data not found.');
        return;
      }

      await cacheStudentUser({
        uid: user.id,
        fullName: userData.full_name,
        email: userData.email,
        permission: userData.permission,
        program: userData.program,
        year: userData.year,
      });

      router.replace('/(tabs)/home');
    } catch (error: any) {
      const message = error.message || '';

      if (
        message.includes('Invalid login credentials') ||
        message.includes('invalid_credentials')
      ) {
        // Show the modal for wrong credentials
        setShowErrorModal(true);
      } else if (message.includes('Invalid email')) {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
      } else if (message.includes('rate limit')) {
        Alert.alert('Too Many Attempts', 'Account temporarily locked. Try again later.');
      } else {
        Alert.alert('Error', message || 'Something went wrong.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.inner}>
          <Image source={AuthenticationGif} style={styles.gif} resizeMode="contain" />

          <Text style={styles.title}>Welcome Back 👋</Text>
          <Text style={styles.subtitle}>Log in to your SCISA account</Text>

          <View style={styles.inputContainer}>
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

            <TouchableOpacity
              style={styles.forgotContainer}
              onPress={() => router.push('/(auth)/forgotPassword')}
            >
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <CustomButton label={loading ? 'Logging in...' : 'Login'} onPress={handleLogin} />

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Do not have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>

      {/* Error modal — shown on invalid credentials */}
      <LoginErrorModal
        visible={showErrorModal}
        onClose={() => setShowErrorModal(false)}
      />
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create<{
  container: ViewStyle;
  inner: ViewStyle;
  gif: ImageStyle;
  title: TextStyle;
  subtitle: TextStyle;
  inputContainer: ViewStyle;
  forgotContainer: ViewStyle;
  forgotText: TextStyle;
  signupContainer: ViewStyle;
  signupText: TextStyle;
  signupLink: TextStyle;
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
    color: colors.black,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.primaryDark,
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 24,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  forgotContainer: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  forgotText: {
    color: colors.primaryDark,
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  signupText: {
    color: colors.primaryDark,
    fontSize: 14,
  },
  signupLink: {
    color: 'red',
    fontSize: 14,
    fontWeight: '600',
  },
});