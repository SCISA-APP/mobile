// src/contexts/OccasionAnnouncementContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/supabaseConfig";
import { AnnouncementItem } from "@/types/models/announcement";
import { EventItem } from "@/types/models/event";

interface OccasionAnnouncementContextProps {
  occasions: EventItem[];
  announcements: AnnouncementItem[];
  refresh: () => Promise<void>;
  loading: boolean;
}

const OccasionAnnouncementContext = createContext<OccasionAnnouncementContextProps>({
  occasions: [],
  announcements: [],
  refresh: async () => {},
  loading: false,
});

export const OccasionAnnouncementProvider = ({ children }: { children: ReactNode }) => {
  const [occasions, setOccasions] = useState<EventItem[]>([]);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles") // your table storing both types
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching items:", error);
      setLoading(false);
      return;
    }

    // Separate into occasions/events and announcements/articles
    const events: EventItem[] = [];
    const ann: AnnouncementItem[] = [];

    data?.forEach((item: any) => {
      if (item.type === "event") {
        events.push({
          id: item.id,
          title: item.title,
          description: item.description,
          date: item.date || item.created_at,
          image: item.image,
        });
      } else {
        ann.push({
          id: item.id,
          title: item.title,
          description: item.description,
          date: item.date || item.created_at,
          image: item.image,
        });
      }
    });

    setOccasions(events);
    setAnnouncements(ann);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <OccasionAnnouncementContext.Provider
      value={{ occasions, announcements, refresh: fetchData, loading }}
    >
      {children}
    </OccasionAnnouncementContext.Provider>
  );
};

export const useOccasionAnnouncement = () => useContext(OccasionAnnouncementContext);
