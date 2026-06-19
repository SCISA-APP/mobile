import colors from '@/constants/colors';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/supabaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ProfileAccountActions() {
  const router = useRouter();
  const { clearStudentUser } = useAuth();

  const handleSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign Out', style: 'destructive', onPress: async () => {
          try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            await clearStudentUser();
            router.replace('/(auth)/login');
          } catch {
            Alert.alert('Error', 'Something went wrong.');
          }
        },
      },
    ]);
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'This will permanently delete your account and all associated data. This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete', style: 'destructive', onPress: async () => {
            try {
              const { data: { user } } = await supabase.auth.getUser();
              if (!user) return;

              await supabase.from('profiles').delete().eq('id', user.id);

              // Deleting the auth user requires admin privileges (service role key),
              // which can't be done client-side. Call a server-side function/edge function instead.
              const { error } = await supabase.functions.invoke('delete-account');
              if (error) throw error;

              await supabase.auth.signOut();
              await clearStudentUser();
              router.replace('/(auth)/login');
            } catch {
              Alert.alert('Error', 'Could not delete account. You may need to re-login and try again.');
            }
          },
        },
      ]
    );
  };

  return (
    <View>
      <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut} activeOpacity={0.8}>
        <Ionicons name="log-out-outline" size={20} color={colors.error} />
        <Text style={styles.signOutText}>Sign Out</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteBtn} onPress={handleDeleteAccount} activeOpacity={0.8}>
        <Ionicons name="trash-outline" size={16} color={colors.error} />
        <Text style={styles.deleteText}>Delete Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  signOutBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 8, marginHorizontal: 16, marginTop: 8, paddingVertical: 15,
    borderRadius: 16, backgroundColor: `${colors.error}12`,
    borderWidth: 1, borderColor: `${colors.error}30`,
  },
  signOutText: { fontSize: 15, fontWeight: '600', color: colors.error },

  deleteBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
    gap: 6, marginHorizontal: 16, marginTop: 10, paddingVertical: 12,
    borderRadius: 16, backgroundColor: 'transparent',
  },
  deleteText: { fontSize: 13, fontWeight: '500', color: colors.error, opacity: 0.7 },
});