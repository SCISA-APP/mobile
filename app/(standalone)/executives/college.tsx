import ExecutiveCard from '@/components/cards/ExecutiveCard';
import ExecutiveModal from '@/components/modals/ExecutiveModal';
import { fetchCollegeExecutives } from '@/api/executives';
import { Executive } from '@/types/models/executives';
import { sortExecutives } from '@/utils/sortExecutives';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NAVY     = '#002259';
const NAVY_MID = '#003080';

export default function CollegeExecutives() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [executives, setExecutives] = useState<Executive[]>([]);
  const [loading, setLoading]       = useState(true);
  const [selected, setSelected]     = useState<Executive | null>(null);

  useEffect(() => {
    fetchCollegeExecutives()
      .then(data => setExecutives(sortExecutives(data)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={NAVY} />

      <LinearGradient
        colors={[NAVY_MID, NAVY]}
        style={[styles.header, { paddingTop: insets.top + 8 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.headerDecor} />
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()} activeOpacity={0.8}>
            <Ionicons name="arrow-back" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <Text style={styles.headerSub}>SCISA</Text>
            <Text style={styles.headerTitle}>College Executives</Text>
          </View>
        </View>
      </LinearGradient>

      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color={NAVY_MID} />
        </View>
      ) : (
        <FlatList
          data={executives}
          keyExtractor={e => String(e.id)}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => (
            <ExecutiveCard item={item} onPress={() => setSelected(item)} />
          )}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Ionicons name="people-outline" size={40} color="#ccc" />
              <Text style={styles.emptyText}>No executives listed yet</Text>
            </View>
          }
        />
      )}

      <ExecutiveModal
        item={selected}
        visible={!!selected}
        onClose={() => setSelected(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root:        { flex: 1, backgroundColor: '#F2F4F7' },
  header:      { paddingHorizontal: 20, paddingBottom: 20, overflow: 'hidden' },
  headerDecor: {
    position: 'absolute', width: 180, height: 180, borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.05)', top: -60, right: -30,
  },
  headerRow:   { flexDirection: 'row', alignItems: 'center', gap: 12 },
  backBtn:     {
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center', alignItems: 'center',
  },
  headerSub:   { fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: '600', letterSpacing: 0.5 },
  headerTitle: { fontSize: 20, fontWeight: '800', color: '#fff' },
  loader:      { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list:        { padding: 16, paddingBottom: 60 },
  empty:       { flex: 1, alignItems: 'center', marginTop: 80, gap: 10 },
  emptyText:   { fontSize: 14, color: '#aaa' },
});