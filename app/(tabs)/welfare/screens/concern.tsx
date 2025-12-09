import { ThemedText } from '@/components/themed-text';
import colors from '@/constants/colors';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Switch, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '@/components/inputs/CustomInput';
import CustomButton from '@/components/buttons/CustomButton';
import { supabase } from '@/supabaseConfig';
import { useRouter } from 'expo-router';

const ConcernScreen = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = async () => {
    if (!title || !description) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    try {
      const user = supabase.auth.getUser; // fetch current user
      const { data: { user: currentUser } } = await supabase.auth.getUser();

      if (!currentUser) {
        Alert.alert('Error', 'You must be logged in to submit a concern.');
        return;
      }

      const { error } = await supabase.from('helpdesk').insert([
        {
          user_id: currentUser.id,
          title,
          description,
          category,
          is_anonymous: isAnonymous,
        },
      ]);

      if (error) throw error;

      Alert.alert('Success', 'Your concern has been submitted.');

      // Clear fields
      setTitle('');
      setDescription('');
      setCategory('');
      setIsAnonymous(false);
      router.replace('/(tabs)/welfare');

    } catch (err) {
      console.error('❌ Error submitting concern:', err);
      Alert.alert('Error', 'Failed to submit concern. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText style={styles.subtitle}>
          Your feedback is valuable to us. Please provide as much detail as possible.
        </ThemedText>

        <CustomInput
          placeholder="Title of your concern"
          value={title}
          onChangeText={setTitle}
        />

        <CustomInput
          placeholder="Describe your concern in detail"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={5}
          style={{ height: 150 }}
        />

        <CustomInput
          placeholder="General / Academic / Welfare..."
          value={category}
          onChangeText={setCategory}
        />

        <View style={styles.row}>
          <ThemedText style={styles.label}>Submit Anonymously</ThemedText>
          <Switch
            value={isAnonymous}
            onValueChange={setIsAnonymous}
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={isAnonymous ? colors.primaryLight : '#f4f3f4'}
          />
        </View>

        <CustomButton label="Submit Concern" onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConcernScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    paddingBottom: 50,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 25,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
  label: {
    fontSize: 16,
  },
});
