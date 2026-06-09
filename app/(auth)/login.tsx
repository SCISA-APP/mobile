import CustomButton from '@/components/buttons/CustomButton';
import CustomInput from '@/components/inputs/CustomInput';
import { useAuth } from '@/context/AuthContext';
import { auth, db } from '@/firebaseConfig';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
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
import AuthenticationGif from '../../assets/images/Authentication.gif';
import colors from '../../constants/colors';

const LoginScreen = () => {
  const router = useRouter();
  const { cacheStudentUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Missing Information', 'Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        Alert.alert(
          'Email Not Verified',
          'Please verify your email before logging in.'
        );
        return;
      }

      const userDocRef = doc(db, 'Student_Users', user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        Alert.alert('Account Error', 'User data not found.');
        return;
      }

      const userData = userDocSnap.data();

      // Cache student profile locally and in AsyncStorage
      await cacheStudentUser({
        uid: user.uid,
        fullName: userData.fullName,
        email: userData.email,
        permission: userData.permission,
        program: userData.program,
        year: userData.year,
      });

      // Replace so the user can't go back to login with the back button
      router.replace('/(tabs)/home');
    } catch (error: any) {
      switch (error.code) {
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
        case 'auth/user-not-found':
          Alert.alert('Login Failed', 'Invalid email or password.');
          break;
        case 'auth/invalid-email':
          Alert.alert('Invalid Email', 'Please enter a valid email address.');
          break;
        case 'auth/too-many-requests':
          Alert.alert('Too Many Attempts', 'Account temporarily locked. Try again later.');
          break;
        default:
          Alert.alert('Error', error.message || 'Something went wrong.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
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
