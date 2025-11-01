import IconFontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
// 🎯 Import the Slider component
import Slider from '@react-native-community/slider';

// --- Reusable Components for Filters (No Change) ---
// ... FilterCheckbox, SizeChip, ColorCircle components remain the same ...

interface CheckboxProps {
    label: string;
    checked: boolean;
    onPress: () => void;
}

const FilterCheckbox: React.FC<CheckboxProps> = ({ label, checked, onPress }) => (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
        <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
            {checked && <IconFontAwesome name="check" size={12} color="#fff" />}
        </View>
        <Text style={styles.checkboxLabel}>{label}</Text>
    </TouchableOpacity>
);

interface ChipProps {
    label: string;
    selected: boolean;
    onPress: () => void;
}

const SizeChip: React.FC<ChipProps> = ({ label, selected, onPress }) => (
    <TouchableOpacity 
        style={[styles.sizeChip, selected ? styles.sizeChipSelected : styles.sizeChipDefault]} 
        onPress={onPress}
    >
        <Text style={[styles.sizeChipText, selected && styles.sizeChipTextSelected]}>
            {label}
        </Text>
    </TouchableOpacity>
);

interface ColorCircleProps {
    color: string;
    selected: boolean;
    onPress: () => void;
}

const ColorCircle: React.FC<ColorCircleProps> = ({ color, selected, onPress }) => (
    <TouchableOpacity style={styles.colorCircleWrapper} onPress={onPress}>
        <View style={[styles.colorCircle, { backgroundColor: color }]}>
            {selected && (
                <View style={styles.colorCircleCheck}>
                    <IconFontAwesome name="check" size={10} color="#fff" />
                </View>
            )}
        </View>
    </TouchableOpacity>
);


// --- Main Screen Component (Modified State and Render Logic) ---

export default function FiltersScreen() {
    // State to manage selected filters (Simplified for demonstration)
    const [selectedBrands, setSelectedBrands] = useState<string[]>(['Nike']);
    
    // 🎯 Use a single state variable for the slider's max value
    const INITIAL_MIN_PRICE = 50;
    const MAX_PRICE_LIMIT = 300; // Define a hard limit for the slider
    const [currentMaxPrice, setCurrentMaxPrice] = useState<number>(200);
    
    const [selectedSize, setSelectedSize] = useState<string>('M');
    const [selectedColor, setSelectedColor] = useState<string>('blue');

    const toggleBrand = (brand: string) => {
        setSelectedBrands(prev => 
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    const handleReset = () => {
        setSelectedBrands([]);
        // 🎯 Reset the slider value
        setCurrentMaxPrice(MAX_PRICE_LIMIT);
        setSelectedSize('');
        setSelectedColor('');
    };

    const handleApply = () => {
        console.log('Filters Applied:', { 
            selectedBrands, 
            priceRange: { min: INITIAL_MIN_PRICE, max: currentMaxPrice }, // Log the range
            selectedSize, 
            selectedColor 
        });
        // router.back(); 
    };

    // 🎯 Dynamically calculate display values
    const priceMinDisplay = `$${INITIAL_MIN_PRICE}`;
    const priceMaxDisplay = `$${currentMaxPrice}`;

    return (
        <View style={styles.fullScreenContainer}>
            <Stack.Screen
                options={{
                    title: 'Filters', 
                    headerBackVisible: true,
                    headerTitleAlign: 'center', 
                    headerTintColor: '#333',
                }}
            />

            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                
                {/* Brand Filter Section (No Change) */}
                <View style={styles.filterSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Brand</Text>
                        <IconFontAwesome name="angle-down" size={20} color="#555" />
                    </View>
                    <View style={styles.brandContainer}>
                        {['Nike', 'Adidas', 'Puma', 'Reebok', 'Under Armour', 'Zara', 'H&M'].map(brand => (
                            <FilterCheckbox
                                key={brand}
                                label={brand}
                                checked={selectedBrands.includes(brand)}
                                onPress={() => toggleBrand(brand)}
                            />
                        ))}
                    </View>
                </View>
                
                {/* 🎯 Price Filter Section (Updated with Slider) */}
                <View style={styles.filterSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Price</Text>
                        <IconFontAwesome name="angle-down" size={20} color="#555" />
                    </View>
                    
                    {/* Display the live, dynamic price values */}
                    <View style={styles.priceRangeRow}>
                        <Text style={styles.priceRangeText}>{priceMinDisplay}</Text>
                        <Text style={styles.priceRangeText}>{priceMaxDisplay}</Text>
                    </View>
                    
                    {/* 🎯 Functional Price Slider */}
                    <View style={styles.sliderContainer}>
                        <Slider
                            style={styles.slider}
                            minimumValue={INITIAL_MIN_PRICE}
                            maximumValue={MAX_PRICE_LIMIT}
                            step={10} // Optional: control granularity
                            value={currentMaxPrice}
                            onValueChange={value => setCurrentMaxPrice(value)}
                            minimumTrackTintColor="#0052cc"
                            maximumTrackTintColor="#e0e0e0"
                            thumbTintColor={Platform.OS === 'ios' ? undefined : '#0052cc'} // Android needs explicit color
                        />
                    </View>
                    
                    {/* The mock slider tracks/thumbs are now redundant but kept in styles for reference */}
                </View>

                {/* Size Filter Section (No Change) */}
                <View style={styles.filterSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Size</Text>
                        <IconFontAwesome name="angle-down" size={20} color="#555" />
                    </View>
                    <View style={styles.sizeChipRow}>
                        {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                            <SizeChip
                                key={size}
                                label={size}
                                selected={selectedSize === size}
                                onPress={() => setSelectedSize(size)}
                            />
                        ))}
                    </View>
                </View>

                {/* Color Filter Section (No Change) */}
                <View style={[styles.filterSection, { borderBottomWidth: 0 }]}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Color</Text>
                        <IconFontAwesome name="angle-down" size={20} color="#555" />
                    </View>
                    <View style={styles.colorCircleRow}>
                        <ColorCircle color="red" selected={selectedColor === 'red'} onPress={() => setSelectedColor('red')} />
                        <ColorCircle color="blue" selected={selectedColor === 'blue'} onPress={() => setSelectedColor('blue')} />
                        <ColorCircle color="green" selected={selectedColor === 'green'} onPress={() => setSelectedColor('green')} />
                        <ColorCircle color="black" selected={selectedColor === 'black'} onPress={() => setSelectedColor('black')} />
                        <ColorCircle color="white" selected={selectedColor === 'white'} onPress={() => setSelectedColor('white')} />
                        <ColorCircle color="gray" selected={selectedColor === 'gray'} onPress={() => setSelectedColor('gray')} />
                    </View>
                </View>

            </ScrollView>
            
            {/* Fixed Footer Buttons (No Change) */}
            <View style={styles.footer}>
                <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                    <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                    <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

// --- Styles (Cleanup and Minor Addition) ---

const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 80, // Space for the fixed footer
    },
    filterSection: {
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    // ... (Brand Checkbox styles) ...
    brandContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%',
        paddingVertical: 8,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderRadius: 4,
        borderWidth: 1.5,
        borderColor: '#ccc',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    checkboxChecked: {
        backgroundColor: '#0052cc',
        borderColor: '#0052cc',
    },
    checkboxLabel: {
        fontSize: 15,
        color: '#333',
    },
    // Price Slider Styles (Updated)
    priceRangeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    priceRangeText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    sliderContainer: {
        marginHorizontal: 10,
        // The mock slider track styles are no longer necessary for function but can be left for comparison
    },
    slider: {
        width: '100%',
        height: 40,
        marginBottom: 20,
    },
    // The original mock styles are removed or simplified as they are no longer necessary for function
    mockSliderTrack: {
        // Keeping a placeholder, but this block isn't rendered anymore
    },
    mockSliderFill: {}, 
    mockSliderThumb: {},

    // ... (Size Chip styles) ...
    sizeChipRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 10,
    },
    sizeChip: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    sizeChipDefault: {
        backgroundColor: '#f5f5f5',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    sizeChipSelected: {
        backgroundColor: '#0052cc',
        borderWidth: 1,
        borderColor: '#0052cc',
    },
    sizeChipText: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    sizeChipTextSelected: {
        color: '#fff',
    },
    // ... (Color Circle styles) ...
    colorCircleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        paddingVertical: 10,
        marginBottom: 10,
    },
    colorCircleWrapper: {
        padding: 2, // For the selection ring
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'transparent',
    },
    colorCircle: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0', // Light border for white/light colors
    },
    colorCircleCheck: {
        width: 18,
        height: 18,
        borderRadius: 9,
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Dark overlay for visibility
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Footer Buttons
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    resetButton: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 15,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#0052cc',
        marginRight: 10,
        alignItems: 'center',
    },
    resetButtonText: {
        color: '#0052cc',
        fontSize: 16,
        fontWeight: '700',
    },
    applyButton: {
        flex: 1.5,
        backgroundColor: '#0052cc',
        paddingVertical: 15,
        borderRadius: 10,
        marginLeft: 10,
        alignItems: 'center',
    },
    applyButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '700',
    },
});