import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import IconFeather from '@expo/vector-icons/Feather';

const ProductSearchBar = (): React.JSX.Element => {
  return (
    <View style={styles.searchContainer}>
      <IconFeather name="search" size={20} color="#8a8a8e" />
      <TextInput
        placeholder="Search products..."
        style={styles.searchInput}
        placeholderTextColor="#8a8a8e"
      />
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