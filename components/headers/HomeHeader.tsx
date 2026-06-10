// components/home/HomeHeader.tsx
import { useAuth } from '@/context/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Bell } from 'lucide-react-native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NAVY      = '#002259';
const NAVY_MID  = '#003080';
const ACCENT_RED = '#CC2200';

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
}
const firstName = (s?: string | null) => s?.trim().split(' ')[0] ?? 'Student';

export default function HomeHeader() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { studentUser } = useAuth();

  return (
    <LinearGradient
      colors={[NAVY, NAVY_MID]}
      style={[styles.header, { paddingTop: insets.top + 12 }]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.decor1} />
      <View style={styles.decor2} />

      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <Image
            source={require('@/assets/images/logo.jpeg')}
            style={styles.logo}
            resizeMode="contain"
          />
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

        <TouchableOpacity
          style={styles.notifBtn}
          onPress={() => router.push('/(standalone)/notification')}
          activeOpacity={0.8}
        >
          <Bell size={20} color="#fff" strokeWidth={2} />
          <View style={styles.notifDot} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    overflow: 'hidden',
    zIndex: 10,
  },
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
  logo: {
    width: 46, height: 46, borderRadius: 23,
    borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.2)',
  },
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
});