import colors from '@/constants/colors';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Haptics from 'expo-haptics';
import React, { useEffect } from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const tabPositions = state.routes.map((_, index) => useSharedValue(index === state.index ? 1 : 0));
  const pulseAnimation = useSharedValue(0);

  useEffect(() => {
    tabPositions.forEach((position, index) => {
      position.value = withSpring(index === state.index ? 1 : 0, {
        damping: 15,
        stiffness: 150,
      });
    });

    // Pulse animation for active tab
    pulseAnimation.value = withTiming(1, { duration: 300 });
  }, [state.index]);

  const getIconName = (routeName: string, focused: boolean): any => {
    switch (routeName) {
      case 'home/index':
        return focused ? 'home' : 'home-outline';
      case 'academics/index':
        return focused ? 'school' : 'school-outline';
      case 'welfare':
        return 'hands-helping';
      case 'store/index':
        return focused ? 'cart' : 'cart-outline';
      case 'profile/index':
        return focused ? 'person' : 'person-outline';
      default:
        return 'help-circle-outline';
    }
  };

  const getIconComponent = (routeName: string) => {
    return routeName === 'welfare' ? FontAwesome5 : Ionicons;
  };

  const onTabPress = (route: any, isFocused: boolean) => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      navigation.navigate(route.name);
    }
  };

  const isCenterTab = (index: number) => index === 2; // Welfare is at index 2

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;
          const isCenter = isCenterTab(index);
          const IconComponent = getIconComponent(route.name);
          const iconName = getIconName(route.name, isFocused);

          const animatedIconStyle = useAnimatedStyle(() => {
            const scale = interpolate(
              tabPositions[index].value,
              [0, 1],
              [1, isCenter ? 1.1 : 1.2]
            );

            const translateY = interpolate(
              tabPositions[index].value,
              [0, 1],
              [0, isCenter ? -4 : -8]
            );

            return {
              transform: [{ scale }, { translateY }],
            };
          });

          const animatedBackgroundStyle = useAnimatedStyle(() => {
            const scale = interpolate(
              tabPositions[index].value,
              [0, 1],
              [0, 1]
            );

            const opacity = interpolate(
              tabPositions[index].value,
              [0, 1],
              [0, 1]
            );

            // Add subtle pulse when active
            const pulse = isFocused ? interpolate(
              pulseAnimation.value,
              [0, 1],
              [0.95, 1]
            ) : 1;

            return {
              transform: [{ scale: scale * pulse }],
              opacity,
            };
          });

          const animatedLabelStyle = useAnimatedStyle(() => {
            const opacity = interpolate(
              tabPositions[index].value,
              [0, 1],
              [0.6, 1]
            );

            const translateY = interpolate(
              tabPositions[index].value,
              [0, 1],
              [0, 2]
            );

            return {
              opacity,
              transform: [{ translateY }],
            };
          });

          // Special styling for center tab
          if (isCenter) {
            return (
              <AnimatedTouchable
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={descriptors[route.key].options.tabBarAccessibilityLabel}
                testID={descriptors[route.key].options.tabBarTestID}
                onPress={() => onTabPress(route, isFocused)}
                style={styles.centerTab}
              >
                <Animated.View
                  style={[
                    styles.centerTabButton,
                    {
                      backgroundColor: isFocused ? colors.secondary : colors.primary,
                    },
                    animatedIconStyle,
                  ]}
                >
                  <IconComponent
                    name={iconName}
                    size={22}
                    color={colors.white}
                  />
                </Animated.View>
                <Animated.Text
                  style={[
                    styles.centerLabel,
                    animatedLabelStyle,
                    { color: isFocused ? colors.primary : colors.gray[400] },
                  ]}
                >
                  {descriptors[route.key].options.title}
                </Animated.Text>
              </AnimatedTouchable>
            );
          }

          return (
            <AnimatedTouchable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={descriptors[route.key].options.tabBarAccessibilityLabel}
              testID={descriptors[route.key].options.tabBarTestID}
              onPress={() => onTabPress(route, isFocused)}
              style={styles.tab}
            >
              <View style={styles.tabContent}>
                {/* Background Circle */}
                <Animated.View
                  style={[
                    styles.activeBackground,
                    animatedBackgroundStyle,
                  ]}
                />

                {/* Icon */}
                <Animated.View style={[styles.iconContainer, animatedIconStyle]}>
                  <IconComponent
                    name={iconName}
                    size={24}
                    color={isFocused ? colors.primary : colors.gray[400]}
                  />
                </Animated.View>

                {/* Label */}
                <Animated.Text
                  style={[
                    styles.label,
                    animatedLabelStyle,
                    { color: isFocused ? colors.primary : colors.gray[400] },
                  ]}
                >
                  {descriptors[route.key].options.title}
                </Animated.Text>
              </View>
            </AnimatedTouchable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    paddingTop: 0,
    paddingHorizontal: 12,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 28,
    paddingVertical: 8,
    paddingHorizontal: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeBackground: {
    position: 'absolute',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surface,
  },
  iconContainer: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
    letterSpacing: -0.1,
  },
  centerTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -20,
  },
  centerTabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 4,
    borderColor: colors.white,
  },
  centerLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 6,
    letterSpacing: -0.1,
  },
});
