import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { parseTextWithLinks, openLink } from "@/utils/linkUtils";
import OccasionHeader from "@/components/headers/OccassionHeader";

export default function OccasionDetail() {
  const params = useLocalSearchParams();

  // Normalize title and date to string
  const title = Array.isArray(params.title) ? params.title[0] : params.title ?? "";
  const date = Array.isArray(params.date) ? params.date[0] : params.date;

  const description = Array.isArray(params.description) ? params.description[0] : params.description;

  const image = Array.isArray(params.image) ? params.image[0] : params.image;

  const paragraphs = typeof description === "string"
    ? description.split("\n\n").filter(p => p.trim().length > 0)
    : [];

  const renderParagraph = (paragraph: string, index: number) => {
    const parts = parseTextWithLinks(paragraph.trim());

    return (
      <Text
        key={index}
        style={{
          color: "#4a4a4a",
          fontSize: 16,
          lineHeight: 26,
          letterSpacing: 0.2,
          marginBottom: index < paragraphs.length - 1 ? 16 : 0,
          textAlign: "justify",
        }}
      >
        {parts.map((part, partIndex) => {
          if (part.type === "link") {
            return (
              <Text
                key={partIndex}
                onPress={() => openLink(part.url)}
                style={{
                  color: "#610b0c",
                  textDecorationLine: "underline",
                  fontWeight: "600",
                }}
              >
                {part.content}
              </Text>
            );
          }
          return <Text key={partIndex}>{part.content}</Text>;
        })}
      </Text>
    );
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#fff" }}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      <Animated.View entering={FadeInUp.duration(600)}>
        {image && (
          <Image
            source={{ uri: image as string }}
            style={{ width: "100%", height: 320, marginBottom: 0 }}
            resizeMode="cover"
          />
        )}

        <View
          style={{
            backgroundColor: "white",
            marginTop: -24,
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            padding: 15,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.05,
            shadowRadius: 8,
            elevation: 5,
          }}
        >
          <OccasionHeader title={title} date={date} />

          <View
            style={{
              height: 3,
              width: 40,
              backgroundColor: "#610b0c",
              borderRadius: 2,
              marginBottom: 20,
            }}
          />

          {paragraphs.map((paragraph, index) => renderParagraph(paragraph, index))}
        </View>
      </Animated.View>
    </ScrollView>
  );
}
