import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';
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
      router.push({
        pathname: '/(standalone)/welfare/counselor-detail',
        params: {
          id: item.id,
          name: item.name,
          type: item.type,
          department: item.department,
          image: item.image,
          bio: item.bio,
          specialties: JSON.stringify(item.specialties),
        }
      });
    };

    return (
      <TouchableOpacity onPress={handlePress} style={styles.counselorCard} activeOpacity={0.7}>
        <Image source={{ uri: item.image }} style={styles.counselorImage} />
        <View style={styles.counselorInfo}>
          <Text style={styles.counselorName}>{item.name}</Text>
          <Text style={styles.counselorType}>{item.type} Counselor</Text>
          {item.specialties && item.specialties.length > 0 && (
            <View style={styles.specialtiesContainer}>
              {item.specialties.slice(0, 2).map((specialty, index) => (
                <View key={index} style={styles.specialtyBadge}>
                  <Text style={styles.specialtyText}>{specialty}</Text>
                </View>
              ))}
              {item.specialties.length > 2 && (
                <Text style={styles.moreText}>+{item.specialties.length - 2}</Text>
              )}
            </View>
          )}
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
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
    backgroundColor: colors.surface,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  counselorCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  counselorImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
    backgroundColor: colors.gray[200],
  },
  counselorInfo: {
    flex: 1,
  },
  counselorName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 2,
  },
  counselorType: {
    fontSize: 12,
    color: colors.text.secondary,
    marginBottom: 6,
  },
  specialtiesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
  },
  specialtyBadge: {
    backgroundColor: colors.surface,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  specialtyText: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '600',
  },
  moreText: {
    fontSize: 11,
    color: colors.text.secondary,
    fontWeight: '600',
  },
});