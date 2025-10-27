import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '@/constants/colors';

interface CustomDropdownProps {
  placeholder: string;
  data: (string | number)[];
  value?: string | number;
  onValueChange?: (value: string | number) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>; // <-- ONLY TextStyle
  icon?: keyof typeof Ionicons.glyphMap;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  placeholder,
  data,
  value,
  onValueChange,
  style,
  textStyle,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (item: string | number) => {
    onValueChange?.(item);
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={styles.inputContainer}
        activeOpacity={0.8}
        onPress={() => setIsOpen(prev => !prev)}
      >
        {icon && (
          <Ionicons
            name={icon}
            size={20}
            color={colors.primaryDark}
            style={styles.leftIcon}
          />
        )}
        <Text style={[styles.text, textStyle]}>
          {value !== undefined && value !== null && value !== '' ? value : placeholder}
        </Text>
        <Ionicons
          name={isOpen ? 'chevron-up-outline' : 'chevron-down-outline'}
          size={20}
          color={colors.primaryDark}
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdown}>
          <FlatList
            data={data}
            keyExtractor={(item, index) => item.toString() + index}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.item}
                onPress={() => handleSelect(item)}
              >
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create<{
  container: ViewStyle;
  inputContainer: ViewStyle;
  text: TextStyle;
  leftIcon: TextStyle;
  dropdown: ViewStyle;
  item: ViewStyle;
  itemText: TextStyle;
}>({
  container: {
    marginVertical: 10,
    position: 'relative',
    zIndex: 10,
  },
  inputContainer: {
    height: 50,
    borderWidth: 1,
    borderColor: colors.primaryDark,
    borderRadius: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: colors.background,
  },
  text: {
    fontSize: 16,
    color: colors.primaryDark,
    flex: 1,       
    textAlign: 'left' 
  },
  leftIcon: {
    marginRight: 8,
  },
  dropdown: {
    position: 'absolute', 
    top: 55, 
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: colors.primaryDark,
    borderRadius: 12,
    backgroundColor: colors.background,
    maxHeight: 150,
    zIndex: 1000, // ensure dropdown is on top
  },
  item: {
    padding: 12,
  },
  itemText: {
    fontSize: 16,
    color: colors.primaryDark,
  },
});
