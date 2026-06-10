import colors from '@/constants/colors';
import * as academicData from '@/assets/data/academicResources.ts/index';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BRAND = '#002855';

type DepartmentData = {
  department: string;
  years: { year: number; link: string }[];
};

const YEAR_ICONS: Record<number, keyof typeof Ionicons.glyphMap> = {
  1: 'leaf-outline',
  2: 'stats-chart-outline',
  3: 'flask-outline',
  4: 'school-outline',
};

export default function AcademicResources() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [programData, setProgramData] = useState<DepartmentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserProgram = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('@student_user');
        if (!storedUser) return;
        const user = JSON.parse(storedUser);
        const program = user.program?.toLowerCase();
        const department = Object.values(academicData).find(
          (dept: any) => dept.department.toLowerCase() === program
        ) as DepartmentData | undefined;
        if (department) setProgramData(department);
      } catch (error) {
        console.error('Error loading user program:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUserProgram();
  }, []);

  const openLinkInApp = (link: string, title: string) => {
    router.push({ pathname: '/academics/resourceViewer', params: { link, title } });
  };

  if (loading) {
    return (
      <View style={styles.centre}>
        <ActivityIndicator size="large" color={BRAND} />
      </View>
    );
  }

  if (!programData) {
    return (
      <View style={styles.centre}>
        <Ionicons name="folder-open-outline" size={52} color={colors.gray[300]} />
        <Text style={styles.emptyTitle}>No resources found</Text>
        <Text style={styles.emptySub}>We couldn't find materials for your programme.</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={BRAND} />

      {/* Header */}
      <View style={[styles.hero, { paddingTop: insets.top + 14 }]}>
        <View style={styles.heroDecor} />
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={12}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.heroTitle}>{programData.department}</Text>
        <Text style={styles.heroSub}>
          {programData.years.length} year{programData.years.length !== 1 ? 's' : ''} of resources
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionLabel}>Select a year</Text>

        {programData.years.map((item) => (
          <TouchableOpacity
            key={item.year}
            style={styles.card}
            onPress={() => openLinkInApp(item.link, `Year ${item.year}`)}
            activeOpacity={0.75}
          >
            <View style={styles.cardIcon}>
              <Ionicons
                name={YEAR_ICONS[item.year] ?? 'document-outline'}
                size={22}
                color={BRAND}
              />
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>Year {item.year}</Text>
              <Text style={styles.cardSub}>Tap to view materials</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.gray[400]} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.gray[100] },

  hero: {
    backgroundColor: BRAND,
    paddingHorizontal: 20,
    paddingBottom: 28,
    overflow: 'hidden',
  },
  heroDecor: {
    position: 'absolute', width: 200, height: 200, borderRadius: 100,
    backgroundColor: 'rgba(255,255,255,0.06)', top: -60, right: -40,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 16,
  },
  heroTitle: { fontSize: 26, fontWeight: '800', color: '#fff', letterSpacing: -0.4 },
  heroSub: { fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 3 },

  scroll: { paddingHorizontal: 16, paddingTop: 20 },

  sectionLabel: {
    fontSize: 11, fontWeight: '700', color: colors.gray[500],
    textTransform: 'uppercase', letterSpacing: 0.8,
    marginBottom: 12,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardIcon: {
    width: 46, height: 46, borderRadius: 13,
    backgroundColor: '#E6F1FB',
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  cardText: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: colors.text.primary },
  cardSub: { fontSize: 12, color: colors.gray[500], marginTop: 2 },

  centre: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 10 },
  emptyTitle: { fontSize: 15, fontWeight: '600', color: colors.gray[500] },
  emptySub: { fontSize: 13, color: colors.gray[400], textAlign: 'center', paddingHorizontal: 40 },
});