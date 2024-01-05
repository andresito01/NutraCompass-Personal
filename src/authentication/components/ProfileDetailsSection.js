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
          color={theme.colors.sectionHeaderTextColor}
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
    setSelectedBirthday(birthday);
    setValue({ ...value, birthday });
  };

  const handleSelectHeight = (height) => {
    setSelectedHeight(height);
    setValue({ ...value, height });
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
            color: theme.colors.cardHeaderTextColor,
            textAlign: "center",
          }}
        >
          Profile Details
        </Text>
        <Text
          style={{
            paddingHorizontal: 10,
            fontSize: 16,
            color: theme.colors.cardHeaderTextColor,
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
        onSelect={(date) => setSelectedBirthday(date)}
        visible={isBirthdayModalVisible}
        onClose={() => handleCloseModal("birthday")}
      />
      {/* Height modal */}
      <CustomHeightPickerModal
        title="Select Height"
        selectedHeight={selectedHeight}
        onSelect={(height) => setSelectedHeight(height)}
        visible={isHeightModalVisible}
        onClose={() => handleCloseModal("height")}
      />
      {/* Weight modal */}
      <CustomWeightInputModal
        title="Enter Weight"
        selectedWeight={selectedWeight}
        onSelect={(weight) => setSelectedWeight(weight)}
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
            color: theme.colors.cardHeaderTextColor,
            textAlign: "center",
          }}
        >
          We use this information to calculate and provide you with daily
          personalized recommendations.
        </Text>
        <Button
          mode="contained"
          labelStyle={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
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
