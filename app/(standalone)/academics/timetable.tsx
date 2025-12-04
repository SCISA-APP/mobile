import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UpcomingFeature from '@/components/empty/upcomingFeature';


const timetable = () => {
  return (
      <View style={styles.container}>
      <UpcomingFeature title="Time Table Feature" />
    </View>
  )
}

export default timetable

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
