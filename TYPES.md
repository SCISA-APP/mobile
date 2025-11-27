# Type System Documentation

This document outlines the type system architecture for the mobile application. The types are organized into logical categories for better maintainability and reusability.

## Table of Contents

- [Models](#models)
  - [EventItem](#eventitem)
  - [AnnouncementItem](#announcementitem)
- [Navigation](#navigation)
  - [RootStackParamList](#rootstackparamlist)
  - [TabsParamList](#tabsparamlist)
  - [AuthStackParamList](#authstackparamlist)
  - [StandaloneStackParamList](#standalonestackparamlist)
- [Props](#props)
  - [EventListProps](#eventlistprops)
  - [ListComponentProps](#listcomponentprops)
  - [Screen Props](#screen-props)
- [Usage Examples](#usage-examples)

## Models

### EventItem

Base interface for event-related data.

```typescript
interface EventItem {
  id: number | string;
  title: string;
  description: string;
  image?: string;
  date: string;
  thumbnail?: string;
}
```

### AnnouncementItem

Extends `EventItem` with announcement-specific properties.

```typescript
interface AnnouncementItem extends EventItem {
  thumbnail?: string;
  image?: string; // Explicitly included for ListComponent compatibility
}
```

## Navigation

### RootStackParamList

Root navigation stack parameters.

```typescript
type RootStackParamList = {
  '(tabs)': undefined;
  '(auth)': undefined;
  '(standalone)': undefined;
};
```

### TabsParamList

Bottom tab navigation parameters.

```typescript
type TabsParamList = {
  home: undefined;
  academics: undefined;
  store: undefined;
  welfare: undefined;
  profile: undefined;
};
```

### AuthStackParamList

Authentication flow navigation parameters.

```typescript
type AuthStackParamList = {
  index: undefined;
  login: undefined;
  signup: undefined;
  forgotPassword: undefined;
  welcome: undefined;
};
```

### StandaloneStackParamList

Parameters for standalone screens.

```typescript
type StandaloneStackParamList = {
  'event-details': {
    id: string | number;
    title: string;
    description: string;
    image?: string;
    date?: string;
  };
};
```

## Props

### EventListProps

Props for the EventList component.

```typescript
interface EventListProps {
  headerTitle: string;
  data: EventItem[];
  onPressItem?: (item: EventItem) => void;
  emptyTitle?: string;
  emptyDescription?: string;
}
```

### ListComponentProps

Props for the ListComponent.

```typescript
interface ListComponentProps {
  headerTitle: string;
  data: AnnouncementItem[];
  onPressItem?: (item: AnnouncementItem) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  style?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<TextStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  dateStyle?: StyleProp<TextStyle>;
}
```

### Screen Props

#### HomeScreenProps

```typescript
interface HomeScreenProps {
  // Add any specific props for the home screen
}
```

#### EventDetailScreenProps

```typescript
interface EventDetailScreenProps {
  route: {
    params: StandaloneStackParamList['event-details'];
  };
  navigation: any; // Consider using proper navigation type
}
```

## Usage Examples

### Importing Types

```typescript
// Importing model types
import { EventItem, AnnouncementItem } from '@/types/models';

// Importing navigation types
import { 
  RootStackParamList,
  TabsParamList,
  AuthStackParamList,
  StandaloneStackParamList 
} from '@/types/navigation';

// Importing component prop types
import { 
  EventListProps, 
  ListComponentProps 
} from '@/types/props';
```

### Using in Components

```typescript
import React from 'react';
import { ListComponentProps } from '@/types/props';

const MyComponent: React.FC<ListComponentProps> = ({
  headerTitle,
  data,
  onPressItem,
  // ... other props
}) => {
  // Component implementation
};
```

## Best Practices

1. **Type Safety**: Always use proper TypeScript types for all props and state.
2. **Reusability**: Place shared types in the appropriate category under `types/`.
3. **Documentation**: Keep this document updated when adding or modifying types.
4. **Imports**: Always import types from their respective index files (e.g., `@/types/models`).
5. **Naming**: Use clear, descriptive names that reflect the type's purpose.

## Type Organization

```
types/
├── models/            # Data models and interfaces
│   ├── event.ts
│   ├── announcement.ts
│   └── index.ts
├── navigation/        # Navigation type definitions
│   ├── root.ts
│   ├── tabs.ts
│   ├── auth.ts
│   ├── standalone.ts
│   └── index.ts
├── props/             # Component prop types
│   ├── components.ts
│   ├── screens.ts
│   └── index.ts
└── index.ts           # Main export file
```
