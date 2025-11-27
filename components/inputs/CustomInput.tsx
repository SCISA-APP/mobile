import React, { useState, useRef, useEffect } from 'react';
import {
  Animated,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '@/constants/colors';

interface CustomInputProps extends TextInputProps {
  placeholder: string;
  icon?: keyof typeof Ionicons.glyphMap;
  secure?: boolean;
  style?: StyleProp<TextStyle>;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  icon,
  secure,
  value,
  style,
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
  }, [animatedValue, isFocused, value]);

  const labelStyle: TextStyle = {
    position: 'absolute',
    left: icon ? 42 : 12,
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -8],
    }) as unknown as number, // TypeScript workaround
    fontSize: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }) as unknown as number,
    color: colors.primaryDark,
    backgroundColor: colors.background,
    paddingHorizontal: 2,
    zIndex: 5,
  };

  return (
    <View style={styles.container}>
      {icon && (
        <Ionicons
          name={icon}
          size={20}
          color={colors.primaryDark}
          style={styles.leftIcon}
        />
      )}

      <Animated.Text style={[labelStyle]}>{placeholder}</Animated.Text>

      <TextInput
        {...rest}
        value={value}
        style={[
          styles.input,
          {
            paddingLeft: icon ? 40 : 12,
            paddingRight: secure ? 40 : 12,
            paddingTop: 5,
          },
          style,
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
            color={colors.primaryDark}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default CustomInput;

const ICON_SIZE = 20;
const INPUT_HEIGHT = 50;

const styles = StyleSheet.create<{
  container: ViewStyle;
  input: TextStyle;
  leftIcon: TextStyle,
  rightIcon: ViewStyle
}>({
  container: {
    marginVertical: 10,
    position: 'relative',
  },
  input: {
    height: INPUT_HEIGHT,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primaryDark,
    borderRadius: 12,
    fontSize: 16,
    color: colors.primaryDark,
  },
  leftIcon: {
    position: 'absolute',
    left: 12,
    top: (INPUT_HEIGHT - ICON_SIZE) / 2,
    zIndex: 2,
  },
  rightIcon: {
    position: 'absolute',
    right: 12,
    top: (INPUT_HEIGHT - ICON_SIZE) / 2,
    zIndex: 2,
  },

});

