export interface FeedItem {
  id: number;
  title: string;
  description: string;
  date: string;        // ISO date the feed was posted e.g. '2025-06-08'
  image?: string;
}