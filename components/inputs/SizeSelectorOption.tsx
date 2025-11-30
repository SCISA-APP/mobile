import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

interface SizeSelectorProps {
  sizes: string[];
  selectedSizes: string[];
  onSelect: (size: string) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ sizes, selectedSizes, onSelect }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      <TouchableOpacity style={styles.header} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.headerText}>Available Sizes</Text>
        <Ionicons 
          name={expanded ? 'chevron-up' : 'chevron-down'} 
          size={20} 
          color={colors.text.primary} 
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.optionsContainer}>
          {sizes.map(size => {
            const isSelected = selectedSizes.includes(size);
            return (
              <TouchableOpacity
                key={size}
                style={[styles.option, isSelected && styles.optionSelected]}
                onPress={() => onSelect(size)}
              >
                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                  {size}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {selectedSizes.length > 0 && (
        <Text style={styles.selectedText}>Selected: {selectedSizes.join(', ')}</Text>
      )}
    </View>
  );
};

export default SizeSelector;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[300],
  },
  headerText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    gap: 8,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.gray[300],
    backgroundColor: colors.background,
  },
  optionSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text.primary,
  },
  optionTextSelected: {
    color: '#fff',
  },
  selectedText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: colors.text.secondary,
    marginTop: 4,
  },
});
