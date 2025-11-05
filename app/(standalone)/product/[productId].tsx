// app/(standalone)/[productId].tsx

import { exampleProduct } from '@/assets/data/shop/product';
import Rating from '@/components/ratings/Rating';
import IconFontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react'; // 🎯 Added useState and useRef
import {
  Dimensions,
  FlatList, // 🎯 Added FlatList for the carousel
  NativeScrollEvent,
  NativeSyntheticEvent,
  Image as RNImage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width } = Dimensions.get('window');
const IMAGE_WIDTH = width; // Set the image width to the full screen width for snapping

// Mock function to get product by ID
const getProductById = (id: string) => {
    return exampleProduct;
};

// 🎯 Type for a single image item in the carousel
type ImageItem = { uri: string };

// 🎯 Carousel Item Component
const ImageCarouselItem = ({ uri }: ImageItem) => (
    <View style={styles.carouselItem}>
        <RNImage 
            source={{ uri }} 
            style={styles.mainImage} 
            resizeMode="contain"
        />
    </View>
);


export default function ProductDetailScreen() {
    const params = useLocalSearchParams();
    const productId = params.productId as string;
    
    const product = getProductById(productId);
    
    // State for tracking the active slide index
    const [activeIndex, setActiveIndex] = useState(0);
    
    // Array to use for the carousel. Ensure it defaults to an empty array.
    const images: ImageItem[] = (product.images || []).map((uri: string) => ({ uri }));

    // Calculate average rating
    const averageRating =
        product.ratings && product.ratings.length > 0
            ? product.ratings.reduce((sum, r) => sum + r.value, 0) / product.ratings.length
            : 0;

    if (!product) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: Product not found.</Text>
            </View>
        );
    }

    // 🎯 Handler for scroll events to update the active index
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffsetX = event.nativeEvent.contentOffset.x;
        // Calculate the index of the image that is currently centered
        const index = Math.round(contentOffsetX / IMAGE_WIDTH);
        setActiveIndex(index);
    };

    return (
        <View style={styles.fullScreenContainer}>
            <Stack.Screen 
                options={{ 
                    title: 'ShopMate',
                    headerTitleAlign: 'left',
                    headerTintColor: '#333',
                    headerRight: () => (
                        <View style={styles.headerRightContainer}>
                            <IconFontAwesome name="bell-o" size={24} color="#333" style={{ marginRight: 15 }} />
                            <RNImage
                                source={{ uri: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg' }}
                                style={styles.avatar}
                            />
                        </View>
                    ),
                }} 
            />

            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                
                {/* 1. Product Image Carousel Section (UPDATED) */}
                <View style={styles.imageWrapper}>
                    {images.length > 0 ? (
                        <FlatList
                            data={images}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({ item }) => <ImageCarouselItem uri={item.uri} />}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            pagingEnabled // Enables snapping to stop precisely at the end of each screen (or item width)
                            onScroll={handleScroll}
                            scrollEventThrottle={16} // Standard value for smooth scrolling updates
                            style={styles.carousel}
                        />
                    ) : (
                        <View style={styles.noImage}>
                             <Text style={styles.noImageText}>No Image Available</Text>
                        </View>
                    )}

                    {/* Image indicators */}
                    <View style={styles.indicatorContainer}>
                        {images.map((_, i) => (
                            <View 
                                key={i} 
                                // 🎯 Check against the activeIndex state
                                style={[styles.indicatorDot, i === activeIndex && styles.activeDot]} 
                            />
                        ))}
                    </View>
                </View>

                {/* 2. Product Information (No Change) */}
                {/* ... (rest of the screen content remains the same) ... */}
                <View style={styles.content}>
                    <Text style={styles.brandText}>Brand Name</Text>
                    <Text style={styles.name}>{product.title}</Text>
                    
                    <View style={styles.priceRow}>
                        <Text style={styles.currentPrice}>${product.currentPrice.toFixed(2)}</Text>
                        {product.originalPrice && (
                            <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
                        )}
                    </View>

                    <View style={styles.ratingSummary}>
                        <Rating rating={averageRating} size={18} />
                        <Text style={styles.ratingSummaryText}>
                            {averageRating.toFixed(1)} out of 5 stars
                        </Text>
                    </View>

                    <Text style={styles.description}>
                        Experience premium quality with this product. Designed for comfort and superior performance.
                    </Text>
                </View>

                {/* 3. Specifications & Questions (No Change) */}
                <View style={styles.detailsSection}>
                    <TouchableOpacity style={styles.accordionHeader}>
                        <Text style={styles.accordionTitle}>Product Specifications</Text>
                        <IconFontAwesome name="angle-down" size={20} color="#555" />
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.accordionHeader}>
                        <Text style={styles.accordionTitle}>Customer Questions</Text>
                        <IconFontAwesome name="angle-down" size={20} color="#555" />
                    </TouchableOpacity>

                    {/* Customer Reviews Section */}
                    <View style={styles.reviewsHeader}>
                        <Text style={styles.reviewsTitle}>Customer Reviews</Text>
                        <TouchableOpacity style={styles.seeAllReviews}>
                            <Text style={styles.seeAllText}>
                                See All {product.ratings?.length || 0} Reviews
                            </Text>
                            <IconFontAwesome name="angle-right" size={16} color="#0052cc" style={{ marginLeft: 5 }}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.ratingSummary}>
                        <Rating rating={averageRating} size={18} />
                        <Text style={styles.ratingSummaryText}>
                            {averageRating.toFixed(1)} out of 5 stars
                        </Text>
                    </View>

                    {/* Render actual reviews */}
                    {product.ratings?.map((rating) => (
                        <View key={rating.id} style={styles.reviewCard}>
                            <Text style={styles.reviewUser}>{rating.name}</Text>
                            <Rating rating={rating.value} size={14} />
                            <Text style={styles.reviewText}>{rating.rateText}</Text>
                            <Text style={styles.reviewDate}>
                                {new Date(rating.rateDate).toLocaleDateString()}
                            </Text>
                        </View>
                    ))}
                </View>
                
            </ScrollView>

            {/* 4. Fixed Add to Cart Button (No Change) */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.addToCartButton}>
                    <IconFontAwesome name="shopping-cart" size={20} color="#fff" style={{ marginRight: 10 }} />
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
// --- Styles (Updated) ---
const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    headerRightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#eee',
        marginLeft: 5,
    },
    imageWrapper: {
        alignItems: 'center',
        // Removed horizontal padding here so the carousel spans full width
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: '#f5f5f5',
    },
    // 🎯 New Carousel Styles
    carousel: {
        width: IMAGE_WIDTH, // Match the item width for seamless snapping
        height: width * 0.7, // Set the height based on screen width
    },
    carouselItem: {
        width: IMAGE_WIDTH, // Each item must match the width for pagingEnabled to work
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Updated mainImage style to fill the carouselItem
    mainImage: {
        width: width * 0.9, // Use 90% of screen width for the image itself to provide padding
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
    content: {
        paddingHorizontal: 20,
        paddingTop: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingBottom: 20,
    },
    brandText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    priceRow: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 5,
    },
    currentPrice: {
        fontSize: 24,
        fontWeight: '900',
        color: '#111',
        marginRight: 10,
    },
    originalPrice: {
        fontSize: 18,
        color: '#999',
        textDecorationLine: 'line-through',
    },
    description: {
        fontSize: 15,
        lineHeight: 22,
        color: '#555',
        marginTop: 10,
    },
    detailsSection: {
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    accordionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    accordionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    reviewsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    reviewsTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    seeAllReviews: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    seeAllText: {
        color: '#0052cc',
        fontWeight: '500',
        fontSize: 14,
    },
    ratingSummary: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    ratingSummaryText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    reviewCard: {
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        paddingVertical: 15,
    },
    reviewUser: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    reviewText: {
        fontSize: 14,
        color: '#555',
        lineHeight: 20,
        marginTop: 5,
    },
    reviewDate: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 15,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 5,
    },
    addToCartButton: {
        flexDirection: 'row',
        backgroundColor: '#0052cc',
        paddingVertical: 15,
        borderRadius: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addToCartText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
    errorText: {
        textAlign: 'center',
        marginTop: 50,
        fontSize: 18,
        color: 'red',
    },
});