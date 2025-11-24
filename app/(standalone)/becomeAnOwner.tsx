import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { doc, setDoc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from '@/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Step1Welcome from '@/components/stepper/shopOnboard/Step1Welcome';
import Step2Documents from '@/components/stepper/shopOnboard/Step2Documents';
import Step3Success from '@/components/stepper/shopOnboard/Step3Success';
import Step4Wait from '@/components/stepper/shopOnboard/Step4Wait';

interface ShopFormData {
  storeName: string;
  shopDescription: string;
  studentId: string;
  nationalId: string;
  paymentType: string;
  bankName?: string;
  mobileProvider?: string;
  accountNumber: string;
  accountName: string;
}

const BecomeAnOwner = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasApplied, setHasApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<ShopFormData | null>(null);

  useEffect(() => {
    const checkStatus = async () => {
      const status = await AsyncStorage.getItem('@shop_application_status');
      if (status === 'pending') {
        setHasApplied(true);
      }
      setLoading(false);
    };
    checkStatus();
  }, []);

  if (loading) return null;
  if (hasApplied) return <Step4Wait />;

  const handleStep1Next = () => {
    setCurrentStep(2);
  };

  const handleStep2Next = (data: ShopFormData) => {
    setFormData(data);
    setCurrentStep(3);
  };

  // Upload image to Firebase Storage
  const uploadImageToStorage = async (uri: string, path: string): Promise<string> => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      
      const storageRef = ref(storage, path);
      await uploadBytes(storageRef, blob);
      
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleStep3Finish = async () => {
    if (uploading) return;
    
    setUploading(true);
    
    try {
      // Get user from AsyncStorage
      const userDataString = await AsyncStorage.getItem("@student_user");
      
      if (!userDataString) {
        console.log("User not logged in");
        setUploading(false);
        return;
      }

      const userData = JSON.parse(userDataString);
      const uid = userData.uid;

      if (!formData) {
        console.log("Form data missing");
        setUploading(false);
        return;
      }

      // Upload images to Firebase Storage
      const studentIdUrl = await uploadImageToStorage(
        formData.studentId,
        `shop_applications/${uid}/student_id.jpg`
      );

      const nationalIdUrl = await uploadImageToStorage(
        formData.nationalId,
        `shop_applications/${uid}/national_id.jpg`
      );

      // Save application with image URLs to Firestore
      await setDoc(doc(db, "ShopApplications", uid), {
        applicantId: uid,
        appliedAt: new Date().toISOString(),
        status: "pending",
        // Store details
        storeName: formData.storeName,
        shopDescription: formData.shopDescription,
        // Document URLs (now stored in Firebase Storage)
        studentIdUrl: studentIdUrl,
        nationalIdUrl: nationalIdUrl,
        // Payment details
        paymentType: formData.paymentType,
        ...(formData.paymentType === 'Bank' && { bankName: formData.bankName }),
        ...(formData.paymentType === 'Mobile Money' && { mobileProvider: formData.mobileProvider }),
        accountNumber: formData.accountNumber,
        accountName: formData.accountName,
      });

      // Update Student_Users businessStatusAccepted
      await updateDoc(doc(db, "Student_Users", uid), {
        businessStatusAccepted: true,
      });

      // Save local flag
      await AsyncStorage.setItem("@shop_application_status", "pending");

      // Change UI to waiting
      setHasApplied(true);

    } catch (err) {
      console.log("Error saving data: ", err);
      alert("Failed to submit application. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Welcome onNext={handleStep1Next} />;
      case 2:
        return <Step2Documents onNext={handleStep2Next} />;
      case 3:
        return <Step3Success onFinish={handleStep3Finish} />;
      default:
        return <Step1Welcome onNext={handleStep1Next} />;
    }
  };

  // Show loading overlay while uploading
  if (uploading) {
    return (
      <View style={[styles.container, styles.uploadingContainer]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.uploadingText}>Uploading documents...</Text>
      </View>
    );
  }

  return <View style={styles.container}>{renderStep()}</View>;
};

export default BecomeAnOwner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  uploadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
});