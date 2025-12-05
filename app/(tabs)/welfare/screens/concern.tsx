import { ThemedText } from '@/components/themed-text';
import colors from '@/constants/colors';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '@/components/inputs/CustomInput';
import CustomButton from '@/components/buttons/CustomButton';

const ConcernScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = () => {
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

    Alert.alert('Success', 'Your concern has been submitted.');

    // ✅ Clear all fields after successful submission
    setTitle('');
    setDescription('');
    setCategory('General');
    setIsAnonymous(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title" style={styles.title}>
          Report a Concern
        </ThemedText>

        <ThemedText style={styles.subtitle}>
          Your feedback is valuable to us. Please provide as much detail as possible.
        </ThemedText>

        {/* Title Input */}
        <CustomInput
          placeholder="Title of your concern"
          value={title}
          onChangeText={setTitle}
        />

        {/* Description Input */}
        <CustomInput
          placeholder="Describe your concern in detail"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={5}
          style={{ height: 150 }}
        />

        {/* Category Input */}
        <CustomInput
          label="Category"
          placeholder="General / Academic / Welfare..."
          value={category}
          onChangeText={setCategory}
        />

        {/* Anonymous Toggle */}
        <View style={styles.row}>
          <ThemedText style={styles.label}>Submit Anonymously</ThemedText>
          <Switch
            value={isAnonymous}
            onValueChange={setIsAnonymous}
            trackColor={{ false: '#767577', true: colors.primary }}
            thumbColor={isAnonymous ? colors.primaryLight : '#f4f3f4'}
          />
        </View>

        {/* Submit Button */}
        <CustomButton label="Submit Concern" onPress={handleSubmit} />

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
    paddingBottom: 50,
  },
  title: {
    textAlign: 'center',
    marginBottom: 10,
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
