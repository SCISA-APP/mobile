import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StoreHeaderProps {
  title: string;
  showStoreButton?: boolean; // ✅ new optional prop
}

const Header: React.FC<StoreHeaderProps> = ({ title, showStoreButton }) => {
  const router = useRouter();
  const [isShopOwner, setIsShopOwner] = useState(false);

  useEffect(() => {
    if (!showStoreButton) return; // skip fetching if button is hidden

    const fetchUserStatus = async () => {
      try {
        const userJson = await AsyncStorage.getItem('@user_info');
        if (userJson) {
          const user = JSON.parse(userJson);
          setIsShopOwner(user.isShopOwner ?? false);
        }
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };
    fetchUserStatus();
  }, [showStoreButton]);

  const handlePress = () => {
    if (isShopOwner) {
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
            {isShopOwner ? 'My Store' : 'Become a Seller'}
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
