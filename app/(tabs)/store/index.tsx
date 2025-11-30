import React, { useRef, useState, useEffect } from 'react';
import { Animated, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import Header from '@/components/headers/header';
import ProductSearchBar from '@/components/searchBar/productSearchBar';
import FloatingCartButton from '@/components/buttons/FloatingCartButton';
import ProductSection from '@/components/section/ProductSection';
import { useRouter } from 'expo-router';
import { productService } from '@/services/shop/getProducts';
import type { AddProductPayload } from '@/types/models/shop/addProductPayload';

const App = (): React.JSX.Element => {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;

  const [allProducts, setAllProducts] = useState<AddProductPayload[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  /** Fetch next batch of products */
  const fetchNextProducts = async () => {
    if (!hasMore || loadingMore) return;
    setLoadingMore(true);

    try {
      const nextBatch = await productService.fetchNext();
      setAllProducts(nextBatch);
      setHasMore(productService.hasMoreProducts());
    } catch (err) {
      console.error('❌ Failed to fetch next products:', err);
    } finally {
      setLoadingMore(false);
    }
  };

  /** Detect if user reached near bottom */
  const handleScrollEnd = ({ nativeEvent }: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const paddingToBottom = 100; // threshold
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom) {
      fetchNextProducts();
    }
  };

  useEffect(() => {
    // Initial fetch
    productService.reset();
    fetchNextProducts();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* --- Fixed Header --- */}
      <View style={styles.fixedHeader}>
        <Header title="SCISA Store" showStoreButton={true} />
        <ProductSearchBar onPress={() => router.push("/(standalone)/searchProduct")} />
      </View>

      {/* --- Scrollable Content --- */}
      <Animated.ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onMomentumScrollEnd={handleScrollEnd}
      >
        <ProductSection
          title="Featured Products"
          data={allProducts.slice(0, 5)} // example: show first 5
          viewMoreRoute="(standalone)/category/ProductListScreen"
        />

        <ProductSection
          title="Limited Time Deals"
        data={allProducts.slice(0, 5)} 
          viewMoreRoute="(standalone)/category/ProductListScreen"
          backgroundColor="#f0f5ff"
        />

        <ProductSection
          title="New Arrivals"
          data={allProducts.slice(0, 5)} 
          viewMoreRoute="(standalone)/category/ProductListScreen"
        />
      </Animated.ScrollView>

      {/* --- Floating Cart Button --- */}
      <FloatingCartButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#ffffff' },
  fixedHeader: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    zIndex: 1000,
    paddingHorizontal: 16,
    paddingTop: 12,
  },
  container: { flex: 1 },
  scrollContent: { paddingTop: 20, paddingBottom: 40 },
});

export default App;
