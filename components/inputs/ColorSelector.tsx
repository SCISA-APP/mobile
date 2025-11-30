import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

interface Color {
  name: string;
  hex: string;
}

interface ColorSelectorProps {
  colorsList: Color[];
  selectedColors: string[];
  onSelect: (colorName: string) => void;
}

const ColorSelector: React.FC<ColorSelectorProps> = ({ colorsList, selectedColors, onSelect }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View>
      <TouchableOpacity style={styles.header} onPress={() => setExpanded(!expanded)}>
        <Text style={styles.headerText}>Available Colors</Text>
        <Ionicons 
          name={expanded ? 'chevron-up' : 'chevron-down'} 
          size={20} 
          color={colors.text.primary} 
        />
      </TouchableOpacity>

      {expanded && (
        <View style={styles.colorContainer}>
          {colorsList.map(color => {
            const isSelected = selectedColors.includes(color.name);
            return (
              <TouchableOpacity
                key={color.name}
                style={[styles.colorBox, { backgroundColor: color.hex }, isSelected && styles.colorBoxSelected]}
                onPress={() => onSelect(color.name)}
              >
                {isSelected && (
                  <Ionicons 
                    name="checkmark" 
                    size={20} 
                    color={color.hex === '#FFFFFF' ? '#000' : '#fff'} 
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      )}

      {selectedColors.length > 0 && (
        <Text style={styles.selectedText}>Selected: {selectedColors.join(', ')}</Text>
      )}
    </View>
  );
};

export default ColorSelector;

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
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  colorBox: {
    width: 36,            // smaller box
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: colors.gray[300],
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    marginRight: 8,       // spacing between colors
  },
  colorBoxSelected: {
    borderColor: colors.primary,
    borderWidth: 3,
  },
  selectedText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: colors.text.secondary,
    marginTop: 4,
  },
});

