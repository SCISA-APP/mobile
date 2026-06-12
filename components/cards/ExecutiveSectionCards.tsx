import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NAVY     = '#002259';
const NAVY_MID = '#003080';

export default function ExecutiveSectionCards() {
  const router = useRouter();
  const { studentUser } = useAuth();

  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => router.push('/(standalone)/executives/college')}
      >
        <View style={styles.iconWrap}>
          <Ionicons name="school-outline" size={22} color={NAVY_MID} />
        </View>
        <Text style={styles.label}>Know Your</Text>
        <Text style={styles.title}>College{'\n'}Executives</Text>
        <View style={styles.arrow}>
          <Ionicons name="arrow-forward" size={14} color={NAVY_MID} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => router.push('/(standalone)/executives/department')}
      >
        <View style={styles.iconWrap}>
          <Ionicons name="people-outline" size={22} color={NAVY_MID} />
        </View>
        <Text style={styles.label}>Know Your</Text>
        <Text style={styles.title}>Department{'\n'}Executives</Text>
        <View style={styles.arrow}>
          <Ionicons name="arrow-forward" size={14} color={NAVY_MID} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginHorizontal: 16,
    marginBottom: 20,
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 16,
    shadowColor: NAVY,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    borderWidth: 0.5,
    borderColor: `${NAVY_MID}18`,
  },
  iconWrap: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: `${NAVY_MID}12`,
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    fontSize: 10, color: '#999', fontWeight: '600',
    letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 2,
  },
  title: {
    fontSize: 15, fontWeight: '800', color: NAVY,
    lineHeight: 20, marginBottom: 8,
  },
  programPill: {
    alignSelf: 'flex-start',
    backgroundColor: `${NAVY_MID}12`,
    borderRadius: 6,
    paddingHorizontal: 7, paddingVertical: 3,
    marginBottom: 8,
  },
  programPillText: {
    fontSize: 9, fontWeight: '700', color: NAVY_MID,
    letterSpacing: 0.3,
  },
  arrow: {
    width: 26, height: 26, borderRadius: 13,
    backgroundColor: `${NAVY_MID}10`,
    justifyContent: 'center', alignItems: 'center',
  },
});