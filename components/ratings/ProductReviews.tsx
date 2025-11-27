import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import IconFontAwesome from '@expo/vector-icons/FontAwesome';
import Rating from '@/components/ratings/Rating';
import type { Rating as RatingType } from '../../types/models/shop/rating'; 

type ProductReviewsProps = {
  ratings: RatingType[];
  averageRating: number;
};

const ProductReviews = ({ ratings, averageRating }: ProductReviewsProps) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.reviewsHeader}>
        <Text style={styles.reviewsTitle}>Customer Reviews</Text>
        <TouchableOpacity style={styles.seeAllReviews}>
          <Text style={styles.seeAllText}>
            See All {ratings?.length || 0} Reviews
          </Text>
          <IconFontAwesome name="angle-right" size={16} color="#0052cc" style={{ marginLeft: 5 }} />
        </TouchableOpacity>
      </View>


      {/* Individual Reviews */}
      {ratings?.map((r) => (
        <View key={r.id} style={styles.reviewCard}>
          <Text style={styles.reviewUser}>{r.name}</Text>
          <Rating rating={r.value} size={14} />
          <Text style={styles.reviewText}>{r.rateText}</Text>
          <Text style={styles.reviewDate}>
            {new Date(r.rateDate).toLocaleDateString()}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default ProductReviews;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  reviewsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  seeAllReviews: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    color: '#0052cc',
    fontWeight: '500',
    fontSize: 14,
  },
  ratingSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  ratingSummaryText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  reviewCard: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingVertical: 15,
  },
  reviewUser: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
    marginTop: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
});
