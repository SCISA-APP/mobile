import React, { useRef } from 'react';
import { Animated, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { exampleProducts as featuredProducts } from '@/assets/data/shop/product';
import Header from '@/components/headers/header';
import ProductSearchBar from '@/components/searchBar/productSearchBar';
import FloatingCartButton from '@/components/buttons/FloatingCartButton';
import ProductSection from '@/components/section/ProductSection';

const App = (): React.JSX.Element => {
  const scrollY = useRef(new Animated.Value(0)).current;
  // const [showCategories, setShowCategories] = useState(true);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* --- Fixed Header --- */}
      <View style={styles.fixedHeader}>
        <Header title="SCISA Store" showStoreButton={true} />
        <ProductSearchBar onPress={() => {}} />
      </View>

      {/* --- Scrollable Content --- */}
      <Animated.ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        <ProductSection
          title="Featured Products"
          data={featuredProducts}
          viewMoreRoute="(standalone)/category/ProductListScreen"
        />

        <ProductSection
          title="Limited Time Deals"
          data={featuredProducts}
          viewMoreRoute="(standalone)/category/ProductListScreen"
          backgroundColor="#f0f5ff"
        />

        <ProductSection
          title="New Arrivals"
          data={featuredProducts}
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
  scrollContent: { paddingTop: 20, paddingBottom: 40},
});

export default App;
