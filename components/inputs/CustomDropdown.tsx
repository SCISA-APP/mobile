import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Modal,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '@/constants/colors';

interface CustomDropdownProps {
  placeholder: string;
  data: (string | number)[];
  value?: string | number;
  onValueChange?: (value: string | number) => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  icon?: keyof typeof Ionicons.glyphMap;
}

const { height: screenHeight } = Dimensions.get('window');

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
        <Modal transparent animationType="fade" visible={isOpen}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setIsOpen(false)}
          >
            <View style={styles.dropdownWrapper}>
              <FlatList
                data={data}
                keyExtractor={(item, index) => item.toString() + index}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={[
                      styles.item,
                      value === item && styles.selectedItem,
                      index === data.length - 1 && styles.lastItem
                    ]}
                    onPress={() => handleSelect(item)}
                  >
                    <Text
                      style={[
                        styles.itemText,
                        value === item && styles.selectedItemText
                      ]}
                    >
                      {item}
                    </Text>
                    {value === item && (
                      <Ionicons
                        name="checkmark"
                        size={18}
                        color={colors.primaryDark}
                      />
                    )}
                  </TouchableOpacity>
                )}
                showsVerticalScrollIndicator
                style={{ maxHeight: screenHeight * 0.4 }}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      )}
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
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
    textAlign: 'left',
  },
  leftIcon: {
    marginRight: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdownWrapper: {
    width: '80%',
    maxHeight: '50%',
    backgroundColor: colors.background,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primaryDark,
    overflow: 'hidden',
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  selectedItem: {
    backgroundColor: colors.gray[50],
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  itemText: {
    fontSize: 16,
    color: colors.primaryDark,
    flex: 1,
  },
  selectedItemText: {
    fontWeight: '600',
  },
});
