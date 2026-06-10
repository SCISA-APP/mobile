import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const BRAND = '#002855';

export default function ResourceViewer() {
  const { link, title } = useLocalSearchParams<{ link: string; title?: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor={BRAND} />

      <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn} hitSlop={12}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{title ?? 'Resources'}</Text>
        <View style={{ width: 36 }} />
      </View>

      <WebView
        source={{ uri: link }}
        startInLoadingState
        style={styles.webview}
        renderLoading={() => (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color={BRAND} />
            <Text style={styles.loaderText}>Loading resources…</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: BRAND },

  header: {
    backgroundColor: BRAND,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    gap: 12,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  headerTitle: {
    flex: 1, fontSize: 16, fontWeight: '700',
    color: '#fff', textAlign: 'center',
  },

  webview: { flex: 1, backgroundColor: colors.white },

  loader: {
    flex: 1, alignItems: 'center', justifyContent: 'center',
    gap: 12, backgroundColor: colors.white,
  },
  loaderText: { fontSize: 14, color: colors.gray[400] },
});