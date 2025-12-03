import { EventItem } from "@/types/models/event";
import { useRouter } from "expo-router";
import React, { memo } from "react";
import colors from "@/constants/colors";
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
        ...(item.date && { date: item.date }),
      },
    });
  };

  return (
    <View style={[styles.container, style]}>
      {headerTitle && (
        <Text style={[styles.header, headerStyle]}>{headerTitle}</Text>
      )}

      <FlatList
        horizontal
        data={data}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
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
              <Text style={[styles.cardTitle, titleStyle]} numberOfLines={1}>
                {item.title}
              </Text>
              <Text
                style={[styles.cardDescription, descriptionStyle]}
                numberOfLines={2}
              >
                {item.description}
              </Text>
              <Text style={[styles.cardDate, dateStyle]}>
                <Text style={[styles.cardDate, dateStyle]}>
  {item.date
    ? new Date(item.date).toLocaleDateString("en-US", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "Coming soon"}
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
    backgroundColor: "#fff",
    marginTop: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: "700",
    color: "#000",
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 16,
    marginRight: 14,
    width: width * 0.6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    overflow: "hidden",
  },
  cardImage: {
    width: "100%",
    height: 120,
  },
  cardContent: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
    marginBottom: 4,
  },
  cardDescription: {
    color: "#555",
    fontSize: 13,
    lineHeight: 18,
  },
  cardDate: {
    color: colors.primaryDark,
    fontWeight: "600",
    marginTop: 6,
    fontSize: 12,
  },
  emptyContainer: {
    padding: 16,
    alignItems: "center",
  },
  emptyText: {
    color: "#007AFF",
    fontWeight: "600",
  },
});

const EventList = memo(EventListComponent);
EventList.displayName = "EventList";

export default EventList;
