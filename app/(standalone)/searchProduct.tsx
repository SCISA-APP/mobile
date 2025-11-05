import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ProductSearchBar from '@/components/searchBar/productSearchBar';
import { exampleProduct } from '@/assets/data/shop/product';
import ProductCard from '@/components/cards/productCard';
import SearchEmptyState from '@/components/empty/SearchEmptyState';

import ProductSearchGif from '@/assets/images/ProductSearch.gif';
import EmptyGif from '@/assets/images/Empty.gif';

const SearchProduct = () => {
  const [query, setQuery] = useState('');

  // Filter products based on query
  const filteredProducts = exampleProduct
    ? [exampleProduct].filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <View style={styles.container}>
      {/* Search bar */}
      <ProductSearchBar value={query} onChangeText={setQuery} />

      {/* Render empty state or filtered products */}
      {query.trim() === '' ? (
        <SearchEmptyState
          message="Search for a product..."
          imageSource={ProductSearchGif}
        />
      ) : filteredProducts.length === 0 ? (
        <SearchEmptyState
          message="No products found for your search."
          imageSource={EmptyGif}
        />
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <ProductCard product={item} />}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

export default SearchProduct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  listContent: {
    paddingTop: 10,
    paddingBottom: 20,
  },
});
