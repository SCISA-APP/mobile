import { collegeExecutives, departmentExecutives } from '@/assets/data/executives';
import colors from '@/constants/colors';
import { Executive } from '@/types/models/executive';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';

export default function ExecutivesScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'college' | 'department'>('college');
  const [userDepartment, setUserDepartment] = useState<string>('');
  const [deptExecs, setDeptExecs] = useState<Executive[]>([]);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('@student_user');
      if (userData) {
        const user = JSON.parse(userData);
        const department = user.program || 'Computer Science';
        setUserDepartment(department);
        setDeptExecs(departmentExecutives[department] || []);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const handleCall = (phone: string) => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  const executives = activeTab === 'college' ? collegeExecutives : deptExecs;

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />

      {/* Header with Tabs */}
      <View style={styles.headerContainer}>
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.text.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Leadership</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.tabContainer}>
          <Pressable
            style={[styles.tab, activeTab === 'college' && styles.activeTab]}
            onPress={() => setActiveTab('college')}
          >
            <Text style={[styles.tabText, activeTab === 'college' && styles.activeTabText]}>
              College
            </Text>
            {activeTab === 'college' && <View style={styles.tabIndicator} />}
          </Pressable>

          <Pressable
            style={[styles.tab, activeTab === 'department' && styles.activeTab]}
            onPress={() => setActiveTab('department')}
          >
            <Text style={[styles.tabText, activeTab === 'department' && styles.activeTabText]}>
              Department
            </Text>
            {activeTab === 'department' && <View style={styles.tabIndicator} />}
          </Pressable>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {activeTab === 'department' && (
          <Animated.View entering={FadeInUp.duration(400)} style={styles.departmentBanner}>
            <Text style={styles.departmentName}>{userDepartment}</Text>
          </Animated.View>
        )}

        {executives.map((executive, index) => (
          <Animated.View
            key={executive.id}
            entering={FadeInDown.delay(index * 80).duration(400)}
          >
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.7}
              onPress={() => router.push({
                pathname: '/(standalone)/executives/[id]',
                params: {
                  id: executive.id,
                  name: executive.name,
                  position: executive.position,
                  email: executive.email,
                  phone: executive.phone,
                  image: executive.image,
                  bio: executive.bio || '',
                  verified: executive.verified ? 'true' : 'false',
                }
              })}
            >
              <View style={styles.cardHeader}>
                <View style={styles.avatarWrapper}>
                  <Image source={{ uri: executive.image }} style={styles.avatar} />
                  {executive.verified && (
                    <View style={styles.verifiedBadge}>
                      <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
                    </View>
                  )}
                </View>

                <View style={styles.info}>
                  <Text style={styles.name}>{executive.name}</Text>
                  <Text style={styles.position}>{executive.position}</Text>
                </View>

                <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}

        {executives.length === 0 && (
          <View style={styles.emptyState}>
            <Ionicons name="people-outline" size={64} color={colors.gray[300]} />
            <Text style={styles.emptyText}>No executives found</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  headerContainer: {
    backgroundColor: colors.white,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text.primary,
  },
  placeholder: {
    width: 40,
  },
  tabContainer: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {
    // Active state handled by indicator
  },
  tabText: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  activeTabText: {
    color: colors.text.primary,
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  departmentBanner: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  departmentName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.white,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    position: 'relative',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.gray[200],
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: 2,
  },
  position: {
    fontSize: 13,
    color: colors.text.secondary,
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 16,
  },
});
