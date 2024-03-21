import React, { useState } from "react";
import { Modal, View } from "react-native";
import { Card, Button } from "react-native-paper";
import * as Haptics from "expo-haptics";
import DateTimePicker from "@react-native-community/datetimepicker";

const CustomDatePickerModal = ({
  title,
  selectedDate,
  onSelect,
  visible,
  onClose,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [temporaryDate, setTemporaryDate] = useState(
    selectedDate || new Date()
  );

  const handleDateChange = (event, selectedDate) => {
    setTemporaryDate(selectedDate);
  };

  const handleSave = () => {
    if (temporaryDate instanceof Date && !isNaN(temporaryDate)) {
      onSelect(temporaryDate);
      onClose();
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else {
      console.error("Invalid or undefined date selected.");
      // Handle the error or provide a default action.
    }
  };

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
            {showDatePicker && (
              <DateTimePicker
                textColor="white"
                value={temporaryDate}
                mode="date"
                display="spinner"
                onChange={handleDateChange}
              />
            )}
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

export default CustomDatePickerModal;
