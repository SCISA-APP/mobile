import { useRouter } from 'expo-router';
import React from 'react';
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import categoryData from '@/assets/data/shop/shopCategoryData';
import { Category } from '@/types/models/shop/categoryShop';

const ShopByCategory = (): React.JSX.Element => {
  const router = useRouter();

  const renderCategoryItem = ({
    item,
  }: ListRenderItemInfo<Category>): React.JSX.Element => {
    const handleCategoryPress = () => {
      router.push(`/(standalone)/category/${item.name}`);
    };

    return (
      <TouchableOpacity style={styles.categoryItem} onPress={handleCategoryPress}>
        <View style={styles.categoryIconCircle}>
          <Image source={item.icon} style={{ width: 20, height: 20 }} />
        </View>
        <Text style={styles.categoryText}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={categoryData} // directly using the imported categoryData
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderItem={renderCategoryItem}
      contentContainerStyle={styles.categoryListContent}
    />
  );
};

const styles = StyleSheet.create({
  categoryListContent: {
    paddingLeft: 2,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 24,
    width: 70,
  },
  categoryIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#eef2f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryText: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
});

export default ShopByCategory;
