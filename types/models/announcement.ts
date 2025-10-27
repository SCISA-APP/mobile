import { EventItem } from "./event";

export interface AnnouncementItem extends EventItem {
  thumbnail?: string;
  image?: string;
  Num_comments?: number;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  createdAt: Date;
}
