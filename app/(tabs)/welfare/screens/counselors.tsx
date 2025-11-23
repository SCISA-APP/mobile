import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import colors from '@/constants/colors';

const counselors = [
  {
    id: '1',
    name: 'John Doe',
    type: 'Peer',
    department: 'Computer Science',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'John is a final year student in Computer Science. He is passionate about helping his peers and is a great listener.',
    specialties: ['Academic Stress', 'Time Management'],
  },
  {
    id: '2',
    name: 'Jane Smith',
    type: 'Peer',
    department: 'Psychology',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Jane is a psychology student who is passionate about mental health. She is a trained peer counselor and is here to help.',
    specialties: ['Anxiety', 'Relationship Problems'],
  },
  {
    id: '3',
    name: 'Dr. Emily White',
    type: 'Departmental',
    department: 'Health Services',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    bio: 'Dr. White is a licensed clinical psychologist with over 10 years of experience. She specializes in anxiety and depression.',
    specialties: ['Anxiety', 'Depression', 'Trauma'],
  },
  {
    id: '4',
    name: 'Dr. Michael Brown',
    type: 'Departmental',
    image: 'https://randomuser.me/api/portraits/men/62.jpg',
    bio: 'Dr. Brown is a student affairs professional who is dedicated to helping students succeed. He is a great resource for any student who is struggling.',
    specialties: ['Career Counseling', 'Academic Advising'],
  },
];

const CounselorsScreen = () => {
  const router = useRouter();
  const { type } = useLocalSearchParams();

  const filteredCounselors = counselors.filter(c => c.type === type);
  // const title = type === 'Peer' ? 'Peer Counselors' : 'Professional Counselors'; // No longer needed as header is removed

  const renderCounselor = ({ item }) => {
    const handlePress = () => {
      if (item.type === 'Peer') {
        router.push({
          pathname: `/welfare/screens/student-counselor/${item.id}`,
          params: { student_counselor: JSON.stringify(item) },
        });
      } else {
        router.push({
          pathname: `/welfare/screens/counselor/${item.id}`,
          params: { counselor: JSON.stringify(item) },
        });
      }
    };

    return (
      <TouchableOpacity onPress={handlePress} style={styles.counselorCard}>
        <Image source={{ uri: item.image }} style={styles.counselorImage} />
        <View style={styles.counselorInfo}>
          <Text style={styles.counselorName}>{item.name}</Text>
          <Text style={styles.counselorDepartment}>{item.department}</Text>
          <View style={styles.specialtiesContainer}>
            {item.specialties.map((specialty, index) => (
              <View key={index} style={styles.specialtyBadge}>
                <Text style={styles.specialtyText}>{specialty}</Text>
              </View>
            ))}
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color={colors.gray} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredCounselors}
        renderItem={renderCounselor}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

export default CounselorsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  // Removed header styles as per request
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10, // Adjusted padding
  },
  counselorCard: {
    // Removed background, border, shadow, and elevation
    paddingVertical: 10, // Adjusted padding
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5, // Adjusted margin
  },
  counselorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  counselorInfo: {
    flex: 1,
  },
  counselorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  counselorDepartment: {
    fontSize: 14,
    color: '#000',
    marginTop: 4,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  specialtyBadge: {
    // Removed background and border radius
    paddingVertical: 2, // Adjusted padding
    paddingHorizontal: 6, // Adjusted padding
    marginRight: 8,
    marginBottom: 4, // Adjusted margin
  },
  specialtyText: {
    fontSize: 12,
    color: '#000', // Colder text color
  },
});