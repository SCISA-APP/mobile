import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  Image,
  TouchableOpacity,

} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomInput from '@/components/inputs/CustomInput';
import CustomButton from '@/components/buttons/CustomButton';
import colors from '../../constants/colors';
import AuthenticationGif from '../../assets/images/Authentication.gif';
import { useRouter } from 'expo-router';
import { signInUser } from '@/utils/authUtils/signInWithEmailUtil';


const LoginScreen = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);  // ✅ default checked
  const [loading, setLoading] = useState(false);

  // ----------------------------------------------------
  // 🔥 Load saved login info on app start
  // ----------------------------------------------------
useEffect(() => {
  const loadStoredCredentials = async () => {
    try {
      // Only read AsyncStorage on native platforms
      if (Platform.OS !== 'web') {
        const savedEmail = await AsyncStorage.getItem("savedEmail");
        const savedPassword = await AsyncStorage.getItem("savedPassword");

        if (savedEmail && savedPassword) {
          setEmail(savedEmail);
          setPassword(savedPassword);
          setRememberMe(true);
        }
      }
    } catch (error) {
      console.log("Error loading saved login info:", error);
    }
  };

  loadStoredCredentials();
}, []);


  // ----------------------------------------------------
  // 🔥 Login Handler
  // ----------------------------------------------------
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter both email and password");
      return;
    }

    setLoading(true);

    const result = await signInUser({ email, password });

    setLoading(false);

    if (result.error) {
      alert(`Login failed: ${result.error}`);
      return;
    }

    // 🔥 Save credentials if rememberMe is TRUE
if (rememberMe && Platform.OS !== 'web') {
  await AsyncStorage.setItem("savedEmail", email);
  await AsyncStorage.setItem("savedPassword", password);
} else if (Platform.OS !== 'web') {
  await AsyncStorage.removeItem("savedEmail");
  await AsyncStorage.removeItem("savedPassword");
}


    alert("Login successful!");
    router.push('/home');
  };


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.inner}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
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

          {/* ------------------------ */}
          {/* 🔥 REMEMBER ME CHECKBOX */}
          {/* ------------------------ */}
{/* REMEMBER + FORGOT in one row */}
<View style={styles.rememberForgotRow}>
  {/* Remember Me */}
  <TouchableOpacity
    style={styles.rememberContainer}
    onPress={() => setRememberMe(!rememberMe)}
  >
    <View style={styles.checkbox}>
      {rememberMe ? <Text style={styles.checked}>✓</Text> : null}
    </View>
    <Text style={styles.rememberText}>Remember Me</Text>
  </TouchableOpacity>

  {/* Forgot Password */}
  <TouchableOpacity onPress={() => router.push('/(auth)/forgotPassword')}>
    <Text style={styles.forgotText}>Forgot Password?</Text>
  </TouchableOpacity>
</View>

        </View>

        <CustomButton label={loading ? "Logging in..." : "Login"} onPress={handleLogin} />

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Do not have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;


// ----------------------------------------------------------------------
// STYLES
// ----------------------------------------------------------------------
const styles = StyleSheet.create({
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

  // 🔥 REMEMBER ME STYLES
rememberForgotRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  marginTop: 8,
},

rememberContainer: {
  flexDirection: "row",
  alignItems: "center",
},

checkbox: {
  width: 22,
  height: 22,
  borderWidth: 2,
  borderColor: colors.primaryDark,
  borderRadius: 5,
  justifyContent: "center",
  alignItems: "center",
  marginRight: 8,
},

checked: {
  fontSize: 16,
  color: colors.primaryDark,
},

rememberText: {
  fontSize: 14,
  color: colors.primaryDark,
},

forgotText: {
  color: colors.primaryDark,
  fontSize: 14,
  textDecorationLine: "underline",
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
