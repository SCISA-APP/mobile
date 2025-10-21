import { AnnouncementItem } from "@/types";
import React, { memo } from "react";
import { Dimensions, FlatList, Image, ImageStyle, StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";

const { width } = Dimensions.get("window");

interface ListComponentProps {
  headerTitle: string;
  data: AnnouncementItem[];
  onPressItem?: (item: AnnouncementItem) => void;
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
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Header */}
      {headerTitle && (
        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: "#000",
            marginHorizontal: 16,
            marginTop: 10,
          }}
        >
          {headerTitle}
        </Text>
      )}

      {/* Main Feed */}
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id?.toString() || index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 60,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 16,
              marginBottom: 18,
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 4,
              shadowOffset: { width: 0, height: 2 },
              elevation: 2,
              overflow: "hidden",
            }}
          >
            {/* Full-width Image (main image style) */}
            {'image' in item && item.image && !item.thumbnail && (
              <Image
                source={{ uri: item.image }}
                style={[{
                  width: "100%",
                  height: width * 0.5,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                }, imageStyle]}
                resizeMode="cover"
              />
            )}

            <View
              style={{
                flexDirection: item.thumbnail ? "row" : "column",
                padding: 12,
                alignItems: "flex-start",
              }}
            >
              {/* Case 2: Thumbnail image (side image style) */}
              {'thumbnail' in item && item.thumbnail && (
                <Image
                  source={{ uri: item.thumbnail }}
                  style={[{
                    width: 80,
                    height: 80,
                    borderRadius: 12,
                    marginRight: 10,
                  }, imageStyle]}
                  resizeMode="cover"
                />
              )}

              {/* Text Content */}
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "700",
                    color: "#000",
                    marginBottom: 6,
                  }}
                >
                  {item.title}
                </Text>
                <Text
                  style={{
                    color: "#555",
                    fontSize: 14,
                    lineHeight: 20,
                  }}
                  numberOfLines={item.thumbnail ? 3 : 4}
                >
                  {item.description}
                </Text>

                <Text
                  style={{
                    color: "#007AFF",
                    fontWeight: "600",
                    marginTop: 8,
                    fontSize: 12,
                  }}
                >
                  {item.date || "Today"}
                </Text>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={{ alignItems: "center", marginTop: 80 }}>
            <Text style={{ color: "#007AFF", fontWeight: "700", fontSize: 16 }}>
              No posts yet
            </Text>
            <Text style={{ color: "gray", fontSize: 14, marginTop: 4 }}>
              Check back later for announcements
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
