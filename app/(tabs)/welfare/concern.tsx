import Header from '@/components/headers/header';
import { ThemedText } from '@/components/themed-text';
import colors from '@/constants/colors';
import React, { useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomInput from '@/components/inputs/CustomInput';
import { Ionicons } from '@expo/vector-icons';

const CATEGORIES = [
  'Academic',
  'Bullying & Harassment',
  'Facilities & Safety',
  'Staff Conduct',
  'Mental Health & Wellbeing',
  'Discrimination',
  'Exam & Assessment',
  'Other',
];

const ConcernScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('General');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const handleSubmit = () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert('Missing Fields', 'Please fill in both the title and description.');
      return;
    }
    Alert.alert(
      'Report Submitted',
      'Your report has been received. We will follow up and do our best to ensure the matter is addressed.',
      [{ text: 'Got it' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Report a Concern" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Banner */}
        <View style={styles.banner}>
          <View style={styles.bannerIcon}>
            <Ionicons name="shield-checkmark-outline" size={22} color={colors.primary} />
          </View>
          <Text style={styles.bannerText}>
            Your feedback is confidential and valued. Provide as much detail as possible.
          </Text>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          {/* Title field */}
          <View style={styles.fieldGroup}>
            <CustomInput
              placeholder="Brief summary of your concern"
              icon="alert-circle-outline"
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* Description field */}

            <CustomInput
              placeholder="Describe your concern in detail..."
              icon="document-text-outline"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={6}
            />


          {/* Category picker */}
          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Category</Text>
            <TouchableOpacity
              style={styles.categoryButton}
              onPress={() => setCategoryOpen(!categoryOpen)}
              activeOpacity={0.7}
            >
              <Text style={styles.categoryButtonText}>{category}</Text>
              <Ionicons
                name={categoryOpen ? 'chevron-up' : 'chevron-down'}
                size={16}
                color={colors.gray[500]}
              />
            </TouchableOpacity>

            {categoryOpen && (
              <View style={styles.categoryDropdown}>
                {CATEGORIES.map((cat, index) => (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryOption,
                      index < CATEGORIES.length - 1 && styles.categoryOptionBorder,
                      cat === category && styles.categoryOptionSelected,
                    ]}
                    onPress={() => {
                      setCategory(cat);
                      setCategoryOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.categoryOptionText,
                        cat === category && styles.categoryOptionTextSelected,
                      ]}
                    >
                      {cat}
                    </Text>
                    {cat === category && (
                      <Ionicons name="checkmark" size={16} color={colors.primary} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Anonymous toggle */}
          <View style={styles.toggleRow}>
            <View style={styles.toggleInfo}>
              <Text style={styles.toggleLabel}>Submit Anonymously</Text>
              <Text style={styles.toggleSub}>Your identity will not be shared</Text>
            </View>
            <Switch
              value={isAnonymous}
              onValueChange={setIsAnonymous}
              trackColor={{ false: colors.gray[200], true: colors.primary }}
              thumbColor="#ffffff"
            />
          </View>
        </View>

        {/* Submit button */}
        <TouchableOpacity
          style={[styles.submitButton, (!title || !description) && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          activeOpacity={0.85}
        >
          <Ionicons name="paper-plane-outline" size={18} color="#fff" style={styles.submitIcon} />
          <Text style={styles.submitText}>Submit Concern</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConcernScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },

  // Banner
  banner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.primaryLight + '22',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.primaryLight + '55',
    padding: 14,
    marginBottom: 20,
    gap: 12,
  },
  bannerIcon: {
    marginTop: 1,
  },
  bannerText: {
    flex: 1,
    fontSize: 13.5,
    lineHeight: 20,
    color: colors.gray[700] ?? '#444',
  },

  // Card
  card: {
    backgroundColor: '#ffffff',
    borderColor: colors.gray[200] ?? '#E5E5E5',
    marginBottom: 20,
  },

  // Field group
  fieldGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.gray[600] ?? '#555',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Category
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.gray[50] ?? '#F7F7F8',
    borderWidth: 1,
    borderColor: colors.gray[200] ?? '#E5E5E5',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  categoryButtonText: {
    fontSize: 15,
    color: colors.gray[800] ?? '#222',
  },
  categoryDropdown: {
    marginTop: 6,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.gray[200] ?? '#E5E5E5',
    overflow: 'hidden',
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  categoryOptionBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100] ?? '#F0F0F0',
  },
  categoryOptionSelected: {
    backgroundColor: colors.primaryLight + '15',
  },
  categoryOptionText: {
    fontSize: 15,
    color: colors.gray[700] ?? '#333',
  },
  categoryOptionTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },

  // Divider
  divider: {
    height: 1,
    backgroundColor: colors.gray[100] ?? '#F0F0F0',
    marginBottom: 20,
  },

  // Toggle
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleInfo: {
    flex: 1,
    marginRight: 16,
  },
  toggleLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.gray[800] ?? '#222',
    marginBottom: 2,
  },
  toggleSub: {
    fontSize: 12.5,
    color: colors.gray[500] ?? '#888',
  },

  // Submit
  submitButton: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitIcon: {
    marginRight: 2,
  },
  submitText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },

  // Footnote
  footnote: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 12.5,
    color: colors.gray[400] ?? '#AAA',
  },
});