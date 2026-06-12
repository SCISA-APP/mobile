export interface FeedItem {
  id: number;
  title: string;
  description: string;
  date: string;        // derived from created_at
  image?: string;
}