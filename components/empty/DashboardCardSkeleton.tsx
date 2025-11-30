import React from 'react';
import { View, StyleSheet } from 'react-native';
import colors from '@/constants/colors';

interface DashboardCardSkeletonProps {
  style?: object;
}

const DashboardCardSkeleton: React.FC<DashboardCardSkeletonProps> = ({ style }) => {
  return <View style={[styles.card, style]} />;
};

export default DashboardCardSkeleton;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 120,
    borderRadius: 12,
    backgroundColor: colors.gray[100],
    marginHorizontal: 4,
    marginBottom: 12,
  },
});
