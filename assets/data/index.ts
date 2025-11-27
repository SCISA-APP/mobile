import { AnnouncementItem } from '@/types/models/announcement';
import { EventItem } from '@/types/models/event';

export const occasions: EventItem[] = [
  {
    id: 1,
    title: 'School Reopening',
    description: 'Welcome back students for the new academic year!',
    date: '2023-09-01',
    image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1200&q=80', 
    // 📸 Students walking into school
  },
  {
    id: 2,
    title: 'Sports Day',
    description: 'Annual sports competition between houses',
    date: '2023-10-15',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80', 
    // 📸 School sports event
  },
  {
    id: 3,
    title: 'Science Fair',
    description: 'Showcase of student science projects',
    date: '2023-11-05',
    image: 'https://cdn.babbledabbledo.com/wp-content/uploads/2017/03/20-Science-Fair-Projects-FI.jpg', 
    // 📸 Science fair / STEM projects
  },
];

export const announcements: AnnouncementItem[] = [
  {
    id: 1,
    title: 'School Reopening',
    description: 'School reopens on September 1st. All students are expected to be present by 7:30 AM.',
    date: '2023-08-20',
    image: 'https://www.gettingsmart.com/wp-content/uploads/2020/04/Brooklyn-Laboratory-Charter-School.jpg',
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
