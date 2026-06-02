import { Stack } from "expo-router";

export default function StandaloneLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "white" } }}>
      <Stack.Screen
        name="notification"
        options={{
          presentation: "modal",
          animation: "slide_from_bottom",
          gestureEnabled: true,
          headerShown: false,
        }}
      />
    </Stack>
  );
}