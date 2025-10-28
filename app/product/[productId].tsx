// app/product/[id].tsx

import IconFontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image as RNImage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

// Define the expected types for the parameters passed via router.push()
interface ProductParams {
    id: string;
    name: string; // Renamed to name for clarity based on previous steps
    image: string; // Renamed to image
}

// --- Mock Data Function to Fill the Details ---
// This simulates fetching the static, descriptive data that wasn't passed in the params.
const getMockDetails = (title: string) => {
    return {
        brand: "AudioPhile",
        price: 199.99,
        originalPrice: 249.99,
        rating: 4.5,
        description: "Experience immersive sound quality with the AudioPhile Premium Wireless Headphones. Designed for comfort and superior audio performance, these headphones feature active noise cancellation, long-lasting battery life, and crystal-clear calls.",
        reviewsCount: 3,
    }
}

// --- Rating Component (Recreated for this screen) ---
const Rating = ({ rating }: { rating: number }): React.JSX.Element => {
    const stars: React.JSX.Element[] = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const starSize = 18;
    const starColor = '#ffc107'; // Gold/Yellow

    for (let i = 0; i < 5; i++) {
        let name: 'star' | 'star-half-empty' | 'star-o';
        if (i < fullStars) {
            name = 'star';
        } else if (i === fullStars && hasHalfStar) {
            name = 'star-half-empty';
        } else {
            name = 'star-o';
        }
        stars.push(
            <IconFontAwesome key={`star-${i}`} name={name} size={starSize} color={starColor} style={{ marginRight: 2 }} />
        );
    }
    return <View style={styles.ratingContainer}>{stars}</View>;
};


export default function ProductDetailScreen() {
    // 1. Get the parameters passed via the router
    // Note: We use the names name and image based on the previous step's router code
    const params = useLocalSearchParams() as unknown as ProductParams;
    
    const id = params.id as string;
    const name = params.name as string;
    const image = params.image as string;

    // 2. Load the mock details
    const details = getMockDetails(name);

    if (!id || !name) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error: Product details not found.</Text>
            </View>
        );
    }

    return (
        <View style={styles.fullScreenContainer}>
            {/* Configure the screen header */}
            <Stack.Screen 
                options={{ 
                    // Set the title statically to match the image, or dynamically to the product name
                    title: 'ShopMate', // Matches the header in the screenshot
                    headerTitleAlign: 'left',
                    
                    headerTintColor: '#333',
                    headerRight: () => (
                        <View style={styles.headerRightContainer}>
                            <IconFontAwesome name="bell-o" size={24} color="#333" style={{ marginRight: 15 }} />
                            <RNImage
                                source={{ uri: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg' }} // Mock Avatar
                                style={styles.avatar}
                            />
                        </View>
                    ),
                }} 
            />

            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                
                {/* 1. Product Image Section */}
                <View style={styles.imageWrapper}>
                    {image ? (
                        <RNImage 
                            source={{ uri: image }} 
                            style={styles.mainImage} 
                            resizeMode="contain"
                        />
                    ) : (
                        <View style={styles.noImage}><Text style={styles.noImageText}>No Image</Text></View>
                    )}
                    {/* Image indicators (dots) */}
                    <View style={styles.indicatorContainer}>
                        {[...Array(3)].map((_, i) => (
                            <View key={i} style={[styles.indicatorDot, i === 1 && styles.activeDot]} />
                        ))}
                    </View>
                </View>

                {/* 2. Product Information */}
                <View style={styles.content}>
                    <Text style={styles.brandText}>{details.brand}</Text>
                    <Text style={styles.name}>{name}</Text>
                    
                    <View style={styles.priceRow}>
                        <Text style={styles.currentPrice}>${details.price.toFixed(2)}</Text>
                        <Text style={styles.originalPrice}>${details.originalPrice.toFixed(2)}</Text>
                    </View>

                    <Rating rating={details.rating} />

                    <Text style={styles.description}>{details.description}</Text>
                </View>

                {/* 3. Specifications & Questions (Accordions) */}
                <View style={styles.detailsSection}>
                    {/* Product Specifications */}
                    <TouchableOpacity style={styles.accordionHeader}>
                        <Text style={styles.accordionTitle}>Product Specifications</Text>
                        <IconFontAwesome name="angle-down" size={20} color="#555" />
                    </TouchableOpacity>
                    
                    {/* Customer Questions */}
                    <TouchableOpacity style={styles.accordionHeader}>
                        <Text style={styles.accordionTitle}>Customer Questions</Text>
                        <IconFontAwesome name="angle-down" size={20} color="#555" />
                    </TouchableOpacity>

                    {/* Customer Reviews Section */}
                    <View style={styles.reviewsHeader}>
                        <Text style={styles.reviewsTitle}>Customer Reviews</Text>
                        <TouchableOpacity style={styles.seeAllReviews}>
                            <Text style={styles.seeAllText}>See All {details.reviewsCount} Reviews</Text>
                            <IconFontAwesome name="angle-right" size={16} color="#0052cc" style={{ marginLeft: 5 }}/>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.ratingSummary}>
                        <Rating rating={details.rating} />
                        <Text style={styles.ratingSummaryText}>{details.rating.toFixed(1)} out of 5 stars</Text>
                    </View>

                    {/* Mock Review 1 */}
                    <View style={styles.reviewCard}>
                        <Text style={styles.reviewUser}>Sarah P.</Text>
                        <Rating rating={5} />
                        <Text style={styles.reviewText}>
                            Absolutely love these headphones! The sound quality is phenomenal, and the noise cancellation is a game-changer. Worth every penny!
                        </Text>
                    </View>

                    {/* Mock Review 2 */}
                    <View style={styles.reviewCard}>
                        <Text style={styles.reviewUser}>John D.</Text>
                        <Rating rating={4} />
                        <Text style={styles.reviewText}>
                            Great headphones overall. Comfortable for long listening sessions and good battery life. Minor quibble: touch controls can be a bit sensitive.
                        </Text>
                    </View>
                </View>
                
            </ScrollView>

            {/* 4. Fixed Add to Cart Button */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.addToCartButton}>
                    <IconFontAwesome name="shopping-cart" size={20} color="#fff" style={{ marginRight: 10 }} />
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// --- Styles to Match the Image ---
const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100, // Make space for the fixed footer
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
    // Image Section
    imageWrapper: {
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 20,
        backgroundColor: '#f5f5f5', // Subtle background
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
    // Content
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
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    description: {
        fontSize: 15,
        lineHeight: 22,
        color: '#555',
        marginTop: 10,
    },
    // Detail Sections
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
    // Reviews
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
    // Footer and Button
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