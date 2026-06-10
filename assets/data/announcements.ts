
import { AnnouncementItem } from "@/types/models";


export const announcements: AnnouncementItem[] = [
  {
    id: 1,
    title: 'School Reopening',
    description: 'School reopens on September 1st. All students are expected to be present by 7:30 AM.',
    date: '2023-08-20',
    image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    // 📸 School building / entrance
  },
  {
    id: 2,
    title: 'Parent-Teacher Meeting',
    description: 'Scheduled for September 10th. Please confirm your attendance.',
    date: '2023-08-25',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
    // 📸 Parents & teachers in a meeting
  },
  {
    id: 3,
    title: 'Library Hours Extended',
    description: 'Library will now remain open until 6 PM on weekdays.',
    date: '2023-08-18',
    thumbnail: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
    // 📸 Cozy library scene
  },
];
