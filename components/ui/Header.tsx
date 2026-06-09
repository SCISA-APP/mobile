
import colors from "@/constants/colors";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/context/AuthContext";
import {
    HeaderActionProps,
    HeaderGreetingProps,
    HeaderProps,
} from "@/types/components/header";
import { useRouter } from "expo-router";
import { Bell } from "lucide-react-native";
import React from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// Utility function to format names
const formatName = (fullName: string) => {
  if (!fullName) return "User";

  const parts = fullName.trim().split(" ");
  const len = parts.length;

  if (len === 1) return parts[0];
  if (len === 2) return `${parts[0].charAt(0)}. ${parts[1]}`;

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
      {showTime && (
        <Text style={styles.greetingText}>
          {getGreeting()}
        </Text>
      )}

      <Text style={styles.userName}>
        {formatName(name)}
      </Text>
    </View>
  );
};

export const HeaderAction: React.FC<HeaderActionProps> = ({
  icon,
  onPress,
  badge,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={styles.notificationButton}
  >
    {icon}

    {badge ? (
      <View style={styles.notificationBadge}>
        <Text style={styles.badgeText}>
          {badge > 9 ? "9+" : badge}
        </Text>
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
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const { studentUser } = useAuth();
  const student = studentUser;

  const renderDefaultLeft = () => {
    if (leftComponent) return leftComponent;

    return (
      <View style={styles.brandSection}>
        <Image
          source={require("@/assets/images/logo.jpeg")}
          style={styles.logo}
          resizeMode="contain"
        />

        {showGreeting && (
          <HeaderGreeting
            name={student?.fullName || "User"}
          />
        )}
      </View>
    );
  };

  const renderDefaultRight = () => {
    if (rightComponent) return rightComponent;

    return (
      <View style={styles.actionsContainer}>
        {showNotification && (
          <HeaderAction
            icon={
              <Bell
                color={colors.primaryDark}
                size={22}
                strokeWidth={2}
              />
            }
            onPress={() => router.push("/notification")}
            badge={3}
          />
        )}
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top },
        style,
      ]}
    >
      <View style={styles.content}>
        <View style={styles.leftContainer}>
          {renderDefaultLeft()}
        </View>

        <View style={styles.rightContainer}>
          {renderDefaultRight()}
        </View>
      </View>

      {title && (
        <Text style={styles.title}>
          {title}
        </Text>
      )}

      {subtitle && (
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    paddingBottom: 8,
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
    justifyContent: "center",
    alignItems: "center",
  },

  brandSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 52,
    height: 52,
    marginRight: 12,
  },

  greetingContainer: {
    justifyContent: "center",
  },

  greetingText: {
    fontSize: 14,
    color: Colors.light.secondaryText,
  },

  userName: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.primaryDark,
    marginTop: 2,
  },

  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  notificationButton: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#F8FAFC",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,

    elevation: 3,
  },

  notificationBadge: {
    position: "absolute",
    top: 4,
    right: 4,

    minWidth: 18,
    height: 18,
    borderRadius: 9,

    backgroundColor: "#EF4444",

    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.primaryDark,
    marginTop: 12,
  },

  subtitle: {
    fontSize: 14,
    color: Colors.light.secondaryText,
    marginTop: 4,
  },
});

export default Header;

