import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image as RNImage,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width;

// 🎯 Type for a single image item in the carousel
type ImageItem = { uri: string };

type ProductImageProps = {
  images: string[];
};

const ProductImage = ({ images = [] }: ProductImageProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Convert string array to { uri } objects
  const formattedImages: ImageItem[] = images.map((uri) => ({ uri }));

  // Handle scroll updates to sync the indicator dots
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / IMAGE_WIDTH);
    setActiveIndex(index);
  };

  // Inner carousel item
  const ImageCarouselItem = ({ uri }: ImageItem) => (
    <View style={styles.carouselItem}>
      <RNImage source={{ uri }} style={styles.mainImage} resizeMode="contain" />
    </View>
  );

  return (
    <View style={styles.imageWrapper}>
      {formattedImages.length > 0 ? (
        <>
          <FlatList
            data={formattedImages}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => <ImageCarouselItem uri={item.uri} />}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={styles.carousel}
          />

          {/* Image indicators */}
          <View style={styles.indicatorContainer}>
            {formattedImages.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.indicatorDot,
                  i === activeIndex && styles.activeDot,
                ]}
              />
            ))}
          </View>
        </>
      ) : (
        <View style={styles.noImage}>
          <Text style={styles.noImageText}>No Image Available</Text>
        </View>
      )}
    </View>
  );
};

export default ProductImage;

const styles = StyleSheet.create({
  imageWrapper: {
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#f5f5f5',
  },
  carousel: {
    width: IMAGE_WIDTH,
    height: width * 0.7,
  },
  carouselItem: {
    width: IMAGE_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainImage: {
    width: width * 0.9,
    height: width * 0.7,
    resizeMode: 'contain',
  },
  indicatorContainer: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 6,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
  activeDot: {
    backgroundColor: '#0052cc',
  },
  noImage: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 15,
  },
  noImageText: {
    color: '#888',
    fontSize: 16,
  },
});
