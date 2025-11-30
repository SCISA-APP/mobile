import React,{useState,useEffect} from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import Header from '@/components/headers/header';
import { useRouter } from 'expo-router';
import { useShop } from '@/context/ShopContext';
import colors from '@/constants/colors';
import DashboardCard from '@/components/cards/DashboardCard';
import DashboardCardSkeleton from '@/components/empty/DashboardCardSkeleton';

const Index = () => {
  const { shop, loading ,fetchProducts} = useShop();
  const router = useRouter();
    const [productCount, setProductCount] = useState(0);

  const handleNavigation = (path: string) => router.push(path);

  useEffect(() => {
    const loadProducts = async () => {
      const products = await fetchProducts();
      setProductCount(products.length);
    };

    loadProducts();
  }, [fetchProducts]);

  return (
    <View style={styles.container}>
      {/* Static Header */}
      <View style={styles.headerContainer}>
        <Header
          title={shop?.store_name}
          rightIcon="settings-outline"
          onRightPress={() => handleNavigation('/(standalone)/myShop/shopSettings')}
        />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Shop Overview or Skeleton */}
        {loading ? (
          <View style={styles.shopInfoCard}>
            <View style={[styles.skeletonLine, { width: '60%' }]} />
            <View style={[styles.skeletonLine, { width: '40%' }]} />
            <View style={[styles.skeletonLine, { width: '50%' }]} />
            <View style={[styles.skeletonLine, { width: '30%' }]} />
          </View>
        ) : (
          <View style={styles.shopInfoCard}>
            <Text style={styles.productCount}>{productCount} Products</Text>
            <Text style={styles.productCount}>{shop?.total_sales || 0} Sales</Text>
            <Text style={styles.productCount}>GHC {shop?.total_revenue || 0} Revenue</Text>
          </View>
        )}

        {/* First Row */}
        <View style={styles.row}>
          {loading ? (
            <>
              <DashboardCardSkeleton />
              <DashboardCardSkeleton />
            </>
          ) : (
            <>
              <DashboardCard
  title="Add Product"
  subtitle={
    productCount >= 40
      ? "Limit reached (Upgrade soon)"
      : "Add new items"
  }
  icon="add-circle-outline"
  onPress={() => {
    if (productCount >= 40) {
      alert("You have reached the maximum of 2 products for the student free tier. ");
      return;
    }
    handleNavigation('/(standalone)/myShop/addProduct');
  }}
/>
              <DashboardCard
                title="View Products"
                subtitle="Manage your products"
                icon="grid-outline"
                onPress={() => handleNavigation('/(standalone)/myShop/products')}
              />
            </>
          )}
        </View>

        {/* Second Row */}
        <View style={styles.row}>
          {loading ? (
            <>
              <DashboardCardSkeleton />
              <DashboardCardSkeleton />
            </>
          ) : (
            <>
              <DashboardCard
                title="Orders"
                subtitle="Pending & completed"
                icon="receipt-outline"
                onPress={() => handleNavigation('/(standalone)/myShop/orders')}
              />
              <DashboardCard
                title="Analytics"
                subtitle="Sales insights"
                icon="bar-chart-outline"
                onPress={() => handleNavigation('/(standalone)/myShop/analytics')}
              />
            </>
          )}
        </View>

        {/* Third Row */}
        <View style={styles.row}>
          {loading ? (
            <>
              <DashboardCardSkeleton />
              <DashboardCardSkeleton />
            </>
          ) : (
            <>
              <DashboardCard
                title="Interactions"
                subtitle="Views & clicks"
                icon="eye-outline"
                onPress={() => handleNavigation('/(standalone)/myShop/productInteractions')}
              />
              <DashboardCard
                title="Withdrawals"
                subtitle="Cash out earnings"
                icon="cash-outline"
                onPress={() => handleNavigation('/(standalone)/myShop/withdrawals')}
              />
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  headerContainer: {
    paddingHorizontal: 16,
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 20 },
  shopInfoCard: {
    padding: 16,
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    margin: 16,
    alignItems: 'center',
  },
  shopName: { fontSize: 20, fontWeight: '700', color: colors.white },
  productCount: { fontSize: 16, color: colors.white, marginTop: 4 },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginTop: 12,
  },
  skeletonLine: {
    height: 16,
    backgroundColor: colors.gray[200],
    borderRadius: 8,
    marginVertical: 6,
  },
});
