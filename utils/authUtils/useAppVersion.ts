import * as Updates from 'expo-updates';
import { useEffect, useState } from 'react';
import Constants from 'expo-constants';

interface AppVersionInfo {
  appVersion: string;       // e.g. "1.1.0"
  updateId: string | null;  // short OTA update ID if one is active
  channel: string | null;   // e.g. "production"
  isOTA: boolean;           // true when running an OTA update (not embedded build)
  updateAvailable: boolean; // true if a newer OTA was found
  checkingUpdate: boolean;
}

export function useAppVersion(): AppVersionInfo {
  const appVersion = Constants.expoConfig?.version ?? '1.0.0';

  // expo-updates gives us the currently running update's ID
  const runningUpdateId = Updates.updateId ?? null;
  const channel = Updates.channel ?? null;

  // An OTA update is active when updateId is set AND we're not in dev mode
  const isOTA = !__DEV__ && runningUpdateId !== null;

  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [checkingUpdate, setCheckingUpdate] = useState(false);

  useEffect(() => {
    // Skip update checks in dev / Expo Go
    if (__DEV__) return;

    const check = async () => {
      setCheckingUpdate(true);
      try {
        const result = await Updates.checkForUpdateAsync();
        setUpdateAvailable(result.isAvailable);
      } catch {
        // Network offline or not configured — ignore
      } finally {
        setCheckingUpdate(false);
      }
    };

    check();
  }, []);

  // Shorten the UUID-style update ID to last 8 chars for display
  const shortUpdateId = runningUpdateId
    ? runningUpdateId.replace(/-/g, '').slice(-8).toUpperCase()
    : null;

  return {
    appVersion,
    updateId: shortUpdateId,
    channel,
    isOTA,
    updateAvailable,
    checkingUpdate,
  };
}