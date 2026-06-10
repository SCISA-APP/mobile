import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    Image,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NAVY = '#002259';
const NAVY_MID = '#003080';

export default function EventDetail() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { title, description, image, date } = useLocalSearchParams<{
    title: string; description: string; image?: string; date?: string;
  }>();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 40 }}
      >
        <Animated.View entering={FadeInUp.duration(500)}>
          {/* Hero */}
          <View style={styles.heroWrap}>
            {image ? (
              <Image source={{ uri: image }} style={styles.heroImage} resizeMode="cover" />
            ) : (
              <LinearGradient colors={[NAVY, NAVY_MID]} style={styles.heroImage}
                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} />
            )}
            <LinearGradient
              colors={['rgba(0,22,89,0.55)', 'transparent']}
              style={styles.heroTopGrad}
            />
            <TouchableOpacity
              style={[styles.backBtn, { top: insets.top + 12 }]}
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <View style={styles.contentCard}>
            <View style={styles.metaRow}>
              <View style={styles.dateBadge}>
                <Ionicons name="calendar-outline" size={12} color={NAVY_MID} />
                <Text style={styles.dateBadgeText}>{date ?? 'Upcoming'}</Text>
              </View>
              <View style={styles.typeBadge}>
                <Text style={styles.typeBadgeText}>Event</Text>
              </View>
            </View>

            <Text style={styles.title}>{title}</Text>
            <View style={styles.divider} />
            <Text style={styles.body}>{description}</Text>
          </View>
        </Animated.View>

        {/* Info strip */}
        <Animated.View entering={FadeInDown.delay(150).duration(400)} style={styles.infoStrip}>
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="location-outline" size={18} color={NAVY_MID} />
            </View>
            <View>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>SCISA Campus</Text>
            </View>
          </View>
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="people-outline" size={18} color={NAVY_MID} />
            </View>
            <View>
              <Text style={styles.infoLabel}>Open to</Text>
              <Text style={styles.infoValue}>All Students</Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F2F4F7' },

  heroWrap: { height: 300, overflow: 'hidden' },
  heroImage: { width: '100%', height: 300 },
  heroTopGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 100 },
  backBtn: {
    position: 'absolute', left: 16,
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(0,34,89,0.5)',
    justifyContent: 'center', alignItems: 'center',
  },

  contentCard: {
    backgroundColor: '#fff',
    marginTop: -20, borderTopLeftRadius: 24, borderTopRightRadius: 24,
    padding: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.04, shadowRadius: 8, elevation: 4,
  },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  dateBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: `${NAVY_MID}12`, borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 5,
  },
  dateBadgeText: { fontSize: 12, fontWeight: '600', color: NAVY_MID },
  typeBadge: {
    backgroundColor: NAVY, borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 5,
  },
  typeBadgeText: { fontSize: 11, fontWeight: '700', color: '#fff', letterSpacing: 0.3 },

  title: {
    fontSize: 26, fontWeight: '800', color: '#1a1a1a',
    lineHeight: 32, letterSpacing: -0.3,
  },
  divider: {
    height: 3, width: 36, backgroundColor: NAVY_MID,
    borderRadius: 2, marginVertical: 16,
  },
  body: { fontSize: 16, color: '#4a4a4a', lineHeight: 26, letterSpacing: 0.1 },

  infoStrip: {
    flexDirection: 'row',
    marginHorizontal: 16, marginTop: 16,
    backgroundColor: '#fff', borderRadius: 16, padding: 16, gap: 0,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  infoItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  infoIcon: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: `${NAVY_MID}12`,
    justifyContent: 'center', alignItems: 'center',
  },
  infoLabel: { fontSize: 11, color: '#999', fontWeight: '500' },
  infoValue: { fontSize: 14, fontWeight: '700', color: '#1a1a1a', marginTop: 1 },
});
