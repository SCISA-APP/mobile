import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { getCart } from '@/utils/cartUtils';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const BUTTON_SIZE = 60;

const FloatingCartButton = () => {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);

  const pan = useRef(new Animated.ValueXY()).current;

  // Load cart count
  const loadCartCount = async () => {
    const cart = await getCart();
    setCartCount(cart.length);
  };

  useEffect(() => {
    loadCartCount();
    const interval = setInterval(loadCartCount, 3000);
    return () => clearInterval(interval);
  }, []);

  // PanResponder for drag
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => 
        Math.abs(gestureState.dx) > 5 || Math.abs(gestureState.dy) > 5,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: (pan.x as any)._value,
          y: (pan.y as any)._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: (_, gestureState) => {
        // Calculate new position
        let newX = gestureState.dx;
        let newY = gestureState.dy;

        // Get current offset
        const offsetX = (pan.x as any)._offset;
        const offsetY = (pan.y as any)._offset;

        // Calculate absolute position (initial position + offset + gesture)
        // Initial position: bottom: 50, right: 20
        // In absolute coordinates from top-left:
        const absoluteX = SCREEN_WIDTH - 20 - BUTTON_SIZE + offsetX + newX;
        const absoluteY = SCREEN_HEIGHT - 50 - BUTTON_SIZE + offsetY + newY;

        // Boundaries
        const minX = 0; // Left edge
        const maxX = SCREEN_WIDTH - BUTTON_SIZE; // Right edge
        const minY = SCREEN_HEIGHT * 0.30; // Top 25% is blocked
        const maxY = SCREEN_HEIGHT - BUTTON_SIZE; // Bottom edge

        // Clamp absolute position
        const clampedX = Math.max(minX, Math.min(maxX, absoluteX));
        const clampedY = Math.max(minY, Math.min(maxY, absoluteY));

        // Convert back to relative position
        const relativeX = clampedX - (SCREEN_WIDTH - 20 - BUTTON_SIZE);
        const relativeY = clampedY - (SCREEN_HEIGHT - 50 - BUTTON_SIZE);

        // Apply constraints to gesture
        const constrainedDx = relativeX - offsetX;
        const constrainedDy = relativeY - offsetY;

        pan.setValue({ x: constrainedDx, y: constrainedDy });
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[styles.buttonContainer, { transform: pan.getTranslateTransform() }]}
    >
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push('/cartScreen')}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>🛒</Text>
        {cartCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

export default FloatingCartButton;

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    zIndex: 999,
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: '#0052cc',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    fontSize: 28,
    color: '#fff',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -5,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
});