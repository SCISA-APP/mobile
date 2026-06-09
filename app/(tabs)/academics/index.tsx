import { academicsButtonsData } from '@/assets/data/academics/AcademicButton';
import colors from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Href, useRouter } from 'expo-router';
import { useCallback, useState } from 'react';
import {
    Dimensions,
    ImageBackground,
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEADER_COLOR = '#003080';
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;
const FALLBACK_TITLES = ['Timetable', 'Resources', 'Academic Calendar', 'Exam Arrangements'];

export default function AcademicsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { studentUser } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={HEADER_COLOR} />

      {/* ── Sticky gradient header ── */}
      <LinearGradient
        colors={[HEADER_COLOR, '#002259']}
        style={[styles.heroBanner, { paddingTop: insets.top + 16 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.heroDecor} />
        <Text style={styles.heroTitle}>Academics</Text>
        {studentUser?.program && (
          <View style={styles.programPill}>
            <Ionicons name="school-outline" size={13} color="rgba(255,255,255,0.8)" />
            <Text style={styles.programPillText}>{studentUser.program}</Text>
          </View>
        )}
      </LinearGradient>

      {/* ── Scrollable content ── */}
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#fff"
            colors={[HEADER_COLOR]}
          />
        }
      >
        {/* Quick info strip overlaps the header bottom edge */}
        <View style={styles.stripRow}>
          <View style={styles.stripItem}>
            <Ionicons name="book-outline" size={18} color={colors.primary} />
            <Text style={styles.stripText}>Level {studentUser?.year ?? '—'}</Text>
          </View>
          <View style={styles.stripDivider} />
          <View style={styles.stripItem}>
            <Ionicons name="calendar-outline" size={18} color={colors.primary} />
            <Text style={styles.stripText}>2025 / 2026</Text>
          </View>
          <View style={styles.stripDivider} />
          <View style={styles.stripItem}>
            <Ionicons name="time-outline" size={18} color={colors.primary} />
            <Text style={styles.stripText}>Semester 2</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Resources & Tools</Text>
        <View style={styles.grid}>
          {academicsButtonsData.map((btn, i) => (
            <TouchableOpacity key={i} style={styles.card}
              onPress={() => router.push(btn.route as Href)} activeOpacity={0.82}>
              <ImageBackground source={btn.image} style={styles.cardImage}
                imageStyle={styles.cardImageStyle}>
                <LinearGradient colors={['transparent', 'rgba(0,22,57,0.75)']}
                  style={styles.cardOverlay}>
                  <Text style={styles.cardTitle}>{btn.title || FALLBACK_TITLES[i]}</Text>
                </LinearGradient>
              </ImageBackground>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.ctaCard} activeOpacity={0.8}>
          <View style={styles.ctaIconWrap}>
            <Ionicons name="bulb-outline" size={22} color="#7C3AED" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.ctaTitle}>Need help with your studies?</Text>
            <Text style={styles.ctaSubtitle}>Access peer tutors and study groups</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.gray[400]} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.gray[100] },

  heroBanner: {
    paddingBottom: 28, paddingHorizontal: 20,
    overflow: 'hidden', zIndex: 10,
  },
  heroDecor: {
    position: 'absolute', width: 200, height: 200, borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.06)', top: -60, right: -40,
  },
  heroTitle: { fontSize: 28, fontWeight: '800', color: '#fff', letterSpacing: -0.5 },
  programPill: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 6 },
  programPillText: { fontSize: 13, color: 'rgba(255,255,255,0.75)' },

  scroll: { paddingBottom: 120 },

  stripRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: 16, marginTop: 16, borderRadius: 14,
    paddingVertical: 12, paddingHorizontal: 8,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 10, elevation: 4,
    marginBottom: 20,
  },
  stripItem: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 6 },
  stripText: { fontSize: 13, fontWeight: '600', color: colors.text.primary },
  stripDivider: { width: 1, height: 24, backgroundColor: colors.gray[200] },

  sectionLabel: {
    fontSize: 11, fontWeight: '700', color: colors.gray[500],
    textTransform: 'uppercase', letterSpacing: 0.8,
    marginHorizontal: 20, marginBottom: 12,
  },
  grid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 16, gap: 12, marginBottom: 20,
  },
  card: {
    width: CARD_WIDTH, height: 160, borderRadius: 16, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12, shadowRadius: 8, elevation: 4,
  },
  cardImage: { flex: 1, justifyContent: 'flex-end' },
  cardImageStyle: { borderRadius: 16 },
  cardOverlay: { flex: 1, justifyContent: 'flex-end', padding: 12, borderRadius: 16 },
  cardTitle: {
    color: '#fff', fontSize: 14, fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.4)',
    textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4,
  },

  ctaCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: 16, borderRadius: 16, padding: 16, gap: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 3,
  },
  ctaIconWrap: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: '#7C3AED18', justifyContent: 'center', alignItems: 'center',
  },
  ctaTitle: { fontSize: 14, fontWeight: '600', color: colors.text.primary },
  ctaSubtitle: { fontSize: 12, color: colors.gray[500], marginTop: 2 },
});
