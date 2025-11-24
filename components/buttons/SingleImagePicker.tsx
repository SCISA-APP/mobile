// components/inputs/SingleImagePicker.tsx
import React, { useState } from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

interface SingleImagePickerProps {
  placeholder?: string;
  imageUri?: string;
  onImageSelected?: (uri: string) => void;
}

const SingleImagePicker: React.FC<SingleImagePickerProps> = ({
  placeholder = 'Select Document',
  imageUri,
  onImageSelected,
}) => {
  const [uri, setUri] = useState(imageUri || '');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
    });

    if (!result.canceled && result.assets?.length) {
      const selectedUri = result.assets[0].uri;
      setUri(selectedUri);
      onImageSelected?.(selectedUri);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={pickImage} activeOpacity={0.7}>
      {uri ? (
        <Image source={{ uri }} style={styles.image} />
      ) : (
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholder}>{placeholder}</Text>
          <Ionicons name="add-circle-outline" size={36} color={colors.primaryDark} />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default SingleImagePicker;

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: colors.primaryDark,
    borderStyle: 'dashed', // dotted/dashed border
    borderRadius: 12,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    marginVertical: 10,
    overflow: 'hidden',
  },
  placeholderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    color: '#555',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 6,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
});
