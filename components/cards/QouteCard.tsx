import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "@/constants/colors";

// Define the quote type
type Quote = {
  q: string;
  a: string;
};

// Define props for the component
type QuoteCardProps = {
  quote: Quote | null;
  onPress: () => void;
};

export default function QuoteCard({ quote, onPress }: QuoteCardProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.card, { backgroundColor: colors.primary }]}>
        {quote ? (
          <>
            <Text style={styles.text}>&quot;{quote.q}&quot;</Text>
            <Text style={styles.author}>- {quote.a}</Text>
          </>
        ) : (
          <Text style={styles.text}>Loading...</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 20,
    padding: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  author: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
});
