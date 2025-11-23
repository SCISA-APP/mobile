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
        backgroundColor: "#fafafa",
      }}
      contentContainerStyle={{
        paddingBottom: 40,
      }}
    >
      <Animated.View entering={FadeInUp.duration(600)}>
        {image && (
          <Image
            source={{ uri: image }}
            style={{
              width: "100%",
              height: 320,
              marginBottom: 0,
            }}
            resizeMode="cover"
          />
        )}

        <View
          style={{
            backgroundColor: "white",
            marginTop: -24,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 24,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <View style={{ flex: 1, marginRight: 12 }}>
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "800",
                  color: "#1a1a1a",
                  lineHeight: 34,
                }}
              >
                {title}
              </Text>
            </View>

            <View
              style={{
                backgroundColor: "#610b0c",
                paddingHorizontal: 14,
                paddingVertical: 8,
                borderRadius: 20,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "700",
                  fontSize: 12,
                  letterSpacing: 0.3,
                }}
              >
                {date || "UPCOMING"}
              </Text>
            </View>
          </View>

          <View
            style={{
              height: 3,
              width: 40,
              backgroundColor: "#610b0c",
              borderRadius: 2,
              marginBottom: 20,
            }}
          />

          <Text
            style={{
              color: "#4a4a4a",
              fontSize: 16,
              lineHeight: 26,
              letterSpacing: 0.2,
            }}
          >
            {description}
          </Text>
        </View>
      </Animated.View>
    </ScrollView>
  );
}
