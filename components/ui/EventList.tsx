import { EventItem } from "@/types/models/event";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useRouter } from "expo-router";
import React, { memo } from "react";
import { StyleSheet } from "react-native";
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
renderItem={({ item, index }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={() => handlePress(item)}
      style={{
        backgroundColor: 'white',
        borderRadius: 20,
        marginRight: 14,
        width: width * 0.55,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#E5E5E5',
        overflow: 'hidden',
      }}
    >
      {/* Colored image area */}
      <View style={{ backgroundColor: '#F0F0F0', height: 110, alignItems: 'center', justifyContent: 'center' }}>
        {item.image
          ? <Animated.Image entering={FadeIn.duration(400)} source={{ uri: item.image }} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
          : <Ionicons name="calendar-outline" size={36} color="#888" />
        }
      </View>

      <View style={{ padding: 12 }}>


        <Text style={{ fontSize: 14, fontWeight: '500', color: '#1a1a1a', lineHeight: 20, marginBottom: 4 }} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={{ fontSize: 12, color: '#888', lineHeight: 18, marginBottom: 12 }} numberOfLines={2}>
          {item.description}
        </Text>

        {/* Footer */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 0, borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: '#F0F0F0' }}>
          <Text style={{ fontSize: 11, color: '#000000' }}>{item.date || 'Coming soon'}</Text>
          <View style={{ width: 26, height: 26, borderRadius: 13, borderWidth: StyleSheet.hairlineWidth, borderColor: '#E0E0E0', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="arrow-forward" size={13} color="#888" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}}
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
