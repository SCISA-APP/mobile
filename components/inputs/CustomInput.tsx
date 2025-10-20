import React, { useState, useRef, useEffect } from 'react';
import {
  Animated,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '@/constants/colors';

interface CustomInputProps extends TextInputProps {
  placeholder: string;
  icon?: keyof typeof Ionicons.glyphMap;
  secure?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  icon,
  secure,
  value,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!secure);
  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFocused || value ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle = {
    position: 'absolute' as const,
    left: icon ? 42 : 12,
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -8], // float above input
    }),
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
    color: animatedValue.interpolate
      ? animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [colors.muted, colors.primary],
        })
      : colors.muted,
    backgroundColor: colors.background,
    paddingHorizontal: 2,
    zIndex: 5, // make sure label is above the TextInput
  };

  return (
    <View style={styles.container}>
      {icon && (
        <Ionicons name={icon} size={20} color={colors.muted} style={styles.leftIcon} />
      )}

      <Animated.Text style={labelStyle}>{placeholder}</Animated.Text>

      <TextInput
        {...rest}
        value={value}
        style={[
          styles.input,
          {
            paddingLeft: icon ? 40 : 12,
            paddingRight: secure ? 40 : 12,
            paddingTop: 5, // extra top padding for the floating label
          },
        ]}
        secureTextEntry={!showPassword}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {secure && (
        <TouchableOpacity
          onPress={() => setShowPassword(prev => !prev)}
          style={styles.rightIcon}
          activeOpacity={0.7}
        >
          <Ionicons
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color={colors.muted}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomInput;

const ICON_SIZE = 20;
const INPUT_HEIGHT = 50;

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    position: 'relative',
  },
  input: {
    height: INPUT_HEIGHT,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.muted,
    borderRadius: 12,
    fontSize: 16,
    color: colors.text,
  },
  leftIcon: {
    position: 'absolute',
    left: 12,
    top: (INPUT_HEIGHT - ICON_SIZE) / 2, // centers icon vertically
    zIndex: 2,
  },
  rightIcon: {
    position: 'absolute',
    right: 12,
    top: (INPUT_HEIGHT - ICON_SIZE) / 2, // centers icon vertically
    zIndex: 2,
  },
});
