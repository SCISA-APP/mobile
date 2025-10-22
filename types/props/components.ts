import { ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { EventItem } from '../models/event';
import { AnnouncementItem } from '../models/announcement';

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
  style?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<TextStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  dateStyle?: StyleProp<TextStyle>;
}
