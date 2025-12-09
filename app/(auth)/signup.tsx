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
  ScrollView,
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

// DATA
import { programs, years } from '@/assets/data/programYearData';

// ✅ Zod schema
import { signUpSchema } from '@/assets/validation/signupSchema';


const SignUp = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [program, setProgram] = useState<string | number>('');
  const [year, setYear] = useState<string | number>('');
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    console.log("🚀 Running Zod Validation...");

    // ---------- ZOD VALIDATION ----------
    const result = signUpSchema.safeParse({
      fullName,
      email,
      password,
      program,
      year,
    });

    if (!result.success) {
      if (!result.success) {
  const firstError = result.error.issues[0]?.message;  // << correct property
  Alert.alert("Error", firstError || "Invalid form data");
  return;
}
    }

    console.log("✅ Validation Passed");

    const validData = result.data;
    setLoading(true);

    try {
      console.log("Calling signUpUser...");

      const response = await signUpUser({
        email: validData.email.trim(),
        password: validData.password,
        fullName: validData.fullName.trim(),
        program: validData.program.toString(),
        year: Number(validData.year),
      });

      console.log("Signup Response:", response);

      if (response.error) {
        Alert.alert("Signup Failed", response.error);
        return;
      }

      Alert.alert(
        "Success!",
        "Account created successfully! Kindly login with your verified email",
        [
          {
            text: "OK",
            onPress: () => router.replace('/(auth)/login'),
          },
        ]
      );
    } catch (err) {
      console.error("💥 Signup error:", err);
      Alert.alert("Error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.inner}
        keyboardShouldPersistTaps="handled"
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
      >
        <Image source={SignUpGif} style={styles.gif} resizeMode="contain" />

        <Text style={styles.title}>Create Account</Text>

        {/* INPUTS */}
        <View style={styles.inputContainer}>
          <CustomInput
            placeholder="Full Name"
            icon="person-outline"
            value={fullName}
            onChangeText={setFullName}
            editable={!loading}
          />

          <CustomInput
            placeholder="Email Address"
            icon="mail-outline"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            editable={!loading}
          />

          <CustomInput
            placeholder="Password"
            icon="lock-closed-outline"
            secure
            value={password}
            onChangeText={setPassword}
            editable={!loading}
          />
        </View>

        {/* PROGRAM DROPDOWN */}
        <View style={{ width: "100%", zIndex: 20 }}>
          <CustomDropdown
            placeholder="Program"
            data={programs}
            value={program}
            onValueChange={setProgram}
            icon="school-outline"
          />
        </View>

        {/* YEAR DROPDOWN */}
        <View style={{ width: "100%", marginBottom: 20, zIndex: 10 }}>
          <CustomDropdown
            placeholder="Year / Level"
            data={years}
            value={year}
            onValueChange={setYear}
            icon="calendar-outline"
          />
        </View>

        {/* SIGNUP BUTTON */}
        <CustomButton
          label={loading ? "Creating Account..." : "Sign Up"}
          onPress={handleSignUp}
        />

        {/* LOGIN LINK */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')} disabled={loading}>
            <Text style={styles.loginLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;


// ---------- STYLES ----------
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

  // 🔥 FIX so inputs don't hide behind keyboard
inner: {
  paddingHorizontal: 24,
  paddingTop: 40,
  paddingBottom: 120,
  alignItems: "center",        // ⭐ center everything
},

  gif: {
    width: 200,
    height: 200,
    marginBottom: 16,
    justifyContent: 'center',
    alignContent:'center'
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.primaryDark,
    marginBottom: 24,
  },

  inputContainer: {
    width: "100%",
  },

  loginContainer: {
    flexDirection: "row",
    marginTop: 16,
  },

  loginText: {
    color: colors.primary,
    fontSize: 14,
  },

  loginLink: {
    color: colors.secondaryDark,
    fontSize: 14,
    fontWeight: "600",
  },
});
