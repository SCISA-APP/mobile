import { HapticTab } from "@/components/haptic-tab";
import Header from "@/components/ui/Header";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import React from "react";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();

  const bellPress = () => {
    router.push("/(standalone)/notification");
  };

  const profilePress = () => {
    router.push("/(tabs)/profile");
  };

  const renderHeader = (title?: string) => (
    <Header
      title={title}
      showGreeting={!title}
      showNotification={true}
      showProfile={true}
      onNotificationPress={bellPress}
      onProfilePress={profilePress}
    />
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? "light"].background,
          borderTopWidth: 0,
          elevation: 10,
          height: 60,
          paddingBottom: 8,
        },
        tabBarButton: HapticTab,
        header: ({ route, options }) => {
          const title = options.title || "";
          return renderHeader(title !== "Home" ? title : undefined);
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="academics/index"
        options={{
          title: "Academics",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="school" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="welfare"
        options={{
          title: "Welfare",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="hands-helping" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="store/index"
        options={{
          title: "Store",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
