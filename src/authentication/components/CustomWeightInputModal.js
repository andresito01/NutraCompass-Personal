import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Card, Button } from "react-native-paper";
import * as Haptics from "expo-haptics";
import { useThemeContext } from "../../context/ThemeContext.js";

const CustomWeightInputModal = ({
  title,
  selectedWeight,
  onSelect,
  visible,
  onClose,
}) => {
  const { theme } = useThemeContext();
  const [selectedUnit, setSelectedUnit] = useState("lbs");
  const [inputValue, setInputValue] = useState("150");

  const handleSave = () => {
    const weight = `${inputValue} ${selectedUnit}`;
    onSelect(weight);
    onClose();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  // Function to convert weight between kg and lbs
  const convertWeight = (value, fromUnit, toUnit) => {
    if (fromUnit === "kg" && toUnit === "lbs") {
      return (parseFloat(value) * 2.20462).toFixed(1);
    } else if (fromUnit === "lbs" && toUnit === "kg") {
      return (parseFloat(value) / 2.20462).toFixed(1);
    }
    return value;
  };

  // Handle button click and convert weight
  const handleUnitButtonClick = (unit) => {
    // Convert the input value to the new unit
    const convertedValue = convertWeight(inputValue, selectedUnit, unit);

    // Update the selected unit and input value
    setSelectedUnit(unit);
    setInputValue(convertedValue);
  };

  return (
    <Modal transparent={true} visible={visible} animationType="slide">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View
                  style={{
                    alignSelf: "center",
                    width: "60%",
                    gap: 20,
                    margin: 30,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    {/* Button for selecting "kg" */}
                    <Button
                      mode={selectedUnit === "kg" ? "contained" : "outlined"}
                      onPress={() => handleUnitButtonClick("kg")}
                      style={{
                        flex: 1,
                        color: theme.colors.cardHeaderTextColor,
                        borderTopLeftRadius: 8,
                        borderBottomLeftRadius: 8,
                        borderTopRightRadius: 0,
                        borderBottomRightRadius: 0,
                        borderColor: theme.colors.primary,
                      }}
                    >
                      kg
                    </Button>

                    {/* Button for selecting "lbs" */}
                    <Button
                      mode={selectedUnit === "lbs" ? "contained" : "outlined"}
                      onPress={() => handleUnitButtonClick("lbs")}
                      style={{
                        flex: 1,
                        color: theme.colors.cardHeaderTextColor,
                        borderTopLeftRadius: 0,
                        borderBottomLeftRadius: 0,
                        borderTopRightRadius: 8,
                        borderBottomRightRadius: 8,
                        borderColor: theme.colors.primary,
                      }}
                    >
                      lbs
                    </Button>
                  </View>

                  {/* Numeric text input */}
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TextInput
                      style={{
                        height: 40,
                        width: "80%",
                        borderColor: "gray",
                        borderWidth: 1,
                        borderRadius: 8,
                        textAlign: "center",
                        color: theme.colors.cardHeaderTextColor,
                      }}
                      keyboardType="numeric"
                      value={inputValue}
                      onChangeText={(text) => setInputValue(text)}
                    />

                    {/* Display the selected unit next to the input value */}
                    <Text
                      style={{
                        marginLeft: 10,
                        color: theme.colors.cardHeaderTextColor,
                      }}
                    >
                      {selectedUnit}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </Card.Content>
            <Card.Actions>
              <Button onPress={onClose}>CANCEL</Button>
              <Button
                onPress={handleSave}
                disabled={!inputValue || isNaN(inputValue)}
              >
                SAVE
              </Button>
            </Card.Actions>
          </Card>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomWeightInputModal;
