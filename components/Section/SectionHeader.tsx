import colors from '@/constants/colors';
import { StyleSheet, Text, View } from 'react-native';

export default function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {sub && <Text style={styles.sectionSub}>{sub}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  sectionHeader: { marginHorizontal: 20, marginTop: 6, marginBottom: 10 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: colors.text.primary, letterSpacing: -0.2 },
  sectionSub: { fontSize: 12, color: colors.gray[500], marginTop: 1 },
});