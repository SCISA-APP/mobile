import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StoreHeaderProps {
  title: string;
  showStoreButton?: boolean; // optional prop to show/hide button
}

const Header: React.FC<StoreHeaderProps> = ({ title, showStoreButton }) => {
  const router = useRouter();
  const [shopStatus, setShopStatus] = useState<'accepted' | 'pending'>('pending');

useEffect(() => {
  if (!showStoreButton) return;

  const fetchUserStatus = async () => {
    try {
      const userJson = await AsyncStorage.getItem('@student_user');
      console.log('🟢 AsyncStorage @student_user raw:', userJson); // log raw JSON

      if (userJson) {
        const user = JSON.parse(userJson);
        console.log('🟢 Parsed user object:', user); // log parsed object

        const isAccepted = user.isShopApplicationAccepted;

        // false or null => pending
        if (isAccepted === true) setShopStatus('accepted');
        else setShopStatus('pending');
      }
    } catch (error) {
      console.error('❌ Error fetching user info:', error);
    }
  };

  fetchUserStatus();
}, [showStoreButton]);


  const handlePress = () => {
    if (shopStatus === 'accepted') {
      router.push('/(standalone)/myShop');
    } else {
      router.push('/(standalone)/becomeAnOwner');
    }
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>

      {showStoreButton && (
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.subButtonText}>
            {shopStatus === 'accepted' ? 'My Store' : 'Become a Seller'}
          </Text> 
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#ffffff',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    zIndex: 1000,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111',
  },
  subButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0052cc',
  },
});

export default Header;
