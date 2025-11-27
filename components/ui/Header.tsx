import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Bell } from "lucide-react-native";
import colors from "@/constants/colors";
import { Colors } from "@/constants/theme";

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
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          {showGreeting && (
            <>
              <Text style={styles.greeting}>{greeting()}</Text>
              <Text style={styles.name}>{formattedName}</Text>
            </>
          )}
        </View>

        <View style={styles.actions}>
          {showNotification && (
            <TouchableOpacity onPress={onNotificationPress || (() => {})} style={styles.actionBtn}>
              <Bell color={colors.primaryDark} size={24} />
              <View style={styles.badge}>
                <Text style={styles.badgeText}>3</Text>
              </View>
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
        </View>
      </View>

      {title && <Text style={styles.title}>{title}</Text>}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    paddingBottom: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  greeting: { fontSize: 18, color: Colors.light.secondaryText },
  name: { fontSize: 16, fontWeight: "600", color: colors.primaryDark, marginTop: 2 },
  actions: { flexDirection: "row", alignItems: "center", gap: 1 },
  actionBtn: { padding: 8, position: "relative" },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: Colors.light.tint,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: { color: "white", fontSize: 10, fontWeight: "bold" },
  profile: { width: 40, height: 40, borderRadius: 20, overflow: "hidden", marginLeft: 8 },
  profileImg: { width: "100%", height: "100%" },
  initial: { flex: 1, backgroundColor: colors.primaryDark, justifyContent: "center", alignItems: "center" },
  initialText: { fontSize: 18, color: "white", fontWeight: "700" },
  title: { fontSize: 24, fontWeight: "bold", color: colors.primaryDark, marginTop: 12 },
  subtitle: { fontSize: 14, color: Colors.light.secondaryText, marginTop: 4 },
});

export default Header;
