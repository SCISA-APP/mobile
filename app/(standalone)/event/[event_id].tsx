import colors from "@/constants/colors";
import { openLink, parseTextWithLinks } from "@/utils/linkUtils";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EventDetail() {
  const params = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Normalize title and description
  const title = Array.isArray(params.title) ? params.title[0] : params.title ?? "";
  const description = Array.isArray(params.description)
    ? params.description[0]
    : params.description ?? "";

  const image = Array.isArray(params.image) ? params.image[0] : params.image;

  // Start & end date extraction
  const start_date = Array.isArray(params.start_date)
    ? params.start_date[0]
    : params.start_date;

  const end_date = Array.isArray(params.end_date)
    ? params.end_date[0]
    : params.end_date;

  // Safe date parser for Hermes / React Native
  const safeParseDate = (dateStr: string) => {
    if (!dateStr) return null;

    // Replace +00:00 with Z (standard UTC format)
    // Also handle +00 format
    let safeStr = dateStr.replace(/\+00:00$/g, "Z").replace(/\+00$/g, "Z");

    // Only replace space with T if there's no T already
    if (!safeStr.includes("T") && safeStr.includes(" ")) {
      safeStr = safeStr.replace(" ", "T");
    }

    const d = new Date(safeStr);

    if (isNaN(d.getTime())) {
      console.warn("Failed to parse date:", dateStr, "=>", safeStr);
      return null;
    }

    return d;
  };

  const formatEventDateRange = (start?: string, end?: string | null) => {
    const startDate = start ? safeParseDate(start) : null;
    const endDate = end ? safeParseDate(end) : null;

    if (!startDate) return "Date coming soon";

    const format = (d: Date) =>
      d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });

    if (endDate) return `${format(startDate)} → ${format(endDate)}`;
    return format(startDate);
  };

  const paragraphs =
    typeof description === "string"
      ? description.split("\n\n").filter((p) => p.trim().length > 0)
      : [];

  const renderParagraph = (paragraph: string, index: number) => {
    const parts = parseTextWithLinks(paragraph.trim());

    return (
      <Text key={index} style={styles.paragraph}>
        {parts.map((part, partIndex) => {
          if (part.type === "link") {
            return (
              <Text
                key={partIndex}
                onPress={() => openLink(part.url)}
                style={styles.link}
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
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />

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
          {/* Safe date display */}
          <OccasionHeader
            title={title}
            date={formatEventDateRange(start_date, end_date)}
          />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInUp.duration(600)}>
          {image && (
            <Image
              source={{ uri: image as string }}
              style={styles.image}
              resizeMode="cover"
            />
          )}

          <View style={styles.contentCard}>
            <Text style={styles.title}>{title}</Text>
            
            {date && (
              <View style={styles.dateContainer}>
                <Ionicons name="calendar-outline" size={16} color={colors.primary} />
                <Text style={styles.date}>
                  {new Date(date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </View>
            )}

            <View style={styles.divider} />

            <View style={styles.descriptionContainer}>
              {paragraphs.map((paragraph, index) => renderParagraph(paragraph, index))}
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}
