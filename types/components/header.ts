import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  leftComponent?: ReactNode;
  rightComponent?: ReactNode;
  style?: StyleProp<ViewStyle>;
  showGreeting?: boolean;
  showNotification?: boolean;
  showProfile?: boolean;
  onNotificationPress?: () => void;
  onProfilePress?: () => void;
}

export interface HeaderActionProps {
  icon: ReactNode;
  onPress: () => void;
  badge?: number;
}

export interface HeaderGreetingProps {
  name?: string;
  showTime?: boolean;
}
