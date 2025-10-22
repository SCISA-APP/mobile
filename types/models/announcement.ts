import { EventItem } from './event';

export interface AnnouncementItem extends EventItem {
  thumbnail?: string;
  // Explicitly include image as it's used in ListComponent
  image?: string;
}
