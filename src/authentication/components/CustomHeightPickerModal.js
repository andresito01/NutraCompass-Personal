import React, { useState } from "react";
import { Modal, View } from "react-native";
import { Card, Button } from "react-native-paper";
import * as Haptics from "expo-haptics";
import { Picker } from "@react-native-picker/picker";
import { useThemeContext } from "../../context/ThemeContext.js";

const CustomHeightPickerModal = ({
  title,
  selectedHeight,
  onSelect,
  visible,
  onClose,
}) => {
  const { theme } = useThemeContext();
  const [selectedUnit, setSelectedUnit] = useState("in");
  const [selectedFeet, setSelectedFeet] = useState("5");
  const [selectedInches, setSelectedInches] = useState("11");
  const [selectedCentimeters, setSelectedCentimeters] = useState("30");

  const handleSave = () => {
    const height =
      selectedUnit === "cm"
        ? `${selectedCentimeters}.00 ${selectedUnit}`
        : `${selectedFeet}'${selectedInches}"`;

    onSelect(height);
    onClose();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const renderFeetPicker = () => {
    return Array.from({ length: 12 }, (_, i) => i + 1).map((value) => (
      <Picker.Item
        key={value}
        label={value.toString()}
        value={value.toString()}
        color={theme.colors.cardHeaderTextColor}
      />
    ));
  };

  const renderInchesPicker = () => {
    return Array.from({ length: 12 }, (_, i) => i).map((value) => (
      <Picker.Item
        key={value}
        label={value.toString()}
        value={value.toString()}
        color={theme.colors.cardHeaderTextColor}
      />
    ));
  };

  const renderCentimetersPicker = () => {
    return Array.from({ length: 366 }, (_, i) => i + 30).map((value) => (
      <Picker.Item
        key={value}
        label={value.toString()}
        value={value.toString()}
        color={theme.colors.cardHeaderTextColor}
      />
    ));
  };

  // Adjust the height of the picker (you can modify this value)
  const heightPickerStyle = { flex: 1 / 3 };

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
        }}
      >
        <Card
          style={{
            width: "80%",
            borderRadius: 14,
          }}
        >
          <Card.Title title={title} />
          <Card.Content>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginHorizontal: 10,
              }}
            >
              {/* Picker for selecting value based on unit (left side) */}
              {selectedUnit === "in" ? (
                <Picker
                  selectedValue={selectedFeet}
                  onValueChange={(itemValue) => setSelectedFeet(itemValue)}
                  style={heightPickerStyle}
                >
                  {renderFeetPicker()}
                </Picker>
              ) : (
                <Picker
                  selectedValue={selectedCentimeters}
                  onValueChange={(itemValue) =>
                    setSelectedCentimeters(itemValue)
                  }
                  style={heightPickerStyle}
                >
                  {renderCentimetersPicker()}
                </Picker>
              )}

              {/* Picker for inches (right side) */}
              {selectedUnit === "in" && (
                <Picker
                  selectedValue={selectedInches}
                  onValueChange={(itemValue) => setSelectedInches(itemValue)}
                  style={heightPickerStyle}
                >
                  {renderInchesPicker()}
                </Picker>
              )}

              {/* Picker for selecting unit (right side) */}
              <Picker
                selectedValue={selectedUnit}
                onValueChange={(itemValue) => setSelectedUnit(itemValue)}
                style={heightPickerStyle}
              >
                <Picker.Item
                  label="cm"
                  value="cm"
                  color={theme.colors.cardHeaderTextColor}
                />
                <Picker.Item
                  label="in"
                  value="in"
                  color={theme.colors.cardHeaderTextColor}
                />
              </Picker>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button onPress={onClose}>CANCEL</Button>
            <Button onPress={handleSave}>SAVE</Button>
          </Card.Actions>
        </Card>
      </View>
    </Modal>
  );
};

export default CustomHeightPickerModal;
