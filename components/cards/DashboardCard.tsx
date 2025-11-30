import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, View } from 'react-native';
import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons'; // optional icon

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  icon?: string;
  onPress: () => void;
  style?: ViewStyle;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, subtitle, icon, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress} activeOpacity={0.8}>
      {icon && <Ionicons name={icon} size={28} color={colors.primary} style={{ marginBottom: 8 }} />}
      <Text style={styles.title}>{title}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
    </TouchableOpacity>
  );
};

export default DashboardCard;

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 120,
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    marginBottom: 12,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: 12,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
