import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ActivityIndicator, View } from 'react-native';
import colors from '@/constants/colors';

interface CustomButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => Promise<void> | void;
  leftIcon?: React.ReactNode;   // optional left icon
  rightIcon?: React.ReactNode;  // optional right icon
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onPress, leftIcon, rightIcon }) => {
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

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={colors.background} />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}

          <Text style={styles.label}>{label}</Text>

          {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primaryDark,   // using primary dark
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',

    // subtle shadow
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconLeft: {
    marginRight: 8,
  },
  iconRight: {
    marginLeft: 8,
  },
  label: {
    color: colors.background,
    fontWeight: '600',
    fontSize: 16,
  },
});
