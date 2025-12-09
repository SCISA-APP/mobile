import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ListRenderItemInfo,
  ViewStyle, TextStyle, ImageStyle ,
  Platform,StatusBar
} from 'react-native';
import SafeGif from '../../assets/images/Safe.gif';
import ShopGif from '../../assets/images/Shop.gif';
import LearnGif from '../../assets/images/Learn.gif';
import CustomButton from '@/components/buttons/CustomButton';
import colors from '../../constants/colors';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Define a type for each slide
interface Slide {
  id: string;
  image: any; // Can refine to ImageSourcePropType if needed
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: '3',
    image: LearnGif,
    title: 'Learn On Your Terms',
    description: 'Courses, learning materials, and resources whenever you need them, anywhere.',
  },
  {
    id: '2',
    image: ShopGif,
    title: 'Shop Smart',
    description: 'Exclusive deals on SCISA gear, student discounts, and campus essentials.',
  },
  {
    id: '1',
    image: SafeGif,
    title: 'Stay Safe as a SCISAN',
    description: 'Real-time alerts and resources to keep you secure on campus and beyond.',
  },
];

const WelcomeScreen = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const flatListRef = useRef<FlatList<Slide>>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
      setCurrentIndex(prev => prev + 1);
    } else {
      router.push('/(auth)/login');
    }
  };

  const handleSkip = () => {
    router.push('/(auth)/login');
  };

  const renderItem = ({ item }: ListRenderItemInfo<Slide>) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Skip */}
      <View style={styles.header}>
        <View />
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        scrollEventThrottle={16}
        onMomentumScrollEnd={ev => {
          const index = Math.round(ev.nativeEvent.contentOffset.x / width);
          setCurrentIndex(index);
        }}
      />

      {/* Button */}
      <View style={styles.buttonContainer}>
        <CustomButton
          label={currentIndex === slides.length - 1 ? 'Get Started' : 'Next'}
          onPress={handleNext}
        />
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

type Styles = {
  container: ViewStyle;
  header: ViewStyle;
  skipText: TextStyle;
  slide: ViewStyle;
  image: ImageStyle;
  title: TextStyle;
  description: TextStyle;
  buttonContainer: ViewStyle;
};

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 16,
  paddingVertical: 8,
  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 8,
},
  skipText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  slide: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  image: {
    width: '80%',
    height: 220,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.black,
    textAlign: 'center',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: colors.black,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 16,
  },
  buttonContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
});
