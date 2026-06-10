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
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CONTACTS = [
  {
    id: '1',
    title: 'University Health Services',
    role: 'Campus clinic & medical emergencies',
    phone: '+233 XX XXX XXXX',
    icon: 'medical-outline' as const,
    tint: '#E91E8C',
  },
  {
    id: '2',
    title: 'Campus Security',
    role: 'Main university security desk',
    phone: '+233 XX XXX XXXX',
    icon: 'shield-outline' as const,
    tint: '#003080',
  },
  {
    id: '3',
    title: 'College of Science Security',
    role: 'Science block security post',
    phone: '+233 XX XXX XXXX',
    icon: 'lock-closed-outline' as const,
    tint: '#1a5fb4',
  },
  {
    id: '4',
    title: 'Fire & Rescue',
    role: 'Campus fire service unit',
    phone: '192',
    icon: 'flame-outline' as const,
    tint: '#E65100',
  },
  {
    id: '5',
    title: 'National Ambulance Service',
    role: 'Emergency medical response',
    phone: '193',
    icon: 'car-outline' as const,
    tint: '#B71C1C',
  },
  {
    id: '6',
    title: 'Ghana Police Service',
    role: 'National emergency line',
    phone: '191',
    icon: 'people-circle-outline' as const,
    tint: '#37474F',
  },
];

export default function EmergencyScreen() {
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
          <Text style={styles.headerTitle}>Emergency Contacts</Text>
          <Text style={styles.headerSub}>Campus health & security services</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.alertBanner}>
          <Ionicons name="warning-outline" size={18} color="#E65100" />
          <Text style={styles.alertText}>
            In a life-threatening emergency, call the National Ambulance or Police immediately.
          </Text>
        </View>

        {CONTACTS.map((c) => (
          <View key={c.id} style={[styles.card, { borderLeftColor: c.tint }]}>
            <View style={[styles.iconWrap, { backgroundColor: `${c.tint}18` }]}>
              <Ionicons name={c.icon} size={24} color={c.tint} />
            </View>
            <View style={styles.info}>
              <Text style={styles.title}>{c.title}</Text>
              <Text style={styles.role}>{c.role}</Text>
            </View>
            <TouchableOpacity
              style={[styles.callBtn, { backgroundColor: c.tint }]}
              onPress={() => Linking.openURL(`tel:${c.phone}`)}
              activeOpacity={0.75}
            >
              <Ionicons name="call" size={17} color="#fff" />
            </TouchableOpacity>
          </View>
        ))}
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

  scroll: { paddingTop: 8, paddingHorizontal: 16, gap: 12 },

  alertBanner: {
    flexDirection: 'row', alignItems: 'flex-start', gap: 10,
    backgroundColor: '#FFF3E0',
    borderRadius: 12, padding: 14,
    borderWidth: 0.5, borderColor: '#FFCC80',
  },
  alertText: { flex: 1, fontSize: 13, color: '#E65100', lineHeight: 19 },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  iconWrap: {
    width: 46, height: 46, borderRadius: 13,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  info: { flex: 1 },
  title: { fontSize: 14, fontWeight: '700', color: colors.text.primary },
  role: { fontSize: 12, color: colors.gray[500], marginTop: 2 },
  callBtn: {
    width: 42, height: 42, borderRadius: 21,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
});