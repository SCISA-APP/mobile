import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
  title: string;
  showStoreButton?: boolean;
  rightIcon?: keyof typeof Ionicons.glyphMap; // icon name
  onRightPress?: () => void;                // function for icon
}

const Header: React.FC<HeaderProps> = ({
  title,
  showStoreButton,
  rightIcon,
  onRightPress,
}) => {
  const router = useRouter();
  const [shopStatus, setShopStatus] = useState<'accepted' | 'pending'>('pending');

  useEffect(() => {
    if (!showStoreButton) return;

    const fetchUserStatus = async () => {
      try {
        const userJson = await AsyncStorage.getItem('@student_user');

        if (userJson) {
          const user = JSON.parse(userJson);
          const isAccepted = user.isShopApplicationAccepted;

          setShopStatus(isAccepted === true ? 'accepted' : 'pending');
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

      <View style={styles.rightSide}>
        {showStoreButton && (
          <TouchableOpacity onPress={handlePress} style={{ marginRight: 12 }}>
            <Text style={styles.subButtonText}>
              {shopStatus === 'accepted' ? '🛍️My Store🛒' : '˗ˋˏ$ˎˊ˗Become a Seller'}
            </Text>
          </TouchableOpacity>
        )}

        {rightIcon && (
          <TouchableOpacity onPress={onRightPress}>
            <Ionicons name={rightIcon} size={24} color="#333" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;

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
  rightSide: {
    flexDirection: 'row',
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
