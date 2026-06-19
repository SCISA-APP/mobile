import React from 'react';
import { View, StyleSheet } from 'react-native';
import UpcomingFeature from '@/components/empty/upcomingFeature';

const timetable = () => {
  return (
    <View style={styles.container}>
      <UpcomingFeature title="Time Table" />
    </View>
  );
};

export default timetable;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
