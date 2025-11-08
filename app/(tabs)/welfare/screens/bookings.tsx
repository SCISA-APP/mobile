import { ThemedText } from '@/components/themed-text';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const bookings = [
  {
    id: '1',
    counselorName: 'Dr. Emily White',
    date: '2023-11-10',
    time: '10:00 AM',
    status: 'Confirmed',
    counselorImage: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: '2',
    counselorName: 'John Doe',
    date: '2023-11-12',
    time: '2:00 PM',
    status: 'Pending',
    counselorImage: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '3',
    counselorName: 'Dr. Michael Brown',
    date: '2023-11-15',
    time: '11:30 AM',
    status: 'Cancelled',
    counselorImage: 'https://randomuser.me/api/portraits/men/62.jpg',
  },
];

const BookingsScreen = () => {
  const router = useRouter();

  const renderBooking = ({ item }) => (
    <TouchableOpacity style={styles.bookingCard} onPress={() => router.push({
      pathname: `/welfare/screens/booking/${item.id}`,
      params: { booking: JSON.stringify(item) }
    })}>
      <Image source={{ uri: item.counselorImage }} style={styles.counselorImage} />
      <View style={styles.bookingInfo}>
        <ThemedText style={styles.counselorName}>{item.counselorName}</ThemedText>
        <View style={styles.dateTimeContainer}>
          <Ionicons name="calendar-outline" size={16} color={colors.primary} />
          <ThemedText style={styles.bookingDateTime}>{item.date} at {item.time}</ThemedText>
        </View>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
        <ThemedText style={styles.statusText}>{item.status}</ThemedText>
      </View>
    </TouchableOpacity>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return colors.success;
      case 'Pending':
        return colors.warning;
      case 'Cancelled':
        return colors.danger;
      default:
        return colors.gray;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>My Bookings</ThemedText>
      </View>
      <FlatList
        data={bookings}
        renderItem={renderBooking}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

export default BookingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  bookingCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  counselorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  bookingInfo: {
    flex: 1,
  },
  counselorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  bookingDateTime: {
    fontSize: 14,
    color: colors.text,
    marginLeft: 8,
  },
  statusBadge: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
});