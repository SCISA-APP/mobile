import IconFontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack,useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { auth } from "@/firebaseConfig";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import colors from "@/constants/colors";
import CustomButton from "@/components/buttons/CustomButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";

export default function ProfileScreen() {
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);

  // Load stored student data
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await AsyncStorage.getItem("@student_user");
        if (data) {
          setStudent(JSON.parse(data));
        }
      } catch (error) {
        console.log("Error loading student user:", error);
      }
    };

    loadUserData();
  }, []);

  const firstInitial = student?.fullName
    ? student.fullName.charAt(0).toUpperCase()
    : "U";

  const handleEditProfile = () => console.log("Edit Profile pressed");
  const handleNotifications = () => console.log("Notifications pressed");
  const handleChangePassword = () => console.log("Change Password pressed");
  const handleSignOut = async () => {
  try {
    // 1. Sign out from Firebase
    await signOut(auth);

    // 2. Clear all app-related AsyncStorage
    await AsyncStorage.clear();

    // 3. Redirect to login screen
    router.replace("/(auth)/login");

    console.log("User signed out successfully");
  } catch (error) {
    console.log("Error signing out:", error);
    alert("Something went wrong. Please try again.");
  }
};

  return (
    <View style={styles.fullScreenContainer}>
      <Stack.Screen
        options={{
          title: "Profile",
          headerTitleAlign: "center",
          headerTintColor: "#333",
          headerShadowVisible: false,
        }}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {student?.avatarUri ? (
              <Image
                source={{ uri: student.avatarUri }}
                style={styles.avatarImage}
              />
            ) : (
              <View style={styles.initialsFallback}>
                <Text style={styles.initialsText}>{firstInitial}</Text>
              </View>
            )}
          </View>

          <Text style={styles.userName}>{student?.full_name}</Text>
          <Text style={styles.userStatus}>{student?.email}</Text>
        </View>

        {/* User Info Card */}
        {student && (
          <View style={styles.infoCard}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Program:</Text>
              <Text style={styles.infoValue}>{student.program}</Text>
            </View>

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Year:</Text>
              <Text style={styles.infoValue}>{student.year}</Text>
            </View>
          </View>
        )}

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={handleEditProfile}>
            <View style={styles.menuItemLeft}>
              <IconFontAwesome
                name="user-o"
                size={20}
                color={colors.primaryLight}
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>Edit Profile</Text>
            </View>
            <IconFontAwesome name="angle-right" size={20} color="#555" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleNotifications}
          >
            <View style={styles.menuItemLeft}>
              <IconFontAwesome
                name="bell-o"
                size={20}
                color={colors.primaryLight}
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>Notification</Text>
            </View>
            <IconFontAwesome name="angle-right" size={20} color="#555" />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, styles.lastMenuItem]}
            onPress={handleChangePassword}
          >
            <View style={styles.menuItemLeft}>
              <IconFontAwesome
                name="lock"
                size={20}
                color={colors.primaryLight}
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>Change Password</Text>
            </View>
            <IconFontAwesome name="angle-right" size={20} color="#555" />
          </TouchableOpacity>
        </View>

        {/* Sign Out */}
        <View style={styles.signOutButtonContainer}>
          <CustomButton
            label="Sign Out"
            onPress={handleSignOut}
            leftIcon={<IconFontAwesome name="sign-out" size={18} color="#fff" />}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 12,
    paddingHorizontal: 20,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: { width: 110, height: 110, borderRadius: 55 },
  initialsFallback: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.primaryDark,
    justifyContent: "center",
    alignItems: "center",
  },
  initialsText: { fontSize: 48, fontWeight: "bold", color: "#fff" },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 3,
  },
  userStatus: { fontSize: 14, color: "#666" },

  // ⭐ User Info Card
  infoCard: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 12,
    marginBottom: 25,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
  },
  infoLabel: { fontSize: 15, color: "#555", fontWeight: "500" },
  infoValue: { fontSize: 15, color: "#333", fontWeight: "600" },

  menuContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 30,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuIcon: {
    width: 28,
    textAlign: "center",
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
  },
  lastMenuItem: { borderBottomWidth: 0 },

  signOutButtonContainer: {
    width: "100%",
    marginBottom: 8,
  },
});
