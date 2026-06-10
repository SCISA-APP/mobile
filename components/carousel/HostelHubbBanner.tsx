// components/home/HostelHubbBanner.tsx
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// ── config — swap these for real store URLs ───────────────────────────────────
const APP_STORE_URL = 'https://apps.apple.com/app/hostelhubb';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.Hostelhubb.Hostelhubb';

const HH_RED       = '#80040e';   // HostelHubb brand red
const HH_RED_DARK  = '#5a0209';   // deeper anchor for gradient start
const HH_RED_LIGHT = '#a31020';   // lighter end for gradient pop

const SERVICES = [
  { icon: 'bed-outline' as const,         label: 'Accommodation' },
  { icon: 'cube-outline' as const,         label: 'Storage' },
  { icon: 'car-outline' as const,          label: 'Transport' },
  { icon: 'wifi-outline' as const,         label: 'Affordable Data' },
];

function ServicePill({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <View style={styles.pill}>
      <Ionicons name={icon} size={14} color={HH_RED} />
      <Text style={styles.pillText}>{label}</Text>
    </View>
  );
}

function StoreButton({
  store,
  onPress,
}: {
  store: 'apple' | 'google';
  onPress: () => void;
}) {
  const isApple = store === 'apple';
  return (
    <TouchableOpacity style={styles.storeBtn} onPress={onPress} activeOpacity={0.82}>
      <Ionicons
        name={isApple ? 'logo-apple' : 'logo-google-playstore'}
        size={18}
        color="#fff"
      />
      <View>
        <Text style={styles.storeMeta}>{isApple ? 'Download on the' : 'Get it on'}</Text>
        <Text style={styles.storeName}>{isApple ? 'App Store' : 'Google Play'}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default function HostelHubbBanner() {
  return (
    <View style={styles.wrap}>
      <LinearGradient
        colors={[HH_RED_DARK, HH_RED, HH_RED_LIGHT]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Decorative circles */}
        <View style={styles.decor1} />
        <View style={styles.decor2} />

        {/* Header */}
        <View style={styles.headerRow}>
          <View style={styles.logoChip}>
            <Ionicons name="home" size={18} color={HH_RED} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.brandLabel}>PARTNER APP</Text>
            <Text style={styles.brandName}>HostelHubb</Text>
          </View>
          <View style={styles.badgeFree}>
            <Text style={styles.badgeFreeText}>FREE</Text>
          </View>
        </View>

        {/* Tagline */}
        <Text style={styles.tagline}>
          Everything a student needs — all in one place.
        </Text>

        {/* Service pills */}
        <View style={styles.pillRow}>
          {SERVICES.map((s) => (
            <ServicePill key={s.label} icon={s.icon} label={s.label} />
          ))}
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Store buttons */}
        <View style={styles.storeRow}>
          <StoreButton store="apple" onPress={() => Linking.openURL(APP_STORE_URL)} />
          <StoreButton store="google" onPress={() => Linking.openURL(PLAY_STORE_URL)} />
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginHorizontal: 16, marginBottom: 24 },

  card: {
    borderRadius: 22,
    padding: 18,
    overflow: 'hidden',
    shadowColor: HH_RED_DARK,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.28,
    shadowRadius: 14,
    elevation: 8,
  },

  // Decorative blobs
  decor1: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.07)',
    top: -60,
    right: -50,
  },
  decor2: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.06)',
    bottom: -30,
    left: -20,
  },

  // Header
  headerRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  logoChip: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brandLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: 'rgba(255,255,255,0.6)',
    letterSpacing: 1.5,
  },
  brandName: { fontSize: 20, fontWeight: '900', color: '#fff', letterSpacing: -0.4 },
  badgeFree: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 8,
    paddingHorizontal: 9,
    paddingVertical: 4,
  },
  badgeFreeText: { fontSize: 11, fontWeight: '800', color: '#fff' },

  // Tagline
  tagline: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.88)',
    lineHeight: 19,
    marginBottom: 14,
  },

  // Pills
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 11,
    paddingVertical: 5,
  },
  pillText: { fontSize: 11, fontWeight: '700', color: HH_RED_DARK },

  divider: {
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.18)',
    marginBottom: 14,
  },

  // Store buttons
  storeRow: { flexDirection: 'row', gap: 10 },
  storeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  storeMeta: { fontSize: 9, color: 'rgba(255,255,255,0.7)', fontWeight: '500' },
  storeName: { fontSize: 13, fontWeight: '800', color: '#fff' },
});