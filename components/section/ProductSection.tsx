import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { AddProductPayload } from '@/types/models/shop/addProductPayload';
import ProductCard from '../cards/productCard';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';

interface ProductSectionProps {
  title: string;
  data: AddProductPayload[];
  viewMoreRoute: string;
  backgroundColor?: string;
}

const ProductSection: React.FC<ProductSectionProps> = ({
  title,
  data,
  viewMoreRoute,
  backgroundColor = '#fff',
}) => {
  const router = useRouter();

  const screenWidth = Dimensions.get('window').width;
  const paddingHorizontal = 32; // same as scroll padding + section padding
  const spacing = 12; // space between columns
  const cardWidth = (screenWidth - paddingHorizontal - spacing) / 2;

  const renderItem = ({ item }: { item: AddProductPayload }) => (
    <ProductCard product={item} cardWidth={cardWidth} />
  );

  return (
    <View style={[styles.sectionContainer, { backgroundColor }]}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>{title}</Text>
     <TouchableOpacity
  onPress={() =>
    router.push({
      pathname: viewMoreRoute, 
      params: { data: JSON.stringify(data) }, 
    })
  }
>
  <Text style={styles.viewMoreText}>View More</Text>
</TouchableOpacity>
      </View>

      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 12 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  viewMoreText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.primary,
  },
});

export default ProductSection;
