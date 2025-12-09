import colors from "@/constants/colors";
import { useNotifications } from "@/context/notificationContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Bell } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated";
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

interface CollapsibleHeaderProps {
  scrollY: Animated.SharedValue<number>;
}

const HEADER_MAX_HEIGHT = 100;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

const CollapsibleHeader: React.FC<CollapsibleHeaderProps> = ({ scrollY }) => {
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

  const headerAnimatedStyle = useAnimatedStyle(() => {
    const contentHeight = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      Extrapolate.CLAMP
    );

    return {
      height: contentHeight + insets.top,
    };
  });

  const greetingAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE / 2],
      [1, 0],
      Extrapolate.CLAMP
    );

    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [0, -10],
      Extrapolate.CLAMP
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const nameAnimatedStyle = useAnimatedStyle(() => {
    const fontSize = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [28, 18],
      Extrapolate.CLAMP
    );

    const translateY = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [0, -8],
      Extrapolate.CLAMP
    );

    return {
      fontSize,
      transform: [{ translateY }],
    };
  });

  const borderAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      scrollY.value,
      [0, HEADER_SCROLL_DISTANCE],
      [0, 1],
      Extrapolate.CLAMP
    );

    return {
      opacity,
    };
  });

  return (
    <Animated.View style={[styles.container, headerAnimatedStyle]}>
      <View style={[styles.safeArea, { paddingTop: insets.top }]}>
        <View style={styles.content}>
          <View style={styles.leftContent}>
            <Animated.Text style={[styles.greeting, greetingAnimatedStyle]}>
              {greeting()}
            </Animated.Text>
            <Animated.Text style={[styles.name, nameAnimatedStyle]}>
              {formattedName}
            </Animated.Text>
          </View>

          <View style={styles.actions}>
            <TouchableOpacity
              onPress={() => router.push("/(standalone)/notification")}
              style={styles.actionBtn}
            >
              <Bell color={colors.text.primary} size={24} />
              {unreadCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{unreadCount}</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/(tabs)/profile")} style={styles.profile}>
              {student?.avatarUri ? (
                <Image source={{ uri: student.avatarUri }} style={styles.profileImg} />
              ) : (
                <View style={styles.initial}>
                  <Text style={styles.initialText}>{formattedName.charAt(0)}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Animated border that appears on scroll */}
      <Animated.View style={[styles.border, borderAnimatedStyle]} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    zIndex: 1000,
  },
  safeArea: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  leftContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 15,
    color: colors.text.secondary,
    fontWeight: "500",
    marginBottom: 4,
  },
  name: {
    fontWeight: "700",
    color: colors.text.primary,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  actionBtn: {
    padding: 8,
    position: "relative",
  },
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
  badgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: "bold",
  },
  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  profileImg: {
    width: "100%",
    height: "100%",
  },
  initial: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  initialText: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "700",
  },
  border: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: colors.gray[200],
  },
});

export default CollapsibleHeader;
