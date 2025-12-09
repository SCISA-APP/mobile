import colors from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const menuItems = [
  {
    id: '1',
    title: 'Edit Profile',
    icon: 'person-outline' as keyof typeof Ionicons.glyphMap,
    color: colors.primary,
    action: 'edit',
  },
  {
    id: '2',
    title: 'Leadership',
    icon: 'people-outline' as keyof typeof Ionicons.glyphMap,
    color: colors.secondary,
    action: 'leadership',
  },
  {
    id: '3',
    title: 'Notifications',
    icon: 'notifications-outline' as keyof typeof Ionicons.glyphMap,
    color: '#10B981',
    action: 'notifications',
  },
  {
    id: '4',
    title: 'Change Password',
    icon: 'lock-closed-outline' as keyof typeof Ionicons.glyphMap,
    color: '#F59E0B',
    action: 'password',
  },
];

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [student, setStudent] = useState<any>(null);

  const loadUserData = useCallback(async () => {
    try {
      const data = await AsyncStorage.getItem("@student_user");
      if (data) setStudent(JSON.parse(data));
    } catch (error) {
      console.error('Error loading student user:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [loadUserData])
  );

  const firstInitial = student?.full_name
    ? student.full_name.charAt(0).toUpperCase()
    : "U";

  const handleMenuAction = (action: string) => {
    switch (action) {
      case 'edit':
        router.push("/(standalone)/profile/edit");
        break;
      case 'leadership':
        router.push("/(standalone)/executives");
        break;
      case 'notifications':
        router.push("/(standalone)/notification");
        break;
      case 'password':
        router.push("/(standalone)/profile/change-password");
        break;
    }
  };

  const handleSignOut = async () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign Out",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              router.replace("/(auth)/login");
            } catch (error) {
              Alert.alert("Error", "Something went wrong. Please try again.");
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <Animated.View entering={FadeInDown.duration(500)} style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            {student?.avatarUri ? (
              <Image source={{ uri: student.avatarUri }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarText}>{firstInitial}</Text>
              </View>
            )}
          </View>

          <View style={styles.profileInfo}>
            <Text style={styles.userName}>{student?.full_name || 'Student Name'}</Text>
            <Text style={styles.userEmail}>{student?.email || 'email@example.com'}</Text>

            {student && (
              <View style={styles.badgesContainer}>
                <View style={styles.badge}>
                  <Ionicons name="school" size={14} color={colors.primary} />
                  <Text style={styles.badgeText}>{student.program}</Text>
                </View>
                <View style={styles.badge}>
                  <Ionicons name="calendar" size={14} color={colors.primary} />
                  <Text style={styles.badgeText}>Year {student.year}</Text>
                </View>
              </View>
            )}
          </View>
        </Animated.View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={FadeInDown.delay(index * 100 + 200).duration(500)}
            >
              <TouchableOpacity
                style={styles.menuItem}
                onPress={() => handleMenuAction(item.action)}
                activeOpacity={0.7}
              >
                <View style={[styles.menuIconContainer, { backgroundColor: item.color }]}>
                  <Ionicons name={item.icon} size={20} color={colors.white} />
                </View>
                <Text style={styles.menuText}>{item.title}</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </View>

        {/* Sign Out Button */}
        <Animated.View entering={FadeInDown.delay(600).duration(500)} style={styles.signOutContainer}>
          <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={20} color={colors.secondary} />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.text.primary,
  },
  scrollView: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  profileCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.gray[200],
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarFallback: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: '700',
    color: colors.white,
  },
  profileInfo: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 12,
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
  },
  menuSection: {
    marginBottom: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  signOutContainer: {
    marginTop: 8,
  },
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.secondary,
    gap: 8,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.secondary,
  },
});
