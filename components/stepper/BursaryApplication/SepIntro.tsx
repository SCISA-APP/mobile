import { View, Text, Image, StyleSheet, ScrollView } from "react-native";
import React from "react";
import Support from "../../../assets/images/Support.gif";
import colors from "@/constants/colors";

export default function StepIntro() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Image source={Support} style={styles.image} />

        <Text style={styles.title}>SCISA Bursary Overview</Text>

        <Text style={styles.description}>
          The SCISA Bursary is a financial aid program designed to support students 
          who demonstrate both academic commitment and financial need to ease the financial burden for students and allow them 
          to focus on their studies while.
        </Text>

        <Text style={styles.subtitle}>Eligibility Criteria:</Text>
        <Text style={styles.listItem}>• Must be an active student currently enrolled in College of Science</Text>
        <Text style={styles.listItem}>• Must demonstrate genuine financial need</Text>
        <Text style={styles.listItem}>• Must show consistent academic seriousness and commitment</Text>
        <Text style={styles.listItem}>• Must not be under any disciplinary sanctions</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
  
  },
  card: {
    borderRadius: 12,
    shadowOpacity: 0.1,
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
    borderRadius: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    color: colors.primaryDark,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
    color: colors.secondaryDark,
  },
  description: {
    fontSize: 14,
    marginBottom: 8,
    color: "#333",
    lineHeight: 20,
  },
  listItem: {
    fontSize: 14,
    color: "#333",
    marginBottom: 4,
    lineHeight: 20,
  },
});
