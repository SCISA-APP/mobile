// /utils/user/getCachedUser.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import type { CachedUser } from '@/types/auth/cachedUser';

/**
 * Fetches the cached user from AsyncStorage and logs it
 */
export const getCachedUser = async (): Promise<CachedUser | null> => {
  try {
    const data = await AsyncStorage.getItem('@student_user');
    if (!data) {
      console.log('ℹ️ No cached user found');
      return null;
    }

    const user: CachedUser = JSON.parse(data);

    // ✅ Always log cached user
    console.log('🗄️ Cached user retrieved:', user);

    return user;
  } catch (error) {
    console.error('❌ Error fetching cached user:', error);
    return null;
  }
};

/**
 * Synchronously fetch user from cache for use inside components
 * Logs whenever user is retrieved
 */
export const useCachedUser = (): CachedUser | null => {
  const [user, setUser] = React.useState<CachedUser | null>(null);

  React.useEffect(() => {
    const fetchUser = async () => {
      const cached = await getCachedUser();
      setUser(cached);

      if (cached) {
        console.log('📌 useCachedUser hook: User is available', cached);
      } else {
        console.log('📌 useCachedUser hook: No user found in cache');
      }
    };
    fetchUser();
  }, []);

  return user;
};

/**
 * Optional: helper to log all AsyncStorage keys & values
 */
export const logAllCachedData = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    console.log('🗄️ AsyncStorage keys:', keys);

    const stores = await AsyncStorage.multiGet(keys);
    stores.forEach(([key, value]) => {
      console.log(`🔑 Key: ${key} => Value: ${value}`);
    });
  } catch (error) {
    console.error('❌ Error logging AsyncStorage data:', error);
  }
};
