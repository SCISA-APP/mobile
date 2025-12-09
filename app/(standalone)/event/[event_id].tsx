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

      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  image: {
    width: "100%",
    height: 280,
    backgroundColor: colors.gray[200],
  },
  contentCard: {
    backgroundColor: colors.white,
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text.primary,
    lineHeight: 32,
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  date: {
    fontSize: 14,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray[200],
    marginBottom: 20,
  },
  descriptionContainer: {
    gap: 16,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    color: colors.text.secondary,
  },
  link: {
    color: colors.primary,
    textDecorationLine: "underline",
    fontWeight: "600",
  },
});
