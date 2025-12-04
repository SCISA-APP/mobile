import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ActivityIndicator,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import colors from '@/constants/colors';

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

  const handlePress = async (event: GestureResponderEvent) => {
    if (loading) return;
    setLoading(true);
    try {
      await onPress(event);
    } finally {
      setLoading(false);
    }
  };

  // Dynamic colors
  const isLightBg = backgroundColor === '#fff' || backgroundColor === 'white';
  const bgColor = backgroundColor || colors.primaryDark;
  const textColor = isLightBg ? colors.primaryDark : colors.background;
  const borderColor = isLightBg ? colors.primaryDark : 'transparent';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: bgColor, borderColor, borderWidth: isLightBg ? 1 : 0 },
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.7}
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
    </TouchableOpacity>
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
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', // full width, can be flex-adjusted in parent
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
    fontWeight: '600',
    fontSize: 16,
  },
});
