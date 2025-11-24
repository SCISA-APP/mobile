
import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function WelfareLayout() {
  const router = useRouter();
  return (
    <Stack screenOptions={{ 
      headerShown: true,
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: 'white',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: () => (
        <>
          <TouchableOpacity style={{ marginRight: 15 }} onPress={() => router.push('/(tabs)/welfare/screens/bookings')}>
            <Ionicons name="calendar-outline" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('/(tabs)/welfare/screens/concerns')}>
            <Ionicons name="alert-circle-outline" size={24} color="white" />
          </TouchableOpacity>
        </>
      ),
     }}>
      <Stack.Screen name="index" options={{ title: 'Welfare Space' }} />
      <Stack.Screen name="screens/counselors" options={{ title: 'Counselors' }} />
      <Stack.Screen name="screens/bookings" options={{ title: 'Bookings' }} />
      <Stack.Screen name="screens/counselor/[counselor_id]" options={{ headerShown: false, title: 'Counselor Details' }} />
      <Stack.Screen name="screens/student-counselor/[student_counselor_id]" options={{ headerShown: false, title: 'Student Counselor Details' }} />
      <Stack.Screen name="screens/booking/[booking_id]" options={{ headerShown: false, title: 'Booking Details' }} />
      <Stack.Screen name="screens/concern" options={{ title: 'Report a Concern' }} />
      <Stack.Screen name="screens/concerns" options={{ title: 'Reported Concerns' }} />
      <Stack.Screen name="screens/concern/[concern_id]" options={{ headerShown: false, title: 'Concern Details' }} />
      <Stack.Screen name="quotes" options={{ headerShown: false }} />
    </Stack>
  );
}
