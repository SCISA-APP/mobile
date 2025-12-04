import { View } from "react-native";
import React from "react";
import CustomInput from "@/components/inputs/CustomInput";
import CustomDropdown from "@/components/inputs/CustomDropdown";

// ✅ Define the shape of the data
interface StepAData {
  contactNumber: string;
  hostel: string;
  cwa: string;
  hasScholarship: string; // "Yes" or "No"
}

// ✅ Define props for the component
interface StepAProps {
  data: StepAData;
  onChange: (field: keyof StepAData, value: string) => void;
}

export default function StepA({ data, onChange }: StepAProps) {
  return (
    <View>
      <CustomInput
        placeholder="Contact Number"
        value={data.contactNumber}
        onChangeText={(val) => onChange("contactNumber", val)}
      />

      <CustomInput
        placeholder="Hall/Hostel of Residence"
        value={data.hostel}
        onChangeText={(val) => onChange("hostel", val)}
      />

      <CustomInput
        placeholder="Current CWA"
        value={data.cwa}
        onChangeText={(val) => onChange("cwa", val)}
        keyboardType="numeric"
      />

      <CustomDropdown
        placeholder="Do you currently benefit from any scholarship?"
        data={["Yes", "No"]}
        value={data.hasScholarship}
        onValueChange={(val) => onChange("hasScholarship", val)}
      />
    </View>
  );
}
