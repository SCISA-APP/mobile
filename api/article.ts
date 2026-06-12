import { supabase } from '@/supabaseConfig';
import { EventItem } from '@/types/models/event';
import { FeedItem } from '@/types/models/feed';

export const fetchEvents = async (): Promise<EventItem[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('type', 'event')
    .order('start_date', { ascending: true });

  if (error) throw error;

  return (data || []).map((a) => ({
    id: a.id,
    title: a.title,
    description: a.description,
    image: a.image ?? undefined,
    date: a.start_date,
    start_date: a.start_date,
    end_date: a.end_date,
  }));
};

export const fetchFeeds = async (): Promise<FeedItem[]> => {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('type', 'article')
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data || []).map((a) => ({
    id: a.id,
    title: a.title,
    description: a.description,
    image: a.image ?? undefined,
    date: a.created_at,
  }));
};