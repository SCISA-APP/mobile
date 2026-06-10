import { occasions } from '@/assets/data/events';
import { feeds } from '@/assets/data/feeds';
import colors from '@/constants/colors';
import EventCard from '@/components/cards/EventCard';
import FeedCard from '@/components/cards/FeedCard';
import HomeHeader from '@/components/headers/HomeHeader';
import HostelHubbBanner from '@/components/carousel/HostelHubbBanner';
import { EventItem } from '@/types/models/event';
import { FeedItem } from '@/types/models/feed';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const NAVY     = '#002259';
const NAVY_MID = '#003080';

// ── Date helpers ──────────────────────────────────────────────────────────────
const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};
const parseDate = (s: string) => new Date(s);

// ── Hero card ─────────────────────────────────────────────────────────────────
function HeroCard({ item, onPress }: { item: EventItem; onPress: () => void }) {
  return (
    <Animated.View entering={FadeInDown.duration(380).springify()} style={styles.heroWrap}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.88} style={styles.heroCard}>
        {item.image
          ? <Image source={{ uri: item.image }} style={styles.heroImage} resizeMode="cover" />
          : <View style={[styles.heroImage, { backgroundColor: NAVY_MID }]} />}

        <View style={styles.heroChip}>
          <Ionicons name="calendar-outline" size={11} color="rgba(255,255,255,0.85)" />
          <Text style={styles.heroChipText}>{item.date}</Text>
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

// ── Past event card ───────────────────────────────────────────────────────────
function PastEventCard({ item, index, onPress }: {
  item: EventItem; index: number; onPress: () => void;
}) {
  return (
    <Animated.View entering={FadeInDown.delay(index * 70).duration(340).springify()}>
      <TouchableOpacity style={styles.pastCard} onPress={onPress} activeOpacity={0.85}>
        {item.image
          ? <Image source={{ uri: item.image }} style={styles.pastImage} resizeMode="cover" />
          : <View style={[styles.pastImage, { backgroundColor: NAVY_MID }]} />}
        <LinearGradient
          colors={['transparent', 'rgba(0,21,64,0.85)']}
          style={styles.pastOverlay}
        >
          <View style={styles.pastChip}>
            <Text style={styles.pastChipText}>Past</Text>
          </View>
          <Text style={styles.pastTitle} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.pastDate}>{item.date}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ── Section header ────────────────────────────────────────────────────────────
function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {sub && <Text style={styles.sectionSub}>{sub}</Text>}
    </View>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────
export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  // ── Partition events by date ──
  const { nextUp, upcoming, past } = useMemo(() => {
    const now = today();
    const future = occasions
      .filter(e => parseDate(e.date) >= now)
      .sort((a, b) => parseDate(a.date).getTime() - parseDate(b.date).getTime());

    const past = occasions
      .filter(e => parseDate(e.date) < now)
      .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()); // latest past first

    return {
      nextUp: future[0] ?? null,        // closest upcoming
      upcoming: future.slice(1),        // rest of future (exclude nextUp)
      past,
    };
  }, []);

  // ── Feeds sorted latest first ──
  const sortedFeeds = useMemo(
    () => [...feeds].sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime()),
    [],
  );

  const goEvent = (item: EventItem) =>
    router.push({
      pathname: '/(standalone)/event/[event_id]',
      params: {
        event_id: item.id.toString(),
        title: item.title,
        description: item.description,
        image: item.image,
        date: item.date,
      },
    } as any);

  const goFeed = (item: FeedItem) =>
    router.push({
      pathname: '/(standalone)/feed/[feed_id]',
      params: {
        feed_id: item.id.toString(),
        title: item.title,
        description: item.description,
        image: item.image,
        date: item.date,
      },
    } as any);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />
      <HomeHeader />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
            tintColor={NAVY_MID} colors={[NAVY_MID]} />
        }
      >
        {/* ── Next Up ── */}
        {nextUp && (
          <>
            <SectionHeader title="Next Up" sub="Coming soon to SCISA" />
            <HeroCard item={nextUp} onPress={() => goEvent(nextUp)} />
          </>
        )}

        {/* ── Upcoming Events ── */}
        {upcoming.length > 0 && (
          <>
            <SectionHeader title="Upcoming Events" sub={`${upcoming.length} scheduled`} />
            <FlatList
              horizontal
              data={upcoming}
              keyExtractor={(e) => String(e.id)}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.eventList}
              renderItem={({ item }) => (
                <EventCard item={item} onPress={() => goEvent(item)} />
              )}
            />
          </>
        )}

        {/* ── Student Resources ── */}
        <SectionHeader title="Student Resources" sub="Recommended for you" />
        <HostelHubbBanner />

        {/* ── News & Feeds ── */}
        {sortedFeeds.length > 0 && (
          <>
            <SectionHeader title="News & Updates" sub="What's happening at SCISA" />
            {sortedFeeds.map((item, i) => (
              <FeedCard key={item.id} item={item} index={i} onPress={() => goFeed(item)} />
            ))}
          </>
        )}

        {/* ── Past Events ── */}
        {past.length > 0 && (
          <>
            <SectionHeader title="Past Events" sub="Recently concluded" />
            <FlatList
              horizontal
              data={past}
              keyExtractor={(e) => String(e.id)}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.eventList}
              renderItem={({ item, index }) => (
                <PastEventCard item={item} index={index} onPress={() => goEvent(item)} />
              )}
            />
          </>
        )}
      </ScrollView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F2F4F7' },
  scroll: { paddingBottom: 120 },

  sectionHeader: { marginHorizontal: 20, marginTop: 6, marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.text.primary, letterSpacing: -0.2 },
  sectionSub: { fontSize: 12, color: colors.gray[500], marginTop: 1 },

  // Hero
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

  // Past event card
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

  eventList: { paddingHorizontal: 16, gap: 12, paddingBottom: 20 },
});