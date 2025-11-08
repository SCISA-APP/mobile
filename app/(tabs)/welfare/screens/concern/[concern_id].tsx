import { ThemedText } from '@/components/themed-text';
import colors from '@/constants/colors';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ConcernDetailsScreen = () => {
  const params = useLocalSearchParams();
  const concern = params.concern ? JSON.parse(params.concern) : null;

  if (!concern) {
    return (
      <SafeAreaView style={styles.container}>
        <ThemedText>Concern not found.</ThemedText>
      </SafeAreaView>
    );
  }

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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <ThemedText type="title" style={styles.title}>{concern.title}</ThemedText>
          <View style={styles.metaContainer}>
            <ThemedText style={styles.category}>{concern.category}</ThemedText>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(concern.status) }]}>
              <Text style={styles.statusText}>{concern.status}</Text>
            </View>
          </View>
          <ThemedText style={styles.date}>{new Date(concern.date).toLocaleString()}</ThemedText>
        </View>

        <View style={styles.descriptionContainer}>
          <ThemedText type="subtitle">Details</ThemedText>
          <ThemedText style={styles.description}>{concern.description}</ThemedText>
        </View>

        {concern.isAnonymous && (
          <View style={styles.anonymousBanner}>
            <ThemedText style={styles.anonymousText}>This concern was submitted anonymously.</ThemedText>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConcernDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    marginBottom: 10,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: colors.gray,
  },
  statusBadge: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  statusText: {
    fontSize: 12,
    color: 'white',
    fontWeight: 'bold',
  },
  date: {
    fontSize: 14,
    color: colors.gray,
  },
  descriptionContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  description: {
    marginTop: 10,
    lineHeight: 22,
  },
  anonymousBanner: {
    marginTop: 20,
    backgroundColor: colors.warningLight,
    padding: 15,
    borderRadius: 10,
  },
  anonymousText: {
    color: colors.warning,
    textAlign: 'center',
  },
});