import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Step1Welcome from '@/components/stepper/shopOnboard/Step1Welcome';
import Step2Documents from '@/components/stepper/shopOnboard/Step2Documents';
import Step3Success from '@/components/stepper/shopOnboard/Step3Success';
import Step4Wait from '@/components/stepper/shopOnboard/Step4Wait';

import AsyncStorage from '@react-native-async-storage/async-storage';

const BecomeAnOwner = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasApplied, setHasApplied] = useState(false);

  // Check if user already applied
  useEffect(() => {
    const checkStatus = async () => {
      const status = await AsyncStorage.getItem('@shop_application_status');
      if (status === 'pending') {
        setHasApplied(false);
      }
    };
    checkStatus();
  }, []);

  // If user already applied → show waiting screen
  if (hasApplied) {
    return <Step4Wait />;
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Step 3 finished → mark as applied
      AsyncStorage.setItem('@shop_application_status', 'pending');
      setHasApplied(true);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1Welcome onNext={nextStep} />;

      case 2:
        return <Step2Documents onNext={nextStep} />;

      case 3:
        return <Step3Success onFinish={nextStep} />;

      default:
        return <Step1Welcome onNext={nextStep} />;
    }
  };

  return <View style={styles.container}>{renderStep()}</View>;
};

export default BecomeAnOwner;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
