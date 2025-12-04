import { View } from "react-native";
import React from "react";
import CustomDropdown from "@/components/inputs/CustomDropdown";
import CustomInput from "@/components/inputs/CustomInput";

// ✅ Define the shape of StepC's data
interface StepCData {
  sponsor: string;
  sponsorOccupation: string;
  sponsorIncomeRange: string;
  dependents: string; // keep as string to bind with TextInput
}

// ✅ Define props
interface StepCProps {
  data: StepCData;
  onChange: (field: keyof StepCData, value: string) => void;
}

export default function StepC({ data, onChange }: StepCProps) {
  return (
    <View>
      <CustomDropdown
        placeholder="Primary Sponsor"
        data={["Self", "Parent/Guardian", "Other"]}
        value={data.sponsor}
        onValueChange={(val) => onChange("sponsor", val)}
      />

      <CustomInput
        placeholder="Sponsor Occupation"
        value={data.sponsorOccupation}
        onChangeText={(val) => onChange("sponsorOccupation", val)}
      />

      <CustomInput
        placeholder="Annual Income Range"
        value={data.sponsorIncomeRange}
        onChangeText={(val) => onChange("sponsorIncomeRange", val)}
      />

      <CustomInput
        placeholder="Number of Dependents Supported"
        value={data.dependents}
        onChangeText={(val) => onChange("dependents", val)}
        keyboardType="numeric"
      />
    </View>
  );
}
