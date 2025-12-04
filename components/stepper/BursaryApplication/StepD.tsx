import { View, Text } from "react-native";
import React from "react";
import CustomInput from "@/components/inputs/CustomInput";

// ✅ Define the shape of StepD's data
interface StepDData {
  reason: string;
}

// ✅ Define props
interface StepDProps {
  data: StepDData;
  onChange: (field: keyof StepDData, value: string) => void;
}

export default function StepD({ data, onChange }: StepDProps) {
  const maxLength = 250;

  return (
    <View style={{ gap: 8 }}>
      <Text style={{ fontSize: 14, fontWeight: "600", marginBottom: 4 }}>
        Reason for Financial Assistance
      </Text>

      <CustomInput
        placeholder="Explain briefly why you require financial assistance"
        value={data.reason}
        onChangeText={(val) => onChange("reason", val)}
        multiline
        autoGrow          // ✅ enables height expansion
        numberOfLines={6} // optional (initial height)
        maxLength={maxLength}
       style={{ height: 400 }}
      />

      <Text style={{ fontSize: 12, color: "#888", alignSelf: "flex-end" }}>
        {data.reason?.length || 0}/{maxLength}
      </Text>
    </View>
  );
}
