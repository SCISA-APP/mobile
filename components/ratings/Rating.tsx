import React from 'react';
import { View, StyleSheet } from 'react-native';
import IconFontAwesome from '@expo/vector-icons/FontAwesome';

type RatingProps = {
  rating: number;
  size?: number;      // optional, defaults to 12
};

const Rating = ({ rating, size = 12 }: RatingProps) => {
  const stars: React.ReactElement[] = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(<IconFontAwesome key={`full-${i}`} name="star" size={size} color="#ffc107" />);
  }
  if (hasHalfStar) {
    stars.push(<IconFontAwesome key="half" name="star-half-empty" size={size} color="#ffc107" />);
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<IconFontAwesome key={`empty-${i}`} name="star-o" size={size} color="#ffc107" />);
  }

  return <View style={styles.container}>{stars}</View>;
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', gap: 2 },
});

export default Rating;
