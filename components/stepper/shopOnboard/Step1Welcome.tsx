import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomButton from '@/components/buttons/CustomButton';
import Open from "../../../assets/images/Open.gif"
import { Linking } from "react-native";

interface Step1Props {
  onNext: () => void;
}

const Step1Welcome: React.FC<Step1Props> = ({ onNext }) => {
  const handleTermsPress = () => {
    Linking.openURL("https://your-scisa-terms-link.com"); 
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Welcome to SCISA Shop</Text>

      {/* Animated Banner */}
      <View style={styles.imageContainer}>
        <Image source={Open} style={styles.image} resizeMode="contain" />
      </View>

      {/* Text Content */}
      <View>
        <Text style={styles.subtitle}>
          Let’s help you create your student store in a few simple steps.
          You’ll provide:
        </Text>

        <View style={styles.bulletContainer}>
          <Text style={styles.bullet}>• Store Name</Text>
          <Text style={styles.bullet}>• Student Verification Documents</Text>
          <Text style={styles.bullet}>• Shop Description</Text>
          <Text style={styles.bullet}>• Payment Details</Text>
        </View>

        <Text style={styles.disclaimer}>
          By continuing, you agree to the{" "}
          <Text style={styles.link} onPress={handleTermsPress}>
            SCISA Seller Terms & Conditions
          </Text>{" "}
          and confirm that all provided information is accurate.
        </Text>
      </View>

      <CustomButton label="Next" onPress={onNext} />
    </View>
  )
}

export default Step1Welcome

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#fff',
  },

  imageContainer: {
    alignItems: 'center',
    marginTop: 5,
  },

  image: {
    width: 200,
    height: 200,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    color: '#111',
  },

  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    color: '#333',
    marginBottom: 20,
    lineHeight: 24,
  },

  bulletContainer: {
    marginBottom: 20,
    paddingHorizontal: 10, // shifts bullets slightly right but still left aligned
  },

  bullet: {
    fontSize: 16,
    color: '#222',
    marginVertical: 5,
    textAlign: 'left',
  },

  disclaimer: {
    fontSize: 13,
    textAlign: 'left',
    color: '#666',
    lineHeight: 18,
    marginTop: 10,
  },

  link: {
    color: '#0066cc',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
