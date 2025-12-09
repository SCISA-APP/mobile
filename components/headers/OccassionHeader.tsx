import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface OccasionHeaderProps {
  title: string;
  date?: string;
}

export default function OccasionHeader({ title, date }: OccasionHeaderProps) {
  // Function to check if date is already formatted (contains "→" or has words like "Mon", "Tue", etc.)
  const isAlreadyFormatted = (dateStr: string) => {
    return dateStr.includes("→") || /^[A-Z][a-z]{2},/.test(dateStr);
  };

  // Convert date string to human-readable format only if it's a raw date
  const formattedDate = date
    ? isAlreadyFormatted(date)
      ? date // Already formatted, use as is
      : (() => {
          // Try to parse and format the raw date
          const parsedDate = new Date(date);
          if (isNaN(parsedDate.getTime())) {
            return "UPCOMING"; // Invalid date
          }
          return parsedDate.toLocaleDateString("en-US", {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        })()
    : "UPCOMING";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{formattedDate}</Text>
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