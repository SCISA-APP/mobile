import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface OccasionHeaderProps {
  title: string;
  date?: string;
}

export default function OccasionHeader({ title, date }: OccasionHeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{date || "UPCOMING"}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1a1a1a",
    lineHeight: 25,
    width: "100%",
  },
  dateContainer: {
    backgroundColor: "#610b0c",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  date: {
    color: "white",
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 0.3,
  },
});
