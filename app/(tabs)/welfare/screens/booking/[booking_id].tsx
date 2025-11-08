import { ThemedText } from '@/components/themed-text';
import colors from '@/constants/colors';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';



const BookingDetailsScreen = () => {
  const params = useLocalSearchParams();
  const booking = params.booking ? JSON.parse(params.booking) : null;

  if (!booking) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedText>Booking not found.</ThemedText>
      </SafeAreaView>
    );
  }

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
        <Image source={{ uri: booking.counselorImage }} style={styles.counselorImage} />
        <ThemedText style={styles.counselorName}>{booking.counselorName}</ThemedText>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) }]}>
          <ThemedText style={styles.statusText}>{booking.status}</ThemedText>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Ionicons name="calendar-outline" size={24} color={colors.primary} />
          <View style={styles.detailTextContainer}>
            <ThemedText style={styles.detailLabel}>Date & Time</ThemedText>
            <ThemedText style={styles.detailValue}>{booking.date} at {booking.time}</ThemedText>
          </View>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={24} color={colors.primary} />
          <View style={styles.detailTextContainer}>
            <ThemedText style={styles.detailLabel}>Location</ThemedText>
            <ThemedText style={styles.detailValue}>{booking.location}</ThemedText>
          </View>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="document-text-outline" size={24} color={colors.primary} />
          <View style={styles.detailTextContainer}>
            <ThemedText style={styles.detailLabel}>Notes</ThemedText>
            <ThemedText style={styles.detailValue}>{booking.notes}</ThemedText>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BookingDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  counselorImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  counselorName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text,
  },
  statusBadge: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 8,
    alignSelf: 'center',
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 20,
  },
  detailItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  detailTextContainer: {
    marginLeft: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: colors.text,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: 'bold',
  },
});