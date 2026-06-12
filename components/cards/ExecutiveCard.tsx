import { Executive } from '@/types/models/executives';
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const NAVY     = '#002259';
const NAVY_MID = '#003080';

interface Props {
  item: Executive;
  onPress: () => void;
}

export default function ExecutiveCard({ item, onPress }: Props) {
  const initials = item.name.trim().split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.82}>
      {/* Avatar */}
      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.avatarFallback]}>
          <Text style={styles.avatarInitials}>{initials}</Text>
        </View>
      )}

      {/* Info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.role} numberOfLines={2}>{item.role}</Text>
        {item.department && (
          <View style={styles.pill}>
            <Ionicons name="school-outline" size={10} color={NAVY_MID} />
            <Text style={styles.pillText} numberOfLines={1}>{item.department}</Text>
          </View>
        )}

        {/* Contact badges */}
        <View style={styles.badges}>
          {item.phone && (
            <View style={styles.badge}>
              <Ionicons name="call-outline" size={12} color={NAVY_MID} />
            </View>
          )}
          {item.email && (
            <View style={styles.badge}>
              <Ionicons name="mail-outline" size={12} color={NAVY_MID} />
            </View>
          )}
        </View>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#ccc" style={{ flexShrink: 0 }} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 14,
    gap: 16,
    width: '100%',
    shadowColor: NAVY,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    borderWidth: 0.5,
    borderColor: `${NAVY_MID}18`,
  },
  avatar: {
    width: 84, height: 84, borderRadius: 42,
    borderWidth: 2.5, borderColor: `${NAVY_MID}25`,
    flexShrink: 0,
  },
  avatarFallback: {
    backgroundColor: `${NAVY_MID}12`,
    justifyContent: 'center', alignItems: 'center',
  },
  avatarInitials: {
    fontSize: 26, fontWeight: '800', color: NAVY_MID,
  },
  info: {
    flex: 1, gap: 5,
  },
  name: {
    fontSize: 16, fontWeight: '800', color: '#1a1a1a', letterSpacing: -0.2,
  },
  role: {
    fontSize: 12, color: '#888', fontWeight: '500', lineHeight: 17,
  },
  pill: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    alignSelf: 'flex-start',
    backgroundColor: `${NAVY_MID}10`, borderRadius: 6,
    paddingHorizontal: 8, paddingVertical: 3,
  },
  pillText: {
    fontSize: 10, fontWeight: '700', color: NAVY_MID,
  },
  badges: {
    flexDirection: 'row', gap: 6, marginTop: 2,
  },
  badge: {
    width: 28, height: 28, borderRadius: 9,
    backgroundColor: `${NAVY_MID}10`,
    justifyContent: 'center', alignItems: 'center',
  },
});