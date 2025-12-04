import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

// ✅ Define the shape of StepE's data
interface StepEData {
  declarationAccepted: boolean;
}

// ✅ Define props
interface StepEProps {
  data: StepEData;
  onChange: (field: keyof StepEData, value: boolean) => void;
}

export default function StepE({ data, onChange }: StepEProps) {
  return (
    <View>
      <Text style={{ marginBottom: 10 }}>
        I confirm that all information provided is correct and truthful.
      </Text>

      <TouchableOpacity
        onPress={() =>
          onChange("declarationAccepted", !data.declarationAccepted)
        }
        style={{
          padding: 15,
          backgroundColor: data.declarationAccepted ? "#2a9d8f" : "#ccc",
          borderRadius: 10,
        }}
      >
        <Text style={{ textAlign: "center", color: "#fff" }}>
          {data.declarationAccepted ? "Accepted ✔" : "Tap to Accept"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
