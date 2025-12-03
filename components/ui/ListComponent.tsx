import { memo } from "react";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { MessageCircle } from "lucide-react-native"; // comment icon
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
        NumComments: item.Num_comments || 0,
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
            activeOpacity={0.85}
          >
            {/* Image */}
            {item.image && (
              <Image
                source={{ uri: item.image }}
                style={[styles.image, imageStyle]}
                resizeMode="cover"
              />
            )}

            {/* Text and Metadata */}
            <View style={styles.textWrapper}>
              <Text style={[styles.title, titleStyle]} numberOfLines={1}>
                {item.title}
              </Text>

              <Text
                style={[styles.description, descriptionStyle]}
                numberOfLines={2}
              >
                {item.description}
              </Text>

              <View style={styles.footerRow}>
                <Text style={[styles.date, dateStyle]}>
                 <Text style={[styles.date, dateStyle]}>
  {item.date
    ? new Date(item.date).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Today"}
</Text>
                </Text>

                <View style={styles.commentContainer}>
                  <MessageCircle
                    color={colors.primary}
                    size={18}
                    style={{ marginRight: 4 }}
                  />
                  <Text style={styles.commentCount}>
                    {item.commentCount || 0}
                  </Text>
                </View>
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
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: 18,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
    overflow: "hidden",
    backdropFilter: "blur(10px)", // glassmorphism feel
  },
  image: {
    width: "100%",
    height: width * 0.45,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },
  textWrapper: {
    padding: 14,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 6,
  },
  description: {
    color: colors.text.secondary,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    color: colors.primaryDark,
    fontWeight: "600",
    fontSize: 13,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(128,0,32,0.08)", // soft wine tint
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  commentCount: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 13,
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

export default ListComponent;
