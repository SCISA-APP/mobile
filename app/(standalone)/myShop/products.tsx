import { StyleSheet, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useShop } from '@/context/ShopContext';
import EditProductCard from '@/components/cards/EditProductCard';
import { Product } from '@/types/models/shop/product';
import SearchEmptyState from '@/components/empty/SearchEmptyState';
import { useRouter } from 'expo-router';

const SKELETON_ITEMS = Array.from({ length: 6 }); // 6 skeleton placeholders

const MyProducts = () => {
  const { fetchProducts } = useShop();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const loadProducts = async () => {
    setLoading(true);
    try {
      const shopProducts = await fetchProducts();
      setProducts(shopProducts);
    } catch (err) {
      console.error('❌ Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -------------------
  // ⏳ SKELETON LOADING
  // -------------------
  if (loading) {
    return (
      <FlatList
        data={SKELETON_ITEMS}
        keyExtractor={(_, index) => `skeleton-${index}`}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={() => (
          <View style={styles.skeletonCard}>
            <View style={styles.skeletonImage} />
            <View style={styles.skeletonText} />
            <View style={[styles.skeletonText, { width: '50%' }]} />
          </View>
        )}
      />
    );
  }

  // -------------------
  // 📌 EMPTY STATE
  // -------------------
  if (!products.length) {
    return (
      <SearchEmptyState
        message="No products found."
        imageSource={require('@/assets/images/Empty.gif')}
        buttonText="Add Product"
        onPress={() => router.push('/(standalone)/myShop/addProduct')}
      />
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      renderItem={({ item }) => (
        <View style={styles.productCard}>
          <EditProductCard
            product={item}
            cardWidth={180}
            onEdit={() =>
              router.push(`/(standalone)/myShop/editProduct/${item.id}`)
            }
          />
        </View>
      )}
    />
  );
};

export default MyProducts;

const styles = StyleSheet.create({
listContainer: {
    paddingHorizontal: 12,
    paddingTop: 16,
    paddingBottom: 80,
  },


  skeletonCard: {
    width: 180,
    height: 230,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 10,
    marginBottom: 16,
  },

  skeletonImage: {
    width: '100%',
    height: 140,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
  },

  skeletonText: {
    marginTop: 10,
    height: 16,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    width: '80%',
  },

  productCard: {
    marginBottom: 16, 
  },
});
