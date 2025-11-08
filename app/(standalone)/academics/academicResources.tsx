import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as academicData from '@/assets/data/academicResources.ts/index'; // imports all exported departments

type DepartmentData = {
  department: string;
  years: { year: number; link: string }[];
};

const AcademicResources = () => {
  const router = useRouter();
  const [programData, setProgramData] = useState<DepartmentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUserProgram = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('@student_user');
        if (!storedUser) return;

        const user = JSON.parse(storedUser);
        const program = user.program?.trim().toLowerCase();

        // find the department object that matches the user's program
        const department = Object.values(academicData).find(
          (dept: any) => dept.department.toLowerCase() === program
        ) as DepartmentData | undefined;

        if (department) setProgramData(department);
      } catch (error) {
        console.error('Error loading user program:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserProgram();
  }, []);

  const openLinkInApp = (link: string, title: string) => {
    router.push({
      pathname: '/academics/resourceViewer',
      params: { link, title },
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#002855" />
      </View>
    );
  }

  if (!programData) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.noDataText}>
          No resources found for your program.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{programData.department} Resources</Text>

      {programData.years.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.yearButton}
          onPress={() => openLinkInApp(item.link, `Year ${item.year}`)}
          activeOpacity={0.8}
        >
          <Text style={styles.yearText}>Year {item.year}</Text>
          <Text style={styles.linkText}>View Resources</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default AcademicResources;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    color: '#002855',
    marginBottom: 20,
    textAlign: 'center',
  },
  yearButton: {
    backgroundColor: '#002855',
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: 'center',
  },
  yearText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  linkText: {
    fontSize: 14,
    color: '#e0e7ff',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    color: '#666',
    fontSize: 16,
  },
});
