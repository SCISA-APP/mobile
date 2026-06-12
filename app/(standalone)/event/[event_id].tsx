import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    Image,
    Linking,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NAVY     = '#002259';
const NAVY_MID = '#003080';

// ── Rich text parser ──────────────────────────────────────────────────────────
type Segment = { text: string; bold?: boolean; italic?: boolean; url?: string }

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

function parseInline(raw: string): Segment[] {
  const segments: Segment[] = [];
  const urlParts = raw.split(URL_REGEX);

  for (const part of urlParts) {
    if (URL_REGEX.test(part)) {
      URL_REGEX.lastIndex = 0;
      segments.push({ text: part, url: part });
      continue;
    }
    URL_REGEX.lastIndex = 0;

    const mdRegex = /\*\*(.+?)\*\*|\*(.+?)\*/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = mdRegex.exec(part)) !== null) {
      if (match.index > lastIndex) segments.push({ text: part.slice(lastIndex, match.index) });
      if (match[1] !== undefined) segments.push({ text: match[1], bold: true });
      else if (match[2] !== undefined) segments.push({ text: match[2], italic: true });
      lastIndex = mdRegex.lastIndex;
    }
    if (lastIndex < part.length) segments.push({ text: part.slice(lastIndex) });
  }

  return segments;
}

function RichBody({ content }: { content: string }) {
  const paragraphs = content.split(/\n{2,}/).map(p => p.trim()).filter(Boolean);
  const blocks =
    paragraphs.length > 1
      ? paragraphs
      : content
          .split(/(?<=\.)\s+(?=[A-Z])/)
          .reduce<string[]>((acc, s, i) => {
            if (i % 2 === 0) acc.push(s);
            else acc[acc.length - 1] += ' ' + s;
            return acc;
          }, []);

  return (
    <>
      {blocks.map((para, i) => {
        const segments = parseInline(para);
        return (
          <Text key={i} style={styles.bodyPara}>
            {segments.map((seg, j) =>
              seg.url ? (
                <Text key={j} style={styles.bodyLink} onPress={() => Linking.openURL(seg.url!)}>
                  {seg.text}
                </Text>
              ) : (
                <Text key={j} style={[seg.bold && styles.bodyBold, seg.italic && styles.bodyItalic]}>
                  {seg.text}
                </Text>
              )
            )}
          </Text>
        );
      })}
    </>
  );
}

// ── Date helpers ──────────────────────────────────────────────────────────────
function formatDate(dateStr?: string) {
  if (!dateStr) return 'Upcoming';
  return new Date(dateStr).toLocaleDateString('en-ZA', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

function formatTime(dateStr?: string) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  // Only show time if it's not midnight
  if (d.getHours() === 0 && d.getMinutes() === 0) return null;
  return d.toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' });
}

// ── Event status ──────────────────────────────────────────────────────────────
type EventStatus = 'upcoming' | 'ongoing' | 'ended'

function getStatus(start_date?: string, end_date?: string): EventStatus {
  const now = new Date();
  const start = start_date ? new Date(start_date) : null;
  const end   = end_date   ? new Date(end_date)   : null;

  if (!start) return 'upcoming';

  // Ended: end has passed, or (no end_date and start has passed)
  if (end) {
    if (now > end)   return 'ended';
    if (now >= start) return 'ongoing';
    return 'upcoming';
  } else {
    // Single-day: compare by full datetime
    return now > start ? 'ended' : 'upcoming';
  }
}

const STATUS_CONFIG = {
  upcoming: {
    bannerIcon:  'time-outline'           as const,
    bannerText:  'Upcoming',
    bannerColor: 'rgba(0,34,89,0.55)',
    badgeText:   'Upcoming Event',
    badgeStyle:  { backgroundColor: NAVY },
    noticeIcon:  'megaphone-outline'      as const,
    noticeIconColor: NAVY_MID,
    noticeTitle: "You're invited!",
    noticeTitleColor: NAVY,
    noticeBody:  'All SCISANs are welcome to participate in this event. Mark your calendar and spread the word.',
  },
  ongoing: {
    bannerIcon:  'radio-outline'          as const,
    bannerText:  'Happening now',
    bannerColor: 'rgba(0,120,60,0.72)',
    badgeText:   'Ongoing',
    badgeStyle:  { backgroundColor: '#0a7c3e' },
    noticeIcon:  'flash-outline'          as const,
    noticeIconColor: '#0a7c3e',
    noticeTitle: "This is happening now!",
    noticeTitleColor: '#0a7c3e',
    noticeBody:  "This event is currently underway. Join in and be part of it.",
  },
  ended: {
    bannerIcon:  'checkmark-circle-outline' as const,
    bannerText:  'This event has ended',
    bannerColor: 'rgba(0,0,0,0.52)',
    badgeText:   'Past Event',
    badgeStyle:  { backgroundColor: '#888' },
    noticeIcon:  'checkmark-circle-outline' as const,
    noticeIconColor: '#888',
    noticeTitle: 'This event has ended',
    noticeTitleColor: '#888',
    noticeBody:  'Check the Upcoming Events section for more updates from SCISA.',
  },
};

// ── Screen ────────────────────────────────────────────────────────────────────
export default function EventDetail() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { title, description, image, date, start_date, end_date } =
    useLocalSearchParams<{
      title: string; description: string; image?: string;
      date?: string; start_date?: string; end_date?: string;
    }>();

  const status = getStatus(start_date, end_date);
  const cfg    = STATUS_CONFIG[status];
  const isMultiDay = !!end_date && end_date !== start_date;

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

            {/* Status banner over image */}
            <View style={[styles.statusBanner, { backgroundColor: cfg.bannerColor }]}>
              <Ionicons name={cfg.bannerIcon} size={13} color="#fff" />
              <Text style={styles.statusBannerText}>{cfg.bannerText}</Text>
            </View>

            <TouchableOpacity
              style={[styles.backBtn, { top: insets.top + 12 }]}
              onPress={() => router.back()}
              activeOpacity={0.8}
            >
              <Ionicons name="arrow-back" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Content card */}
          <View style={styles.contentCard}>
            <View style={styles.metaRow}>
              <View style={styles.dateBadge}>
                <Ionicons name="calendar-outline" size={12} color={NAVY_MID} />
                <Text style={styles.dateBadgeText}>
                  {isMultiDay
                    ? `${formatDate(start_date)} – ${formatDate(end_date)}`
                    : formatDate(start_date ?? date)}
                </Text>
              </View>
              <View style={[styles.typeBadge, cfg.badgeStyle]}>
                <Text style={styles.typeBadgeText}>{cfg.badgeText}</Text>
              </View>
            </View>

            <Text style={styles.title}>{title}</Text>
            <View style={styles.divider} />

            <RichBody content={description ?? ''} />
          </View>
        </Animated.View>

        {/* Info strip */}
        <Animated.View entering={FadeInDown.delay(150).duration(400)} style={styles.infoStrip}>
          {/* Attendance */}
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="people-outline" size={18} color={NAVY_MID} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.infoLabel}>Attendance</Text>
              <Text style={styles.infoValue}>All SCISANs Welcome</Text>
            </View>
          </View>

          {/* Time — only show if we have a meaningful time */}
          {formatTime(start_date) && (
            <>
              <View style={styles.infoSeparator} />
              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <Ionicons name="time-outline" size={18} color={NAVY_MID} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoLabel}>
                    {status === 'ongoing' ? 'Started at' : 'Start time'}
                  </Text>
                  <Text style={styles.infoValue}>{formatTime(start_date)}</Text>
                </View>
              </View>
            </>
          )}

          {/* End time for multi-day ongoing */}
          {isMultiDay && formatTime(end_date) && (
            <>
              <View style={styles.infoSeparator} />
              <View style={styles.infoItem}>
                <View style={styles.infoIcon}>
                  <Ionicons name="flag-outline" size={18} color={NAVY_MID} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.infoLabel}>Ends</Text>
                  <Text style={styles.infoValue}>{formatDate(end_date)}</Text>
                </View>
              </View>
            </>
          )}
        </Animated.View>

        {/* Bottom notice */}
        <Animated.View
          entering={FadeInDown.delay(250).duration(400)}
          style={[
            styles.notice,
            status === 'ended'  && styles.noticeEnded,
            status === 'ongoing' && styles.noticeOngoing,
          ]}
        >
          <Ionicons
            name={cfg.noticeIcon}
            size={20}
            color={cfg.noticeIconColor}
            style={{ marginBottom: 6 }}
          />
          <Text style={[styles.noticeTitle, { color: cfg.noticeTitleColor }]}>
            {cfg.noticeTitle}
          </Text>
          <Text style={styles.noticeBody}>
            {status === 'ended' ? (
              <>
                Check the{' '}
                <Text style={styles.noticeLink} onPress={() => router.back()}>
                  Upcoming Events
                </Text>
                {' '}section for more updates from SCISA.
              </>
            ) : cfg.noticeBody}
          </Text>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#F2F4F7' },

  heroWrap:    { height: 300, overflow: 'hidden' },
  heroImage:   { width: '100%', height: 300 },
  heroTopGrad: { position: 'absolute', top: 0, left: 0, right: 0, height: 100 },

  statusBanner: {
    position: 'absolute', bottom: 28, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    paddingVertical: 8,
  },
  statusBannerText: { fontSize: 13, color: '#fff', fontWeight: '600', letterSpacing: 0.3 },

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
  metaRow:       { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 14 },
  dateBadge:     {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: `${NAVY_MID}12`, borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 5, flexShrink: 1,
  },
  dateBadgeText: { fontSize: 12, fontWeight: '600', color: NAVY_MID, flexShrink: 1 },
  typeBadge:     { borderRadius: 20, paddingHorizontal: 10, paddingVertical: 5 },
  typeBadgeText: { fontSize: 11, fontWeight: '700', color: '#fff', letterSpacing: 0.3 },

  title:   { fontSize: 26, fontWeight: '800', color: '#1a1a1a', lineHeight: 32, letterSpacing: -0.3 },
  divider: { height: 3, width: 36, backgroundColor: NAVY_MID, borderRadius: 2, marginVertical: 16 },

  bodyPara:   { fontSize: 16, color: '#4a4a4a', lineHeight: 26, letterSpacing: 0.1, marginBottom: 14 },
  bodyBold:   { fontWeight: '700', color: '#1a1a1a' },
  bodyItalic: { fontStyle: 'italic', color: '#555' },
  bodyLink:   { color: NAVY_MID, fontWeight: '600', textDecorationLine: 'underline' },

  infoStrip: {
    flexDirection: 'row', flexWrap: 'wrap',
    marginHorizontal: 16, marginTop: 16,
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
    gap: 8,
  },
  infoItem:      { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10, minWidth: 120 },
  infoSeparator: { width: 1, backgroundColor: '#eee', marginHorizontal: 4 },
  infoIcon:      {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: `${NAVY_MID}12`,
    justifyContent: 'center', alignItems: 'center',
  },
  infoLabel: { fontSize: 11, color: '#999', fontWeight: '500' },
  infoValue: { fontSize: 13, fontWeight: '700', color: '#1a1a1a', marginTop: 1 },

  notice: {
    marginHorizontal: 16, marginTop: 16,
    backgroundColor: `${NAVY_MID}0D`,
    borderRadius: 16, padding: 20, alignItems: 'center',
    borderWidth: 1, borderColor: `${NAVY_MID}20`,
  },
  noticeEnded:   { backgroundColor: '#f5f5f5', borderColor: '#ddd' },
  noticeOngoing: { backgroundColor: '#f0faf5', borderColor: '#0a7c3e30' },
  noticeTitle:   { fontSize: 15, fontWeight: '800', marginBottom: 6 },
  noticeBody:    { fontSize: 13, color: '#666', textAlign: 'center', lineHeight: 20 },
  noticeLink:    { color: NAVY_MID, fontWeight: '700', textDecorationLine: 'underline' },
});