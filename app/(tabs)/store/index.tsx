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

import { Product } from '@/types/models/shop/product';

import { exampleProduct as featuredProducts } from '@/assets/data/shop/product';

import ShopByCategory from '@/components/buttons/shopByCategory';
import ProductCard from '@/components/cards/productCard';
import ProductSearchBar from '@/components/searchBar/productSearchBar';
import CategoryHeader from '@/components/buttons/CategoryHeader';


const App = (): React.JSX.Element => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showCategories, setShowCategories] = useState(true);
  const categoryOffsetY = useRef(0);

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
        
        // Show categories if scrolled past them and scrolling down
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
        <View style={styles.header}>
          <Text style={styles.headerTitle}>SCISA Store</Text>
        </View>
        <ProductSearchBar />
      </View>

      {/* --- Sticky Categories (appears when scrolling down) --- */}
      {showCategories && (
        <Animated.View 
          style={[
            styles.stickyCategories,
            {
              opacity: scrollY.interpolate({
                inputRange: [0, 100, 200],
                outputRange: [0, 0, 1],
                extrapolate: 'clamp',
              }),
              transform: [{
                translateY: scrollY.interpolate({
                  inputRange: [0, 100, 200],
                  outputRange: [-50, -50, 0],
                  extrapolate: 'clamp',
                }),
              }],
            },
          ]}
        >
          <ShopByCategory />
        </Animated.View>
      )}

      {/* --- Scrollable Content --- */}
      <Animated.ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* --- Categories --- */}
        <View style={styles.section} onLayout={handleCategoryLayout}>
          <CategoryHeader title="Shop by Category" />
          <ShopByCategory />
        </View>

        {/* --- Featured Products --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <FlatList
            data={[featuredProducts]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderProductItem}
            contentContainerStyle={styles.productListContent}
          />
        </View>

        {/* --- Limited Time Deals --- */}
        <View style={[styles.section, styles.dealsSectionBackground]}>
          <Text style={styles.sectionTitle}>Limited Time Deals</Text>
          <FlatList
            data={[featuredProducts]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderProductItem}
            contentContainerStyle={styles.productListContent}
          />
        </View>

        {/* --- New Arrivals --- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>New Arrivals</Text>
          <FlatList
            data={[featuredProducts]}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={renderProductItem}
            contentContainerStyle={styles.productListContent}
          />
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  fixedHeader: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    zIndex: 1000,
  },
  header: {
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
  },
  stickyCategories: {
    position: 'absolute',
    top: 110, // Adjust based on header + search bar height
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    zIndex: 999,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  section: {
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  productListContent: {
    paddingTop: 4,
  },
  dealsSectionBackground: {
    backgroundColor: '#f0f5ff',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: -5,
  },
});

export default App;