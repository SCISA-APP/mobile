import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type CategoryHeaderProps = {
  title: string;
  onSeeAllPress?: () => void;
  showSeeAll?: boolean;
};

const CategoryHeader = ({ 
  title, 
  onSeeAllPress, 
  showSeeAll = true 
}: CategoryHeaderProps): React.JSX.Element => {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {showSeeAll && (
        <TouchableOpacity onPress={onSeeAllPress}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  seeAll: {
    fontSize: 14,
    color: '#007aff',
    fontWeight: '500',
  },
});

export default CategoryHeader;