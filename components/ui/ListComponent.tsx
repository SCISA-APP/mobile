import { memo } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import colors from "@/constants/colors";
import { ListComponentProps } from "@/types/props";
import { AnnouncementItem } from "@/types/models";

const { width } = Dimensions.get("window");

const ListComponent = memo<ListComponentProps>(function ListComponent({
  headerTitle,
  data,
  onPressItem,
  emptyTitle = "No posts yet",
  emptyDescription = "Check back later for announcements",
  style,
  headerStyle,
  itemStyle,
  imageStyle,
  titleStyle,
  descriptionStyle,
  dateStyle,
}) {
  const router = useRouter();

  const handlePress = (item: AnnouncementItem) => {
    if (onPressItem) {
      onPressItem(item);
      return;
    }

router.push({
  pathname: "/(standalone)/post/[post_id]",
  params: {
    post_id: item.id.toString(),
    title: item.title,
    description: item.description,
    image: item.image,
    date: item.date,
  },
});
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      {headerTitle && (
        <Text style={[styles.header, headerStyle]}>{headerTitle}</Text>
      )}

      {/* Main Feed */}
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.listContent, style]}
        renderItem={({ item }) => (
  <TouchableOpacity
    style={[styles.card, itemStyle]}
    onPress={() => handlePress(item)}
    activeOpacity={0.88}
  >
    {item.image && (
      <Image
        source={{ uri: item.image }}
        style={[styles.image, imageStyle]}
        resizeMode="cover"
      />
    )}

    <View style={styles.body}>
      <Text style={[styles.title, titleStyle]} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={[styles.description, descriptionStyle]} numberOfLines={2}>
        {item.description}
      </Text>
      <View style={styles.footer}>
        <Text style={[styles.date, dateStyle]}>{item.date || 'Today'}</Text>
        <Text style={styles.readMore}>Read more →</Text>
      </View>
    </View>
  </TouchableOpacity>
)}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>{emptyTitle}</Text>
            <Text style={styles.emptyDescription}>{emptyDescription}</Text>
          </View>
        )}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={10}
        removeClippedSubviews
        updateCellsBatchingPeriod={50}
        scrollEnabled={false}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: { fontSize: 11, fontWeight: '600', letterSpacing: 1.2, textTransform: 'uppercase', color: colors.gray[400], marginHorizontal: 16, marginTop: 16, marginBottom: 12 },
  listContent: { paddingHorizontal: 16, paddingBottom: 60 },
  card: { backgroundColor: '#f7f3f3', borderRadius: 16, marginBottom: 16, overflow: 'hidden' },
  image: { width: '100%', height: width * 0.44 },
  body: { padding: 14 },
  tag: { alignSelf: 'flex-start', backgroundColor: colors.primaryLight, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4, marginBottom: 8 },
  tagText: { fontSize: 10, fontWeight: '600', letterSpacing: 0.8, color: colors.primary },
  title: { fontSize: 16, fontWeight: '600', color: colors.text.primary, lineHeight: 22, marginBottom: 6 },
  description: { fontSize: 13, color: colors.text.secondary, lineHeight: 20, marginBottom: 12 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  date: { fontSize: 12, color: colors.gray[900] },
  readMore: { fontSize: 12, color: colors.text.secondary },
  emptyContainer: { alignItems: 'center', marginTop: 80 },
  emptyTitle: { color: colors.primary, fontWeight: '700', fontSize: 16 },
  emptyDescription: { color: colors.gray[600], fontSize: 14, marginTop: 4 },
});

export default ListComponent;
