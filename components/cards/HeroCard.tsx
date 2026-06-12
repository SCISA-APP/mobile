import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { EventItem } from '@/types/models/event';

const NAVY     = '#002259';
const NAVY_MID = '#003080';

export default function HeroCard({ item, onPress }: { item: EventItem; onPress: () => void }) {
  return (
    <Animated.View entering={FadeInDown.duration(380).springify()} style={styles.heroWrap}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.88} style={styles.heroCard}>
        {item.image
          ? <Image source={{ uri: item.image }} style={styles.heroImage} resizeMode="cover" />
          : <View style={[styles.heroImage, { backgroundColor: NAVY_MID }]} />}

        <View style={styles.heroChip}>
          <Ionicons name="calendar-outline" size={11} color="rgba(255,255,255,0.85)" />
          <Text style={styles.heroChipText}>
            {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
          </Text>
        </View>

        <LinearGradient
          colors={['transparent', 'rgba(0,21,64,0.92)']}
          style={styles.heroOverlay}
        >
          <Text style={styles.heroLabel}>NEXT UP</Text>
          <Text style={styles.heroTitle}>{item.title}</Text>
          <Text style={styles.heroDesc} numberOfLines={2}>{item.description}</Text>
          <View style={styles.heroCta}>
            <Text style={styles.heroCtaText}>View details</Text>
            <Ionicons name="arrow-forward-circle-outline" size={17} color="rgba(255,255,255,0.8)" />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  heroWrap: { marginHorizontal: 16, marginBottom: 20 },
  heroCard: {
    height: 210, borderRadius: 20, overflow: 'hidden',
    shadowColor: NAVY, shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2, shadowRadius: 14, elevation: 7,
  },
  heroImage: { width: '100%', height: 210, position: 'absolute' },
  heroChip: {
    position: 'absolute', top: 14, left: 14,
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: 'rgba(0,34,89,0.55)',
    borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5,
  },
  heroChipText: { fontSize: 11, color: '#fff', fontWeight: '600' },
  heroOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16 },
  heroLabel: { fontSize: 9, fontWeight: '800', color: 'rgba(255,255,255,0.55)', letterSpacing: 1.5, marginBottom: 4 },
  heroTitle: { fontSize: 19, fontWeight: '800', color: '#fff', letterSpacing: -0.3 },
  heroDesc: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4, lineHeight: 17 },
  heroCta: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 10 },
  heroCtaText: { fontSize: 12, fontWeight: '700', color: 'rgba(255,255,255,0.85)' },
});