import colors from '@/constants/colors';
import React, { useState } from 'react';
import {
    ActivityIndicator,
    GestureResponderEvent,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    View,
    ViewStyle,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface CustomButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => Promise<void> | void;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string; // optional background color
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  onPress,
  leftIcon,
  rightIcon,
  style,
  backgroundColor,
}) => {
  const [loading, setLoading] = useState(false);
  const scale = useSharedValue(1);

  const handlePress = async (event: GestureResponderEvent) => {
    if (loading) return;
    
    // Animate press
    scale.value = withSpring(0.95, {}, () => {
      scale.value = withSpring(1);
    });
    
    setLoading(true);
    try {
      await onPress(event);
    } finally {
      setLoading(false);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Dynamic colors
  const isLightBg = backgroundColor === '#fff' || backgroundColor === 'white';
  const bgColor = backgroundColor || colors.primary;
  const textColor = isLightBg ? colors.primary : colors.white;
  const borderColor = isLightBg ? colors.primary : 'transparent';

  return (
    <AnimatedTouchable
      style={[
        styles.button,
        { backgroundColor: bgColor, borderColor, borderWidth: isLightBg ? 2 : 0 },
        animatedStyle,
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

          <Text style={[styles.label, { color: textColor }]}>{label}</Text>

          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>
      )}
    </AnimatedTouchable>
  );
};

export default CustomButton;

const styles = StyleSheet.create<{
  button: ViewStyle;
  content: ViewStyle;
  iconLeft: ViewStyle;
  iconRight: ViewStyle;
  label: TextStyle;
}>({
  button: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  label: {
    fontWeight: '700',
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
