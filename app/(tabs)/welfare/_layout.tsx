
import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, Stack } from 'expo-router';
import { TouchableOpacity } from 'react-native';

export default function WelfareLayout() {
  const router = useRouter();
  return (
    <Stack screenOptions={{ 
      headerShown: false,
     
     }}>
      <Stack.Screen name="index" options={{ title: 'Welfare Space' }} />
      <Stack.Screen name="screens/concern" options={{ title: 'Report a Concern' }} />
      <Stack.Screen name="screens/concerns" options={{ title: 'Reported Concerns' }} />
      <Stack.Screen name="screens/concern/[concern_id]" options={{ headerShown: false, title: 'Concern Details' }} />
      <Stack.Screen name="quotes" options={{ headerShown: false }} />
    </Stack>
  );
}
