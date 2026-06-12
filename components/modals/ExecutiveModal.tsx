import { Executive } from '@/types/models/executives';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Linking,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const NAVY     = '#002259';
const NAVY_MID = '#003080';
const { height: SCREEN_H } = Dimensions.get('window');

interface Props {
  item: Executive | null;
  visible: boolean;
  onClose: () => void;
}

export default function ExecutiveModal({ item, visible, onClose }: Props) {
  const insets     = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(SCREEN_H)).current;

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: visible ? 0 : SCREEN_H,
      useNativeDriver: true,
      damping: 22,
      stiffness: 220,
    }).start();
  }, [visible]);

  if (!item) return null;

  const initials = item.name.trim().split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();

  const openCall      = () => item.phone && Linking.openURL(`tel:${item.phone.replace(/\s/g, '')}`);
  const openWhatsApp  = () => item.phone && Linking.openURL(`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}`);
  const openEmail     = () => item.email && Linking.openURL(`mailto:${item.email}`);

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <Animated.View
        style={[
          styles.sheet,
          { paddingBottom: insets.bottom + 24, transform: [{ translateY }] },
        ]}
      >
        {/* Full-sheet logo watermark — sits behind everything */}
        <Image
          source={require('@/assets/images/logo.jpeg')}
          style={styles.logoBg}
          resizeMode="contain"
        />

        {/* Handle */}
        <View style={styles.handle} />

        {/* Close */}
        <TouchableOpacity style={styles.closeBtn} onPress={onClose} activeOpacity={0.8}>
          <Ionicons name="close" size={18} color="#666" />
        </TouchableOpacity>

        {/* Hero */}
        <View style={styles.heroArea}>
          {item.image ? (
            <Image source={{ uri: item.image }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarFallback]}>
              <Text style={styles.avatarInitials}>{initials}</Text>
            </View>
          )}
        </View>

        {/* Name + role */}
        <Text style={styles.name}>{item.name}</Text>
        <View style={styles.roleRow}>
          <View style={styles.roleDot} />
          <Text style={styles.role}>{item.role}</Text>
        </View>

        {item.department && (
          <View style={styles.deptPill}>
            <Ionicons name="school-outline" size={11} color={NAVY_MID} />
            <Text style={styles.deptPillText}>{item.department}</Text>
          </View>
        )}

        <View style={styles.divider} />

        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          {/* Description */}
          {item.description && (
            <View style={styles.descBox}>
              <View style={styles.descHeader}>
                <Ionicons name="person-outline" size={13} color={NAVY_MID} />
                <Text style={styles.descLabel}>About</Text>
              </View>
              <Text style={styles.descText}>{item.description}</Text>
            </View>
          )}

          {/* Contact actions */}
          {(item.phone || item.email) && (
            <View style={styles.actionsLabel}>
              <Ionicons name="chatbubble-ellipses-outline" size={13} color={NAVY_MID} />
              <Text style={styles.actionsLabelText}>Reach out</Text>
            </View>
          )}

          <View style={styles.actions}>
            {item.phone && (
              <>
                <TouchableOpacity style={styles.actionTile} onPress={openCall} activeOpacity={0.85}>
                  <View style={[styles.actionIcon, { backgroundColor: NAVY }]}>
                    <Ionicons name="call" size={18} color="#fff" />
                  </View>
                  <Text style={styles.actionTileLabel}>Call</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionTile} onPress={openWhatsApp} activeOpacity={0.85}>
                  <View style={[styles.actionIcon, { backgroundColor: '#25D366' }]}>
                    <Ionicons name="logo-whatsapp" size={18} color="#fff" />
                  </View>
                  <Text style={styles.actionTileLabel}>WhatsApp</Text>
                </TouchableOpacity>
              </>
            )}

            {item.email && (
              <TouchableOpacity style={styles.actionTile} onPress={openEmail} activeOpacity={0.85}>
                <View style={[styles.actionIcon, { backgroundColor: NAVY_MID }]}>
                  <Ionicons name="mail" size={18} color="#fff" />
                </View>
                <Text style={styles.actionTileLabel}>Email</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1, backgroundColor: 'rgba(0,0,0,0.45)',
  },
  sheet: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 28, borderTopRightRadius: 28,
    paddingTop: 12, paddingHorizontal: 24,
    maxHeight: SCREEN_H * 0.92,
    overflow: 'hidden',                   // clips logo to sheet bounds
    shadowColor: '#000', shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1, shadowRadius: 20, elevation: 20,
  },

  // Covers the entire sheet
  logoBg: {
    position: 'absolute',
    top: -50, left: 25, right: 0, bottom: 0,
    width: '100%', height: '100%',
    opacity: 0.05,
  },

  handle: {
    width: 40, height: 4, borderRadius: 2,
    backgroundColor: '#ddd', alignSelf: 'center', marginBottom: 16,
  },
  closeBtn: {
    position: 'absolute', top: 16, right: 20,
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center', alignItems: 'center',
  },

  heroArea: {
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 14, height: 150,
  },
  avatar: {
    width: 150, height: 150, borderRadius: 75,
    borderWidth: 3, borderColor: `${NAVY_MID}25`,
  },
  avatarFallback: {
    backgroundColor: `${NAVY_MID}15`,
    justifyContent: 'center', alignItems: 'center',
  },
  avatarInitials: {
    fontSize: 38, fontWeight: '800', color: NAVY_MID,
  },

  name: {
    fontSize: 20, fontWeight: '800', color: '#1a1a1a',
    textAlign: 'center', letterSpacing: -0.3,
  },
  roleRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'center', gap: 6, marginTop: 4, marginBottom: 10,
  },
  roleDot: {
    width: 5, height: 5, borderRadius: 3, backgroundColor: NAVY_MID,
  },
  role: {
    fontSize: 13, color: '#888', fontWeight: '500', textAlign: 'center',
  },
  deptPill: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    alignSelf: 'center',
    backgroundColor: `${NAVY_MID}10`, borderRadius: 8,
    paddingHorizontal: 12, paddingVertical: 5, marginBottom: 4,
  },
  deptPillText: {
    fontSize: 11, fontWeight: '700', color: NAVY_MID,
  },
  divider: {
    height: 1, backgroundColor: '#f0f0f0', marginVertical: 16,
  },

  scroll: { flexGrow: 0 },

  descBox: {
    backgroundColor: '#f8f9fc', borderRadius: 14,
    padding: 14, marginBottom: 20,
    borderWidth: 0.5, borderColor: `${NAVY_MID}15`,
  },
  descHeader: {
    flexDirection: 'row', alignItems: 'center',
    gap: 5, marginBottom: 8,
  },
  descLabel: {
    fontSize: 11, fontWeight: '700', color: NAVY_MID,
    letterSpacing: 0.5, textTransform: 'uppercase',
  },
  descText: {
    fontSize: 14, color: '#555', lineHeight: 22,
  },

  actionsLabel: {
    flexDirection: 'row', alignItems: 'center',
    gap: 5, marginBottom: 12,
  },
  actionsLabelText: {
    fontSize: 11, fontWeight: '700', color: NAVY_MID,
    letterSpacing: 0.5, textTransform: 'uppercase',
  },
  actions: {
    flexDirection: 'row', gap: 12, marginBottom: 14,
  },
  actionTile: {
    alignItems: 'center', gap: 6,
  },
  actionIcon: {
    width: 52, height: 52, borderRadius: 16,
    justifyContent: 'center', alignItems: 'center',
  },
  actionTileLabel: {
    fontSize: 11, fontWeight: '600', color: '#555',
  },
});