export interface EventItem {
  id: number;
  title: string;
  description: string;
  image?: string;
  date: string;        // derived from start_date for display
  start_date: string;
  end_date?: string | null;
}