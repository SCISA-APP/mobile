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

// ── Rich text parser ──────────────────────────────────────────────────────────
type Segment = { text: string; bold?: boolean; italic?: boolean }

function parseInline(raw: string): Segment[] {
  const segments: Segment[] = []
  const regex = /\*\*(.+?)\*\*|\*(.+?)\*/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(raw)) !== null) {
    if (match.index > lastIndex) segments.push({ text: raw.slice(lastIndex, match.index) })
    if (match[1] !== undefined) segments.push({ text: match[1], bold: true })
    else if (match[2] !== undefined) segments.push({ text: match[2], italic: true })
    lastIndex = regex.lastIndex
  }
  if (lastIndex < raw.length) segments.push({ text: raw.slice(lastIndex) })
  return segments
}

function RichBody({ content }: { content: string }) {
  const paragraphs = content.split(/\n{2,}/).map(p => p.trim()).filter(Boolean)

  const blocks =
    paragraphs.length > 1
      ? paragraphs
      : content
          .split(/(?<=\.)\s+(?=[A-Z])/)
          .reduce<string[]>((acc, s, i) => {
            if (i % 2 === 0) acc.push(s)
            else acc[acc.length - 1] += ' ' + s
            return acc
          }, [])

  return (
    <>
      {blocks.map((para, i) => {
        const segments = parseInline(para)
        return (
          <Text key={i} style={styles.bodyPara}>
            {segments.map((seg, j) => (
              <Text
                key={j}
                style={[seg.bold && styles.bodyBold, seg.italic && styles.bodyItalic]}
              >
                {seg.text}
              </Text>
            ))}
          </Text>
        )
      })}
    </>
  )
}

// ── Date helpers ──────────────────────────────────────────────────────────────
function isPast(dateStr?: string) {
  if (!dateStr) return false
  const d = new Date(dateStr)
  d.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return d < today
}

function formatDate(dateStr?: string) {
  if (!dateStr) return 'Upcoming'
  return new Date(dateStr).toLocaleDateString('en-ZA', {
    day: 'numeric', month: 'long', year: 'numeric',
  })
}

// ── Screen ────────────────────────────────────────────────────────────────────
export default function EventDetail() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { title, description, image, date } = useLocalSearchParams<{
    title: string; description: string; image?: string; date?: string;
  }>();

  const ended = isPast(date)

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
            {/* ended banner over image */}
            {ended && (
              <View style={styles.endedBanner}>
                <Ionicons name="time-outline" size={13} color="#fff" />
                <Text style={styles.endedBannerText}>This event has ended</Text>
              </View>
            )}
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
                <Text style={styles.dateBadgeText}>{formatDate(date)}</Text>
              </View>
              <View style={[styles.typeBadge, ended && styles.typeBadgeEnded]}>
                <Text style={styles.typeBadgeText}>{ended ? 'Past Event' : 'Event'}</Text>
              </View>
            </View>

            <Text style={styles.title}>{title}</Text>
            <View style={styles.divider} />

            <RichBody content={description ?? ''} />
          </View>
        </Animated.View>

        {/* Info strip */}
        <Animated.View entering={FadeInDown.delay(150).duration(400)} style={styles.infoStrip}>
          <View style={styles.infoItem}>
            <View style={styles.infoIcon}>
              <Ionicons name="people-outline" size={18} color={NAVY_MID} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.infoLabel}>Attendance</Text>
              <Text style={styles.infoValue}>All SCISANs Welcome</Text>
            </View>
          </View>
          <View style={styles.infoSeparator} />
        </Animated.View>

        {/* Bottom notice */}
        <Animated.View
          entering={FadeInDown.delay(250).duration(400)}
          style={[styles.notice, ended && styles.noticeEnded]}
        >
          {ended ? (
            <>
              <Ionicons name="checkmark-circle-outline" size={20} color="#888" style={{ marginBottom: 6 }} />
              <Text style={styles.noticeTitle}>This event has ended</Text>
              <Text style={styles.noticeBody}>
                Check the{' '}
                <Text style={styles.noticeLink} onPress={() => router.back()}>
                  Upcoming Events
                </Text>
                {' '}section for more updates from SCISA.
              </Text>
            </>
          ) : (
            <>
              <Ionicons name="megaphone-outline" size={20} color={NAVY_MID} style={{ marginBottom: 6 }} />
              <Text style={[styles.noticeTitle, { color: NAVY }]}>You're invited!</Text>
              <Text style={styles.noticeBody}>
                All SCISANs are welcome to participate in this event. Mark your calendar and spread the word.
              </Text>
            </>
          )}
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
  endedBanner: {
    position: 'absolute', bottom: 28, left: 0, right: 0,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6,
    backgroundColor: 'rgba(0,0,0,0.52)', paddingVertical: 8,
  },
  endedBannerText: { fontSize: 13, color: '#fff', fontWeight: '600', letterSpacing: 0.3 },
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
  typeBadgeEnded: { backgroundColor: '#888' },
  typeBadgeText: { fontSize: 11, fontWeight: '700', color: '#fff', letterSpacing: 0.3 },

  title: {
    fontSize: 26, fontWeight: '800', color: '#1a1a1a',
    lineHeight: 32, letterSpacing: -0.3,
  },
  divider: {
    height: 3, width: 36, backgroundColor: NAVY_MID,
    borderRadius: 2, marginVertical: 16,
  },

  // Rich text
  bodyPara: {
    fontSize: 16, color: '#4a4a4a', lineHeight: 26,
    letterSpacing: 0.1, marginBottom: 14,
  },
  bodyBold: { fontWeight: '700', color: '#1a1a1a' },
  bodyItalic: { fontStyle: 'italic', color: '#555' },

  // Info strip
  infoStrip: {
    flexDirection: 'row',
    marginHorizontal: 16, marginTop: 16,
    backgroundColor: '#fff', borderRadius: 16, padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 6, elevation: 2,
  },
  infoItem: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  infoSeparator: { width: 1, backgroundColor: '#eee', marginHorizontal: 8 },
  infoIcon: {
    width: 38, height: 38, borderRadius: 10,
    backgroundColor: `${NAVY_MID}12`,
    justifyContent: 'center', alignItems: 'center',
  },
  infoLabel: { fontSize: 11, color: '#999', fontWeight: '500' },
  infoValue: { fontSize: 13, fontWeight: '700', color: '#1a1a1a', marginTop: 1 },

  // Bottom notice
  notice: {
    marginHorizontal: 16, marginTop: 16,
    backgroundColor: `${NAVY_MID}0D`,
    borderRadius: 16, padding: 20, alignItems: 'center',
    borderWidth: 1, borderColor: `${NAVY_MID}20`,
  },
  noticeEnded: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
  },
  noticeTitle: {
    fontSize: 15, fontWeight: '800', color: NAVY, marginBottom: 6,
  },
  noticeBody: {
    fontSize: 13, color: '#666', textAlign: 'center', lineHeight: 20,
  },
  noticeLink: {
    color: NAVY_MID, fontWeight: '700', textDecorationLine: 'underline',
  },
});