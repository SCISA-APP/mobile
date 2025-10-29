import { EventItem } from "@/types/models/event";
import { useRouter } from "expo-router";
import React, { memo } from "react";
import {
  Dimensions,
  FlatList,
  ImageStyle,
  StyleProp,
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
  emptyDescription,
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
    <View style={{ backgroundColor: "#fff", marginTop: 10 }}>
      {/* Header */}
      {headerTitle && (
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: "#000",
            marginHorizontal: 16,
            marginTop: 10,
            marginBottom: 8,
          }}
        >
          {headerTitle}
        </Text>
      )}

      {/* Horizontal FlatList */}
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 20,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handlePress(item)}
            style={{
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
            }}
          >
            {/* Image with animation */}
            <Animated.Image
              entering={FadeIn.duration(400)}
              exiting={FadeOut.duration(200)}
              source={{ uri: item.image }}
              style={{
                width: "100%",
                height: 120,
              }}
              resizeMode="cover"
            />

            {/* Content */}
            <View style={{ padding: 10 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "700",
                  color: "#000",
                  marginBottom: 4,
                }}
                numberOfLines={1}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  color: "#555",
                  fontSize: 13,
                  lineHeight: 18,
                }}
                numberOfLines={2}
              >
                {item.description}
              </Text>
              <Text
                style={{
                  color: "#007AFF",
                  fontWeight: "600",
                  marginTop: 6,
                  fontSize: 12,
                }}
              >
                {item.date || "Coming soon"}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={() => (
          <View style={{ padding: 16, alignItems: "center" }}>
            <Text style={{ color: "#007AFF", fontWeight: "600" }}>
              No upcoming events
            </Text>
          </View>
        )}
        // ⚡ Performance optimization
        initialNumToRender={5}
        maxToRenderPerBatch={8}
        windowSize={5}
        removeClippedSubviews
      />
    </View>
  );
};

const EventList = memo(EventListComponent);
EventList.displayName = "EventList";

export default EventList;
