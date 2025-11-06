import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import colors from '@/constants/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

const CounselorDetailsScreen = () => {
  const params = useLocalSearchParams();

  // It's better to pass the whole counselor object as a JSON string
  const counselor = params.counselor ? JSON.parse(params.counselor) : null;

  if (!counselor) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedText>Counselor not found.</ThemedText>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image source={{ uri: counselor.image || 'https://via.placeholder.com/150' }} style={styles.profilePic} />
          <ThemedText type="title" style={styles.name}>{counselor.name}</ThemedText>
          <ThemedText style={styles.department}>{counselor.department}</ThemedText>
        </View>

        <View style={styles.detailsContainer}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>About</ThemedText>
          <ThemedText style={styles.bio}>{counselor.bio}</ThemedText>

          <ThemedText type="subtitle" style={styles.sectionTitle}>Specialties</ThemedText>
          <View style={styles.specialtiesContainer}>
            {counselor.specialties?.map((specialty, index) => (
              <View key={index} style={styles.specialty}><ThemedText style={styles.specialtyText}>{specialty}</ThemedText></View>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.bookButton}>
          <ThemedText style={styles.bookButtonText}>Book a Session</ThemedText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CounselorDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.primary,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  department: {
    color: 'white',
    fontSize: 16,
  },
  detailsContainer: {
    padding: 20,
  },
  sectionTitle: {
    color: colors.primary,
    marginBottom: 10,
  },
  bio: {
    lineHeight: 22,
    marginBottom: 20,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specialty: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    margin: 5,
  },
  specialtyText: {
    color: 'white',
  },
  bookButton: {
    backgroundColor: colors.secondary,
    margin: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});