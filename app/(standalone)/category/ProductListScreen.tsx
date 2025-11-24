import React from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';
import { useSearchParams } from 'expo-router/build/hooks';
import ProductCard from '@/components/cards/productCard';
import { Product } from '@/types/models/shop/product';

const ProductListScreen = () => {
  const params = useSearchParams();
  const dataParam = params.get('data'); 
  const products: Product[] = dataParam ? JSON.parse(dataParam) : [];

  const screenWidth = Dimensions.get('window').width;
  const paddingHorizontal = 32; // same as scroll + container padding
  const spacing = 12; // gap between columns
  const cardWidth = (screenWidth - paddingHorizontal - spacing) / 2;

  const renderItem = ({ item }: { item: Product }) => (
    <ProductCard product={item} cardWidth={cardWidth} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
});

export default ProductListScreen;
