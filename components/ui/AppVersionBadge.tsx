import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';
import colors from '../../constants/colors';
import { useAppVersion } from '@/utils/authUtils/useAppVersion';

/**
 * Drop-in replacement for the plain version Text in ProfileScreen.
 * Shows:  SCISA • v1.1.0            — no OTA running, no update pending
 *         SCISA • v1.1.0 • OTA      — running an OTA update
 *         SCISA • v1.1.0 ↑ Update   — a newer OTA is available
 */
export default function AppVersionBadge() {
  const { appVersion, updateId, isOTA, updateAvailable, checkingUpdate } = useAppVersion();

  return (
    <View style={styles.row}>
      {/* App name + version — always shown */}
      <Text style={styles.base}>SCISA • v{appVersion}</Text>

      {/* Checking indicator */}
      {checkingUpdate && (
        <ActivityIndicator size={10} color={colors.gray[400]} style={styles.spinner} />
      )}

      {/* Update available badge */}
      {!checkingUpdate && updateAvailable && (
        <View style={styles.updateBadge}>
          <Ionicons name="arrow-up-circle-outline" size={12} color={colors.white} />
          <Text style={styles.updateText}>Update available</Text>
        </View>
      )}

      {/* OTA running badge (only when no newer update is pending) */}
      {!checkingUpdate && isOTA && !updateAvailable && (
        <View style={styles.otaBadge}>
          <Ionicons name="cloud-done-outline" size={12} color={colors.primary} />
          <Text style={styles.otaText}>OTA{updateId ? ` #${updateId}` : ''}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create<{
  row: ViewStyle;
  base: TextStyle;
  spinner: ViewStyle;
  updateBadge: ViewStyle;
  updateText: TextStyle;
  otaBadge: ViewStyle;
  otaText: TextStyle;
}>({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 20,
    flexWrap: 'wrap',
  },
  base: {
    fontSize: 12,
    color: colors.gray[400],
  },
  spinner: {
    marginLeft: 4,
  },
  updateBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: colors.success,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 20,
  },
  updateText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.white,
    letterSpacing: 0.2,
  },
  otaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: `${colors.primary}15`,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: `${colors.primary}30`,
  },
  otaText: {
    fontSize: 10,
    fontWeight: '600',
    color: colors.primary,
    letterSpacing: 0.2,
  },
});