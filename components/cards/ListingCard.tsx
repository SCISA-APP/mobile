import { Ionicons } from '@expo/vector-icons';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { Listing } from '@/assets/data/listings';

const DEEP_BLUE = '#003080';

interface Props {
  item: Listing;
  onPress: () => void;
}

export function ListingCard({ item, onPress }: Props) {
  return (
    <Pressable style={styles.card} onPress={onPress} android_ripple={{ color: 'rgba(255,255,255,0.1)' }}>
      <ImageBackground
        source={item.logo ? { uri: item.logo } : undefined}
        style={styles.bg}
        imageStyle={styles.bgImage}
        pointerEvents="none"
      >
        {/* Solid colour fill when no real image */}
        {!item.logo && (
          <View style={[styles.colorOverlay, { backgroundColor: item.tint }]}>
            <Text style={styles.overlayLetter}>{item.company[0]}</Text>
          </View>
        )}

        {/* Scrim over image for legibility */}
        <View style={styles.scrim} pointerEvents="none" />

        {/* ── Type badge — top left, deep blue ── */}
        <View style={styles.typeBadge} pointerEvents="none">
          <Text style={styles.typeBadgeText}>{item.type}</Text>
        </View>

        {/* ── Glass footer ── */}
        <View style={styles.glass} pointerEvents="none">
          <View style={styles.glassTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.role} numberOfLines={1}>{item.role}</Text>
              <Text style={styles.company} numberOfLines={1}>{item.company}</Text>
            </View>

            {/* Stipend in glass, right side */}
            {item.stipend && (
              <View style={styles.stipendWrap}>
                <Ionicons name="cash-outline" size={11} color="rgba(100,255,160,0.9)" />
                <Text style={styles.stipendText}>
                  {item.stipend.currency} {item.stipend.amount.toLocaleString()}
                </Text>
                <Text style={styles.stipendPeriod}>/{item.stipend.period}</Text>
              </View>
            )}
          </View>

          <View style={styles.metaRow}>
            <MetaItem icon="location-outline" label={item.location} />
            <MetaItem icon="time-outline" label={item.duration} />
            <MetaItem icon="calendar-outline" label={`Due ${item.deadline}`} />
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

function MetaItem({ icon, label }: { icon: React.ComponentProps<typeof Ionicons>['name']; label: string }) {
  return (
    <View style={styles.metaItem}>
      <Ionicons name={icon} size={11} color="rgba(255,255,255,0.6)" />
      <Text style={styles.metaText} numberOfLines={1}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginBottom: 14,
    borderRadius: 20,
    overflow: 'hidden',
    height: 210,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 14,
    elevation: 6,
  },
  bg: { flex: 1, justifyContent: 'flex-end' },
  bgImage: { borderRadius: 20, resizeMode: 'cover' },

  colorOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayLetter: {
    fontSize: 80,
    fontWeight: '900',
    color: 'rgba(255,255,255,0.15)',
    letterSpacing: -4,
  },

  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,10,0.30)',
  },

  // Type badge — deep blue, top left
  typeBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: DEEP_BLUE,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  typeBadgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.4,
  },

  // Glass footer
  glass: {
    backgroundColor: 'rgba(8,8,20,0.58)',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 12,
    gap: 6,
  },
  glassTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  role: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: -0.2,
  },
  company: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.6)',
    marginTop: 1,
  },

  // Stipend inside glass
  stipendWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: 'rgba(0,180,90,0.20)',
    borderRadius: 7,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(100,255,160,0.25)',
    flexShrink: 0,
  },
  stipendText: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(120,255,170,0.95)',
  },
  stipendPeriod: {
    fontSize: 10,
    color: 'rgba(120,255,170,0.6)',
  },

  metaRow: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { fontSize: 11, color: 'rgba(255,255,255,0.6)' },
});