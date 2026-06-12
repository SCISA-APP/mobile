import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { EventItem } from '@/types/models/event';

const NAVY = '#002259';

export default function PastEventCard({ item, index, onPress }: {
  item: EventItem; index: number; onPress: () => void;
}) {
  return (
    <Animated.View entering={FadeInDown.delay(index * 70).duration(340).springify()}>
      <TouchableOpacity style={styles.pastCard} onPress={onPress} activeOpacity={0.85}>
        {item.image
          ? <Image source={{ uri: item.image }} style={styles.pastImage} resizeMode="cover" />
          : <View style={[styles.pastImage, { backgroundColor: '#003080' }]} />}
        <LinearGradient
          colors={['transparent', 'rgba(0,21,64,0.85)']}
          style={styles.pastOverlay}
        >
          <View style={styles.pastChip}>
            <Text style={styles.pastChipText}>Past</Text>
          </View>
          <Text style={styles.pastTitle} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.pastDate}>
            {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  pastCard: {
    width: 160, height: 130, borderRadius: 16, overflow: 'hidden',
    shadowColor: NAVY, shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12, shadowRadius: 8, elevation: 4,
  },
  pastImage: { width: '100%', height: '100%', position: 'absolute' },
  pastOverlay: { flex: 1, justifyContent: 'flex-end', padding: 10 },
  pastChip: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 8, paddingHorizontal: 7, paddingVertical: 2, marginBottom: 5,
  },
  pastChipText: { fontSize: 9, color: 'rgba(255,255,255,0.75)', fontWeight: '700', letterSpacing: 0.8 },
  pastTitle: { fontSize: 12, fontWeight: '700', color: '#fff', lineHeight: 16 },
  pastDate: { fontSize: 10, color: 'rgba(255,255,255,0.55)', marginTop: 2 },
});