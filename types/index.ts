// Common types used across the application

export interface EventItem {
  id: number | string;
  title: string;
  description: string;
  image?: string;
  date: string;
  thumbnail?: string;
}

export interface AnnouncementItem extends EventItem {
  thumbnail?: string;
  // Explicitly include image as it's used in ListComponent
  image?: string;
}

// Navigation types
export type RootStackParamList = {
  '(tabs)': undefined;
  '(auth)': undefined;
  '(standalone)': undefined;
};

export type TabsParamList = {
  home: undefined;
  academics: undefined;
  store: undefined;
  welfare: undefined;
  profile: undefined;
};

export type AuthStackParamList = {
  index: undefined;
  login: undefined;
  signup: undefined;
  forgotPassword: undefined;
  welcome: undefined;
};

export type StandaloneStackParamList = {
  'event-details': {
    id: string | number;
    title: string;
    description: string;
    image?: string;
    date?: string;
  };
};

// Component Props
export interface EventListProps {
  headerTitle: string;
  data: EventItem[];
  onPressItem?: (item: EventItem) => void;
  emptyTitle?: string;
  emptyDescription?: string;
}

export interface ListComponentProps {
  headerTitle: string;
  data: AnnouncementItem[];
  onPressItem?: (item: AnnouncementItem) => void;
  emptyTitle?: string;
  emptyDescription?: string;
}

// Screen Props
export interface HomeScreenProps {
  // Add any specific props for the home screen
}

export interface EventDetailScreenProps {
  route: {
    params: StandaloneStackParamList['event-details'];
  };
  navigation: any; // You might want to properly type this with the correct navigation type
}
