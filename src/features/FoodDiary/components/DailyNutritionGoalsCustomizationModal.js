import React, { useEffect, useState, Suspense } from "react";
import {
  View,
  Text,
  TextInput,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button, Title, Card, Snackbar } from "react-native-paper";
import * as Haptics from "expo-haptics";
import Modal from "react-native-modal";
import dailyNutritionGoalsCustomizationModalStyles from "./styles/dailyNutritionGoalsCustomizationModalStyles.js";
import Feather from "react-native-vector-icons/Feather";
import { useUserSettings } from "../../UserSettings/context/UserSettingsContext.js";
import { useThemeContext } from "../../../context/ThemeContext.js";
import MacroSettingsModal from "./MacroSettingsModal.js";
//const MacroSettingsModal = React.lazy(() => import("./MacroSettingsModal.js"));

console.log("Daily Nutrition Goals Customization Modal Rendered.");

const DailyNutritionGoalsCustomizationModal = ({ isVisible, closeModal }) => {
  const styles = dailyNutritionGoalsCustomizationModalStyles();
  const { theme } = useThemeContext();

  const {
    getNutritionalGoals,
    setNutritionalGoals,
    calculateProteinDailyGrams,
    calculateCarbDailyGrams,
    calculateFatDailyGrams,
  } = useUserSettings();
  const { calorieGoal, macroGoals } = getNutritionalGoals();

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const [calories, setCalories] = useState(calorieGoal);
  const [protein, setProtein] = useState(
    Math.round(macroGoals.protein.dailyPercentage * 100)
  );
  const [carb, setCarb] = useState(
    Math.round(macroGoals.carb.dailyPercentage * 100)
  );
  const [fat, setFat] = useState(
    Math.round(macroGoals.fat.dailyPercentage * 100)
  );
  const [isMacroSettingsModalVisible, setIsMacroSettingsModalVisible] =
    useState(false);

  const [activeField, setActiveField] = useState(null);
  const [tempChanges, setTempChanges] = useState({});

  const toggleMacroSettingsModal = () => {
    setIsMacroSettingsModalVisible(!isMacroSettingsModalVisible);
  };

  const handleInputUpdate = () => {
    // Convert tempChanges values to numbers
    const numericCalories =
      tempChanges?.calories !== undefined
        ? parseFloat(tempChanges.calories)
        : calories;

    const numericProtein =
      tempChanges?.protein !== undefined
        ? parseFloat(tempChanges.protein)
        : protein; // Use the original state value if not changed

    const numericCarb =
      tempChanges?.carb !== undefined ? parseFloat(tempChanges.carb) : carb;

    const numericFat =
      tempChanges?.fat !== undefined ? parseFloat(tempChanges.fat) : fat;

    // Check if the sum of percentages is equal to 100%
    const isSum100Percent = numericProtein + numericCarb + numericFat === 100;

    // Update the state values only if they have changed
    if (tempChanges.calories !== undefined) {
      setCalories(numericCalories);
      // Update the calorieGoal in the context
      // Example: setNutritionalGoals({ calorieGoal: numericCalories, ...otherFields });
    }

    if (tempChanges.protein !== undefined) {
      setProtein(numericProtein);
    }

    if (tempChanges.carb !== undefined) {
      setCarb(numericCarb);
    }

    if (tempChanges.fat !== undefined) {
      setFat(numericFat);
    }

    // Reset tempChanges and hide the modal
    setTempChanges({});
    Keyboard.dismiss();
    setActiveField(null);
  };

  const handleInputChange = (field, text) => {
    setTempChanges({
      ...tempChanges,
      [field]: text,
    });
  };

  // Calculate total daily grams for each macro based on percentage
  const proteinDailyGrams = calculateProteinDailyGrams(calories, protein);
  const carbDailyGrams = calculateCarbDailyGrams(calories, carb);
  const fatDailyGrams = calculateFatDailyGrams(calories, fat);

  // This function is triggered by a save button within the modal.
  // It updates the global state based on the current local state values.
  const handleSaveNutritionalGoals = () => {
    try {
      setNutritionalGoals({
        calorieGoal: calories,
        proteinPercentage: protein,
        carbPercentage: carb,
        fatPercentage: fat,
      });
      console.log("Updating nutritional goals");
      setSnackbarMessage("Nutritional goals updated successfully!");
      setSnackbarVisible(true); // Show the Snackbar
    } catch (error) {
      console.log("Error updating nutritional goals.", error);
      setSnackbarMessage("Failed to update nutritional goals.");
      setSnackbarVisible(true); // Show the Snackbar
    }
  };

  useEffect(() => {
    // This useEffect is responsible for updating local state when the global state changes.
    const { calorieGoal, macroGoals } = getNutritionalGoals();

    setCalories(calorieGoal);
    setProtein(Math.round(macroGoals.protein.dailyPercentage * 100));
    setCarb(Math.round(macroGoals.carb.dailyPercentage * 100));
    setFat(Math.round(macroGoals.fat.dailyPercentage * 100));
  }, [getNutritionalGoals]);

  return (
    <Modal
      isVisible={isVisible}
      style={{ flex: 1, height: "100%", width: "100%", margin: 0 }}
      avoidKeyboard={true}
      // onSwipeComplete={!activeField ? closeModal : null}
      // swipeDirection={!activeField ? "down" : null}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <KeyboardAvoidingView
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: theme.colors.screenBackground,
          alignItems: "center",
        }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              // Reset tempChanges
              setTempChanges({});
              // Reset the local states to match the global state to discard unsaved changes
              setCalories(calorieGoal);
              setProtein(Math.round(macroGoals.protein.dailyPercentage * 100));
              setCarb(Math.round(macroGoals.carb.dailyPercentage * 100));
              setFat(Math.round(macroGoals.fat.dailyPercentage * 100));
              closeModal();
            }}
            disabled={activeField ? true : false}
          >
            <Feather
              name="chevron-left"
              color={theme.colors.primaryTextColor}
              size={38}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              handleSaveNutritionalGoals();
            }}
          >
            <Feather
              name="check-circle"
              color={theme.colors.primary}
              size={28}
            />
          </TouchableOpacity>
        </View>

        <Card style={styles.formContainer}>
          <Card.Content>
            <Title
              style={{
                marginTop: 20,
                marginBottom: 16,
                fontSize: 18,
                alignSelf: "center",
              }}
            >
              Customize Daily Nutrition Goals
            </Title>

            <View style={styles.inputRow}>
              <Text style={styles.label}>Calories</Text>
              <TextInput
                value={
                  tempChanges.calories !== undefined
                    ? tempChanges.calories
                    : calories.toString()
                }
                keyboardType="numeric"
                style={styles.input}
                onFocus={() => setActiveField("calories")}
                onChangeText={(text) => handleInputChange("calories", text)}
              />
            </View>

            <View style={styles.inputRow}>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "space-between",
                  paddingRight: 30,
                }}
              >
                <Text style={styles.label}>Protein</Text>
                <Text style={{ color: "gray" }}>{proteinDailyGrams} g</Text>
              </View>
              <TextInput
                value={`${protein.toString()}%`}
                inputMode="none"
                style={styles.input}
                onFocus={() => {
                  setActiveField("protein");
                  toggleMacroSettingsModal();
                }}
                onChangeText={(text) => {
                  // Extract numeric value by removing '%' symbol
                  const numericValue = text.replace("%", "");
                  handleInputChange("protein", numericValue);
                }}
                caretHidden={true}
              />
            </View>

            <View style={styles.inputRow}>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "space-between",
                  paddingRight: 30,
                }}
              >
                <Text style={styles.label}>Carbs</Text>
                <Text style={{ color: "gray" }}>{carbDailyGrams} g</Text>
              </View>
              <TextInput
                value={`${carb.toString()}%`}
                inputMode="none"
                style={styles.input}
                onFocus={() => {
                  setActiveField("carb");
                  toggleMacroSettingsModal();
                }}
                onChangeText={(text) => {
                  // Extract numeric value by removing '%' symbol
                  const numericValue = text.replace("%", "");
                  handleInputChange("carb", numericValue);
                }}
                caretHidden={true}
              />
            </View>

            <View style={styles.inputRow}>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "space-between",
                  paddingRight: 30,
                }}
              >
                <Text style={styles.label}>Fats </Text>
                <Text style={{ color: "gray" }}>{fatDailyGrams} g</Text>
              </View>
              <TextInput
                value={`${fat.toString()}%`}
                inputMode="none"
                style={styles.input}
                onFocus={() => {
                  setActiveField("fat");
                  toggleMacroSettingsModal();
                }}
                onChangeText={(text) => {
                  // Extract numeric value by removing '%' symbol
                  const numericValue = text.replace("%", "");
                  handleInputChange("fat", numericValue);
                }}
                caretHidden={true}
              />
            </View>
          </Card.Content>
        </Card>

        {activeField === "calories" && (
          <View
            style={{
              position: "absolute",
              flexDirection: "row",
              alignItems: "center",
              bottom: 0,
              left: 0,
              right: 0,
              padding: 10,
              backgroundColor: theme.colors.primary,
              zIndex: 2,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                Keyboard.dismiss();
                setTempChanges({});
                setActiveField(null);
              }}
              style={{ flex: 1, alignItems: "center" }}
            >
              <Feather name="x" size={24} color="white" />
            </TouchableOpacity>

            <Text
              style={{
                flex: 3,
                color: "white",
                fontSize: 18,
                textAlign: "center",
              }}
            >
              {activeField
                ? activeField.charAt(0).toUpperCase() + activeField.slice(1)
                : ""}
            </Text>

            <TouchableOpacity
              onPress={handleInputUpdate}
              style={{ flex: 1, alignItems: "center" }}
            >
              <Feather name="check" size={24} color="white" />
            </TouchableOpacity>
          </View>
        )}

        <Suspense fallback={null}>
          <MacroSettingsModal
            isVisible={isMacroSettingsModalVisible}
            closeModal={toggleMacroSettingsModal}
            tempChanges={tempChanges}
            activeField={activeField}
            setTempChanges={setTempChanges}
            setActiveField={setActiveField}
            handleInputChange={handleInputChange}
            handleInputUpdate={handleInputUpdate}
            calories={calories}
            protein={protein}
            carb={carb}
            fat={fat}
          />
        </Suspense>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          duration={3000} // Adjust duration as needed
          action={{
            label: "OK",
            onPress: () => {
              // Do something if needed when the user presses the action button
            },
          }}
          style={{ backgroundColor: theme.colors.surface }}
        >
          <Text
            style={{
              fontSize: 16,
              alignSelf: "center",
              color: theme.colors.primaryTextColor,
            }}
          >
            {snackbarMessage}
          </Text>
        </Snackbar>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default DailyNutritionGoalsCustomizationModal;
