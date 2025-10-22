import colors from "@/constants/colors"
import { Ionicons } from "@expo/vector-icons"
import { Picker } from "@react-native-picker/picker"
import React, { useState } from "react"
import {
    Modal,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native"

const INPUT_HEIGHT = 50
const ICON_SIZE = 20

type DropdownProps = {
  data: string[]
  value: string
  onChange: (itemValue: string) => void
  placeholder?: string
  label?: string
  error?: string
  style?: object
}

const Dropdown: React.FC<DropdownProps> = ({
  data,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  error,
  style,
}) => {
  const [modalVisible, setModalVisible] = useState(false)

  const handleValueChange = (itemValue: string) => {
    onChange(itemValue)
  }

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      {Platform.OS === "ios" ? (
        <>
          <TouchableOpacity
            style={[styles.input, error && styles.inputError]}
            onPress={() => setModalVisible(true)}
          >
            <Text
              style={[
                styles.selectedText,
                !value && styles.placeholderText,
              ]}
              numberOfLines={1}
            >
              {value || placeholder}
            </Text>
            <Ionicons
              name="chevron-down"
              size={ICON_SIZE}
              color={colors.text.secondary}
            />
          </TouchableOpacity>

          <Modal visible={modalVisible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <TouchableOpacity
                  style={styles.doneButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>

                {/* FIX: give picker visible height */}
                <View style={styles.pickerContainer}>
                  <Picker
                    selectedValue={value}
                    onValueChange={handleValueChange}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                  >
                    <Picker.Item
                      label={placeholder}
                      value=""
                      color={colors.text.secondary}
                    />
                    {data.map((item) => (
                      <Picker.Item
                        key={item}
                        label={item}
                        value={item}
                        color={colors.text.primary}
                      />
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <View style={[styles.input, error && styles.inputError]}>
          <Picker
            selectedValue={value}
            onValueChange={handleValueChange}
            style={styles.picker}
            dropdownIconColor={colors.text.secondary}
          >
            <Picker.Item
              label={placeholder}
              value=""
              color={colors.text.secondary}
            />
            {data.map((item) => (
              <Picker.Item
                key={item}
                label={item}
                value={item}
                color={colors.text.primary}
              />
            ))}
          </Picker>
        </View>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  )
}

export default Dropdown

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    // width: '48%',
    flex: 1,
  },
  label: {
    marginBottom: 8,
    fontSize: 14,
    color: colors.text.primary,
  },
  input: {
    height: INPUT_HEIGHT,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.text.secondary,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  inputError: {
    borderColor: "#ff3b30",
  },
  picker: {
    flex: 1,
    height: 200, // ensures visible scroll wheel
  },
  pickerItem: {
    fontSize: 16,
    height: 200,
  },
  pickerContainer: {
    height: 200, // << ensures picker actually appears
    justifyContent: "center",
  },
  selectedText: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
  },
  placeholderText: {
    color: colors.text.secondary,
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 12,
    marginTop: 4,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  doneButton: {
    alignItems: "flex-end",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.text.secondary,
  },
  doneButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "600",
  },
})
