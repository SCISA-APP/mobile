import { announcements } from '@/assets/data/announcements';
import { AnnouncementItem } from '@/types/models/announcement';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Bell } from 'lucide-react-native';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NAVY     = '#002259';
const NAVY_MID = '#003080';

// ── Helpers ───────────────────────────────────────────────────────────────────
// Sort by date descending — assumes item.date is a parseable string like "2025-06-10"
// If your dates are formatted differently, swap in your own comparator
const byLatest = (a: AnnouncementItem, b: AnnouncementItem) =>
  new Date(b.date ?? 0).getTime() - new Date(a.date ?? 0).getTime();

// ── Card ──────────────────────────────────────────────────────────────────────
function NotifCard({ item, index }: { item: AnnouncementItem; index: number }) {
  return (
    <Animated.View entering={FadeInDown.delay(index * 60).duration(340).springify()}>
      <View style={styles.card}>
        <View style={styles.accentBar} />
        <View style={styles.cardBody}>
          <View style={styles.iconBadge}>
            <Bell size={14} color={NAVY_MID} strokeWidth={2} />
          </View>

          <View style={styles.cardContent}>
            <View style={styles.metaRow}>
              <Text style={styles.metaSource}>SCISA</Text>
              <Text style={styles.metaDot}>·</Text>
              <Text style={styles.metaDate}>{item.date ?? 'Today'}</Text>
            </View>

            <Text style={styles.cardTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.cardDesc} numberOfLines={4}>{item.description}</Text>
          </View>

          {item.image && (
            <Image source={{ uri: item.image }} style={styles.thumb} resizeMode="cover" />
          )}
        </View>
      </View>
    </Animated.View>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────
export default function NotificationScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const notifications = [...announcements].sort(byLatest);

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom }]}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />

      {/* ── Header ── */}
      <LinearGradient
        colors={[NAVY, NAVY_MID]}
        style={[styles.header, { paddingTop: insets.top + 10 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.decor1} />
        <View style={styles.headerRow}>
          <Ionicons
            name="arrow-back"
            size={20}
            color="#fff"
            onPress={() => router.back()}
            style={styles.backIcon}
          />
          <Text style={styles.headerTitle}>Notifications</Text>
          {/* spacer keeps title centred */}
          <View style={{ width: 28 }} />
        </View>
      </LinearGradient>

      {/* ── List ── */}
      <FlatList
        data={notifications}
        keyExtractor={(n) => String(n.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Bell size={36} color={NAVY_MID} strokeWidth={1.5} />
            <Text style={styles.emptyText}>You're all caught up!</Text>
          </View>
        }
        renderItem={({ item, index }) => <NotifCard item={item} index={index} />}
      />
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F2F4F7' },

  header: { paddingHorizontal: 20, paddingBottom: 16, overflow: 'hidden' },
  decor1: {
    position: 'absolute', width: 160, height: 160, borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.05)', top: -40, right: -30,
  },
  headerRow: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  backIcon: { padding: 4 },
  headerTitle: { fontSize: 17, fontWeight: '800', color: '#fff' },

  list: { paddingTop: 12, paddingHorizontal: 16, paddingBottom: 40 },
  separator: { height: 8 },

  card: {
    flexDirection: 'row', backgroundColor: '#fff',
    borderRadius: 16, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 5, elevation: 2,
  },
  accentBar: { width: 3, backgroundColor: NAVY_MID },
  cardBody: { flex: 1, flexDirection: 'row', padding: 12, gap: 10 },
  iconBadge: {
    width: 30, height: 30, borderRadius: 15,
    backgroundColor: 'rgba(0,48,128,0.08)',
    justifyContent: 'center', alignItems: 'center',
    marginTop: 2,
  },
  cardContent: { flex: 1 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 3 },
  metaSource: { fontSize: 10, fontWeight: '700', color: NAVY_MID, textTransform: 'uppercase', letterSpacing: 0.5 },
  metaDot: { fontSize: 10, color: '#bbb' },
  metaDate: { fontSize: 10, color: '#999' },
  cardTitle: { fontSize: 13, fontWeight: '700', color: '#111', lineHeight: 18, marginBottom: 3 },
  cardDesc: { fontSize: 12, color: '#666', lineHeight: 17 },
  thumb: { width: 60, height: 60, borderRadius: 10, alignSelf: 'center' },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 80, gap: 12 },
  emptyText: { fontSize: 15, color: '#999', fontWeight: '600' },
});