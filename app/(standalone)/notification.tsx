import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { Bell, Heart, Star, CheckCircle } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  NotificationItem,
  NotificationType,
} from "@/types/models/notification";

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      title: "New Review!",
      message: "Sarah left a 5⭐ review on your hostel.",
      type: "review",
      time: "5 min ago",
      read: false,
      dateGroup: "Today",
    },
    {
      id: "2",
      title: "Booking Confirmed!",
      message: "Michael booked a room in Hostel Haven.",
      type: "booking",
      time: "30 min ago",
      read: true,
      dateGroup: "Today",
    },
    {
      id: "3",
      title: "New Like ❤️",
      message: "Anna liked your recent post.",
      type: "like",
      time: "Yesterday",
      read: true,
      dateGroup: "Earlier",
    },
    {
      id: "4",
      title: "App Update",
      message: "New amenities section added to HostelHubb.",
      type: "general",
      time: "2 days ago",
      read: false,
      dateGroup: "Earlier",
    },
  ]);

  const renderIcon = (type: NotificationType) => {
    switch (type) {
      case "like":
        return <Heart color="#FF3366" size={22} />;
      case "review":
        return <Star color="#FFD700" size={22} />;
      case "booking":
        return <CheckCircle color="#00C851" size={22} />;
      default:
        return <Bell color="#800020" size={22} />;
    }
  };

  const handleMarkAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const groupedData = ["Today", "Earlier"].map((group) => ({
    title: group,
    data: notifications.filter((n) => n.dateGroup === group),
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <FlatList
        data={groupedData}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <View>
            {item.data.length > 0 && (
              <Text style={styles.groupTitle}>{item.title}</Text>
            )}

            {item.data.map((notif, index) => (
              <Animated.View
                key={notif.id}
                entering={FadeInUp.delay(index * 100).springify()}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => handleMarkAsRead(notif.id)}
                  style={[styles.card, notif.read && { opacity: 0.9 }]}
                >
                  <LinearGradient
                    colors={
                      notif.read
                        ? ["#FFFFFF", "#F9F9F9"]
                        : ["#FFF5F8", "#FFEAF1"]
                    }
                    style={styles.gradient}
                  >
                    <View style={styles.iconContainer}>
                      {renderIcon(notif.type)}
                    </View>

                    <View style={styles.textContainer}>
                      <Text style={styles.title}>{notif.title}</Text>
                      <Text style={styles.message}>{notif.message}</Text>
                      <Text style={styles.time}>{notif.time}</Text>
                    </View>

                    {!notif.read && <View style={styles.unreadDot} />}
                  </LinearGradient>
                </TouchableOpacity>
              </Animated.View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fafafa",
    paddingHorizontal: 16,
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: "#800020",
    marginBottom: 10,
  },
  groupTitle: {
    fontSize: 15,
    color: "#555",
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 6,
  },
  card: {
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  gradient: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: 14,
    borderRadius: 18,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.6)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
    marginBottom: 3,
  },
  message: {
    fontSize: 13,
    color: "#555",
    lineHeight: 18,
  },
  time: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#800020",
    alignSelf: "flex-start",
    marginTop: 6,
    marginLeft: 4,
  },
});

export default NotificationScreen;
