import React from "react";
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
import { useNotifications } from "@/context/notificationContext";
import { NotificationType } from "@/types/models/notification";
import { format, isToday } from "date-fns";

const NotificationScreen = () => {
  const { notifications, markAsRead } = useNotifications();

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

  const groupedData = [
    {
      title: "Today",
      data: notifications.filter((n) => isToday(new Date(n.created_at))),
    },
    {
      title: "Earlier",
      data: notifications.filter((n) => !isToday(new Date(n.created_at))),
    },
  ];

  const isEmpty = groupedData.every((group) => group.data.length === 0);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {isEmpty ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No notifications yet</Text>
        </View>
      ) : (
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
                  entering={FadeInUp.delay(index * 80).springify()}
                >
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => markAsRead(notif.id)}
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
                        <Text style={styles.time}>
                          {format(new Date(notif.created_at), "HH:mm")}
                        </Text>
                      </View>

                      {!notif.read && <View style={styles.unreadDot} />}
                    </LinearGradient>
                  </TouchableOpacity>
                </Animated.View>
              ))}
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fafafa", paddingHorizontal: 16 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 16, color: "#999", fontWeight: "500" },
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
  textContainer: { flex: 1 },
  title: { fontSize: 15, fontWeight: "700", color: "#111", marginBottom: 3 },
  message: { fontSize: 13, color: "#555", lineHeight: 18 },
  time: { fontSize: 12, color: "#999", marginTop: 5 },
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
