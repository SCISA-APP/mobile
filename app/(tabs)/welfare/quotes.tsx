import { ThemedText } from "@/components/themed-text";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as MediaLibrary from "expo-media-library";
import { useRouter } from "expo-router";
import React, { createRef, useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ViewShot, { ViewShotRef } from "react-native-view-shot";

const { height } = Dimensions.get("window");

const gradients: readonly [string, string, ...string[]][] = [
  ["#FF6B35", "#FF9B5C"],           // warm orange
  ["#025e1e", "#00ff44"],           // deep green → neon green
  ["#8E2DE2", "#4A00E0"],           // purple violet
  ["#F7971E", "#FFD200"],           // golden amber
  ["#eb3349", "#f45c43"],           // red coral
  ["#1D976C", "#93F9B9"],           // emerald mint
  ["#4776E6", "#8E54E9"],           // blue purple
  ["#FF416C", "#FF4B2B"],           // hot pink red
  ["#11998e", "#38ef7d"],           // teal green
  ["#c94b4b", "#4b134f"],           // crimson plum
  ["#F953C6", "#B91D73"],           // magenta rose
  ["#f2994a", "#f2c94c"],           // peach yellow
  ["#3a1c71", "#d76d77", "#ffaf7b"], // twilight
  ["#134E5E", "#71B280"],           // deep teal sage
  ["#373B44", "#4286f4"],           // dark steel blue
];

interface Quote {
  q: string;
  a: string;
  gradient: readonly [string, string, ...string[]];
}

const QuotesScreen = () => {
  const router = useRouter();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const viewShotRefs = React.useRef<React.RefObject<ViewShotRef | null>[]>([]);

  useEffect(() => {
    fetch("https://zenquotes.io/api/quotes")
      .then((response) => response.json())
      .then((data: { q: string; a: string }[]) => {
        setQuotes(
          data.map((q) => ({
            ...q,
            gradient: gradients[Math.floor(Math.random() * gradients.length)],
          })),
        );
        viewShotRefs.current = data.map(() => createRef<ViewShotRef>());
      })
      .catch((error) => {
        console.error("Error fetching quotes:", error);
      });
  }, []);

  const captureAndShare = async (index: number) => {
    try {
      const uri = await viewShotRefs.current[index].current!.capture();
      await Share.share({ url: uri });
    } catch (error) {
      console.error("Error sharing quote:", error);
      Alert.alert("Error", "Could not share quote.");
    }
  };

  const captureAndSave = async (index: number) => {
    try {
      const uri = await viewShotRefs.current[index].current!.capture();
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === "granted") {
        await MediaLibrary.saveToLibraryAsync(uri);
        Alert.alert("Success", "Quote saved to gallery!");
      } else {
        Alert.alert(
          "Permission Denied",
          "Please grant permission to save images to your gallery.",
        );
      }
    } catch (error) {
      console.error("Error saving quote:", error);
      Alert.alert("Error", "Could not save quote.");
    }
  };

  const renderQuote = ({ item, index }: { item: Quote; index: number }) => (
    <ViewShot
      ref={viewShotRefs.current[index]}
      options={{ format: "jpg", quality: 0.9 }}
    >
      <LinearGradient colors={item.gradient} style={styles.quoteCard}>
        <ThemedText style={styles.quoteText}>&quot;{item.q}&quot;</ThemedText>
        <ThemedText style={styles.quoteAuthor}>- {item.a}</ThemedText>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            onPress={() => captureAndShare(index)}
            style={styles.icon}
          >
            <Ionicons name="share-social-outline" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => captureAndSave(index)}
            style={styles.icon}
          >
            <Ionicons name="download-outline" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </ViewShot>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <FlatList
        data={quotes}
        renderItem={renderQuote}
        keyExtractor={(item) => item.q}
        snapToAlignment="start"
        decelerationRate={"fast"}
        snapToInterval={height}
        showsVerticalScrollIndicator={false}
        pagingEnabled
      />
    </View>
  );
};

export default QuotesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  quoteCard: {
    height: height,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },
  quoteText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  quoteAuthor: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
  iconContainer: {
    position: "absolute",
    bottom: 120,
    right: 20,
    flexDirection: "column",
  },
  icon: {
    marginVertical: 10,
  },
});
