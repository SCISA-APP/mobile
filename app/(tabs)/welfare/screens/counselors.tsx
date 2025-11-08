import { ThemedText } from '@/components/themed-text';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    department: 'Student Affairs',
    image: 'https://randomuser.me/api/portraits/men/62.jpg',
    bio: 'Dr. Brown is a student affairs professional who is dedicated to helping students succeed. He is a great resource for any student who is struggling.',
    specialties: ['Career Counseling', 'Academic Advising'],
  },
];

const CounselorsScreen = () => {
  const router = useRouter();
  const { type } = useLocalSearchParams();

  const filteredCounselors = counselors.filter(c => c.type === type);
  const title = type === 'Peer' ? 'Peer Counselors' : 'Professional Counselors';

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
          <ThemedText style={styles.counselorName}>{item.name}</ThemedText>
          <ThemedText style={styles.counselorDepartment}>{item.department}</ThemedText>
          <View style={styles.specialtiesContainer}>
            {item.specialties.map((specialty, index) => (
              <View key={index} style={styles.specialtyBadge}>
                <ThemedText style={styles.specialtyText}>{specialty}</ThemedText>
              </View>
            ))}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
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
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#343A40',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  counselorCard: {
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
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  counselorInfo: {
    flex: 1,
  },
  counselorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343A40',
  },
  counselorDepartment: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 4,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  specialtyBadge: {
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  specialtyText: {
    fontSize: 12,
    color: '#495057',
  },
});