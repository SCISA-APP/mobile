import colors from '@/constants/colors';
import React, { useState } from 'react';
import { ActivityIndicator, GestureResponderEvent, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface CustomButtonProps {
  label: string;
  onPress: (event: GestureResponderEvent) => Promise<void> | void;
  style?:object;// optional style prop
}

const CustomButton: React.FC<CustomButtonProps> = ({ label, onPress }) => {
  const [loading, setLoading] = useState(false);

  const handlePress = async (event: GestureResponderEvent) => {
    if (loading) return; // prevent double press
    setLoading(true);
    try {
      await onPress(event); // await if it's async
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.button}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={loading} // optional: disable button while loading
    >
      {loading ? (
        <ActivityIndicator color={colors.background} />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',  //change to flex:1 to allow equal spacing in row
    // flex: 1,
  },
  label: {
    color: colors.background,
    fontWeight: '600',
    fontSize: 16,
  },
});
