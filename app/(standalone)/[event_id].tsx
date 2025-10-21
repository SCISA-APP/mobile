import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function OccasionDetail() {
  const { title, description, image, date } = useLocalSearchParams();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
      contentContainerStyle={{
        padding: 16,
        paddingBottom: 40,
      }}
    >
      <Animated.View entering={FadeInUp.duration(600)}>
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: 240,
              borderRadius: 16,
              marginBottom: 16,
            }}
            resizeMode="cover"
          />
        )}

        <Text
          style={{
            fontSize: 22,
            fontWeight: "700",
            color: "#610b0c",
            marginBottom: 8,
          }}
        >
          {title}
        </Text>

        <Text
          style={{
            color: "#333",
            fontSize: 15,
            lineHeight: 22,
            marginBottom: 10,
          }}
        >
          {description}
        </Text>

        <View
          style={{
            backgroundColor: "#610b0c10",
            padding: 8,
            borderRadius: 8,
            alignSelf: "flex-start",
            marginTop: 4,
          }}
        >
          <Text
            style={{
              color: "#610b0c",
              fontWeight: "600",
              fontSize: 13,
            }}
          >
            {date || "Upcoming"}
          </Text>
        </View>
      </Animated.View>
    </ScrollView>
  );
}
