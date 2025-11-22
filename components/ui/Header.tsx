
import {
  HeaderActionProps,
  HeaderGreetingProps,
  HeaderProps,
} from "@/types/components/header";
import { useRouter } from "expo-router";
import { Bell } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "@/constants/colors";
import { Colors } from "@/constants/theme";

// Utility function to format names
const formatName = (fullName: string) => {
  if (!fullName) return "User";
  const parts = fullName.trim().split(" ");
  const len = parts.length;

  if (len === 1) return parts[0]; // single name
  if (len === 2) return `${parts[0].charAt(0)}. ${parts[1]}`; // two names

  // more than two names: take second last initial + last name
  const secondLast = parts[len - 2];
  const last = parts[len - 1];
  return `${secondLast.charAt(0)}. ${last}`;
};

export const HeaderGreeting: React.FC<HeaderGreetingProps> = ({
  name = "User",
  showTime = true,
}) => {
  const getGreeting = () => {
    if (!showTime) return null;
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <View style={styles.greetingContainer}>
      {showTime && <Text style={styles.greetingText}>{getGreeting()}</Text>}
      <Text style={styles.userName}>{formatName(name)}</Text>
    </View>
  );
};

export const HeaderAction: React.FC<HeaderActionProps> = ({
  icon,
  onPress,
  badge,
}) => (
  <TouchableOpacity onPress={onPress} style={styles.actionButton}>
    {icon}
    {badge ? (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{badge > 9 ? "9+" : badge}</Text>
      </View>
    ) : null}
  </TouchableOpacity>
);

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  leftComponent,
  rightComponent,
  style,
  showGreeting = true,
  showNotification = true,
  showProfile = true,
  onNotificationPress,
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  // ----- Load Student Data -----
  const [student, setStudent] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await AsyncStorage.getItem("@student_user");
        if (data) setStudent(JSON.parse(data));
      } catch (e) {
        console.log("Error loading student user:", e);
      }
    };
    loadUser();
  }, []);

  const formattedName = formatName(student?.fullName || "User");

  // ----- Left Side -----
  const renderDefaultLeft = () => {
    if (leftComponent) return leftComponent;
    if (showGreeting)
      return <HeaderGreeting name={student?.fullName || "User"} />;
    return null;
  };

  // ----- Right Side -----
  const renderDefaultRight = () => {
    if (rightComponent) return rightComponent;

    return (
      <View style={styles.actionsContainer}>
        {showNotification && (
          <HeaderAction
            icon={<Bell color={colors.primaryDark} size={24} />}
            onPress={onNotificationPress || (() => {})}
            badge={3}
          />
        )}

        {showProfile && (
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/profile")}
            style={styles.profileImageContainer}
          >
            {student?.avatarUri ? (
              <Image
                source={{ uri: student.avatarUri }}
                style={styles.profileImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.initialFallback}>
                <Text style={styles.initialText}>{formattedName.charAt(0)}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }, style]}>
      <View style={styles.content}>
        <View style={styles.leftContainer}>{renderDefaultLeft()}</View>
        <View style={styles.rightContainer}>{renderDefaultRight()}</View>
      </View>

      {title && <Text style={styles.title}>{title}</Text>}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    paddingBottom: 5,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainer: {
    flex: 1,
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  greetingContainer: { paddingVertical: 8 },
  greetingText: {
    fontSize: 16,
    color: Colors.light.secondaryText,
  },
  userName: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.primaryDark,
    marginTop: 2,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.primaryDark,
    marginTop: 12,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    marginTop: 4,
  },

  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  actionButton: {
    padding: 8,
    position: "relative",
  },
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
  badgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },

  profileImageContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.primaryDark,
    marginLeft: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: { width: "100%", height: "100%" },

  initialFallback: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.primaryDark,
    justifyContent: "center",
    alignItems: "center",
  },
  initialText: {
    fontSize: 18,
    color: "white",
    fontWeight: "700",
  },
});

export default Header;
