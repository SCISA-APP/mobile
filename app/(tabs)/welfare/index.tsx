import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HEADER_COLOR = colors.gray[100];

interface Quote { q: string; a: string; }

function ActionCard({ icon, title, subtitle, tint, onPress }: {
  icon: keyof typeof Ionicons.glyphMap; title: string; subtitle: string;
  tint: string; onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.actionCard} onPress={onPress} activeOpacity={0.75}>
      <View style={[styles.actionIconWrap, { backgroundColor: `${tint}18` }]}>
        <Ionicons name={icon} size={24} color={tint} />
      </View>
      <View style={styles.actionText}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionSubtitle}>{subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color={colors.gray[400]} />
    </TouchableOpacity>
  );
}

function ResourceTile({ icon, label, tint }: {
  icon: keyof typeof Ionicons.glyphMap; label: string; tint: string;
}) {
  return (
    <View style={styles.resourceTile}>
      <View style={[styles.resourceIcon, { backgroundColor: `${tint}18` }]}>
        <Ionicons name={icon} size={22} color={tint} />
      </View>
      <Text style={styles.resourceLabel}>{label}</Text>
    </View>
  );
}

export default function WelfareScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [quote, setQuote] = useState<Quote | null>(null);
  const [quoteLoading, setQuoteLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchQuote = useCallback(() => {
    return fetch('https://zenquotes.io/api/random')
      .then((r) => r.json())
      .then((data) => setQuote(data[0]))
      .catch(() => {});
  }, []);

  useEffect(() => {
    fetchQuote().finally(() => setQuoteLoading(false));
  }, [fetchQuote]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setQuoteLoading(true);
    fetchQuote().finally(() => {
      setQuoteLoading(false);
      setRefreshing(false);
    });
  }, [fetchQuote]);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="dark-content" />

      {/* ── Sticky page header ── */}
      <View style={[styles.pageHeader, { paddingTop: insets.top + 12 }]}>
        <Text style={styles.pageTitle}>Welfare Space</Text>
        <Text style={styles.pageSubtitle}>Your wellbeing is our priority</Text>
      </View>

      {/* ── Scrollable content ── */}
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
      >
        {/* Daily quote card */}
        <TouchableOpacity activeOpacity={0.88} onPress={() => router.push('/(tabs)/welfare/quotes')}>
          <LinearGradient colors={['#003080', '#1a5fb4']} style={styles.quoteCard}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <View style={styles.quoteDecorCircle} />
            <Ionicons name="quote" size={28} color="rgba(255,255,255,0.35)" style={styles.quoteIcon} />
            {quoteLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.quoteText}>{quote?.q ?? 'Stay inspired.'}</Text>
                <Text style={styles.quoteAuthor}>— {quote?.a ?? 'Unknown'}</Text>
              </>
            )}
            <View style={styles.quoteTapHint}>
              <Ionicons name="library-outline" size={13} color="rgba(255,255,255,0.6)" />
              <Text style={styles.quoteTapText}>Tap to browse more quotes</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>Support</Text>
        <View style={styles.actionsCard}>
          <ActionCard icon="alert-circle-outline" title="Report a Concern"
            subtitle="Submit confidentially or anonymously" tint={colors.error}
            onPress={() => router.push('/(tabs)/welfare/concern')} />
          <View style={styles.divider} />
          <ActionCard icon="people-outline" title="Talk to a Counselor"
            subtitle="We're here to listen" tint="#7C3AED"
            onPress={() => console.log('Counselor')} />
          <View style={styles.divider} />
          <ActionCard icon="call-outline" title="Emergency Contacts"
            subtitle="Campus security & health services" tint={colors.warning}
            onPress={() => console.log('Emergency')} />
        </View>

        <Text style={styles.sectionLabel}>Resources</Text>
        <View style={styles.resourcesGrid}>
          <ResourceTile icon="heart-outline" label="Mental Health" tint="#E91E8C" />
          <ResourceTile icon="fitness-outline" label="Physical Health" tint={colors.success} />
          <ResourceTile icon="book-outline" label="Study Tips" tint="#7C3AED" />
          <ResourceTile icon="moon-outline" label="Sleep & Rest" tint="#1a5fb4" />
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="shield-checkmark-outline" size={24} color={colors.primary} />
          <Text style={styles.infoTitle}>Your Mental Health Matters</Text>
          <Text style={styles.infoText}>
            It's okay to not be okay — our counselors are here to support you through
            any challenges you may be facing.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.gray[100] },

  pageHeader: {
    backgroundColor: colors.gray[100],
    paddingHorizontal: 20, paddingBottom: 14,
    zIndex: 10,
  },
  pageTitle: { fontSize: 28, fontWeight: '800', color: colors.text.primary, letterSpacing: -0.5 },
  pageSubtitle: { fontSize: 14, color: colors.gray[500], marginTop: 2 },

  scroll: { paddingBottom: 120 },

  quoteCard: {
    marginHorizontal: 16, marginBottom: 24, borderRadius: 20,
    padding: 24, overflow: 'hidden', minHeight: 160,
    shadowColor: colors.primary, shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25, shadowRadius: 14, elevation: 6,
  },
  quoteDecorCircle: {
    position: 'absolute', width: 180, height: 180, borderRadius: 90,
    backgroundColor: 'rgba(255,255,255,0.06)', top: -40, right: -40,
  },
  quoteIcon: { marginBottom: 10 },
  quoteText: { fontSize: 16, fontWeight: '600', color: '#fff', lineHeight: 24, marginBottom: 10 },
  quoteAuthor: { fontSize: 13, color: 'rgba(255,255,255,0.65)', fontStyle: 'italic' },
  quoteTapHint: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 16 },
  quoteTapText: { fontSize: 12, color: 'rgba(255,255,255,0.55)' },

  sectionLabel: {
    fontSize: 11, fontWeight: '700', color: colors.gray[500],
    textTransform: 'uppercase', letterSpacing: 0.8,
    marginHorizontal: 20, marginBottom: 8,
  },
  actionsCard: {
    backgroundColor: colors.white, marginHorizontal: 16,
    borderRadius: 16, marginBottom: 24,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06, shadowRadius: 8, elevation: 3, overflow: 'hidden',
  },
  actionCard: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 16 },
  actionIconWrap: {
    width: 44, height: 44, borderRadius: 12,
    justifyContent: 'center', alignItems: 'center', marginRight: 14,
  },
  actionText: { flex: 1 },
  actionTitle: { fontSize: 15, fontWeight: '600', color: colors.text.primary },
  actionSubtitle: { fontSize: 12, color: colors.gray[500], marginTop: 2 },
  divider: { height: StyleSheet.hairlineWidth, backgroundColor: colors.gray[100], marginLeft: 74 },

  resourcesGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    marginHorizontal: 16, gap: 12, marginBottom: 24,
  },
  resourceTile: {
    width: '47%', backgroundColor: colors.white,
    borderRadius: 14, padding: 16, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05, shadowRadius: 4, elevation: 2,
  },
  resourceIcon: {
    width: 48, height: 48, borderRadius: 14,
    justifyContent: 'center', alignItems: 'center', marginBottom: 10,
  },
  resourceLabel: { fontSize: 13, fontWeight: '600', color: colors.text.primary },

  infoCard: {
    backgroundColor: colors.white, marginHorizontal: 16,
    borderRadius: 16, padding: 20, alignItems: 'center',
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05, shadowRadius: 6, elevation: 2,
  },
  infoTitle: {
    fontSize: 16, fontWeight: '700', color: colors.text.primary,
    marginTop: 10, marginBottom: 8, textAlign: 'center',
  },
  infoText: { fontSize: 14, color: colors.gray[600], lineHeight: 22, textAlign: 'center' },
});
