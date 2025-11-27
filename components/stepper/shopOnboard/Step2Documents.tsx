import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import CustomInput from '@/components/inputs/CustomInput';
import CustomDropdown from '@/components/inputs/CustomDropdown';
import CustomButton from '@/components/buttons/CustomButton';
import SingleImagePicker from '@/components/buttons/SingleImagePicker';
import { shopSchema } from '@/assets/validation/shopSchema';

interface Step2Props {
  onNext: (data: any) => void;
}

const Step2Documents: React.FC<Step2Props> = ({ onNext }) => {
  // Store Details
  const [storeName, setStoreName] = useState('');
  const [shopDescription, setShopDescription] = useState('');

  // Documents (store URIs)
  const [studentIdUri, setStudentIdUri] = useState('');
  const [nationalIdUri, setNationalIdUri] = useState('');

  // Payment
  const [paymentType, setPaymentType] = useState('');
  const [bankName, setBankName] = useState('');
  const [mobileProvider, setMobileProvider] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');

  const handleNext = () => {
    console.log("Next button pressed");

    const formData = {
      storeName,
      shopDescription,
      studentIdUri,
      nationalIdUri,
      paymentType,
      bankName: paymentType === 'Bank' ? bankName : undefined,
      mobileProvider: paymentType === 'Mobile Money' ? mobileProvider : undefined,
      accountNumber,
      accountName,
    };


    // Zod validation
    const result = shopSchema.safeParse(formData);

    if (!result.success) {
      console.error("Validation errors:", result.error.errors);
      alert(result.error.errors[0].message);
      return;
    }

    console.log("✅ Validation passed");
    onNext(formData);
  };

  const renderContent = () => {
    return (
      <View style={styles.contentContainer}>
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
              imageUri={studentIdUri}
              onImageSelected={setStudentIdUri}
            />
          </View>
          <View style={styles.halfWidth}>
            <SingleImagePicker
              placeholder="National ID"
              imageUri={nationalIdUri}
              onImageSelected={setNationalIdUri}
            />
          </View>
        </View>

        {/* Payment Details */}
        <Text style={styles.sectionTitle}>Payment Details</Text>
        <View style={{ zIndex: 3000 }}>
          <CustomDropdown
            placeholder="Select Payment Type"
            data={['Bank', 'Mobile Money']}
            value={paymentType}
            onValueChange={setPaymentType}
          />
        </View>

        {paymentType === 'Bank' && (
          <>
            <View style={{ zIndex: 2000 }}>
              <CustomDropdown
                placeholder="Select Bank"
                data={['GCB', 'Ecobank', 'Zenith', 'Stanbic', 'Absa', 'Universal']}
                value={bankName}
                onValueChange={setBankName}
              />
            </View>
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
            <View style={{ zIndex: 2000 }}>
              <CustomDropdown
                placeholder="Select Provider"
                data={['MTN', 'AirtelTigo', 'Telecel']}
                value={mobileProvider}
                onValueChange={setMobileProvider}
              />
            </View>
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

        <View style={{ height: 100 }} />
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <FlatList
        data={[{ key: 'content' }]}
        renderItem={renderContent}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      />

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
  },
  contentContainer: {
    overflow: 'visible',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 10,
    marginBottom: 10,
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