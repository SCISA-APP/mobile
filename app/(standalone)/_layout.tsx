// app/events/_layout.js
import { Stack } from "expo-router";

export default function EventsLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "white" },
        headerTintColor: "#610b0c",
        headerTitleAlign: "center",
        title: "Details",
        headerBackButtonMenuEnabled: true
      }}
    />
  );
}
