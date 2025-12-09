import colors from "@/constants/colors";
import { useNotifications } from "@/context/notificationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Bell } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const formatName = (fullName: string) => {
  if (!fullName) return "User";
  const parts = fullName.trim().split(" ");
  return parts.length === 1
    ? parts[0]
    : parts.length === 2
    ? `${parts[0].charAt(0)}. ${parts[1]}`
    : `${parts[parts.length - 2].charAt(0)}. ${parts[parts.length - 1]}`;
};

const Header: React.FC<any> = ({
  title,
  subtitle,
  showGreeting = true,
  showNotification = true,
  showProfile = true,
  onNotificationPress,
  style,
}) => {
  const insets = useSafeAreaInsets();
  const { unreadCount } = useNotifications();
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    AsyncStorage.getItem("@student_user").then((data) => {
      if (data) setStudent(JSON.parse(data));
    });
  }, []);

  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const formattedName = formatName(student?.full_name);

  return (
    <View style={[styles.container, { paddingTop: insets.top }, style]}>
      <Animated.View entering={FadeInDown.duration(600)} style={styles.row}>
        <View style={{ flex: 1 }}>
          {showGreeting && (
            <>
              <Animated.Text entering={FadeInRight.delay(200)} style={styles.greeting}>
                {greeting()}
              </Animated.Text>
              <Animated.Text entering={FadeInRight.delay(300)} style={styles.name}>
                {formattedName}
              </Animated.Text>
            </>
          )}
        </View>

        <Animated.View entering={FadeInRight.delay(400)} style={styles.actions}>
          {showNotification && (
            <TouchableOpacity
              onPress={onNotificationPress || (() => router.push("/(standalone)/notification"))}
              style={styles.actionBtn}
            >
              <Bell color={colors.text.primary} size={24} />
              {unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadCount}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}

          {showProfile && (
            <TouchableOpacity onPress={() => router.push("/(tabs)/profile")} style={styles.profile}>
              {student?.avatarUri ? (
                <Image source={{ uri: student.avatarUri }} style={styles.profileImg} />
              ) : (
                <View style={styles.initial}>
                  <Text style={styles.initialText}>{formattedName.charAt(0)}</Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </Animated.View>
      </Animated.View>

      {title && <Text style={styles.title}>{title}</Text>}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: colors.white,
  },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  greeting: { fontSize: 15, color: colors.text.secondary, fontWeight: "500" },
  name: { fontSize: 22, fontWeight: "700", color: colors.text.primary, marginTop: 4 },
  actions: { flexDirection: "row", alignItems: "center", gap: 12 },
  actionBtn: { padding: 8, position: "relative" },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: colors.secondary,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: colors.white,
  },
  badgeText: { color: colors.white, fontSize: 10, fontWeight: "bold" },
  profile: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    overflow: "hidden",
  },
  profileImg: { width: "100%", height: "100%" },
  initial: { 
    flex: 1, 
    backgroundColor: colors.primary, 
    justifyContent: "center", 
    alignItems: "center" 
  },
  initialText: { fontSize: 16, color: colors.white, fontWeight: "700" },
  title: { fontSize: 24, fontWeight: "bold", color: colors.text.primary, marginTop: 12 },
  subtitle: { fontSize: 14, color: colors.text.secondary, marginTop: 4 },
});

export default Header;
