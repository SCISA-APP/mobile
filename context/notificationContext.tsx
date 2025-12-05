// context/NotificationContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/supabaseConfig";
import { useCachedUser } from "@/utils/authUtils/getCachedUser";

// --------------------------------------------
// 🔹 Notification Type
// --------------------------------------------
export type Notification = {
  id: string;
  user_id: string | null;
  title: string | null;
  message: string;
  is_read: boolean;
  for_all: boolean;
  created_at: string;
};

// --------------------------------------------
// 🔹 Context Type
// --------------------------------------------
type NotificationContextType = {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  refreshNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
};

// --------------------------------------------
// 🔹 Create Context
// --------------------------------------------
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// --------------------------------------------
// 🔹 Provider
// --------------------------------------------
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const user = useCachedUser();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // --------------------------------------------
  // 🔥 FETCH NOTIFICATIONS
  // --------------------------------------------
  const fetchNotifications = async () => {
    if (!user) return;
    setLoading(true);

    const { data, error } = await supabase
      .from("notifications")
      .select("*")
      .or(`user_id.eq.${user.id},for_all.eq.true`)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Fetch notifications error:", error);
      setLoading(false);
      return;
    }

    setNotifications(data || []);
    setLoading(false);
  };

  // --------------------------------------------
  // 🔄 Refresh notifications
  // --------------------------------------------
  const refreshNotifications = async () => {
    await fetchNotifications();
  };

  // --------------------------------------------
  // 🟦 Mark notification as read
  // --------------------------------------------
  const markAsRead = async (id: string) => {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id);

    if (error) {
      console.error("❌ Failed to mark notification as read:", error);
      return;
    }

    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  // --------------------------------------------
  // 🔥 Realtime subscription (optional)
  // --------------------------------------------
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel("notifications-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "notifications" },
        () => fetchNotifications()
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [user]);

  // --------------------------------------------
  // 🔥 Initial fetch
  // --------------------------------------------
  useEffect(() => {
    fetchNotifications();
  }, [user]);

  // --------------------------------------------
  // 🔹 Unread notifications count
  // --------------------------------------------
  const unreadCount = notifications.filter((n) => !n.is_read).length;

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, loading, refreshNotifications, markAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

// --------------------------------------------
// 🟣 Hook to use notifications anywhere
// --------------------------------------------
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
};
