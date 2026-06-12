import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseConfig';
import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import {
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Counsellor {
  id: string;
  name: string;
  role: string;
  availability: string;
  phone: string;
  image: string;
}

export default function CounsellorScreen() {
  const [counsellors, setCounsellors] = useState<Counsellor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCounsellors();
  }, []);

  const fetchCounsellors = async () => {
    try {
      const { data, error } = await supabase
        .from('counselors')
        .select('*')
        .order('name');

      if (error) {
        console.log(error);
        return;
      }
      setCounsellors(data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />

      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={12}>
          <Ionicons name="arrow-back" size={22} color={colors.text.primary} />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Talk to a Counsellor</Text>
          <Text style={styles.headerSub}>We're here to listen</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.infoBanner}>
          <Ionicons name="heart-outline" size={18} color="#7C3AED" />
          <Text style={styles.infoText}>
            Everything you share is confidential. Reach out — you don't have to face it alone.
          </Text>
        </View>

        <View style={styles.card}>
          {counsellors.map((c, index) => (
            <View key={c.id}>
              <View style={styles.row}>
                <View style={styles.avatar}>
                  <Image source={{ uri: c.image }} style={styles.avatarImage} />
                </View>
                <View style={styles.info}>
                  <Text style={styles.name}>{c.name}</Text>
                  <Text style={styles.role}>{c.role}</Text>
                  <View style={styles.availRow}>
                    <Ionicons name="time-outline" size={12} color={colors.gray[400]} />
                    <Text style={styles.availability}>{c.availability}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.callBtn}
                  onPress={() => Linking.openURL(`tel:${c.phone}`)}
                  activeOpacity={0.75}
                >
                  <Ionicons name="call" size={16} color="#7C3AED" />
                </TouchableOpacity>
              </View>
              {index < counsellors.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Not ready to call?</Text>
          <Text style={styles.noteText}>
            You can visit the University Counselling Centre in person — no appointment needed during walk-in hours.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.gray[100] },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.gray[100],
    paddingHorizontal: 20,
    paddingBottom: 14,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: colors.white,
    alignItems: 'center', justifyContent: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: '800', color: colors.text.primary, letterSpacing: -0.4 },
  headerSub: { fontSize: 13, color: colors.gray[500], marginTop: 1 },

  scroll: { paddingTop: 8, paddingHorizontal: 16 },

  infoBanner: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    backgroundColor: '#F3E8FF',
    borderRadius: 12, padding: 14, marginBottom: 20,
    borderWidth: 0.5, borderColor: '#D8B4FE',
  },
  infoText: { flex: 1, fontSize: 13, color: '#7C3AED', lineHeight: 19 },

  card: {
    backgroundColor: colors.white, borderRadius: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 3,
    overflow: 'hidden', marginBottom: 20,
  },
  row: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  avatar: {
    width: 44, height: 44, borderRadius: 22,
    backgroundColor: '#EDE9FE',
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    overflow: 'hidden',
  },
  avatarImage: { width: 44, height: 44, borderRadius: 22 },
  info: { flex: 1 },
  name: { fontSize: 14, fontWeight: '700', color: colors.text.primary },
  role: { fontSize: 12, color: colors.gray[500], marginTop: 2 },
  availRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  availability: { fontSize: 11, color: colors.gray[900] },
  callBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: '#EDE9FE',
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.gray[100], marginLeft: 72 },

  noteCard: {
    backgroundColor: colors.white, borderRadius: 14,
    padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 4, elevation: 2,
  },
  noteTitle: { fontSize: 14, fontWeight: '700', color: colors.text.primary, marginBottom: 6 },
  noteText: { fontSize: 13, color: colors.gray[500], lineHeight: 19 },
});