import React, { useState, useEffect } from "react";
import { Modal, View, ScrollView } from "react-native";
import { Card, Button } from "react-native-paper";
import * as Haptics from "expo-haptics";
import { Picker } from "@react-native-picker/picker";
import { useThemeContext } from "../../context/ThemeContext.js";

const CustomSexPickerModal = ({ title, visible, onClose, onSelect }) => {
  const { theme } = useThemeContext();
  const [selectedValue, setSelectedValue] = useState(null);
  const defaultValue = "Male"; // Set your default value here

  useEffect(() => {
    setSelectedValue(defaultValue);
  }, [defaultValue]);

  const handleSave = () => {
    if (selectedValue !== null) {
      onSelect(selectedValue);
      onClose();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const isSaveDisabled = selectedValue === null;

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
            <ScrollView>
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}
              >
                <Picker.Item
                  color={theme.colors.cardHeaderTextColor}
                  label="Male"
                  value="Male"
                />
                <Picker.Item
                  color={theme.colors.cardHeaderTextColor}
                  label="Female"
                  value="Female"
                />
                <Picker.Item
                  color={theme.colors.cardHeaderTextColor}
                  label="Pregnant"
                  value="Pregnant"
                />
                <Picker.Item
                  color={theme.colors.cardHeaderTextColor}
                  label="Breastfeeding"
                  value="Breastfeeding"
                />
              </Picker>
            </ScrollView>
          </Card.Content>
          <Card.Actions>
            <Button onPress={onClose}>CANCEL</Button>
            <Button onPress={handleSave} disabled={isSaveDisabled}>
              SAVE
            </Button>
          </Card.Actions>
        </Card>
      </View>
    </Modal>
  );
};

export default CustomSexPickerModal;
