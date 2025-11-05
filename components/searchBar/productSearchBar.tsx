import React from 'react';
import { StyleSheet, TextInput, View, Pressable } from 'react-native';
import IconFeather from '@expo/vector-icons/Feather';

interface ProductSearchBarProps {
  onPress?: () => void; // optional, triggers navigation if provided
  value?: string;
  onChangeText?: (text: string) => void;
}

const ProductSearchBar: React.FC<ProductSearchBarProps> = ({
  onPress,
  value,
  onChangeText,
}) => {
  // If onPress is provided, make the input itself readonly and clickable
  return (
    <View style={styles.searchContainer}>
      <IconFeather name="search" size={20} color="#8a8a8e" />

      {onPress ? (
        <Pressable style={{ flex: 1 }} onPress={onPress}>
          <TextInput
            placeholder="Search products..."
            style={styles.searchInput}
            placeholderTextColor="#8a8a8e"
            editable={false} // readonly because it's just a button
            pointerEvents="none" // ensures press passes to Pressable
          />
        </Pressable>
      ) : (
        <TextInput
          placeholder="Search products..."
          style={styles.searchInput}
          placeholderTextColor="#8a8a8e"
          value={value}
          onChangeText={onChangeText}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f2f5',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginVertical: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
    padding: 0,
  },
});

export default ProductSearchBar;
