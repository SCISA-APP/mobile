// Step2Documents.tsx
import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { z } from 'zod';
import CustomInput from '@/components/inputs/CustomInput';
import CustomDropdown from '@/components/inputs/CustomDropdown';
import CustomButton from '@/components/buttons/CustomButton';
import SingleImagePicker from '@/components/buttons/SingleImagePicker';
import { shopSchema } from '@/assets/validation/shopSchema';

interface Step2Props {
  onNext: () => void;
}

const Step2Documents: React.FC<Step2Props> = ({ onNext }) => {
  // Store Details
  const [storeName, setStoreName] = useState('');
  const [shopDescription, setShopDescription] = useState('');

  // Documents
  const [studentId, setStudentId] = useState('');
  const [nationalId, setNationalId] = useState('');

  // Payment
  const [paymentType, setPaymentType] = useState('');
  const [bankName, setBankName] = useState('');
  const [mobileProvider, setMobileProvider] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');

  const handleNext = () => {
    try {
      shopSchema.parse({
        storeName,
        shopDescription,
        studentId,
        nationalId,
        paymentType,
        bankName: paymentType === 'Bank' ? bankName : undefined,
        mobileProvider: paymentType === 'Mobile Money' ? mobileProvider : undefined,
        accountNumber,
        accountName,
      });

      // All validations passed
      onNext();
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Show the first error
        Alert.alert('Validation Error', error.errors[0].message);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Store Details */}
        <Text style={styles.sectionTitle}>Store Details</Text>
        <CustomInput
          placeholder="Store Name"
          value={storeName}
          onChangeText={setStoreName}
        />
        <CustomInput
          placeholder="Shop Description"
          value={shopDescription}
          onChangeText={setShopDescription}
          multiline
          style={{ height: 100, textAlignVertical: 'top' }}
        />

        {/* Documents */}
        <Text style={styles.sectionTitle}>Documents</Text>
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <SingleImagePicker
              placeholder="Student ID"
              imageUri={studentId}
              onImageSelected={setStudentId}
            />
          </View>
          <View style={styles.halfWidth}>
            <SingleImagePicker
              placeholder="National ID"
              imageUri={nationalId}
              onImageSelected={setNationalId}
            />
          </View>
        </View>

        {/* Payment Details */}
        <Text style={styles.sectionTitle}>Payment Details</Text>
        <CustomDropdown
          placeholder="Select Payment Type"
          data={['Bank', 'Mobile Money']}
          value={paymentType}
          onValueChange={setPaymentType}
        />

        {paymentType === 'Bank' && (
          <>
            <CustomDropdown
              placeholder="Select Bank"
              data={['GCB', 'Ecobank', 'Zenith', 'Stanbic', 'Absa', 'Universal']}
              value={bankName}
              onValueChange={setBankName}
            />
            <CustomInput
              placeholder="Account Number"
              value={accountNumber}
              onChangeText={setAccountNumber}
              keyboardType="numeric"
            />
            <CustomInput
              placeholder="Account Name"
              value={accountName}
              onChangeText={setAccountName}
            />
          </>
        )}

        {paymentType === 'Mobile Money' && (
          <>
            <CustomDropdown
              placeholder="Select Provider"
              data={['MTN', 'AirtelTigo', 'Telecel']}
              value={mobileProvider}
              onValueChange={setMobileProvider}
            />
            <CustomInput
              placeholder="Account Number"
              value={accountNumber}
              onChangeText={setAccountNumber}
              keyboardType="numeric"
            />
            <CustomInput
              placeholder="Account Name"
              value={accountName}
              onChangeText={setAccountName}
            />
          </>
        )}

        {/* Bottom Padding */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomButton}>
        <CustomButton label="Next" onPress={handleNext} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default Step2Documents;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
    overflow: 'visible',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
    color: '#111',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    flex: 1,
    marginHorizontal: 5,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
});
