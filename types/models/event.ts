export interface EventItem {
  id: number | string;
  title: string;
  description: string;
  image?: string;
  date: string;
  thumbnail?: string;
  start_date?: string | null;
  end_date?: string | null;
}
