import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { useRouter } from 'expo-router';
import colors from '../../constants/colors';

interface LoginErrorModalProps {
  visible: boolean;
  onClose: () => void;
}

const LoginErrorModal: React.FC<LoginErrorModalProps> = ({ visible, onClose }) => {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);

      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          useNativeDriver: true,
          damping: 14,
          stiffness: 180,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible]);

  const handleSignUp = () => {
    onClose();
    router.push('/(auth)/signup');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.card,
            {
              opacity: opacityAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Icon */}
          <View style={styles.iconWrapper}>
            <Ionicons name="warning-outline" size={60} color={colors.error} />
          </View>

          {/* Title */}
          <Text style={styles.title}>Login Failed</Text>

          <View style={styles.divider} />

          {/* Message */}
          <Text style={styles.message}>
            Ensure you entered the right email and password.
          </Text>
          <Text style={styles.subMessage}>
            If you don't have an account yet, create one now.
          </Text>

          {/* Buttons */}
          <TouchableOpacity style={styles.retryButton} onPress={onClose} activeOpacity={0.85}>
            <Ionicons name="refresh-outline" size={18} color={colors.white} style={{ marginRight: 6 }} />
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp} activeOpacity={0.85}>
            <Ionicons name="person-add-outline" size={17} color={colors.primary} style={{ marginRight: 6 }} />
            <Text style={styles.signUpText}>Create an Account</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default LoginErrorModal;

const styles = StyleSheet.create<{
  overlay: ViewStyle;
  card: ViewStyle;
  iconWrapper: ViewStyle;
  title: TextStyle;
  divider: ViewStyle;
  message: TextStyle;
  subMessage: TextStyle;
  retryButton: ViewStyle;
  retryText: TextStyle;
  signUpButton: ViewStyle;
  signUpText: TextStyle;
}>({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  card: {
    width: '100%',
    backgroundColor: colors.white,
    borderRadius: 20,
    paddingVertical: 36,
    paddingHorizontal: 28,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
  },
  iconWrapper: {
    marginBottom: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.error,
    marginBottom: 14,
    letterSpacing: 0.3,
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: colors.gray[200],
    marginBottom: 18,
  },
  message: {
    fontSize: 15,
    color: colors.text.primary,
    textAlign: 'center',
    fontWeight: '500',
    marginBottom: 8,
  },
  subMessage: {
    fontSize: 13,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.error,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    marginBottom: 12,
  },
  retryText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  signUpButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
    paddingVertical: 13,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  signUpText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});