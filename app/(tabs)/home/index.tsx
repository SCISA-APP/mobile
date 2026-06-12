import EventCard from '@/components/cards/EventCard';
import FeedCard from '@/components/cards/FeedCard';
import HeroCard from '@/components/cards/HeroCard';
import PastEventCard from '@/components/cards/PastEventCard';
import ExecutiveSectionCards from '@/components/cards/ExecutiveSectionCards';
import HomeHeader from '@/components/headers/HomeHeader';
import SectionHeader from '@/components/Section/SectionHeader';
import HostelHubbBanner from '@/components/carousel/HostelHubbBanner';
import { fetchEvents, fetchFeeds } from '@/api/article';
import { EventItem } from '@/types/models/event';
import { FeedItem } from '@/types/models/feed';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

const NAVY     = '#002259';
const NAVY_MID = '#003080';

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading]       = useState(true);
  const [occasions, setOccasions]   = useState<EventItem[]>([]);
  const [feeds, setFeeds]           = useState<FeedItem[]>([]);

  const loadData = async () => {
    try {
      const [eventsData, feedsData] = await Promise.all([fetchEvents(), fetchFeeds()]);
      setOccasions(eventsData);
      setFeeds(feedsData);
    } catch (err) {
      console.error('[HomeScreen] Failed to load data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadData().finally(() => setRefreshing(false));
  }, []);

  const { nextUp, ongoing, upcoming, past } = useMemo(() => {
    const now = new Date();

    const effectiveEnd = (e: EventItem) => new Date(e.end_date ?? e.date);
    const isMultiDay   = (e: EventItem) => !!e.end_date && e.end_date !== e.start_date;
    const hasStarted   = (e: EventItem) => new Date(e.start_date) <= now;
    const isOngoing    = (e: EventItem) => isMultiDay(e) && hasStarted(e) && effectiveEnd(e) >= now;
    const isNotStarted = (e: EventItem) => new Date(e.start_date) > now;

    const past = occasions
      .filter(e => effectiveEnd(e) < now)
      .sort((a, b) => new Date(b.start_date).getTime() - new Date(a.start_date).getTime());

    const active = occasions.filter(e => effectiveEnd(e) >= now);

    const notStarted = active
      .filter(isNotStarted)
      .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

    // Ongoing = active multi-day events that have already started
    const ongoingList = active
      .filter(isOngoing)
      .sort((a, b) => new Date(a.end_date ?? a.date).getTime() - new Date(b.end_date ?? b.date).getTime()); // soonest ending first

    let heroPool: EventItem[];

    if (notStarted.length > 0) {
      heroPool = notStarted.sort((a, b) => {
        const timeDiff = new Date(a.start_date).getTime() - new Date(b.start_date).getTime();
        if (timeDiff !== 0) return timeDiff;
        const aMulti = isMultiDay(a) ? 1 : 0;
        const bMulti = isMultiDay(b) ? 1 : 0;
        return aMulti - bMulti;
      });
    } else if (ongoingList.length > 0) {
      // No upcoming events — fall back to ongoing as hero, remove it from ongoing section
      heroPool = ongoingList;
    } else {
      heroPool = [];
    }

    const nextUp = heroPool[0] ?? null;

    // Ongoing section: all ongoing EXCEPT the one used as hero fallback
    const ongoing = notStarted.length > 0
      ? ongoingList                                          // hero is from notStarted, show all ongoing
      : ongoingList.filter(e => e.id !== nextUp?.id);       // hero is an ongoing, exclude it

    // Upcoming: not-started events excluding the hero
    const upcoming = notStarted
      .filter(e => e.id !== nextUp?.id)
      .sort((a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime());

    return { nextUp, ongoing, upcoming, past };
  }, [occasions]);

 const goEvent = (item: EventItem) =>
  router.push({
    pathname: '/(standalone)/event/[event_id]',
    params: {
      event_id:    item.id.toString(),
      title:       item.title,
      description: item.description,
      image:       item.image ?? '',
      date:        item.date,
      start_date:  item.start_date,
      end_date:    item.end_date ?? '',
    },
  } as any);

  const goFeed = (item: FeedItem) =>
    router.push({
      pathname: '/(standalone)/feed/[feed_id]',
      params: {
        feed_id:     item.id.toString(),
        title:       item.title,
        description: item.description,
        image:       item.image ?? '',
        date:        item.date,
      },
    } as any);

  if (loading) {
    return (
      <View style={[styles.root, styles.loadingRoot]}>
        <StatusBar barStyle="light-content" backgroundColor={NAVY} />
        <ActivityIndicator size="large" color={NAVY_MID} />
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />
      <HomeHeader />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={NAVY_MID}
            colors={[NAVY_MID]}
          />
        }
      >
        {/* ── Next Up ── */}
        {nextUp && (
          <>
            <SectionHeader title="Next Up" sub="Coming soon to SCISA" />
            <HeroCard item={nextUp} onPress={() => goEvent(nextUp)} />
          </>
        )}

        {/* ── Ongoing Events ── */}
        {ongoing.length > 0 && (
          <>
            <SectionHeader title="Ongoing" sub="Happening right now" />
            <FlatList
              horizontal
              data={ongoing}
              keyExtractor={(e) => String(e.id)}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.eventList}
              renderItem={({ item }) => (
                <EventCard item={item} onPress={() => goEvent(item)} />
              )}
            />
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
        <SectionHeader title="Your Executives" sub="The people leading SCISA" />
<ExecutiveSectionCards />

        {/* ── News & Updates ── */}
        {feeds.length > 0 && (
          <>
            <SectionHeader title="News & Updates" sub="What's happening at SCISA" />
            {feeds.map((item, i) => (
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

const styles = StyleSheet.create({
  root:        { flex: 1, backgroundColor: '#F2F4F7' },
  loadingRoot: { justifyContent: 'center', alignItems: 'center' },
  scroll:      { paddingBottom: 120 },
  eventList:   { paddingHorizontal: 16, gap: 12, paddingBottom: 20 },
});