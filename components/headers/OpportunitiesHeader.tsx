import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import {
  Linking,
  Modal,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import colors from '@/constants/colors';

const HEADER_COLOR = '#003080';

const SCISA_EMAIL = 'thescisaexecutive@gmail.com';      // ← replace with real email
const SCISA_PHONE = '+233 59 511 6541';           // ← replace with real number
const LISTINGS_COUNT = 14;                         // ← pass as prop or import

interface Props {
  listingsCount: number;
}

export function OpportunitiesHeader({ listingsCount }: Props) {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);

  const handleEmail = () => {
    Linking.openURL(
      `mailto:${SCISA_EMAIL}?subject=Opportunity%20Submission&body=Company%20Name%3A%0ARole%2FPosition%3A%0ALocation%3A%0AContact%20Details%3A%0AAdditional%20Info%3A`
    );
  };

  const handlePhone = () => {
    Linking.openURL(`tel:${SCISA_PHONE.replace(/\s/g, '')}`);
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={HEADER_COLOR} />

      <LinearGradient
        colors={[HEADER_COLOR, '#002259']}
        style={[styles.hero, { paddingTop: insets.top + 14 }]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.heroDecor} />

        <View style={styles.heroRow}>
          <View>
            <Text style={styles.heroTitle}>Opportunities</Text>
            <Text style={styles.heroSub}>
              {listingsCount} listings across all departments
            </Text>
          </View>

          <TouchableOpacity
            style={styles.opportunityBtn}
            onPress={() => setModalVisible(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="bulb-outline" size={15} color="#fff" />
            <Text style={styles.opportunityBtnText}>An opportunity?</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* ── Modal ── */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
        statusBarTranslucent
      >
        <Pressable style={styles.backdrop} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.sheet} onPress={() => {}}>

            {/* Close */}
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setModalVisible(false)}
              hitSlop={12}
            >
              <Ionicons name="close" size={20} color={colors.gray[400]} />
            </TouchableOpacity>

            {/* Icon */}
            <View style={styles.iconWrap}>
              <Ionicons name="briefcase-outline" size={22} color={HEADER_COLOR} />
            </View>

            <Text style={styles.modalTitle}>Share an opportunity</Text>
            <Text style={styles.modalBody}>
              Know of a company, startup, or organisation looking for interns or
              workers? Share it with SCISA so fellow SCISAns can benefit.
            </Text>

            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                Reach out to the SCISA executives with the company name, role,
                contact details, and any other relevant information.
              </Text>
            </View>

            {/* CTA buttons */}
            <TouchableOpacity
              style={styles.emailBtn}
              onPress={handleEmail}
              activeOpacity={0.85}
            >
              <Ionicons name="mail-outline" size={18} color="#fff" />
              <Text style={styles.emailBtnText}>Email SCISA executives</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.phoneBtn}
              onPress={handlePhone}
              activeOpacity={0.85}
            >
              <Ionicons name="call-outline" size={18} color={colors.text.primary} />
              <Text style={styles.phoneBtnText}>Call the SCISA office</Text>
            </TouchableOpacity>

          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  hero: {
    paddingBottom: 30,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  heroDecor: {
    position: 'absolute',
    width: 220, height: 220, borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.06)',
    top: -70, right: -50,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  heroTitle: {
    fontSize: 28, fontWeight: '800', color: '#fff', letterSpacing: -0.4,
  },
  heroSub: {
    fontSize: 13, color: 'rgba(255,255,255,0.6)', marginTop: 3,
  },
  opportunityBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 4,
    flexShrink: 0,
  },
  opportunityBtnText: {
    fontSize: 12, fontWeight: '600', color: '#fff',
  },

  // Modal
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  sheet: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
  },
  closeBtn: {
    position: 'absolute',
    top: 16, right: 16,
    width: 32, height: 32,
    borderRadius: 16,
    backgroundColor: colors.gray[100],
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrap: {
    width: 48, height: 48,
    borderRadius: 12,
    backgroundColor: '#E6F1FB',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18, fontWeight: '700', color: colors.text.primary,
    marginBottom: 8,
  },
  modalBody: {
    fontSize: 14, color: colors.text.secondary,
    lineHeight: 21, marginBottom: 14,
  },
  infoBox: {
    backgroundColor: colors.gray[100],
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
  },
  infoText: {
    fontSize: 13, color: colors.text.secondary, lineHeight: 19,
  },
  emailBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: HEADER_COLOR,
    borderRadius: 12, paddingVertical: 14,
    marginBottom: 10,
  },
  emailBtnText: {
    fontSize: 15, fontWeight: '700', color: '#fff',
  },
  phoneBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, backgroundColor: colors.gray[100],
    borderRadius: 12, paddingVertical: 14,
    borderWidth: 0.5, borderColor: colors.gray[200],
  },
  phoneBtnText: {
    fontSize: 15, fontWeight: '600', color: colors.text.primary,
  },
});