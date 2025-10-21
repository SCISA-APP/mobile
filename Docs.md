# React Native Components

This directory contains reusable UI components for the mobile application.

## Table of Contents

- [EventList](#eventlist)
- [ListComponent](#listcomponent)
- [Type Definitions](#type-definitions)
- [Installation](#installation)

## EventList

A scrollable horizontal list component for displaying events with images, titles, descriptions, and dates.

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `headerTitle` | `string` | Yes | - | Title displayed above the list |
| `data` | `EventItem[]` | Yes | - | Array of event items to display |
| `onPressItem` | `(item: EventItem) => void` | No | - | Callback when an item is pressed |
| `emptyTitle` | `string` | No | "No upcoming events" | Text to show when the list is empty |
| `emptyDescription` | `string` | No | - | Additional text to show below empty title |
| `style` | `StyleProp<ViewStyle>` | No | - | Container style |
| `headerStyle` | `StyleProp<TextStyle>` | No | - | Header text style |
| `itemStyle` | `StyleProp<ViewStyle>` | No | - | Individual item container style |
| `imageStyle` | `StyleProp<ImageStyle>` | No | - | Event image style |
| `titleStyle` | `StyleProp<TextStyle>` | No | - | Event title text style |
| `descriptionStyle` | `StyleProp<TextStyle>` | No | - | Event description text style |
| `dateStyle` | `StyleProp<TextStyle>` | No | - | Event date text style |

### Example Usage

```typescript
import EventList from '@/components/ui/EventList';

const events = [
  {
    id: '1',
    title: 'Summer Festival',
    description: 'Join us for a day of music and fun!',
    image: 'https://example.com/festival.jpg',
    date: '2023-07-15',
  },
  // ... more events
];

function EventsScreen() {
  return (
    <EventList
      headerTitle="Upcoming Events"
      data={events}
      onPressItem={(item) => console.log('Event pressed:', item)}
    />
  );
}
```

## ListComponent

A vertical list component for displaying announcements or feed items with support for both full-width and thumbnail images.

### Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `headerTitle` | `string` | Yes | - | Title displayed above the list |
| `data` | `AnnouncementItem[]` | Yes | - | Array of announcement items |
| `onPressItem` | `(item: AnnouncementItem) => void` | No | - | Callback when an item is pressed |
| `emptyTitle` | `string` | No | "No posts yet" | Text to show when the list is empty |
| `emptyDescription` | `string` | No | "Check back later for announcements" | Additional text to show below empty title |
| `style` | `StyleProp<ViewStyle>` | No | - | Container style |
| `headerStyle` | `StyleProp<TextStyle>` | No | - | Header text style |
| `itemStyle` | `StyleProp<ViewStyle>` | No | - | Individual item container style |
| `imageStyle` | `StyleProp<ImageStyle>` | No | - | Image style (applies to both full-width and thumbnail images) |
| `titleStyle` | `StyleProp<TextStyle>` | No | - | Item title text style |
| `descriptionStyle` | `StyleProp<TextStyle>` | No | - | Item description text style |
| `dateStyle` | `StyleProp<TextStyle>` | No | - | Item date text style |

### Example Usage

```typescript
import ListComponent from '@/components/ui/ListComponent';

const announcements = [
  {
    id: '1',
    title: 'Campus Maintenance',
    description: 'Scheduled maintenance this weekend. Some services may be unavailable.',
    date: '2023-06-25',
    // For full-width image:
    image: 'https://example.com/maintenance.jpg',
    // Or for thumbnail:
    // thumbnail: 'https://example.com/thumbnail.jpg'
  },
  // ... more announcements
];

function AnnouncementsScreen() {
  return (
    <ListComponent
      headerTitle="Latest Updates"
      data={announcements}
      onPressItem={(item) => console.log('Item pressed:', item)}
    />
  );
}
```

## Type Definitions

Both components use the following type definitions from `@/types`:

```typescript
interface EventItem {
  id: number | string;
  title: string;
  description: string;
  image?: string;
  date: string;
  thumbnail?: string;
}

interface AnnouncementItem extends EventItem {
  // Can include additional announcement-specific properties
}
```

## Installation

These components are part of the main application and don't require separate installation. They can be imported directly from their respective paths:

```typescript
import EventList from '@/components/ui/EventList';
import ListComponent from '@/components/ui/ListComponent';
```

## Styling

Both components support custom styling through their props. You can override the default styles by passing style objects to the appropriate style props.

## Dependencies

- React Native
- React Native Reanimated (for animations in EventList)
- Expo Router (for navigation in EventList)

## Contributing

When making changes to these components, please ensure:
1. All TypeScript types are properly defined
2. All required props are documented
3. Default values are provided where appropriate
4. Performance optimizations (like memoization) are maintained
