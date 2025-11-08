
import { Stack } from 'expo-router';

export default function WelfareLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="screens/counselors" options={{ title: 'Counselors' }} />
      <Stack.Screen name="screens/bookings" options={{ title: 'Bookings' }} />
      <Stack.Screen name="screens/counselor/[counselor_id]" options={{ headerShown: false, title: 'Counselor Details' }} />
      <Stack.Screen name="screens/student-counselor/[student_counselor_id]" options={{ headerShown: false, title: 'Student Counselor Details' }} />
      <Stack.Screen name="screens/booking/[booking_id]" options={{ headerShown: false, title: 'Booking Details' }} />
      <Stack.Screen name="screens/concern" options={{ title: 'Report a Concern' }} />
      <Stack.Screen name="screens/concerns" options={{ title: 'My Concerns' }} />
      <Stack.Screen name="screens/concern/[concern_id]" options={{ headerShown: false, title: 'Concern Details' }} />
      <Stack.Screen name="quotes" options={{ headerShown: false }} />
    </Stack>
  );
}
