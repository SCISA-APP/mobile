import colors from "@/constants/colors";
import { supabase } from "@/supabaseConfig";
import { useCachedUser } from "@/utils/authUtils/getCachedUser";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";


import CustomButton from "@/components/buttons/CustomButton";
import StepIntro from "@/components/stepper/BursaryApplication/SepIntro";
import StepA from "@/components/stepper/BursaryApplication/StepA";
import StepB from "@/components/stepper/BursaryApplication/StepB";
import StepC from "@/components/stepper/BursaryApplication/StepC";
import StepD from "@/components/stepper/BursaryApplication/StepD";
import StepE from "@/components/stepper/BursaryApplication/StepE";

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
    // ----------------------------------------------------
    // 1. Validate basic required fields before ANY insert
    // ----------------------------------------------------
    if (!formData.contactNumber || !formData.hostel || !formData.cwa) {
      Alert.alert("Missing Information", "Please complete all required fields.");
      return;
    }

    // ----------------------------------------------------
    // Build bursary payload
    // ----------------------------------------------------
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

    console.log("📤 Payload:", payload);

    // ----------------------------------------------------
    // 2. INSERT NOTIFICATION FIRST
    // ----------------------------------------------------
    const { data: notifData, error: notifError } = await supabase
      .from("notifications")
      .insert({
        user_id: user.id,
        title: "Bursary Application Submitted",
        message:
          "Your application has been submitted successfully to the SCISA bursary desk. You will be notified of any updates.",
        is_read: false,
        for_all: false,
      })
      .select()
      .single();

    if (notifError) {
      console.error("❌ Notification insert error:", notifError);
      Alert.alert("Error", "Failed to create notification. Form not submitted.");
      return; // STOP EVERYTHING
    }

    console.log("🔔 Notification created:", notifData.id);

    // ----------------------------------------------------
    // 3. INSERT BURSARY FORM SECOND
    // ----------------------------------------------------
    const { data, error } = await supabase
      .from("bursary_applications")
      .insert(payload)
      .select()
      .single();

    if (error) {
      console.error("❌ Bursary insert error:", error);

      // ----------------------------------------------------
      // 4. ROLLBACK NOTIFICATION IF BURSARY SAVE FAILED
      // ----------------------------------------------------
      await supabase
        .from("notifications")
        .delete()
        .eq("id", notifData.id);

      console.log("⛔ Rolled back notification");

      Alert.alert("Submission Error", "Failed to submit bursary form.");
      return;
    }

    // ----------------------------------------------------
    // 5. SUCCESS — EVERYTHING COMPLETED
    // ----------------------------------------------------
    console.log("✅ Bursary saved:", data);
    Alert.alert("Success", "Your bursary form has been submitted!");
    router.replace("/(tabs)/welfare");

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
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
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
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },

  progressContainer: {
    height: 4,
    backgroundColor: "#eee",
    borderRadius: 10,
    marginBottom: 16,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.primaryDark,
    borderRadius: 10,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 100,
    paddingTop: 16,
  },
});
