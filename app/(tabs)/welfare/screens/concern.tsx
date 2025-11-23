import { ThemedText } from '@/components/themed-text';
import colors from '@/constants/colors';
import { useRouter } from 'expo-router';
import React,
{
  useState
} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ConcernScreen = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleSubmit = () => {
    if (!title || !description) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }
    // In a real app, you would send this data to a server
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
      { text: 'OK', onPress: () => router.push('/(tabs)/welfare/screens/concerns') },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText type="title" style={styles.title}>Report a Concern</ThemedText>
        <ThemedText style={styles.subtitle}>
          Your feedback is valuable to us. Please provide as much detail as possible.
        </ThemedText>

        <TextInput
          style={styles.input}
          placeholder="Title of your concern"
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe your concern in detail"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <View style={styles.row}>
          <ThemedText style={styles.label}>Category</ThemedText>
          {/* In a real app, you might use a more sophisticated picker */}
          <TextInput
            style={styles.picker}
            value={category}
            onChangeText={setCategory}
          />
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

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Concern</Text>
        </TouchableOpacity>
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
  input: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 150,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
  },
  picker: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    width: '50%',
  },
  button: {
    backgroundColor: colors.primary,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});