import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useState } from 'react';
import {
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEADER_COLOR = '#003080';

const CATEGORIES = ['All', 'Tech', 'Finance', 'Health', 'Law', 'Media'];

const LISTINGS = [
  { id: '1', company: 'TechCorp Ghana', role: 'Software Engineering Intern', type: 'Paid', duration: '3 months', deadline: 'Jul 30, 2026', category: 'Tech', tint: '#1a5fb4' },
  { id: '2', company: 'Access Bank', role: 'Finance & Analytics Intern', type: 'Paid', duration: '6 months', deadline: 'Aug 15, 2026', category: 'Finance', tint: '#2E7D32' },
  { id: '3', company: 'Korle Bu Teaching Hospital', role: 'Clinical Research Intern', type: 'Unpaid', duration: '4 months', deadline: 'Jul 10, 2026', category: 'Health', tint: '#C62828' },
  { id: '4', company: 'Joy FM', role: 'Media & Communications Intern', type: 'Stipend', duration: '3 months', deadline: 'Aug 1, 2026', category: 'Media', tint: '#E65100' },
  { id: '5', company: 'Ecobank', role: 'Risk & Compliance Intern', type: 'Paid', duration: '6 months', deadline: 'Sep 5, 2026', category: 'Finance', tint: '#00695C' },
];

type PayType = 'Paid' | 'Unpaid' | 'Stipend';
const PAY_COLORS: Record<PayType, string> = {
  Paid: colors.success, Unpaid: colors.gray[500], Stipend: colors.warning,
};

function ListingCard({ item }: { item: typeof LISTINGS[0] }) {
  const payColor = PAY_COLORS[item.type as PayType] ?? colors.gray[500];
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.8}>
      <View style={[styles.cardAccent, { backgroundColor: item.tint }]} />
      <View style={styles.cardBody}>
        <View style={styles.cardTop}>
          <View style={[styles.cardAvatar, { backgroundColor: `${item.tint}18` }]}>
            <Text style={[styles.cardAvatarText, { color: item.tint }]}>{item.company[0]}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardRole} numberOfLines={1}>{item.role}</Text>
            <Text style={styles.cardCompany}>{item.company}</Text>
          </View>
          <View style={[styles.payBadge, { backgroundColor: `${payColor}18` }]}>
            <Text style={[styles.payBadgeText, { color: payColor }]}>{item.type}</Text>
          </View>
        </View>
        <View style={styles.cardMeta}>
          <View style={styles.metaItem}>
            <Ionicons name="time-outline" size={13} color={colors.gray[500]} />
            <Text style={styles.metaText}>{item.duration}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={13} color={colors.gray[500]} />
            <Text style={styles.metaText}>Due {item.deadline}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function InternshipScreen() {
  const insets = useSafeAreaInsets();
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const filtered = LISTINGS.filter((l) => {
    const matchCat = activeCategory === 'All' || l.category === activeCategory;
    const matchSearch = l.role.toLowerCase().includes(search.toLowerCase()) ||
      l.company.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

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
        <Text style={styles.heroTitle}>Internships</Text>
        <Text style={styles.heroSubtitle}>{LISTINGS.length} opportunities available</Text>
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
        {/* Search floats up over header edge */}
        <View style={styles.searchWrap}>
          <Ionicons name="search-outline" size={18} color={colors.gray[400]} style={styles.searchIcon} />
          <TextInput style={styles.searchInput} placeholder="Search roles or companies…"
            placeholderTextColor={colors.gray[400]} value={search} onChangeText={setSearch} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity key={cat}
              style={[styles.filterChip, activeCategory === cat && styles.filterChipActive]}
              onPress={() => setActiveCategory(cat)}>
              <Text style={[styles.filterChipText, activeCategory === cat && styles.filterChipTextActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Text style={styles.resultCount}>
          {filtered.length} {filtered.length === 1 ? 'listing' : 'listings'}
        </Text>

        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="briefcase-outline" size={48} color={colors.gray[300]} />
            <Text style={styles.emptyText}>No listings match your search</Text>
          </View>
        ) : (
          filtered.map((item) => <ListingCard key={item.id} item={item} />)
        )}
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
  heroSubtitle: { fontSize: 14, color: 'rgba(255,255,255,0.65)', marginTop: 4 },

  scroll: { paddingBottom: 120 },

  searchWrap: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.white, marginHorizontal: 16,
    marginTop: 16, borderRadius: 14, paddingHorizontal: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08, shadowRadius: 10, elevation: 4,
    marginBottom: 16,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 46, fontSize: 15, color: colors.text.primary },

  filterRow: { paddingHorizontal: 16, gap: 8, marginBottom: 16 },
  filterChip: {
    paddingHorizontal: 16, paddingVertical: 7, borderRadius: 20,
    backgroundColor: colors.white, borderWidth: 1, borderColor: colors.gray[200],
  },
  filterChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterChipText: { fontSize: 13, fontWeight: '600', color: colors.gray[600] },
  filterChipTextActive: { color: '#fff' },

  resultCount: {
    fontSize: 12, color: colors.gray[500], fontWeight: '600',
    marginHorizontal: 20, marginBottom: 10,
    textTransform: 'uppercase', letterSpacing: 0.5,
  },

  card: {
    flexDirection: 'row', backgroundColor: colors.white,
    marginHorizontal: 16, marginBottom: 12, borderRadius: 16,
    overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 6, elevation: 3,
  },
  cardAccent: { width: 4 },
  cardBody: { flex: 1, padding: 14 },
  cardTop: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  cardAvatar: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  cardAvatarText: { fontSize: 18, fontWeight: '700' },
  cardRole: { fontSize: 14, fontWeight: '700', color: colors.text.primary },
  cardCompany: { fontSize: 12, color: colors.gray[500], marginTop: 1 },
  payBadge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 },
  payBadgeText: { fontSize: 11, fontWeight: '700' },
  cardMeta: { flexDirection: 'row', gap: 16 },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 12, color: colors.gray[500] },

  emptyState: { alignItems: 'center', paddingVertical: 60, gap: 12 },
  emptyText: { fontSize: 14, color: colors.gray[400] },
});
