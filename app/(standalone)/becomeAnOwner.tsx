import Step1Welcome from '@/components/stepper/shopOnboard/Step1Welcome';
import Step2Documents from '@/components/stepper/shopOnboard/Step2Documents';
import Step3Success from '@/components/stepper/shopOnboard/Step3Success';
import Step4Wait from '@/components/stepper/shopOnboard/Step4Wait';
import type { ShopFormData } from '@/types/models/shop/formData';
import { submitShopApplication } from '@/utils/shop/shopApplication';
import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Text, View,Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BecomeAnOwner = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [shopStatus, setShopStatus] = useState<'null' | 'false'>('null'); // null = never applied, false = pending
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ShopFormData | null>(null);
  const [ready, setReady] = useState(false); // wait until AsyncStorage is loaded

  // Load user status from AsyncStorage on mount
useEffect(() => {
  const fetchUserStatus = async () => {
    try {
      let user = null;

      if (Platform.OS !== 'web') {
        const userJson = await AsyncStorage.getItem('@student_user');
        if (userJson) user = JSON.parse(userJson);
      }

      if (user) {
        console.log('🟢 User from storage:', user);
        if (user.isShopApplicationAccepted === false) {
          setShopStatus('false'); // show Step 4 only
        } else {
          setShopStatus('null'); // start from Step 1
        }
      }
    } catch (error) {
      console.error('❌ Error fetching user info:', error);
    } finally {
      setReady(true);
    }
  };

  fetchUserStatus();
}, []);

  const handleStep1Next = () => setCurrentStep(2);
  const handleStep2Next = (data: ShopFormData) => {
    setFormData(data);
    setCurrentStep(3);
  };

  const handleStep3Finish = async () => {
    if (!formData) return;

    setLoading(true);

    const result = await submitShopApplication(formData);

    if (result.success) {
      console.log('✅ Shop application submitted successfully!');
      setShopStatus('false'); // show waiting screen
    } else {
      console.error('❌ Failed to submit shop application:', result.error);
      alert('Failed to submit application: ' + result.error);
    }

    setLoading(false);
  };

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 16 }}>Loading user data...</Text>
      </View>
    );
  }

  // If user has already applied, show Step 4 directly
  if (shopStatus === 'false') return <Step4Wait />;

  if (loading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{ marginTop: 16 }}>Uploading documents...</Text>
      </View>
    );

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

  return <View style={{ flex: 1, backgroundColor: '#fff' }}>{renderStep()}</View>;
};

export default BecomeAnOwner;
