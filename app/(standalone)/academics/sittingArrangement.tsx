import React from 'react';
import { View, StyleSheet } from 'react-native';
import UpcomingFeature from '@/components/empty/upcomingFeature';

const SittingArrangement = () => {
  return (
    <View style={styles.container}>
      <UpcomingFeature title="Exam Sitting Arrangement" />
    </View>
  );
};

export default SittingArrangement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
