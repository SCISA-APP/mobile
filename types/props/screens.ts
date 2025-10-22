import { StandaloneStackParamList } from '../navigation/standalone';

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
