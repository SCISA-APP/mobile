// components/home/EventCard.tsx
import colors from '@/constants/colors';
import { EventItem } from '@/types/models/event';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

const { width } = Dimensions.get('window');
const NAVY = '#002259';
export const EVENT_CARD_W = width * 0.72;

interface Props {
  item: EventItem;
  onPress: () => void;
}

export default function EventCard({ item, onPress }: Props) {
  return (
    <TouchableOpacity style={styles.eventCard} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.eventImgWrap}>
        {item.image ? (
          <Animated.Image
            entering={FadeIn.duration(350)}
            source={{ uri: item.image }}
            style={styles.eventImg}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.eventImg, { backgroundColor: colors.gray[200] }]} />
        )}
        <LinearGradient
          colors={['transparent', 'rgba(0,21,64,0.75)']}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.eventDatePill}>
          <Text style={styles.eventDateText}>{item.date}</Text>
        </View>
      </View>
      <View style={styles.eventBody}>
        <Text style={styles.eventTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.eventDesc} numberOfLines={2}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  eventCard: {
    width: EVENT_CARD_W,
    backgroundColor: '#fff',
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: NAVY,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 8,
    elevation: 4,
  },
  eventImgWrap: { height: 130 },
  eventImg: { width: '100%', height: 130 },
  eventDatePill: {
    position: 'absolute',
    bottom: 8,
    left: 10,
    backgroundColor: `${NAVY}CC`,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  eventDateText: { fontSize: 10, color: '#fff', fontWeight: '700' },
  eventBody: { padding: 12 },
  eventTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 3,
  },
  eventDesc: { fontSize: 12, color: colors.gray[500], lineHeight: 17 },
});