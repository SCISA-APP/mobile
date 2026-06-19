import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
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
import { DEPARTMENTS, Department, Listing } from '@/assets/data/listings';
import { OpportunitiesHeader } from '@/components/headers/OpportunitiesHeader';
import { supabase } from '@/supabaseConfig';

const HEADER_COLOR = '#003080';
const ALL_DEPT = 'All' as const;
const PAGE_SIZE = 10;
type FilterDept = Department | typeof ALL_DEPT;

export default function InternshipsScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  const [activeDept, setActiveDept] = useState<FilterDept>(ALL_DEPT);
  const [search, setSearch] = useState('');
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const pageRef = useRef(0);
  const searchRef = useRef('');
  const deptRef = useRef<FilterDept>(ALL_DEPT);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchListings = useCallback(async (reset = false) => {
    if (loading) return;
    setLoading(true);

    const from = reset ? 0 : pageRef.current * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;

    let query = supabase
      .from('internship_listings')
      .select('*')
      .order('created_at', { ascending: false })
      .range(from, to);

    if (deptRef.current !== ALL_DEPT) {
      query = query.eq('department', deptRef.current);
    }

    if (searchRef.current.trim()) {
      const q = searchRef.current.trim();
      query = query.or(
        `role.ilike.%${q}%,company.ilike.%${q}%,location.ilike.%${q}%`
      );
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching listings:', error);
      setLoading(false);
      return;
    }

    const results = (data as Listing[]) || [];

    setListings((prev) => (reset ? results : [...prev, ...results]));
    setHasMore(results.length === PAGE_SIZE);
    if (!reset) pageRef.current += 1;
    else pageRef.current = 1;

    setLoading(false);
  }, []);

  // Reset and refetch when dept or search changes
  const resetFetch = useCallback(() => {
    pageRef.current = 0;
    setListings([]);
    setHasMore(true);
    fetchListings(true);
  }, [fetchListings]);

  useEffect(() => {
    resetFetch();
  }, []);

  const handleDeptChange = (dept: FilterDept) => {
    setActiveDept(dept);
    deptRef.current = dept;
    resetFetch();
  };

  const handleSearchChange = (text: string) => {
    setSearch(text);
    searchRef.current = text;
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      resetFetch();
    }, 400);
  };

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    pageRef.current = 0;
    await fetchListings(true);
    setRefreshing(false);
  }, [fetchListings]);

  const handleEndReached = () => {
    if (!loading && hasMore) {
      fetchListings(false);
    }
  };

  return (
    <View style={styles.root}>
      <OpportunitiesHeader listingsCount={listings.length} />

      <View style={styles.searchWrap}>
        <Ionicons name="search-outline" size={17} color={colors.gray[400]} style={{ marginRight: 8 }} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search roles, companies, locations…"
          placeholderTextColor={colors.gray[400]}
          value={search}
          onChangeText={handleSearchChange}
          returnKeyType="search"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => handleSearchChange('')}>
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
              onPress={() => handleDeptChange(dept)}
            >
              <Text style={[styles.tabText, activeDept === dept && styles.tabTextActive]} numberOfLines={1}>
                {dept === ALL_DEPT ? 'All' : dept.replace(' Science', ' Sci.')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <FlatList
        data={listings}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.3}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[HEADER_COLOR]}
            tintColor={HEADER_COLOR}
          />
        }
        ListHeaderComponent={
          !loading || listings.length > 0 ? (
            <Text style={styles.resultCount}>
              {listings.length} {listings.length === 1 ? 'listing' : 'listings'}
            </Text>
          ) : null
        }
        renderItem={({ item }) => (
          <ListingCard
            item={item}
            onPress={() => router.push(`/internship/${item.id.trim()}`)}
          />
        )}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator
              size="small"
              color={HEADER_COLOR}
              style={{ paddingVertical: 20 }}
            />
          ) : !hasMore && listings.length > 0 ? (
            <Text style={styles.endText}>No more listings</Text>
          ) : null
        }
        ListEmptyComponent={
          !loading ? (
            <View style={styles.empty}>
              <Ionicons name="briefcase-outline" size={52} color={colors.gray[300]} />
              <Text style={styles.emptyTitle}>No listings found</Text>
              <Text style={styles.emptySub}>Try adjusting your search or department filter</Text>
            </View>
          ) : null
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
  endText: {
    textAlign: 'center', fontSize: 12,
    color: colors.gray[400], paddingVertical: 16,
  },

  empty: { alignItems: 'center', paddingVertical: 80, gap: 8 },
  emptyTitle: { fontSize: 15, fontWeight: '600', color: colors.gray[500] },
  emptySub: { fontSize: 13, color: colors.gray[400] },
});