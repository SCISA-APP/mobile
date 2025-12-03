import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import colors from "@/constants/colors";

type Quote = {
  q: string;
  a: string;
};

type QuoteCardProps = {
  quote: Quote | null;
  onPress?: () => void;
};

export default function QuoteCard({ quote, onPress }: QuoteCardProps) {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      Alert.alert("Be Inspired!", quote ? `"${quote.q}" - ${quote.a}` : "Loading...");
    }
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.8} // subtle visual feedback
      style={styles.touchable}
    >
      <View style={[styles.card, { backgroundColor: colors.primary }]}>
        {quote ? (
          <>
            <Text style={styles.text}>&quot;{quote.q}&quot;</Text>
            <Text style={styles.author}>- {quote.a}</Text>
            <Text style={styles.instruction}>Tap to be inspired ✨</Text>
          </>
        ) : (
          <Text style={styles.text}>Loading...</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  touchable: {
    marginHorizontal: 16,
    marginVertical: 10,
  },
  card: {
    padding: 30,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  author: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    marginBottom: 10,
  },
  instruction: {
    fontSize: 12,
    color: "white",
    fontStyle: "italic",
  },
});
