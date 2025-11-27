import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function EventsLayout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }} edges={["top"]}>
      {/* ✅ Dark text/icons on white background */}
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      <Stack
        screenOptions={{
          headerShown: false,
          headerStyle: { backgroundColor: "white" },
          headerBackButtonMenuEnabled: true,
          contentStyle: { backgroundColor: "white" },
        }}
      />
    </SafeAreaView>
  );
}
