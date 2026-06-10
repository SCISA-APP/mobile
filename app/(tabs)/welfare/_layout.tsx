
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
      <Stack.Screen name="concern" options={{ title: 'Report a Concern' }} />
       <Stack.Screen name="emergency" options={{ title: 'Emergency Contact' }} />
       <Stack.Screen name="counselor" options={{ title: 'Talk to A Counsellor' }} />
      <Stack.Screen name="quotes" options={{ headerShown: false }} />
    </Stack>
  );
}
