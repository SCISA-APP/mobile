import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, Platform, StatusBar } from 'react-native';
import Header from '@/components/headers/header';

export default function WelfareLayout() {
  const router = useRouter();

  // On Android, add padding for the status bar
  const safeAreaStyle = {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
    flex: 1,
    backgroundColor: '#fff', // Optional: match your header bg
  };

  return (
    <SafeAreaView style={safeAreaStyle}>
      <Stack
        screenOptions={{
          headerShown: true,
          header: ({ route }) => {
            let title = 'Welfare Space';
            switch (route.name) {
              case 'screens/counselors':
                title = 'Counselors';
                break;
              case 'screens/bookings':
                title = 'Bookings';
                break;
              case 'screens/counselor/[counselor_id]':
                title = 'Counselor Details';
                break;
              case 'screens/student-counselor/[student_counselor_id]':
                title = 'Student Counselor Details';
                break;
              case 'screens/booking/[booking_id]':
                title = 'Booking Details';
                break;
              case 'screens/concern':
                title = 'Report a Concern';
                break;
              case 'screens/concerns':
                title = 'Reported Concerns';
                break;
              case 'screens/concern/[concern_id]':
                title = 'Concern Details';
                break;
              case 'quotes':
                title = 'Quotes';
                break;
            }

            return (
              <Header
                title={title}
                rightIcon="calendar-outline"
                onRightPress={() => router.push('/(tabs)/welfare/screens/bookings')}
              />
            );
          },
        }}
      />
    </SafeAreaView>
  );
}
