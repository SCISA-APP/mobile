// app/(tabs)/profile.tsx
import IconFontAwesome from "@expo/vector-icons/FontAwesome";
import { Stack } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const user = {
    name: "Albert Florest",
    status: "Student",
    avatarUri: null,
  };

  const firstInitial = user.name ? user.name.charAt(0).toUpperCase() : "";

  const handleEditProfile = () => {
    console.log("Edit Profile pressed");
  };
  const handleNotifications = () => {
    console.log("Notifications pressed");
  };
  const handleChangePassword = () => {
    console.log("Change Password pressed");
  };
  const handleSignOut = () => {
    console.log("Sign Out pressed");
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
            {user.avatarUri ? (
              <Image
                source={{ uri: user.avatarUri }}
                style={styles.avatarImage}
              />
            ) : (
              <View style={styles.initialsFallback}>
                <Text style={styles.initialsText}>{firstInitial}</Text>
              </View>
            )}
          </View>

          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userStatus}>{user.status}</Text>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          <TouchableOpacity style={styles.menuItem} onPress={handleEditProfile}>
            <View style={styles.menuItemLeft}>
              <IconFontAwesome
                name="user-o"
                size={20}
                color="#20B2AA"
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
                color="#20B2AA"
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
                color="#20B2AA"
                style={styles.menuIcon}
              />
              <Text style={styles.menuText}>Change Password</Text>
            </View>
            <IconFontAwesome name="angle-right" size={20} color="#555" />
          </TouchableOpacity>
        </View>

        {/* Sign Out */}
        <View style={styles.signOutButtonContainer}>
          <TouchableOpacity
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <IconFontAwesome
              name="sign-out"
              size={20}
              color="#fff"
              style={styles.signOutIcon}
            />
            <Text style={styles.signOutButtonText}>Sign Out</Text>
          </TouchableOpacity>
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
    marginBottom: 40,
    marginTop: 20,
  },
  avatarContainer: {
    position: "relative",
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
  },
  initialsFallback: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: "#20B2AA",
    justifyContent: "center",
    alignItems: "center",
  },
  initialsText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#fff",
  },
  userName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  userStatus: {
    fontSize: 14,
    color: "#666",
  },
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
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  signOutButtonContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  signOutButton: {
    flexDirection: "row",
    backgroundColor: "#20B2AA",
    paddingVertical: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  signOutIcon: {
    marginRight: 10,
  },
  signOutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});
