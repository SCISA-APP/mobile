import { ThemedText } from '@/components/themed-text';
import colors from '@/constants/colors';
import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const StudentCounselorDetailsScreen = () => {
  const params = useLocalSearchParams();
  const student_counselor = params.student_counselor ? JSON.parse(params.student_counselor) : null;
  const [activeTab, setActiveTab] = useState('About');

  const renderContent = () => {
    if (activeTab === 'About') {
      return <ThemedText style={styles.bio}>{student_counselor.bio}</ThemedText>;
    }
    return (
      <View style={styles.specialtiesContainer}>
        {student_counselor.specialties?.map((specialty, index) => (
          <View key={index} style={styles.specialty}><ThemedText style={styles.specialtyText}>{specialty}</ThemedText></View>
        ))}
      </View>
    );
  };

  if (!student_counselor) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedText>Counselor not found.</ThemedText>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.banner} />
          <Image source={{ uri: student_counselor.image || 'https://via.placeholder.com/150' }} style={styles.profilePic} />
          <TouchableOpacity style={styles.bookButton}>
            <ThemedText style={styles.bookButtonText}>Book a Session</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.userInfoContainer}>
          <ThemedText type="title" style={styles.name}>{student_counselor.name}</ThemedText>
          <ThemedText style={styles.department}>{student_counselor.department}</ThemedText>
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity style={[styles.tab, activeTab === 'About' && styles.activeTab]} onPress={() => setActiveTab('About')}>
            <ThemedText style={[styles.tabText, activeTab === 'About' && styles.activeTabText]}>About</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, activeTab === 'Specialties' && styles.activeTab]} onPress={() => setActiveTab('Specialties')}>
            <ThemedText style={[styles.tabText, activeTab === 'Specialties' && styles.activeTabText]}>Specialties</ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles.contentContainer}>
          {renderContent()}
        </View>
      </ScrollView>
    </View>
  );
};

export default StudentCounselorDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    marginBottom: 60,
  },
  banner: {
    height: 120 + (StatusBar.currentHeight || 0),
    backgroundColor: '#4A90E2', // A light blue color
    paddingTop: StatusBar.currentHeight || 0,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: 'white',
    position: 'absolute',
    top: 60 + (StatusBar.currentHeight || 0),
    left: 20,
  },
  bookButton: {
    position: 'absolute',
    right: 20,
    top: 130 + (StatusBar.currentHeight || 0),
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  bookButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  userInfoContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  department: {
    fontSize: 16,
    color: 'gray',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    marginTop: 20,
  },
  tab: {
    paddingVertical: 12,
    width: width / 2,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 16,
    color: 'gray',
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  contentContainer: {
    padding: 20,
  },
  bio: {
    lineHeight: 22,
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
});
