// components/inputs/MultipleImagePicker.tsx
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, Text, StyleSheet, View, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import colors from '@/constants/colors';
import { Ionicons } from '@expo/vector-icons';

interface MultipleImagePickerProps {
  placeholder?: string;
  images?: string[];
  maxImages?: number;
  onImagesSelected?: (uris: string[]) => void;
}

const MultipleImagePicker: React.FC<MultipleImagePickerProps> = ({
  placeholder = 'Select Images',
  images = [],
  maxImages = 5,
  onImagesSelected,
}) => {
  const [selectedImages, setSelectedImages] = useState<string[]>(images);

  useEffect(() => {
    if (images.length) setSelectedImages(images);
  }, [images]);

  const pickImages = async () => {
    const remaining = maxImages - selectedImages.length;
    if (remaining <= 0) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: remaining,
    });

    if (!result.canceled && result.assets?.length) {
      const newUris = result.assets.map(asset => asset.uri);
      const allImages = [...selectedImages, ...newUris].slice(0, maxImages);
      setSelectedImages(allImages);
      onImagesSelected?.(allImages);
    }
  };

  const removeImage = (index: number) => {
    const updated = [...selectedImages];
    updated.splice(index, 1);
    setSelectedImages(updated);
    onImagesSelected?.(updated);
  };

  // Add an empty slot if images are less than maxImages
  const displaySlots = [...selectedImages];
  if (selectedImages.length < maxImages) displaySlots.push(''); 

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 8 }}>
      {displaySlots.map((uri, idx) => {
        if (uri) {
          // existing image
          return (
            <View key={idx} style={styles.imageWrapper}>
              <Image source={{ uri }} style={styles.image} />
              <TouchableOpacity style={styles.removeBtn} onPress={() => removeImage(idx)}>
                <Ionicons name="close-circle" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          );
        } else {
          // empty slot
          return (
            <TouchableOpacity key={idx} style={styles.addContainer} onPress={pickImages} activeOpacity={0.7}>
              <Ionicons name="add-circle-outline" size={36} color={colors.primaryDark} />
              <Text style={styles.addText}>{placeholder}</Text>
            </TouchableOpacity>
          );
        }
      })}
    </ScrollView>
  );
};

export default MultipleImagePicker;

const styles = StyleSheet.create({
  imageWrapper: {
    position: 'relative',
    marginRight: 8,
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
  },
  removeBtn: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
  },
  addContainer: {
    width: 100,
    height: 100,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.primaryDark,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  addText: {
    fontSize: 12,
    color: '#555',
    textAlign: 'center',
    marginTop: 4,
  },
});
