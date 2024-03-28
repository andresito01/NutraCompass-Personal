import React, { useState } from "react";
import { TouchableWithoutFeedback, Text, View } from "react-native";
import { Button, Card } from "react-native-paper";
import * as Haptics from "expo-haptics";
import Feather from "react-native-vector-icons/Feather";
import signupScreenStyles from "../../screens/styles/signupScreenStyles.js";
import { useThemeContext } from "../../context/ThemeContext.js";
import CustomSexPickerModal from "./CustomSexPickerModal.js";
import CustomDatePickerModal from "./CustomDatePickerModal.js";
import CustomHeightPickerModal from "./CustomHeightPickerModal.js";
import CustomWeightInputModal from "./CustomWeightInputModal.js";
const SelectInput = ({ onPress, selectedValue, placeholder }) => {
  const { theme } = useThemeContext();
  const styles = signupScreenStyles();

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.selectInput}>
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Feather
            name="arrow-right"
            color={
              selectedValue ? theme.colors.primary : "rgba(169, 169, 169, 0.7)"
            }
            size={18}
          />
          <Text
            style={{
              fontSize: 18, // Adjust as needed
              color: selectedValue
                ? theme.colors.primary
                : "rgba(169, 169, 169, 0.7)",
            }}
          >
            {" "}
            {selectedValue ? selectedValue : placeholder}
          </Text>
        </View>

        <Feather
          name="arrow-right"
          color={theme.colors.primaryTextColor}
          size={18}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default function ProfileDetailsSection({ value, setValue, onNext }) {
  const styles = signupScreenStyles();
  const { theme } = useThemeContext();

  const [isSexModalVisible, setSexModalVisible] = useState(false);
  const [isBirthdayModalVisible, setBirthdayModalVisible] = useState(false);
  const [isHeightModalVisible, setHeightModalVisible] = useState(false);
  const [isWeightModalVisible, setWeightModalVisible] = useState(false);

  const [selectedSex, setSelectedSex] = useState("");
  const [selectedBirthday, setSelectedBirthday] = useState(null);
  const [selectedHeight, setSelectedHeight] = useState("");
  const [selectedWeight, setSelectedWeight] = useState("");

  const handleOpenModal = (field) => {
    switch (field) {
      case "sex":
        setSexModalVisible(true);
        break;
      case "birthday":
        setBirthdayModalVisible(true);
        break;
      case "height":
        setHeightModalVisible(true);
        break;
      case "weight":
        setWeightModalVisible(true);
        break;
      default:
        break;
    }
  };

  const handleSelectSex = (sex) => {
    setSelectedSex(sex);
    setValue({ ...value, sex });
  };

  const handleSelectBirthday = (birthday) => {
    const formattedDate = birthday.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Calculate age based on the selected date
    const age = calculateAge(birthday);

    setSelectedBirthday(formattedDate);
    setValue({ ...value, birthday: formattedDate, age: age });
  };

  // Helper method to calculate the user's age
  const calculateAge = (selectedDate) => {
    // Calculate age based on the selected date
    const currentDate = new Date();
    const birthDate = new Date(selectedDate);
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleSelectHeight = (height) => {
    setSelectedHeight(height);

    // Process the height object
    let feet = 0;
    let inches = 0;
    let centimeters = 0;
    let heightInInches = 0;

    // Check if the height is in feet and inches format (e.g., "5'10\"")
    const feetAndInchesRegex = /^(\d+)'(\d+)\"$/;
    const feetAndInchesMatch = height.match(feetAndInchesRegex);
    if (feetAndInchesMatch) {
      feet = parseInt(feetAndInchesMatch[1]);
      inches = parseInt(feetAndInchesMatch[2]);
      heightInInches = feet * 12 + inches;

      setValue({
        ...value,
        height: {
          inches: parseFloat(heightInInches),
          centimeters: parseFloat(heightInInches * 2.54).toFixed(2),
        },
      });
    }

    // Check if the height is in centimeters format (e.g., "180.00 cm")
    const centimetersRegex = /^(\d+(?:\.\d+)?)\s+cm$/;
    const centimetersMatch = height.match(centimetersRegex);
    if (centimetersMatch) {
      centimeters = parseInt(centimetersMatch[1]);

      setValue({
        ...value,
        height: {
          inches: parseFloat(centimeters / 2.54).toFixed(2),
          centimeters: parseFloat(centimeters),
        },
      });
    }
  };

  const handleSelectWeight = (weight) => {
    setSelectedWeight(weight);
    setValue({ ...value, weight });
  };

  const handleCloseModal = (field) => {
    switch (field) {
      case "sex":
        setSexModalVisible(false);
        break;
      case "birthday":
        setBirthdayModalVisible(false);
        break;
      case "height":
        setHeightModalVisible(false);
        break;
      case "weight":
        setWeightModalVisible(false);
        break;
      default:
        break;
    }
  };

  const handleNext = () => {
    if (selectedSex && selectedBirthday && selectedHeight && selectedWeight) {
      // Add validation logic for this section
      // Call onNext only if validation passes
      onNext();
    } else {
      // Optionally, show an alert or perform some action to inform the user
      console.log("Please fill out all profile details.");
    }
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <View
        style={{
          alignItems: "center",
          paddingTop: 10,
          gap: 5,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: "black",
            textAlign: "center",
          }}
        >
          Profile Details
        </Text>
        <Text
          style={{
            paddingHorizontal: 10,
            fontSize: 16,
            color: "black",
            textAlign: "center",
          }}
        >
          Enter your details so NutraCompass can customize your targets.
        </Text>
        <Card
          style={{
            width: "100%",
            marginTop: 10,
            borderWidth: 1,
            borderColor:
              selectedSex &&
              selectedBirthday &&
              selectedHeight &&
              selectedWeight
                ? theme.colors.primary
                : theme.colors.cardBorderColor,
          }}
        >
          <Card.Content>
            <View style={{ justifyContent: "center", width: "100%", gap: 10 }}>
              <SelectInput
                onPress={() => handleOpenModal("sex")}
                selectedValue={selectedSex}
                placeholder="Your sex"
              />
              <SelectInput
                onPress={() => handleOpenModal("birthday")}
                selectedValue={selectedBirthday ? selectedBirthday : ""}
                placeholder="Your birthday"
              />

              <SelectInput
                onPress={() => handleOpenModal("height")}
                selectedValue={selectedHeight}
                placeholder="Your height"
              />
              <SelectInput
                onPress={() => handleOpenModal("weight")}
                selectedValue={selectedWeight}
                placeholder="Your weight"
              />
            </View>
          </Card.Content>
        </Card>
      </View>
      {/* Sex modal */}
      <CustomSexPickerModal
        title="Select Sex"
        visible={isSexModalVisible}
        onClose={() => handleCloseModal("sex")}
        onSelect={handleSelectSex}
      />
      {/* Birthday modal */}
      <CustomDatePickerModal
        title="Select Birthday"
        selectedDate={selectedBirthday}
        onSelect={handleSelectBirthday}
        visible={isBirthdayModalVisible}
        onClose={() => handleCloseModal("birthday")}
      />
      {/* Height modal */}
      <CustomHeightPickerModal
        title="Select Height"
        selectedHeight={selectedHeight}
        onSelect={handleSelectHeight}
        visible={isHeightModalVisible}
        onClose={() => handleCloseModal("height")}
      />
      {/* Weight modal */}
      <CustomWeightInputModal
        title="Enter Weight"
        selectedWeight={selectedWeight}
        onSelect={handleSelectWeight}
        visible={isWeightModalVisible}
        onClose={() => handleCloseModal("weight")}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 20,
          gap: 20,
        }}
      >
        <Text
          style={{
            fontSize: 14,
            color: "white",
            textAlign: "center",
          }}
        >
          We use this information to calculate and provide you with daily
          personalized recommendations.
        </Text>
        <Button
          mode="contained"
          labelStyle={{
            color: "black",
            fontSize: 18,
            fontWeight: "bold",
          }}
          style={{
            backgroundColor: !(
              selectedSex &&
              selectedBirthday &&
              selectedHeight &&
              selectedWeight
            )
              ? "gray"
              : "white",
            borderRadius: 8,
            width: "60%",
          }}
          disabled={
            !(
              selectedSex &&
              selectedBirthday &&
              selectedHeight &&
              selectedWeight
            )
          }
          onPress={handleNext}
        >
          Next
        </Button>
      </View>
    </View>
  );
}
