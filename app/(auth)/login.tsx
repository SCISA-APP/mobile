import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  ImageStyle
} from 'react-native';
import CustomInput from '@/components/inputs/CustomInput';
import CustomButton from '@/components/buttons/CustomButton';
import colors from '../../constants/colors';
import AuthenticationGif from '../../assets/images/Authentication.gif';
import { useRouter } from 'expo-router';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db } from '@/firebaseConfig';
import { doc,getDoc } from 'firebase/firestore';

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loaing, setLoading] = useState(false)


const handleLogin = async () => {
  if (!email || !password) {
    alert("Please enter both email and password");
    return;
  }

  setLoading(true);
  try {
    const auth = getAuth();

    // 1️⃣ Sign in the user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 2️⃣ Check email verification
    if (!user.emailVerified) {
      alert(
        "Your email is not verified yet. 📧\n\n" +
        "Please check your inbox (and spam folder) to verify your email before logging in."
      );
      return;
    }

    // 3️⃣ Fetch user document from Firestore
    const userDocRef = doc(db, "Student_Users", user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      alert("User data not found in the system. Please contact support.");
      return;
    }

    const userData = userDocSnap.data();

    // 4️⃣ Store user data in AsyncStorage
    await AsyncStorage.setItem("@student_user", JSON.stringify({
      uid: user.uid,
      fullName: userData.fullName,
      email: user.email,
      permission: userData.permission,
      program: userData.program,
      year: userData.year
    }));

    console.log("User logged in:", user.email);
    router.push("/home");

  } catch (error: any) {
    console.error("Login error:", error);

    let message = "";
    switch (error.code) {
      case "auth/invalid-email":
      case "auth/wrong-password":
      case "auth/invalid-credential":
        message = "Invalid Credentials. Check and provide right credentials";
        break;
      case "auth/user-disabled":
        message = "This account has been disabled. Please contact support.";
        break;
      case "auth/user-not-found":
        message = "No account found with this email.";
        break;
      case "auth/too-many-requests":
        message = "Too many failed attempts. Try again later.";
        break;
      case "auth/network-request-failed":
        message = "Network error. Check your internet connection.";
        break;
      default:
        message = "An unexpected error occurred. Please try again.";
        break;
    }

    alert(message);
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
        <Image
          source={AuthenticationGif}
          style={styles.gif}
          resizeMode="contain"
        />

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

        <CustomButton label="Login" onPress={handleLogin} />

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

// --- STYLES ---
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
    color: colors.primaryDark, // see next fix
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
    color: colors.primaryDark, // see next fix
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  signupText: {
    color: colors.primaryDark, // see next fix
    fontSize: 14,
  },
  signupLink: {
    color: 'red',
    fontSize: 14,
    fontWeight: '600',
  },
});

