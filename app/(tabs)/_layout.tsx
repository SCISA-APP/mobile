import { HapticTab } from '@/components/haptic-tab';
import Header from '@/components/ui/Header';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import colors from '@/constants/colors';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const isDark = colorScheme === "dark";

  const bellPress = () => {
    router.push("/(standalone)/notification");
  };

  const profilePress = () => {
    router.push("/profile"); // fixed
  };

  const renderHeader = (title?: string) => (
    <Header
      title={title}
      showGreeting={!title}
      showNotification={true}
      showProfile={true}
      onNotificationPress={bellPress}
      onProfilePress={profilePress}
    />
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        tabBarStyle: {
  backgroundColor: isDark ? '#000000' : '#FFFFFF',
  borderTopWidth: 1,
  borderTopColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
  height: Platform.OS === 'ios' ? 88 : 72,
  paddingBottom: Platform.OS === 'ios' ? 24 : 16, // increase bottom padding
  paddingTop: 8,
  paddingHorizontal: 0,
  marginBottom: Platform.OS === 'android' ? 10 : 0, // shift up on Android
},
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "600",
          letterSpacing: -0.1,
          marginTop: 4,
        },
        tabBarButton: HapticTab,
        headerShown: true,
        headerTransparent: true,
        headerStyle: {
          backgroundColor: "transparent"
        },
        headerTitleStyle: {
          fontSize: 34,
          fontWeight: "700",
          color: isDark ? "#FFFFFF" : "#000000"
        },

        header: ({ route, options }) => {
          const title = options.title || "";
          return renderHeader(title !== "Home" ? title : undefined);
        }
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={24} 
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="academics/index"
        options={{
          title: 'Academics',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "school" : "school-outline"}
              size={24}
              color={color}
            />
          ),
          headerShown: false
        }}
      />

      <Tabs.Screen
        name="welfare/index"
        options={{
          title: 'Welfare',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 
              name="hands-helping" 
              size={20} 
              color={color}
            />
          ),
          headerShown: false
        }}
      />

      <Tabs.Screen
        name="store/index"
        options={{
          title: 'Store',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "cart" : "cart-outline"} 
              size={24} 
              color={color}
            />
          ),
          headerShown: false
        }}
      />

      <Tabs.Screen
        name="profile/index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons 
              name={focused ? "person" : "person-outline"} 
              size={24} 
              color={color}
            />
          ),
          headerShown: false
        }}
      />
    </Tabs>
  );
}

// import { HapticTab } from '@/components/haptic-tab';
// import Header from '@/components/ui/Header';
// import { useColorScheme } from '@/hooks/use-color-scheme';
// import { FontAwesome5, Ionicons } from '@expo/vector-icons';
// import { Tabs } from 'expo-router';
// import React from 'react';
// import { Platform, StyleSheet, View } from 'react-native';
// import { BlurView } from 'expo-blur';
// import colors from '@/constants/colors';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();
//   const isDark = colorScheme === 'dark';

//   const renderHeader = (title?: string) => (
//     <Header 
//       title={title}
//       showGreeting={!title}
//       showNotification={true}
//       showProfile={true}
//       onNotificationPress={() => console.log('Notification pressed')}
//       onProfilePress={() => console.log('Profile pressed')}
//     />
//   );

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: colors.primaryDark,
//         tabBarInactiveTintColor: isDark ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)',
//         tabBarStyle: {
//           backgroundColor: 'transparent',
//           borderTopWidth: 0,
//           height: Platform.OS === 'ios' ? 88 : 72,
//           paddingBottom: Platform.OS === 'ios' ? 24 : 12,
//           paddingTop: 0,
//           paddingHorizontal: 12,
//           position: 'absolute',
//           ...Platform.select({
//             ios: {
//               shadowColor: 'transparent',
//             },
//             android: {
//               elevation: 0,
//             },
//           }),
//         },
//         tabBarBackground: () => (
//           <View style={styles.tabBarContainer}>
//             <View style={styles.dockContainer}>
//               <BlurView
//                 intensity={isDark ? 45 : 40}
//                 tint={isDark ? 'dark' : 'light'}
//                 style={styles.blurContainer}
//               >
//                 <View style={[
//                   styles.glassOverlay,
//                   {
//                     backgroundColor: isDark 
//                       ? 'rgba(50, 50, 55, 0.4)' 
//                       : 'rgba(255, 255, 255, 0.3)',
//                   }
//                 ]} />
//               </BlurView>
//             </View>
//           </View>
//         ),
//         tabBarItemStyle: {
//           paddingVertical: 0,
//           marginHorizontal: 0,
//           height: 64,
//         },
//         tabBarIconStyle: {
//           marginTop: 0,
//         },
//         tabBarLabelStyle: {
//           fontSize: 10,
//           fontWeight: '600',
//           letterSpacing: -0.1,
//           marginTop: 4,
//           marginBottom: 0,
//           includeFontPadding: false,
//         },
//         tabBarButton: HapticTab,
//         headerShown: true,
//         headerTransparent: true,
//         headerBlurEffect: isDark ? 'systemThickMaterialDark' : 'systemThickMaterialLight',
//         headerStyle: {
//           backgroundColor: 'transparent',
//         },
//         headerTitleStyle: {
//           fontSize: 34,
//           fontWeight: '700',
//           color: isDark ? '#FFFFFF' : '#000000',
//         },
//         header: ({ route, options }) => {
//           const title = options.title || '';
//           return renderHeader(title !== 'Home' ? title : undefined);
//         },
//       }}
//     >
//       <Tabs.Screen
//         name="home/index"
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color, focused }) => (
//             <View style={styles.tabItemContainer}>
//               <Ionicons 
//                 name={focused ? "home" : "home-outline"} 
//                 size={26} 
//                 color={color}
//                 style={styles.icon}
//               />
//             </View>
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="academics/index"
//         options={{
//           title: 'Academics',
//           tabBarIcon: ({ color, focused }) => (
//             <View style={styles.tabItemContainer}>
//      <Ionicons
//   name={focused ? "school" : "school-outline"}
//   size={26}
//   color={color}
// />
//             </View>
//           ),
//           headerShown: false,
//         }}
//       />
//       <Tabs.Screen
//         name="welfare/index"
//         options={{
//           title: 'Welfare',
//           tabBarIcon: ({ color, focused }) => (
//             <View style={styles.tabItemContainer}>
//               <FontAwesome5 
//                 name="hands-helping" 
//                 size={22} 
//                 color={color}
//                 style={[styles.icon, { fontWeight: focused ? '900' : '400' }]}
//               />
//             </View>
//           ),
//           headerShown: false,
//         }}
//       />
//       <Tabs.Screen
//         name="store/index"
//         options={{
//           title: 'Store',
//           tabBarIcon: ({ color, focused }) => (
//             <View style={styles.tabItemContainer}>
//               <Ionicons 
//                 name={focused ? "cart" : "cart-outline"} 
//                 size={26} 
//                 color={color}
//                 style={styles.icon}
//               />
//             </View>
//           ),
//           headerShown: false,
//         }}
//       />
//       <Tabs.Screen
//         name="profile/index"
//         options={{
//           title: 'Profile',
//           tabBarIcon: ({ color, focused }) => (
//             <View style={styles.tabItemContainer}>
//               <Ionicons 
//                 name={focused ? "person" : "person-outline"} 
//                 size={26} 
//                 color={color}
//                 style={styles.icon}
//               />
//             </View>
//           ),
//           headerShown: false,
//         }}
//       />
//     </Tabs>
//   );
// }

// const styles = StyleSheet.create({
//   tabBarContainer: {
//     position: 'absolute',
//     bottom: 18,
//     left: 0,
//     right: 0,
//     height: '100%',
//     justifyContent: 'flex-end',
//     paddingHorizontal: 12,
//     paddingBottom: Platform.OS === 'ios' ? 10 : 10,
//   },
//   dockContainer: {
//     height: Platform.OS === 'ios' ? 64 : 60,
//     borderRadius: 28,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 10 },
//     shadowOpacity: 0.2,
//     shadowRadius: 20,
//     elevation: 10,
//   },
//   blurContainer: {
//     flex: 1,
//     borderRadius: 28,
//     overflow: 'hidden',
//   },
//   glassOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     borderRadius: 28,
//     borderWidth: 0.5,
//     borderColor: 'rgba(119, 73, 73, 0.25)',
//   },
//   tabItemContainer: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: '100%',
//     position: 'relative',
//   },
//   icon: {
//     zIndex: 1,
//   },
// });