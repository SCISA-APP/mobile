import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ListingCard } from '@/components/cards/ListingCard';
import { DEPARTMENTS, Department, LISTINGS, Listing } from '@/assets/data/listings';
import { OpportunitiesHeader } from '@/components/headers/OpportunitiesHeader';

const HEADER_COLOR = '#003080';
const ALL_DEPT = 'All' as const;
type FilterDept = Department | typeof ALL_DEPT;

export default function InternshipsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [activeDept, setActiveDept] = useState<FilterDept>(ALL_DEPT);
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1500);
  }, []);

  const filtered = useMemo<Listing[]>(() => {
    const q = search.toLowerCase();
    return LISTINGS.filter((l) => {
      const matchDept = activeDept === ALL_DEPT || l.department === activeDept;
      const matchSearch =
        !q ||
        l.role.toLowerCase().includes(q) ||
        l.company.toLowerCase().includes(q) ||
        l.location.toLowerCase().includes(q);
      return matchDept && matchSearch;
    });
  }, [activeDept, search]);

  return (
    <View style={styles.root}>
      <OpportunitiesHeader listingsCount={LISTINGS.length} />

      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={17} color={colors.gray[400]} style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search roles, companies, locations…"
          placeholderTextColor={colors.gray[400]}
          value={search}
          onChangeText={setSearch}
          returnKeyType="search"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={17} color={colors.gray[400]} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.tabBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
          {([ALL_DEPT, ...DEPARTMENTS] as FilterDept[]).map((dept) => (
            <TouchableOpacity
              key={dept}
              style={[styles.tab, activeDept === dept && styles.tabActive]}
              onPress={() => setActiveDept(dept)}
            >
              <Text style={[styles.tabText, activeDept === dept && styles.tabTextActive]} numberOfLines={1}>
                {dept === ALL_DEPT ? 'All' : dept.replace(' Science', ' Sci.')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[HEADER_COLOR]}
            tintColor={HEADER_COLOR}
          />
        }
        ListHeaderComponent={
          <Text style={styles.resultCount}>
            {filtered.length} {filtered.length === 1 ? 'listing' : 'listings'}
          </Text>
        }
        renderItem={({ item }) => (
          <ListingCard
            item={item}
            onPress={() => router.push(`/internship/${item.id.trim()}`)}
          />
        )}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="briefcase-outline" size={52} color={colors.gray[300]} />
            <Text style={styles.emptyTitle}>No listings found</Text>
            <Text style={styles.emptySub}>Try adjusting your search or department filter</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.gray[100] },

  searchWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 14,
    paddingHorizontal: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 12,
    elevation: 6,
    zIndex: 10,
  },
  searchInput: { flex: 1, height: 46, fontSize: 14, color: colors.text.primary },

  tabBar: {
    backgroundColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.gray[200],
    marginTop: 10,
  },
  tabScroll: { paddingHorizontal: 12, paddingVertical: 10, gap: 6 },
  tab: {
    paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20,
    backgroundColor: colors.gray[100], borderWidth: 1, borderColor: colors.gray[200],
  },
  tabActive: { backgroundColor: HEADER_COLOR, borderColor: HEADER_COLOR },
  tabText: { fontSize: 12, fontWeight: '600', color: colors.gray[600] },
  tabTextActive: { color: '#fff' },

  listContent: { paddingTop: 12 },
  resultCount: {
    fontSize: 11, color: colors.gray[400], fontWeight: '600',
    marginHorizontal: 20, marginBottom: 8,
    textTransform: 'uppercase', letterSpacing: 0.5,
  },

  empty: { alignItems: 'center', paddingVertical: 80, gap: 8 },
  emptyTitle: { fontSize: 15, fontWeight: '600', color: colors.gray[500] },
  emptySub: { fontSize: 13, color: colors.gray[400] },
});