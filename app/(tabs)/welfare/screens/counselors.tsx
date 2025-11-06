import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
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
    department: 'Student Affairs',
    image: 'https://randomuser.me/api/portraits/men/62.jpg',
    bio: 'Dr. Brown is a student affairs professional who is dedicated to helping students succeed. He is a great resource for any student who is struggling.',
    specialties: ['Career Counseling', 'Academic Advising'],
  },
];

const CounselorsScreen = () => {
  const router = useRouter();

  const renderCounselor = ({ item }) => (
    <TouchableOpacity onPress={() => router.push(`/welfare/screens/${item.id}?counselor=${JSON.stringify(item)}`)}>
      <View style={styles.counselorItem}>
        <Image source={{ uri: item.image }} style={styles.counselorImage} />
        <View style={styles.counselorInfo}>
          <ThemedText style={styles.counselorName}>{item.name}</ThemedText>
          <ThemedText>{item.type} Counselor</ThemedText>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ThemedText type="title" style={styles.title}>Counselors</ThemedText>
      <FlatList
        data={counselors}
        renderItem={renderCounselor}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default CounselorsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    color: colors.primary,
  },
  counselorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  counselorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  counselorInfo: {
    flex: 1,
  },
  counselorName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});