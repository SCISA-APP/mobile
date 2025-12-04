import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/constants/colors";
import { useCachedUser } from "@/utils/authUtils/getCachedUser";
import { supabase } from "@/supabaseConfig";
import { useRouter } from "expo-router";


import StepIntro from "@/components/stepper/BursaryApplication/SepIntro";
import StepA from "@/components/stepper/BursaryApplication/StepA";
import StepB from "@/components/stepper/BursaryApplication/StepB";
import StepC from "@/components/stepper/BursaryApplication/StepC";
import StepD from "@/components/stepper/BursaryApplication/StepD";
import StepE from "@/components/stepper/BursaryApplication/StepE";
import CustomButton from "@/components/buttons/CustomButton";

import { validateStep } from "@/assets/validation/bursaryValidation";

const TOTAL_STEPS = 6; // Intro + A + B + C + D + E

export default function BursaryScreen() {
  const router = useRouter();
  const user = useCachedUser();
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    contactNumber: "",
    hostel: "",
    cwa: "",
    hasScholarship: "",
    passportPicture: "",
    studentId: "",
    awards: "",
    scholarshipExplanation: "",
    sponsor: "",
    sponsorOccupation: "",
    sponsorIncomeRange: "",
    dependents: "",
    reason: "",
    declarationAccepted: false,
  });

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

const handleSubmit = async () => {
  if (!user) {
    Alert.alert("Error", "No logged-in user found.");
    return;
  }

  try {
    const payload = {
      user_id: user.id,
      contactnumber: formData.contactNumber,
      hostel: formData.hostel,
      cwa: formData.cwa,
      hasscholarship: formData.hasScholarship,
      passportpicture: formData.passportPicture,
      studentid: formData.studentId,
      awards: formData.awards,
      scholarshipexplanation: formData.scholarshipExplanation,
      sponsor: formData.sponsor,
      sponsoroccupation: formData.sponsorOccupation,
      sponsorincomerange: formData.sponsorIncomeRange,
      dependents: formData.dependents,
      reason: formData.reason,
      declarationaccepted: formData.declarationAccepted,
      created_at: new Date().toISOString(),
    };

    console.log("📤 Submitting bursary:", payload);

    const { data, error } = await supabase
      .from("bursary_applications")
      .insert(payload)
      .select();

    if (error) {
      console.error("❌ Supabase insert error:", error);
      if (error.code === "23505") {
        Alert.alert(
          "Duplicate Application",
          "You have already submitted a bursary application."
        );
      } else {
        Alert.alert("Submission Error", error.message);
      }
      return;
    }

    Alert.alert("Success", "Your bursary form has been submitted!");
    console.log("✅ Saved:", data);

    router.replace("/(tabs)/welfare/bursary");
  } catch (err) {
    console.error("❌ Unexpected error:", err);
    Alert.alert("Error", "Something went wrong.");
  }
};


  // ---------------------------------------------------------
  // STEP HANDLERS
  // ---------------------------------------------------------
  const nextStep = () => {
    if (currentStep > 1) {
      const validationStep = currentStep - 1;
      const { success, errors } = validateStep(validationStep, formData);

      if (!success) {
        const formatted = Object.values(errors)
          .map((msg) => `• ${msg}`)
          .join("\n");

        Alert.alert("Validation Error", formatted);
        return;
      }
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <StepIntro data={formData} onChange={updateField} />;
      case 2:
        return <StepA data={formData} onChange={updateField} />;
      case 3:
        return <StepB data={formData} onChange={updateField} />;
      case 4:
        return <StepC data={formData} onChange={updateField} />;
      case 5:
        return <StepD data={formData} onChange={updateField} />;
      case 6:
        return <StepE data={formData} onChange={updateField} />;
      default:
        return null;
    }
  };

  // ---------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------
  return (
    <View style={styles.container}>
      
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View
          style={[
            styles.progressBar,
            { width: `${(currentStep / TOTAL_STEPS) * 100}%` },
          ]}
        />
      </View>

      {/* Form Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {renderStep()}
      </ScrollView>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        {currentStep > 1 && (
          <CustomButton
            label="Back"
            onPress={prevStep}
            leftIcon={
              <Ionicons
                name="arrow-back"
                size={20}
                color={colors.primaryDark}
              />
            }
            backgroundColor="#fff"
            style={{ flex: 1 }}
          />
        )}

        {currentStep > 1 && <View style={{ width: 12 }} />}

        <CustomButton
          label={currentStep === TOTAL_STEPS ? "Submit" : "Next"}
          onPress={currentStep === TOTAL_STEPS ? handleSubmit : nextStep}
          rightIcon={
            <Ionicons
              name={currentStep === TOTAL_STEPS ? "checkmark" : "arrow-forward"}
              size={20}
              color="#fff"
            />
          }
          backgroundColor={colors.primaryDark}
          style={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },

  progressContainer: {
    height: 6,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginBottom: 20,
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.primaryDark,
    borderRadius: 10,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 80,
  },
});
