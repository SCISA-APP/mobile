import React, { useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  ListRenderItemInfo,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';

import { Product } from '@/types/models/shop/product';
import { exampleProducts as featuredProducts } from '@/assets/data/shop/product';

import ShopByCategory from '@/components/buttons/shopByCategory';
import Header from '@/components/headers/header';
import ProductCard from '@/components/cards/productCard';
import ProductSearchBar from '@/components/searchBar/productSearchBar';
import CategoryHeader from '@/components/buttons/CategoryHeader';
import FloatingCartButton from '@/components/buttons/FloatingCartButton'; // <-- import it here

const App = (): React.JSX.Element => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showCategories, setShowCategories] = useState(true);
  const categoryOffsetY = useRef(0);
  const router = useRouter();

  const renderProductItem = ({
    item,
  }: ListRenderItemInfo<Product>): React.JSX.Element => (
    <ProductCard product={item} />
  );

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event: any) => {
        const currentOffset = event.nativeEvent.contentOffset.y;
        
        if (currentOffset > categoryOffsetY.current && !showCategories) {
          setShowCategories(true);
        }
      },
    }
  );

  const handleCategoryLayout = (event: any) => {
    categoryOffsetY.current = event.nativeEvent.layout.y;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* --- Fixed Header --- */}
      <View style={styles.fixedHeader}>
        <View >
          <Header title="SCISA Store" />
        </View>
        <ProductSearchBar onPress={() => router.push('/searchProduct')} />
      </View>

      {/* --- Scrollable Content --- */}
      <Animated.ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* <View style={styles.section} onLayout={handleCategoryLayout}>
          <CategoryHeader title="Shop by Category" />
          <ShopByCategory />
        </View> */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <FlatList
            data={featuredProducts}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderProductItem}
            contentContainerStyle={styles.productListContent}
          />
        </View>

        <View style={[styles.section, styles.dealsSectionBackground]}>
          <Text style={styles.sectionTitle}>Limited Time Deals</Text>
          <FlatList
            data={featuredProducts}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderProductItem}
            contentContainerStyle={styles.productListContent}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>New Arrivals</Text>
          <FlatList
            data={featuredProducts}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderProductItem}
            contentContainerStyle={styles.productListContent}
          />
        </View>
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
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    zIndex: 1000,
  },

  headerTitle: { fontSize: 24, fontWeight: '700', color: '#111' },
  stickyCategories: {
    position: 'absolute',
    top: 110,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    zIndex: 999,
  },
  container: { flex: 1 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 40 },
  section: { marginVertical: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#111' },
  productListContent: { paddingTop: 4 },
  dealsSectionBackground: {
    backgroundColor: '#f0f5ff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: -5,
  },
});

export default App;
