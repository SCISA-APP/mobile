import { StyleSheet, Text, View, ScrollView,Alert } from 'react-native';
import React, { useState } from 'react';
import colors from '@/constants/colors';
import Header from '@/components/headers/header';
import CustomButton from '@/components/buttons/CustomButton';
import CustomDropdown from '@/components/inputs/CustomDropdown';
import CustomInput from '@/components/inputs/CustomInput';
import SingleImagePicker from '@/components/buttons/SingleImagePicker';
import MultipleImagePicker from '@/components/buttons/MultipleImagePicker';
import ColorSelector from '@/components/inputs/ColorSelector';
import SizeSelector from '@/components/inputs/SizeSelectorOption';
import { colorPalette } from '@/assets/data/shop/colorPalette';
import { ghanaianSizes } from '@/assets/data/shop/ghanaianSizes';
import { statusOptions } from '@/assets/data/shop/statusOption';
import { useShop } from '@/context/ShopContext';
import { useRouter } from 'expo-router';
import { categories } from '@/assets/data/shop/shopCategoryData';

const AddProduct = () => {
    const { addProduct } = useShop();
    const router = useRouter();
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(categories[0]);
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('0');
  const [stock, setStock] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');

  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [tags, setTags] = useState('');

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors(prev =>
      prev.includes(colorName) ? prev.filter(c => c !== colorName) : [...prev, colorName]
    );
  };

const handleSubmit = async () => {
  try {
    const newProduct = await addProduct({
      name: productName,
      description,
      category,
      price: Number(price),
      discount: Number(discount) || 0,
      stock: Number(stock),
      status,
      front_image: frontImage,
      additional_images: additionalImages,
      sizes: selectedSizes,
      colors: selectedColors,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
    });

    console.log('✅ Product added:', newProduct);

    // ✅ Alert the user
    Alert.alert(
      'Success',
      'Product added successfully. Good luck selling!',
      [
        {
          text: 'OK',
          onPress: () => router.replace("/(standalone)/myShop"),
        },
      ],
      { cancelable: false }
    );

  } catch (err) {
    console.error('❌ Error adding product:', err);
    Alert.alert('Error', 'Failed to add product. Please try again.');
  }
};

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header title="Add Product" />
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <CustomInput 
          placeholder="Product Name" 
          value={productName} 
          onChangeText={setProductName} 
        />
        <CustomInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          style={{ height: 80 }}
        />

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <CustomInput 
              placeholder="Price (₵)" 
              value={price} 
              onChangeText={setPrice} 
              keyboardType="numeric" 
            />
          </View>
          <View style={{ flex: 1 }}>
            <CustomInput
              placeholder="Discount (%)"
              value={discount}
              onChangeText={setDiscount}
              keyboardType="numeric"
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={{ flex: 1, marginRight: 8 }}>
            <CustomInput 
              placeholder="Stock Quantity" 
              value={stock} 
              onChangeText={setStock} 
              keyboardType="numeric" 
            />
          </View>
          <View style={{ flex: 1 }}>
            <CustomDropdown
              placeholder="Category"
              data={categories}
              value={category}
              onValueChange={setCategory}
            />
          </View>
        </View>

        <Text style={styles.label}>Status</Text>
        <CustomDropdown
          placeholder="Select Status"
          data={statusOptions}
          value={status}
          onValueChange={val => setStatus(val as 'active' | 'inactive')}
        />

        <SizeSelector 
          sizes={ghanaianSizes} 
          selectedSizes={selectedSizes} 
          onSelect={toggleSize} 
        />

        <ColorSelector 
          colorsList={colorPalette} 
          selectedColors={selectedColors} 
          onSelect={toggleColor} 
        />

        <Text style={styles.label}>Tags (comma separated)</Text>
        <CustomInput
          placeholder="e.g. summer, sale, trending"
          value={tags}
          onChangeText={setTags}
        />

        <Text style={styles.label}>Front Image</Text>
        <SingleImagePicker
          imageUri={frontImage || undefined}
          onImageSelected={uri => setFrontImage(uri)}
          placeholder="Select Front Image"
        />

        <Text style={styles.label}>Additional Images (max 3)</Text>
        <MultipleImagePicker
          images={additionalImages}
          maxImages={3}
          onImagesSelected={setAdditionalImages}
          placeholder="+ Add Images"
        />

        <View style={{ height: 80 }} />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <CustomButton 
          label="Add Product" 
          onPress={handleSubmit} 
        />
      </View>
    </View>
  );
};

export default AddProduct;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff' 
  },
  headerContainer: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  row: { 
    flexDirection: 'row', 
    marginTop: 12 
  },
  label: { 
    fontSize: 14, 
    fontWeight: '600', 
    marginTop: 16,
    marginBottom: 8,
    color: colors.text.primary,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
});
