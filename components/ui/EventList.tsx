import colors from "@/constants/colors";
import { EventItem } from "@/types/models/event";
import { useRouter } from "expo-router";
import React, { memo } from "react";
import {
    Dimensions,
    FlatList,
    ImageStyle,
    StyleProp,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

type Router = {
  push: (params: { pathname: string; params: Record<string, any> }) => void;
};

const { width } = Dimensions.get("window");

interface EventListProps {
  headerTitle: string;
  data: EventItem[];
  onPressItem?: (item: EventItem) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  style?: StyleProp<ViewStyle>;
  headerStyle?: StyleProp<TextStyle>;
  itemStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  titleStyle?: StyleProp<TextStyle>;
  descriptionStyle?: StyleProp<TextStyle>;
  dateStyle?: StyleProp<TextStyle>;
}

const EventListComponent = ({
  headerTitle,
  data,
  onPressItem,
  emptyTitle = "No upcoming events",
  style,
  headerStyle,
  itemStyle,
  imageStyle,
  titleStyle,
  descriptionStyle,
  dateStyle,
}: EventListProps) => {
  const router = useRouter() as unknown as Router;

  const handlePress = (item: EventItem) => {
    if (onPressItem) {
      onPressItem(item);
      return;
    }

router.push({
  pathname: "/(standalone)/event/[event_id]",
  params: {
    event_id: item.id.toString(),
    title: item.title,
    description: item.description,
    ...(item.image && { image: item.image }),
    ...(item.start_date && { start_date: item.start_date }),
    ...(item.end_date && { end_date: item.end_date }),
  },
});
  };

  const formatEventDate = (start: string, end?: string | null) => {

    // 🔥 Fix invalid date by converting backend format → ISO format
    const normalizeDate = (dateStr: string) => {
      if (!dateStr) return dateStr;
      return dateStr
        .replace(" ", "T")          // insert T
        .replace(/\+00$/, "+00:00") // fix timezone
        .trim();
    };

    const format = (dateStr: string) => {
      const safe = normalizeDate(dateStr);
      const d = new Date(safe);

      if (isNaN(d.getTime())) return "Invalid date";

      return d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    };

    if (end) {
      return `${format(start)} → ...`;
    }

    return format(start); // only start date
  };


  return (
    <View style={[styles.container, style]}>
      <View style={styles.headerContainer}>
        {headerTitle && (
          <Text style={[styles.header, headerStyle]}>{headerTitle}</Text>
        )}
      </View>

      <FlatList
        horizontal
        data={data}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => handlePress(item)}
            style={[styles.cardContainer, itemStyle]}
          >
            <Animated.Image
              entering={FadeIn.duration(400)}
              exiting={FadeOut.duration(200)}
              source={{ uri: item.image }}
              style={[styles.cardImage, imageStyle]}
              resizeMode="cover"
            />

            <View style={styles.cardContent}>
              <Text style={[styles.cardTitle, titleStyle]} numberOfLines={2}>
                {item.title}
              </Text>
              <Text
                style={[styles.cardDescription, descriptionStyle]}
                numberOfLines={2}
              >
                {item.description}
              </Text>
              <View style={styles.dateContainer}>
                <Text style={[styles.cardDate, dateStyle]}>
<Text style={[styles.cardDate, dateStyle]}>
  {item.start_date
    ? formatEventDate(item.start_date, item.end_date)
    : "Date coming soon"}
</Text>

</Text>
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{emptyTitle}</Text>
          </View>
        )}
        initialNumToRender={5}
        maxToRenderPerBatch={8}
        windowSize={5}
        removeClippedSubviews
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: 16,
  },
  headerContainer: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text.primary,
  },
  listContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  cardContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    width: width * 0.55,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  cardImage: {
    width: "100%",
    height: 100,
    backgroundColor: colors.gray[100],
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text.primary,
    marginBottom: 4,
    lineHeight: 18,
  },
  cardDescription: {
    color: colors.text.secondary,
    fontSize: 11,
    lineHeight: 15,
    marginBottom: 6,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardDate: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 12,
    textTransform: 'uppercase',
  },
  emptyContainer: {
    padding: 32,
    alignItems: "center",
  },
  emptyText: {
    color: colors.text.secondary,
    fontWeight: "500",
    fontSize: 14,
  },
});

const EventList = memo(EventListComponent);
EventList.displayName = "EventList";

export default EventList;
