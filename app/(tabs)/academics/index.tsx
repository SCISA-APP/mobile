import { academicsButtonsData } from '@/assets/data/academics/AcademicButton';
import Header from '@/components/headers/header';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');
const buttonWidth = (width - 60) / 2;

const index: React.FC = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Ensure status bar style matches background */}
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      <Header title="SCISA Academics" />
      
      <View style={styles.gridContainer}>
        {academicsButtonsData.map((btn, index) => (
          <TouchableOpacity
            key={index}
            style={styles.buttonWrapper}
            onPress={() => router.push(btn.route as const)}
            activeOpacity={0.8}
          >
            <ImageBackground 
              source={btn.image} 
              style={styles.image} 
              imageStyle={styles.imageStyle}
            >
              <View style={styles.overlay}>
                <Text style={styles.buttonText}>{btn.title}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 10,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
    paddingTop: 10,
  },
  buttonWrapper: {
    width: buttonWidth,
    height: 160,
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  imageStyle: {
    borderRadius: 16,
  },
  overlay: {
    backgroundColor: 'rgba(0, 40, 85, 0.45)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    padding: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 0.3,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
