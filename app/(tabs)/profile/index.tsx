import colors from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';
import { auth, db } from '@/firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEADER_COLOR = '#003080';

interface StudentProfile {
  uid: string;
  fullName: string;
  email: string | null;
  program: string;
  year: number | string;
  permission: string;
}

function Avatar({ name }: { name: string }) {
  const initials = name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  return (
    <View style={styles.avatarRing}>
      <LinearGradient colors={['#4A90D9', '#002259']} style={styles.avatarGradient}
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
        <Text style={styles.avatarText}>{initials}</Text>
      </LinearGradient>
    </View>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function MenuItem({ icon, label, sublabel, onPress, tint, last }: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string; sublabel?: string;
  onPress?: () => void; tint?: string; last?: boolean;
}) {
  const c = tint ?? colors.primary;
  return (
    <TouchableOpacity style={[styles.menuItem, last && styles.menuItemLast]}
      onPress={onPress} activeOpacity={0.65}>
      <View style={[styles.menuIconWrap, { backgroundColor: `${c}18` }]}>
        <Ionicons name={icon} size={20} color={c} />
      </View>
      <View style={styles.menuTextWrap}>
        <Text style={styles.menuLabel}>{label}</Text>
        {sublabel ? <Text style={styles.menuSublabel}>{sublabel}</Text> : null}
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.gray[400]} />
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { studentUser, clearStudentUser } = useAuth();
  const [profile, setProfile] = useState<StudentProfile | null>(studentUser as StudentProfile | null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetch_ = async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;
      setRefreshing(true);
      try {
        const snap = await getDoc(doc(db, 'Student_Users', uid));
        if (snap.exists()) setProfile({ uid, ...(snap.data() as Omit<StudentProfile, 'uid'>) });
      } catch { /* fall back */ } finally { setRefreshing(false); }
    };
    fetch_();
  }, []);

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: async () => {
        try { await signOut(auth); await clearStudentUser(); router.replace('/(auth)/login'); }
        catch { Alert.alert('Error', 'Something went wrong.'); }
      }},
    ]);
  };

  const permissionLabel = profile?.permission
    ? profile.permission.charAt(0).toUpperCase() + profile.permission.slice(1)
    : 'Student';

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={HEADER_COLOR} />

      {/* Bleeds behind the status bar so rubber-band over-scroll is blue */}
      <View style={[styles.safeAreaFill, { height: insets.top }]} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* ── Gradient header ── */}
        <LinearGradient colors={[HEADER_COLOR, '#002259']} style={[styles.header, { paddingTop: insets.top + 20 }]}
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
          <View style={styles.decorCircle1} />
          <View style={styles.decorCircle2} />

          {refreshing && (
            <ActivityIndicator color="rgba(255,255,255,0.6)" style={styles.refreshIndicator} />
          )}

          <Avatar name={profile?.fullName ?? 'U'} />
          <Text style={styles.headerName}>{profile?.fullName ?? '—'}</Text>
          <Text style={styles.headerEmail}>{profile?.email ?? '—'}</Text>

          <View style={styles.statsRow}>
            <View style={styles.statPill}>
              <Text style={styles.statValue}>{profile?.year ?? '—'}</Text>
              <Text style={styles.statLabel}>Level</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statPill}>
              <Text style={styles.statValue}>{permissionLabel}</Text>
              <Text style={styles.statLabel}>Role</Text>
            </View>
          </View>
        </LinearGradient>

        {/* ── Programme banner ── */}
        <View style={styles.programBanner}>
          <Ionicons name="school-outline" size={18} color={colors.primary} />
          <Text style={styles.programBannerText} numberOfLines={1}>{profile?.program ?? '—'}</Text>
        </View>

        <SectionCard title="Account">
          <MenuItem icon="person-outline" label="Edit Profile" sublabel="Update your personal information" onPress={() => {}} />
          <MenuItem icon="notifications-outline" label="Notifications" sublabel="Manage alerts and reminders" onPress={() => router.push('/(standalone)/notification')} last />
        </SectionCard>

        <SectionCard title="Academics">
          <MenuItem icon="calendar-outline" label="Academic Calendar" tint="#7C3AED" onPress={() => router.push('/(standalone)/academics/academicCalendar')} />
          <MenuItem icon="document-text-outline" label="Resources" tint="#7C3AED" onPress={() => router.push('/(standalone)/academics/academicResources')} />
          <MenuItem icon="grid-outline" label="Timetable" tint="#7C3AED" onPress={() => router.push('/(standalone)/academics/timetable')} last />
        </SectionCard>

        <SectionCard title="App">
          <MenuItem icon="shield-checkmark-outline" label="Privacy Policy" tint={colors.info} onPress={() => {}} last />
        </SectionCard>

        <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={20} color={colors.error} />
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>

        <Text style={styles.version}>SCISA • v1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.gray[100] },
  // Sits at position absolute top-0 so over-scroll rubber-band reveals brand colour
  safeAreaFill: { position: 'absolute', top: 0, left: 0, right: 0, backgroundColor: HEADER_COLOR, zIndex: 0 },
  scroll: { paddingBottom: 120 },

  header: {
    alignItems: 'center',
    paddingBottom: 36,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  decorCircle1: { position: 'absolute', width: 260, height: 260, borderRadius: 130, backgroundColor: 'rgba(255,255,255,0.05)', top: -60, right: -60 },
  decorCircle2: { position: 'absolute', width: 180, height: 180, borderRadius: 90, backgroundColor: 'rgba(255,255,255,0.05)', bottom: 20, left: -50 },
  refreshIndicator: { position: 'absolute', top: 20, right: 20 },

  avatarRing: { width: 96, height: 96, borderRadius: 48, padding: 3, backgroundColor: 'rgba(255,255,255,0.25)', marginBottom: 14 },
  avatarGradient: { flex: 1, borderRadius: 45, justifyContent: 'center', alignItems: 'center' },
  avatarText: { fontSize: 34, fontWeight: '700', color: '#fff', letterSpacing: 1 },
  headerName: { fontSize: 22, fontWeight: '700', color: '#fff', marginBottom: 4, letterSpacing: 0.2 },
  headerEmail: { fontSize: 13, color: 'rgba(255,255,255,0.65)', marginBottom: 24 },

  statsRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 16, paddingVertical: 12, paddingHorizontal: 20, width: '100%' },
  statPill: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: 15, fontWeight: '700', color: '#fff' },
  statLabel: { fontSize: 11, color: 'rgba(255,255,255,0.6)', marginTop: 2 },
  statDivider: { width: 1, height: 30, backgroundColor: 'rgba(255,255,255,0.2)' },

  programBanner: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: colors.white, marginHorizontal: 16, marginTop: -1, marginBottom: 20, borderRadius: 12, paddingVertical: 11, paddingHorizontal: 14, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 6, elevation: 3 },
  programBannerText: { fontSize: 14, fontWeight: '600', color: colors.text.primary, flex: 1 },

  sectionCard: { backgroundColor: colors.white, marginHorizontal: 16, borderRadius: 16, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8, elevation: 3, overflow: 'hidden' },
  sectionTitle: { fontSize: 11, fontWeight: '700', color: colors.gray[500], textTransform: 'uppercase', letterSpacing: 0.8, paddingHorizontal: 16, paddingTop: 14, paddingBottom: 4 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.gray[100] },
  menuItemLast: { borderBottomWidth: 0 },
  menuIconWrap: { width: 38, height: 38, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  menuTextWrap: { flex: 1 },
  menuLabel: { fontSize: 15, fontWeight: '500', color: colors.text.primary },
  menuSublabel: { fontSize: 12, color: colors.gray[500], marginTop: 1 },

  signOutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginHorizontal: 16, marginTop: 8, paddingVertical: 15, borderRadius: 16, backgroundColor: `${colors.error}12`, borderWidth: 1, borderColor: `${colors.error}30` },
  signOutText: { fontSize: 15, fontWeight: '600', color: colors.error },
  version: { textAlign: 'center', fontSize: 12, color: colors.gray[400], marginTop: 20 },
});
