import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { academicCalendar } from '@/assets/data/academics/academicCalendar'
import colors from '@/constants/colors'

// Helper to check if today is within the event range
const isTodayInRange = (from: Date, to: Date) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const start = new Date(from)
  start.setHours(0, 0, 0, 0)
  const end = new Date(to)
  end.setHours(0, 0, 0, 0)
  return today >= start && today <= end
}

const AcademicCalendar = () => {
  const renderItem = ({ item }: any) => {
    const highlight = isTodayInRange(item.from, item.to)
    const isSemester = item.activity.toUpperCase().includes("FIRST SEMESTER") || item.activity.toUpperCase().includes("SECOND SEMESTER")

    return (
      <View style={[styles.row, highlight && styles.highlightRow]}>
        <Text
          style={[
            styles.activity,
            styles.text,
            isSemester && styles.semesterText, // bold for semesters
          ]}
        >
          {item.activity}
        </Text>
        <Text style={[styles.dates, styles.text]}>
          {item.from.toLocaleDateString()} - {item.to.toLocaleDateString()}
        </Text>
      </View>
    )
  }

  const renderHeader = () => (
    <View style={styles.headerRow}>
      <Text style={[styles.activity, styles.headerText]}>Activity</Text>
      <Text style={[styles.dates, styles.headerText]}>From - To</Text>
    </View>
  )

  return (
    <View style={styles.container}>
      {renderHeader()}
      <FlatList
      showsVerticalScrollIndicator={false}
        data={academicCalendar}
        keyExtractor={(item) => item.sn}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 50 }}
      />
    </View>
  )
}

export default AcademicCalendar

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.background || '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryDark || '#ccc',
    backgroundColor: colors.primaryDark,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    alignItems: 'center',
  },
  highlightRow: {
    backgroundColor: '#FFF7CC',
  },
  activity: { flex: 1, paddingHorizontal: 8 },
  dates: { width: 150, textAlign: 'center' },
  text: { fontSize: 14, color: '#000' },
  headerText: { fontWeight: 'bold', color: '#fff' },
  semesterText: {
    fontWeight: 'bold',
    fontSize: 15,
    color: colors.primaryDark || '#2B4C83',
  },
})
