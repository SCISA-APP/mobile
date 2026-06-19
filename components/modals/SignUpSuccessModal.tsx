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
import { Ionicons } from '@expo/vector-icons';
import colors from '@/constants/colors';

interface SignUpSuccessModalProps {
  visible: boolean;
  onClose: () => void;
}

const SignUpSuccessModal: React.FC<SignUpSuccessModalProps> = ({ visible, onClose }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const checkAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      // Reset
      scaleAnim.setValue(0);
      opacityAnim.setValue(0);
      checkAnim.setValue(0);

      Animated.sequence([
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            damping: 14,
            stiffness: 180,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true,
          }),
        ]),
        Animated.spring(checkAnim, {
          toValue: 1,
          useNativeDriver: true,
          damping: 12,
          stiffness: 200,
        }),
      ]).start();
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
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
          {/* Check circle */}
          <Animated.View
            style={[
              styles.iconWrapper,
              { transform: [{ scale: checkAnim }] },
            ]}
          >
            <Ionicons name="checkmark-circle" size={72} color={colors.success} />
          </Animated.View>

          {/* Title */}
          <Text style={styles.title}>Sign Up Successful!</Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Welcome message */}
          <Text style={styles.welcomeHeading}>Welcome, SCISAN! 🎉</Text>
          <Text style={styles.message}>
            Your account has been created successfully. Please log in with your newly created
            credentials to get started.
          </Text>

          {/* CTA Button */}
          <TouchableOpacity style={styles.button} onPress={onClose} activeOpacity={0.85}>
            <Text style={styles.buttonText}>Go to Login</Text>
            <Ionicons name="arrow-forward" size={18} color={colors.white} style={{ marginLeft: 6 }} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default SignUpSuccessModal;

const styles = StyleSheet.create<{
  overlay: ViewStyle;
  card: ViewStyle;
  iconWrapper: ViewStyle;
  title: TextStyle;
  divider: ViewStyle;
  welcomeHeading: TextStyle;
  message: TextStyle;
  button: ViewStyle;
  buttonText: TextStyle;
}>({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
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
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primaryDark,
    marginBottom: 14,
    letterSpacing: 0.3,
  },
  divider: {
    width: '80%',
    height: 1,
    backgroundColor: colors.gray[200],
    marginBottom: 18,
  },
  welcomeHeading: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    width: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
});