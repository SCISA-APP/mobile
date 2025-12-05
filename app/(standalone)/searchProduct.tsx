import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Dimensions } from 'react-native';
import ProductSearchBar from '@/components/searchBar/productSearchBar';
import SearchEmptyState from '@/components/empty/SearchEmptyState';

import ProductSearchGif from '@/assets/images/ProductSearch.gif';
import EmptyGif from '@/assets/images/Empty.gif';

const { width } = Dimensions.get('window');
const CARD_MARGIN = 8;
const CARD_WIDTH = (width - 16 * 2 - CARD_MARGIN) / 2; // paddingHorizontal * 2 + spacing between cards

const SearchProduct = () => {
  const [query, setQuery] = useState('');

  // Empty for now since no products
  const filteredProducts: any[] = [];

  const renderItem = ({ item }: any) => (
    <View style={{ width: CARD_WIDTH, marginBottom: 16, marginRight: CARD_MARGIN }}>
      {/* Keep ProductCard component commented until you have products */}
      {/* <ProductCard product={item} /> */}
    </View>
  );

  return (
    <View style={styles.container}>
      <ProductSearchBar value={query} onChangeText={setQuery} />

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
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={styles.columnWrapper}
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
  columnWrapper: {
    justifyContent: 'space-between',
  },
});
