import { ThemedText } from '@/components/themed-text';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import CustomButton from '@/components/buttons/CustomButton';
import CustomInput from '@/components/inputs/CustomInput';
import React, { useState } from 'react';
import { Alert, ScrollView, Switch, View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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

    const concern = {
      id: Math.random().toString(),
      title,
      description,
      category,
      isAnonymous,
      status: 'Submitted',
      date: new Date().toISOString(),
    };

    console.log('New concern submitted:', concern);
    Alert.alert('Success', 'Your concern has been submitted.', [
      { text: 'OK', onPress: () => router.replace('/(tabs)/welfare') },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title" style={styles.title}>Report a Concern</ThemedText>
        <ThemedText style={styles.subtitle}>
          Your feedback is valuable to us. Please provide as much detail as possible.
        </ThemedText>

        {/* Custom Inputs */}
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
          style={{ height: 150, textAlignVertical: 'top' }}
        />

        {/* Category row */}
        <View style={styles.row}>
          <ThemedText style={styles.label}>Category</ThemedText>
          <View style={{ flex: 1, marginLeft: 10 }}>
            <CustomInput
              placeholder="Category"
              value={category}
              onChangeText={setCategory}
            />
          </View>
        </View>

        <View style={styles.row}>
          <ThemedText style={styles.label}>Submit Anonymously</ThemedText>
          <Switch
            value={isAnonymous}
            onValueChange={setIsAnonymous}
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={isAnonymous ? colors.primaryLight : '#f4f3f4'}
          />
        </View>

        <CustomButton
          label="Submit Concern"
          onPress={handleSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConcernScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
    color: colors.gray,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
  },
});
