// app/events/_layout.js
import { Stack } from "expo-router";

export default function EventsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "white" },
        headerTintColor: "#000",
        headerTitleAlign: "center",
        title: "Details",
        headerBackButtonMenuEnabled: true,
      }}
    />
  );
}
