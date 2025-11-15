export type NotificationType = "like" | "review" | "booking" | "general";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  time: string;
  read: boolean;
  dateGroup: "Today" | "Earlier";
}
