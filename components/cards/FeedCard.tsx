import { FeedItem } from '@/types/models/feed';
import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';

const NAVY_MID = '#003080';

export default function FeedCard({ item, index, onPress }: {
  item: FeedItem; index: number; onPress: () => void;
}) {
  return (
    <Animated.View entering={FadeInDown.delay(index * 70).duration(360).springify()}>
      <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
        <View style={styles.accent} />
        <View style={styles.body}>
          {item.image && (
            <Image source={{ uri: item.image }} style={styles.thumb} resizeMode="cover" />
          )}
          <View style={styles.text}>
            <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.desc} numberOfLines={2}>{item.description}</Text>
            <View style={styles.footer}>
              <Text style={styles.date}>{item.date}</Text>
              <View style={styles.cta}>
                <Text style={styles.ctaText}>Read</Text>
                <Ionicons name="arrow-forward" size={11} color={NAVY_MID} />
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row', backgroundColor: '#fff',
    marginHorizontal: 16, marginBottom: 10, borderRadius: 16, overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04, shadowRadius: 5, elevation: 2,
  },
  accent: { width: 3, backgroundColor: NAVY_MID },
  body: { flex: 1, flexDirection: 'row', padding: 12, gap: 10 },
  thumb: { width: 70, height: 70, borderRadius: 10 },
  text: { flex: 1 },
  title: { fontSize: 14, fontWeight: '700', color: colors.text.primary, lineHeight: 20, marginBottom: 3 },
  desc: { fontSize: 12, color: colors.gray[500], lineHeight: 17, marginBottom: 7 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  date: { fontSize: 11, color: colors.gray[400] },
  cta: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  ctaText: { fontSize: 11, fontWeight: '700', color: NAVY_MID },
});