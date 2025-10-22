import { memo } from "react";
import { 
  Dimensions, 
  FlatList, 
  Image, 
  StyleProp, 
  Text, 
  TouchableOpacity, 
  View, 
  StyleSheet 
} from "react-native";
import { ListComponentProps } from "@/types/props";
import colors from "@/constants/colors";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text.primary,
    marginHorizontal: 16,
    marginTop: 10,
  },
  listContent: {
    padding: 16,
    paddingBottom: 60,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    marginBottom: 18,
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    overflow: "hidden",
  },
  fullImage: {
    width: "100%",
    height: width * 0.5,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  contentContainer: {
    flexDirection: "row",
    padding: 12,
    alignItems: "flex-start",
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 6,
  },
  description: {
    color: colors.text.secondary,
    fontSize: 14,
    lineHeight: 20,
  },
  date: {
    color: colors.primary,
    fontWeight: "600",
    marginTop: 8,
    fontSize: 12,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 80,
  },
  emptyTitle: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 16,
  },
  emptyDescription: {
    color: colors.gray[600],
    fontSize: 14,
    marginTop: 4,
  },
});

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
  dateStyle
}) {
  return (
    <View style={styles.container}>
      {/* Header */}
      {headerTitle && (
        <Text style={[styles.header, headerStyle]}>
          {headerTitle}
        </Text>
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
            onPress={() => onPressItem?.(item)}
            activeOpacity={0.8}
          >
            {/* Full-width Image (main image style) */}
            {'image' in item && item.image && !item.thumbnail && (
              <Image
                source={{ uri: item.image }}
                style={[styles.fullImage, imageStyle]}
                resizeMode="cover"
              />
            )}

            <View style={[
              styles.contentContainer,
              item.thumbnail && { flexDirection: 'row' }
            ]}>
              {/* Thumbnail image (side image style) */}
              {'thumbnail' in item && item.thumbnail && (
                <Image
                  source={{ uri: item.thumbnail }}
                  style={[styles.thumbnail, imageStyle]}
                  resizeMode="cover"
                />
              )}

              {/* Text Content */}
              <View style={styles.textContainer}>
                <Text style={[styles.title, titleStyle]}>
                  {item.title}
                </Text>
                <Text
                  style={[styles.description, descriptionStyle]}
                  numberOfLines={item.thumbnail ? 3 : 4}
                >
                  {item.description}
                </Text>
                <Text style={[styles.date, dateStyle]}>
                  {item.date || "Today"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>
              {emptyTitle}
            </Text>
            <Text style={styles.emptyDescription}>
              {emptyDescription}
            </Text>
          </View>
        )}
        // ⚡ Optimization settings
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

export default ListComponent;
