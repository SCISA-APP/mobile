
import { Stack } from 'expo-router';

export default function WelfareLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="screens/counselors" options={{ title: 'Counselors' }} />
      <Stack.Screen name="screens/[counselor_id]" options={{ title: 'Counselor Details' }} />
      <Stack.Screen name="quotes" options={{ headerShown: false }} />
    </Stack>
  );
}
