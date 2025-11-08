import { ThemedText } from '@/components/themed-text';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const concerns = [
  {
    id: '1',
    title: 'Broken light in the library',
    category: 'Maintenance',
    status: 'Submitted',
    date: '2023-11-08T10:00:00Z',
    description: 'The main overhead light in the third-floor quiet study area is flickering and seems to be broken. It is very distracting.',
  },
  {
    id: '2',
    title: 'Suggestion for more vegetarian options in the cafeteria',
    category: 'Food',
    status: 'In Progress',
    date: '2023-11-07T14:30:00Z',
    description: 'I would like to suggest adding more vegetarian and vegan options to the daily menu in the main cafeteria. The current options are very limited.',
  },
  {
    id: '3',
    title: 'Unfair grading in a course',
    category: 'Academic',
    status: 'Resolved',
    date: '2023-11-05T09:00:00Z',
    description: 'I believe my last assignment in the course XXX was graded unfairly. I have contacted the professor but have not received a satisfactory response.',
  },
];

const ConcernsScreen = () => {
  const router = useRouter();

  const getStatusColor = (status) => {
    switch (status) {
      case 'Submitted':
        return colors.warning;
      case 'In Progress':
        return colors.primary;
      case 'Resolved':
        return colors.success;
      default:
        return colors.gray;
    }
  };

  const renderConcern = ({ item }) => (
    <TouchableOpacity style={styles.concernCard} onPress={() => router.push({
      pathname: `/(tabs)/welfare/screens/concern/${item.id}`,
      params: { concern: JSON.stringify(item) }
    })}>
      <View style={styles.concernInfo}>
        <ThemedText style={styles.concernTitle}>{item.title}</ThemedText>
        <ThemedText style={styles.concernCategory}>{item.category}</ThemedText>
      </View>
      <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <ThemedText style={styles.title}>My Concerns</ThemedText>
      </View>
      <FlatList
        data={concerns}
        renderItem={renderConcern}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

export default ConcernsScreen;

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
  concernCard: {
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
  concernInfo: {
    flex: 1,
  },
  concernTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  concernCategory: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 4,
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