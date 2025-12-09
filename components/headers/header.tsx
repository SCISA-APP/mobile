import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';

interface HeaderProps {
  title: string;
  showStoreButton?: boolean;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, showStoreButton, rightIcon, onRightPress }) => {
  const router = useRouter();
  const [shopStatus, setShopStatus] = useState<'accepted' | 'pending'>('pending');

  useEffect(() => {
    if (!showStoreButton) return;

    const fetchUserStatus = async () => {
      try {
        const userJson = Platform.OS !== 'web' ? await AsyncStorage.getItem('@student_user') : null;
        if (userJson) {
          const user = JSON.parse(userJson);
          setShopStatus(user.isShopApplicationAccepted ? 'accepted' : 'pending');
        }
      } catch (err) {
        console.error('❌ Error fetching user info:', err);
      }
    };

    fetchUserStatus();
  }, [showStoreButton]);

  const handlePress = () => {
    if (shopStatus === 'accepted') router.push('/(standalone)/myShop');
    else router.push('/(standalone)/becomeAnOwner');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{title}</Text>
        <View style={styles.rightSide}>
          {showStoreButton && (
            <TouchableOpacity onPress={handlePress} style={{ marginRight: 12 }}>
              <Text style={styles.subButtonText}>
                {shopStatus === 'accepted' ? '🛍️ My Store 🛒' : '˗ˋˏ$ˎˊ˗Become a Seller'}
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
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#fff' }, // <-- header background
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: { fontSize: 24, fontWeight: '700', color: '#111' },
  rightSide: { flexDirection: 'row', alignItems: 'center' },
  subButtonText: { fontSize: 14, fontWeight: '600', color: '#0052cc' },
});
