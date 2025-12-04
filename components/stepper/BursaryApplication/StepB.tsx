import { View } from "react-native";
import React from "react";
import SingleImagePicker from "@/components/buttons/SingleImagePicker";
import CustomInput from "@/components/inputs/CustomInput";

// ✅ Define the shape of StepB's data
interface StepBData {
  passportPicture: string;
  studentId: string;
  awards: string;
}

// ✅ Props for the component
interface StepBProps {
  data: StepBData;
  onChange: (field: keyof StepBData, value: string) => void;
}

export default function StepB({ data, onChange }: StepBProps) {
  return (
    <View>
      <SingleImagePicker
        placeholder="Passport Picture"
        imageUri={data.passportPicture}
        onImageSelected={(val) => onChange("passportPicture", val)}
      />

      <SingleImagePicker
        placeholder="Student ID"
        imageUri={data.studentId}
        onImageSelected={(val) => onChange("studentId", val)}
      />

      <CustomInput
        placeholder="Academic Awards or Achievements"
        value={data.awards}
        onChangeText={(val) => onChange("awards", val)}
      />
    </View>
  );
}
