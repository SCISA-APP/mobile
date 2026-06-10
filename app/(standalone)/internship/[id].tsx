import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Image,
  Linking,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LISTINGS } from '@/assets/data/listings';

export default function ListingDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const listing = LISTINGS.find((l) => l.id === id);

  if (!listing) {
    return (
      <View style={styles.notFound}>
        <Ionicons name="alert-circle-outline" size={48} color={colors.gray[300]} />
        <Text style={styles.notFoundText}>Listing not found</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleEmail = () => {
    if (listing.contact.email) {
      Linking.openURL(`mailto:${listing.contact.email}?subject=Application: ${listing.role}`);
    }
  };

  const handlePhone = () => {
    if (listing.contact.phone) {
      Linking.openURL(`tel:${listing.contact.phone}`);
    }
  };

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      {/* ── Hero image — full bleed, fixed height ── */}
      <View style={styles.heroWrap}>
        {listing.logo ? (
          <Image source={{ uri: listing.logo }} style={styles.heroImage} resizeMode="cover" />
        ) : (
          <View style={[styles.heroFallback, { backgroundColor: listing.tint }]}>
            <Text style={styles.heroLetter}>{listing.company[0]}</Text>
          </View>
        )}
        {/* Scrim so back button is always visible */}
        <View style={styles.heroScrim} />
        {/* Back button — padded below safe area top */}
        <TouchableOpacity
          style={[styles.backBtn, { top: insets.top + 8 }]}
          onPress={() => router.back()}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* ── Scrollable content — sits fully below hero ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ paddingBottom: insets.bottom + 110 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Title block */}
        <View style={styles.titleBlock}>
          <View style={styles.titleRow}>
            <Text style={styles.role}>{listing.role}</Text>
            <View style={[styles.typePill, { backgroundColor: `${listing.tint}18` }]}>
              <Text style={[styles.typePillText, { color: listing.tint }]}>{listing.type}</Text>
            </View>
          </View>
          <Text style={styles.company}>{listing.company}</Text>

          {/* Info chips */}
          <View style={styles.chipsRow}>
            <Chip icon="location-outline" label={listing.location} />
            <Chip icon="time-outline" label={listing.duration} />
            <Chip icon="calendar-outline" label={`Deadline: ${listing.deadline}`} />
            <Chip icon="school-outline" label={listing.department} />
          </View>

          {/* Stipend */}
          {listing.stipend ? (
            <View style={styles.stipendRow}>
              <Ionicons name="cash-outline" size={15} color={colors.success} />
              <Text style={styles.stipendLabel}>Stipend</Text>
              <Text style={styles.stipendAmount}>
                {listing.stipend.currency} {listing.stipend.amount.toLocaleString()}
                <Text style={styles.stipendPer}> / {listing.stipend.period}</Text>
              </Text>
            </View>
          ) : (
            <View style={[styles.stipendRow, { backgroundColor: colors.gray[100] }]}>
              <Ionicons name="cash-outline" size={15} color={colors.gray[400]} />
              <Text style={[styles.stipendLabel, { color: colors.gray[400] }]}>No stipend</Text>
            </View>
          )}
        </View>

        {/* About */}
        <Section title="About the role">
          <Text style={styles.description}>{listing.description}</Text>
        </Section>

        {/* Skills */}
        <Section title="Skills required">
          <View style={styles.skillsWrap}>
            {listing.skills.map((s) => (
              <View key={s} style={[styles.skillChip, { borderColor: `${listing.tint}50` }]}>
                <Text style={[styles.skillText, { color: listing.tint }]}>{s}</Text>
              </View>
            ))}
          </View>
        </Section>

        {/* Contact */}
        <Section title="Contact">
          {listing.contact.name && (
            <Row icon="person-outline" label={listing.contact.name} color={colors.gray[500]} />
          )}
          {listing.contact.email && (
            <TouchableOpacity onPress={handleEmail}>
              <Row icon="mail-outline" label={listing.contact.email} color={listing.tint} />
            </TouchableOpacity>
          )}
          {listing.contact.phone && (
            <TouchableOpacity onPress={handlePhone}>
              <Row icon="call-outline" label={listing.contact.phone} color={listing.tint} />
            </TouchableOpacity>
          )}
        </Section>
      </ScrollView>

      {/* ── Apply CTA ── */}
      <View style={[styles.cta, { paddingBottom: insets.bottom + 12 }]}>
        <TouchableOpacity
          style={[styles.applyBtn, { backgroundColor: listing.tint }]}
          activeOpacity={0.85}
          onPress={handleEmail}
        >
          <Ionicons name="send-outline" size={17} color="#fff" />
          <Text style={styles.applyText}>Apply via Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={section.wrap}>
      <Text style={section.title}>{title}</Text>
      {children}
    </View>
  );
}

function Chip({ icon, label }: { icon: any; label: string }) {
  return (
    <View style={chip.wrap}>
      <Ionicons name={icon} size={12} color={colors.gray[500]} />
      <Text style={chip.label}>{label}</Text>
    </View>
  );
}

function Row({ icon, label, color }: { icon: any; label: string; color: string }) {
  return (
    <View style={row.wrap}>
      <Ionicons name={icon} size={15} color={color} />
      <Text style={[row.label, { color }]}>{label}</Text>
    </View>
  );
}

const HERO_HEIGHT = 260;

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.gray[50] },

  // Hero
  heroWrap: { width: '100%', height: HERO_HEIGHT },
  heroImage: { width: '100%', height: HERO_HEIGHT },
  heroFallback: {
    width: '100%', height: HERO_HEIGHT,
    justifyContent: 'center', alignItems: 'center',
  },
  heroLetter: { fontSize: 80, fontWeight: '900', color: 'rgba(255,255,255,0.25)' },
  heroScrim: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.22)',
  },
  backBtn: {
    position: 'absolute',
    left: 16,
    width: 38, height: 38, borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center', alignItems: 'center',
  },

  scroll: { flex: 1 },

  // Title block
  titleBlock: {
    backgroundColor: colors.white,
    marginHorizontal: 10,
    marginTop:10,
    borderRadius: 16,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 2,
  },
  titleRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginBottom: 4 },
  role: { flex: 1, fontSize: 18, fontWeight: '800', color: colors.text.primary, lineHeight: 24 },
  company: { fontSize: 13, color: colors.gray[500], marginBottom: 12 },
  typePill: { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 3, marginTop: 2 },
  typePillText: { fontSize: 11, fontWeight: '700' },

  chipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },

  stipendRow: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: `${colors.success}10`,
    borderRadius: 10, padding: 10,
  },
  stipendLabel: { fontSize: 12, fontWeight: '600', color: colors.success },
  stipendAmount: { fontSize: 14, fontWeight: '800', color: colors.success, marginLeft: 'auto' },
  stipendPer: { fontSize: 12, fontWeight: '400' },

  description: { fontSize: 14, color: colors.text.secondary, lineHeight: 22 },

  skillsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  skillChip: { borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 5 },
  skillText: { fontSize: 12, fontWeight: '600' },

  cta: {
    backgroundColor: colors.white,
    paddingHorizontal: 16, paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.gray[200],
  },
  applyBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, borderRadius: 14, paddingVertical: 14,
  },
  applyText: { fontSize: 15, fontWeight: '700', color: '#fff' },

  notFound: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  notFoundText: { fontSize: 16, color: colors.gray[400] },
  backLink: { fontSize: 14, color: colors.primary, fontWeight: '600' },
});

const section = StyleSheet.create({
  wrap: {
    backgroundColor: colors.white,
    marginHorizontal: 16, marginTop: 10,
    borderRadius: 14, padding: 16,
  },
  title: {
    fontSize: 11, fontWeight: '700', color: colors.gray[400],
    textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 10,
  },
});

const chip = StyleSheet.create({
  wrap: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: colors.gray[100], borderRadius: 8,
    paddingHorizontal: 8, paddingVertical: 4,
  },
  label: { fontSize: 11, color: colors.gray[600] },
});

const row = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 6 },
  label: { fontSize: 13, flex: 1 },
});