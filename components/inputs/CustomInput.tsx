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
  /** NEW OPTIONAL PROP */
  autoGrow?: boolean;
}

const CustomInput: React.FC<CustomInputProps> = ({
  placeholder,
  icon,
  secure,
  value,
  style,
  multiline,
  autoGrow = false, // default off so nothing breaks
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(!secure);
  const [inputHeight, setInputHeight] = useState<number>(50); // default height

  const animatedValue = useRef(new Animated.Value(value ? 1 : 0)).current;

  // Floating label animation
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: isFocused || value ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [isFocused, value]);

  const labelStyle: TextStyle = {
    position: 'absolute',
    left: icon ? 42 : 12,
    top: animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [18, -8],
    }) as unknown as number,
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
        multiline={multiline}
        onContentSizeChange={(e) => {
          if (autoGrow && multiline) {
            const newHeight = e.nativeEvent.contentSize.height;
            // Limit min height but allow expansion
            setInputHeight(Math.max(50, newHeight + 10));
          }
        }}
        style={[
          styles.input,
          {
            paddingLeft: icon ? 40 : 12,
            paddingRight: secure ? 40 : 12,
            height: multiline && autoGrow ? inputHeight : 50,
            textAlignVertical: multiline ? 'top' : 'center',
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

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    position: 'relative',
  },
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.primaryDark,
    borderRadius: 12,
    fontSize: 16,
    color: colors.primaryDark,
    paddingTop: 5,
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
