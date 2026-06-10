import { announcements, occasions } from '@/assets/data';
import colors from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';
import { AnnouncementItem } from '@/types/models/announcement';
import { EventItem } from '@/types/models/event';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Bell } from 'lucide-react-native';
import { useCallback, useState } from 'react';
import {
    Dimensions,
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
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const NAVY      = '#002259';
const NAVY_MID  = '#003080';
// Red is used in exactly ONE place: the live notification dot.
const ACCENT_RED = '#CC2200';
const EVENT_CARD_W = width * 0.72;

// ── Helpers ───────────────────────────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}
const firstName = (s?: string | null) => s?.trim().split(' ')[0] ?? 'Student';

// ── Feature hero card ("Next up") ─────────────────────────────────────────────
function HeroCard({ item, onPress }: { item: EventItem; onPress: () => void }) {
  return (
    <Animated.View entering={FadeInDown.duration(380).springify()} style={styles.heroWrap}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.88} style={styles.heroCard}>
        {item.image
          ? <Image source={{ uri: item.image }} style={styles.heroImage} resizeMode="cover" />
          : <View style={[styles.heroImage, { backgroundColor: NAVY_MID }]} />}

        {/* Frosted date chip */}
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

// ── Stat chip ─────────────────────────────────────────────────────────────────
function StatChip({ value, label, icon }: {
  value: string; label: string; icon: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View style={styles.statChip}>
      <View style={styles.statChipIcon}>
        <Ionicons name={icon} size={17} color={NAVY_MID} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// ── Department card ───────────────────────────────────────────────────────────
const DEPARTMENTS = [
  { id: 1, name: 'Comp.\nScience',   icon: 'code-slash-outline'   as const, hue: '#1A4FBB' },
  { id: 2, name: 'Physics',          icon: 'planet-outline'        as const, hue: '#6D28D9' },
  { id: 3, name: 'Biochemistry',     icon: 'flask-outline'         as const, hue: '#0E7490' },
  { id: 4, name: 'Mathematics',      icon: 'calculator-outline'    as const, hue: '#047857' },
  { id: 5, name: 'Optometry',        icon: 'eye-outline'           as const, hue: '#B45309' },
  { id: 6, name: 'Statistics',       icon: 'stats-chart-outline'   as const, hue: '#0369A1' },
];

function DeptCard({ dept }: { dept: typeof DEPARTMENTS[0] }) {
  return (
    <TouchableOpacity style={styles.deptCard} activeOpacity={0.78}>
      <View style={[styles.deptIconWrap, { backgroundColor: `${dept.hue}15` }]}>
        <Ionicons name={dept.icon} size={22} color={dept.hue} />
      </View>
      <Text style={styles.deptName}>{dept.name}</Text>
    </TouchableOpacity>
  );
}

// ── Event card ────────────────────────────────────────────────────────────────
function EventCard({ item, onPress }: { item: EventItem; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.eventCard} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.eventImgWrap}>
        {item.image
          ? <Animated.Image entering={FadeIn.duration(350)} source={{ uri: item.image }}
              style={styles.eventImg} resizeMode="cover" />
          : <View style={[styles.eventImg, { backgroundColor: colors.gray[200] }]} />}
        <LinearGradient colors={['transparent', 'rgba(0,21,64,0.75)']} style={StyleSheet.absoluteFillObject} />
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

// ── Feed card ─────────────────────────────────────────────────────────────────
function FeedCard({ item, index, onPress }: {
  item: AnnouncementItem; index: number; onPress: () => void;
}) {
  return (
    <Animated.View entering={FadeInDown.delay(index * 70).duration(360).springify()}>
      <TouchableOpacity style={styles.feedCard} onPress={onPress} activeOpacity={0.85}>
        {/* Navy left border, not red */}
        <View style={styles.feedBorder} />
        <View style={styles.feedContent}>
          {item.image && (
            <Image source={{ uri: item.image }} style={styles.feedThumb} resizeMode="cover" />
          )}
          <View style={styles.feedText}>
            <Text style={styles.feedTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.feedDesc} numberOfLines={2}>{item.description}</Text>
            <View style={styles.feedFooter}>
              <Text style={styles.feedDate}>{item.date ?? 'Today'}</Text>
              <View style={styles.feedCta}>
                <Text style={styles.feedCtaText}>Read</Text>
                <Ionicons name="arrow-forward" size={11} color={NAVY_MID} />
              </View>
            </View>
          </View>
        </View>
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
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { studentUser } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const goEvent = (item: EventItem) =>
    router.push({ pathname: '/(standalone)/event/[event_id]',
      params: { event_id: item.id.toString(), title: item.title,
        description: item.description, image: item.image, date: item.date } } as any);

  const goPost = (item: AnnouncementItem) =>
    router.push({ pathname: '/(standalone)/post/[post_id]',
      params: { post_id: item.id.toString(), title: item.title,
        description: item.description, image: item.image, date: item.date } } as any);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />

      {/* ── Sticky header ── */}
      <LinearGradient
        colors={[NAVY, NAVY_MID]}
        style={[styles.header, { paddingTop: insets.top + 12 }]}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      >
        {/* Subtle soft circles — no hard red slash */}
        <View style={styles.decor1} />
        <View style={styles.decor2} />

        <View style={styles.headerRow}>
          <View style={styles.headerLeft}>
            <Image source={require('@/assets/images/logo.jpeg')}
              style={styles.logo} resizeMode="contain" />
            <View style={{ flex: 1 }}>
              <Text style={styles.greeting}>{getGreeting()} 👋</Text>
              <Text style={styles.greetingName}>{firstName(studentUser?.fullName)}</Text>
              {studentUser?.program && (
                <Text style={styles.programTag} numberOfLines={1}>
                  {studentUser.program}  ·  Level {studentUser.year}
                </Text>
              )}
            </View>
          </View>

          <TouchableOpacity style={styles.notifBtn}
            onPress={() => router.push('/(standalone)/notification')} activeOpacity={0.8}>
            <Bell size={20} color="#fff" strokeWidth={2} />
            {/* Red dot — the ONE intentional red accent in the entire app */}
            <View style={styles.notifDot} />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* ── Scrollable body ── */}
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh}
            tintColor={NAVY_MID} colors={[NAVY_MID]} />
        }
      >
        {/* At-a-glance stats — student-specific context */}
        <View style={styles.glanceRow}>
          <StatChip
            value={studentUser?.year ? `${studentUser.year}` : '—'}
            label="Level"
            icon="layers-outline"
          />
          <View style={styles.glanceDivider} />
          <StatChip value="2025/26" label="Year" icon="school-outline" />
          <View style={styles.glanceDivider} />
          <StatChip value="Sem 2" label="Semester" icon="time-outline" />
          <View style={styles.glanceDivider} />
          <StatChip value={String(occasions.length)} label="Events" icon="calendar-outline" />
        </View>

        {/* Hero card */}
        {occasions.length > 0 && (
          <>
            <SectionHeader title="Next Up" sub="Coming soon to SCISA" />
            <HeroCard item={occasions[0]} onPress={() => goEvent(occasions[0])} />
          </>
        )}

        {/* Departments */}
        <SectionHeader title="Departments" sub="College of Science" />
        <FlatList
          horizontal data={DEPARTMENTS}
          keyExtractor={(d) => String(d.id)}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.deptList}
          renderItem={({ item }) => <DeptCard dept={item} />}
        />

        {/* Upcoming events */}
        <SectionHeader title="Upcoming Events" sub={`${occasions.length} scheduled`} />
        <FlatList
          horizontal data={occasions}
          keyExtractor={(e) => String(e.id)}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.eventList}
          renderItem={({ item }) => <EventCard item={item} onPress={() => goEvent(item)} />}
        />

        {/* Announcements */}
        <SectionHeader title="Announcements" sub="Latest from SCISA" />
        {announcements.map((item, i) => (
          <FeedCard key={item.id} item={item} index={i} onPress={() => goPost(item)} />
        ))}
      </ScrollView>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F2F4F7' },

  // Header
  header: { paddingHorizontal: 20, paddingBottom: 20, overflow: 'hidden', zIndex: 10 },
  decor1: {
    position: 'absolute', width: 200, height: 200, borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.05)', top: -60, right: -40,
  },
  decor2: {
    position: 'absolute', width: 120, height: 120, borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.04)', bottom: -30, left: -20,
  },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 },
  logo: { width: 46, height: 46, borderRadius: 23, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.2)' },
  greeting: { fontSize: 12, color: 'rgba(255,255,255,0.6)' },
  greetingName: { fontSize: 18, fontWeight: '800', color: '#fff' },
  programTag: { fontSize: 11, color: 'rgba(255,255,255,0.5)', marginTop: 1 },
  notifBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center', alignItems: 'center',
  },
  notifDot: {
    position: 'absolute', top: 8, right: 8,
    width: 8, height: 8, borderRadius: 4,
    backgroundColor: ACCENT_RED, borderWidth: 1.5, borderColor: NAVY,
  },

  scroll: { paddingBottom: 120 },

  // Stats
  glanceRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 16, marginTop: 14, marginBottom: 20,
    borderRadius: 16, paddingVertical: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
  },
  statChip: { flex: 1, alignItems: 'center', gap: 3 },
  statChipIcon: {
    width: 34, height: 34, borderRadius: 10,
    backgroundColor: `${NAVY_MID}12`,
    justifyContent: 'center', alignItems: 'center', marginBottom: 2,
  },
  statValue: { fontSize: 14, fontWeight: '800', color: colors.text.primary },
  statLabel: { fontSize: 10, color: colors.gray[500] },
  glanceDivider: { width: 1, height: 32, backgroundColor: colors.gray[100] },

  // Section header
  sectionHeader: { marginHorizontal: 20, marginTop: 6, marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.text.primary, letterSpacing: -0.2 },
  sectionSub: { fontSize: 12, color: colors.gray[500], marginTop: 1 },

  // Hero card
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
  heroLabel: {
    fontSize: 9, fontWeight: '800', color: 'rgba(255,255,255,0.55)',
    letterSpacing: 1.5, marginBottom: 4,
  },
  heroTitle: { fontSize: 19, fontWeight: '800', color: '#fff', letterSpacing: -0.3 },
  heroDesc: { fontSize: 12, color: 'rgba(255,255,255,0.7)', marginTop: 4, lineHeight: 17 },
  heroCta: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 10 },
  heroCtaText: { fontSize: 12, fontWeight: '700', color: 'rgba(255,255,255,0.85)' },

  // Departments
  deptList: { paddingHorizontal: 16, gap: 10, paddingBottom: 20 },
  deptCard: {
    width: 86, alignItems: 'center', backgroundColor: '#fff',
    borderRadius: 16, paddingVertical: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 4, elevation: 2,
  },
  deptIconWrap: {
    width: 46, height: 46, borderRadius: 13,
    justifyContent: 'center', alignItems: 'center', marginBottom: 8,
  },
  deptName: { fontSize: 10, fontWeight: '700', color: colors.text.primary, textAlign: 'center', lineHeight: 13 },

  // Event cards
  eventList: { paddingHorizontal: 16, gap: 12, paddingBottom: 20 },
  eventCard: {
    width: EVENT_CARD_W, backgroundColor: '#fff', borderRadius: 18, overflow: 'hidden',
    shadowColor: NAVY, shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09, shadowRadius: 8, elevation: 4,
  },
  eventImgWrap: { height: 130 },
  eventImg: { width: '100%', height: 130 },
  eventDatePill: {
    position: 'absolute', bottom: 8, left: 10,
    backgroundColor: `${NAVY}CC`, borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  eventDateText: { fontSize: 10, color: '#fff', fontWeight: '700' },
  eventBody: { padding: 12 },
  eventTitle: { fontSize: 14, fontWeight: '700', color: colors.text.primary, marginBottom: 3 },
  eventDesc: { fontSize: 12, color: colors.gray[500], lineHeight: 17 },

  // Feed cards
  feedCard: {
    flexDirection: 'row', backgroundColor: '#fff',
    marginHorizontal: 16, marginBottom: 10, borderRadius: 16, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 5, elevation: 2,
  },
  feedBorder: { width: 3, backgroundColor: NAVY_MID },
  feedContent: { flex: 1, flexDirection: 'row', padding: 12, gap: 10 },
  feedThumb: { width: 70, height: 70, borderRadius: 10 },
  feedText: { flex: 1 },
  feedTitle: { fontSize: 14, fontWeight: '700', color: colors.text.primary, lineHeight: 20, marginBottom: 3 },
  feedDesc: { fontSize: 12, color: colors.gray[500], lineHeight: 17, marginBottom: 7 },
  feedFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  feedDate: { fontSize: 11, color: colors.gray[400] },
  feedCta: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  feedCtaText: { fontSize: 11, fontWeight: '700', color: NAVY_MID },
});
