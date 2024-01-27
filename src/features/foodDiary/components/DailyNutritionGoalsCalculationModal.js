import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import {
  Card,
  Button,
  SegmentedButtons,
  TextInput,
  Divider,
} from "react-native-paper";
import * as Haptics from "expo-haptics";
import Modal from "react-native-modal";
import Feather from "react-native-vector-icons/Feather";
import dailyNutritionGoalsCalculationModalStyles from "./styles/dailyNutritionGoalsCalculationModalStyles.js";
import { useThemeContext } from "../../../context/ThemeContext.js";

const DailyNutritionGoalsCalculationModal = ({ isVisible, closeModal }) => {
  const styles = dailyNutritionGoalsCalculationModalStyles();
  const { theme } = useThemeContext();
  // Form State
  const [goal, setGoal] = useState("Maintain"); // Default value for goal
  const [unit, setUnit] = useState("Standard"); // Default value for unit
  const [sex, setSex] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [bodyfat, setBodyfat] = useState("");
  const [weightGoalVisible, setWeightGoalVisible] = useState(false);
  const [goalWeight, setGoalWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  // Form Result State
  const [maintenanceCalories, setMaintenanceCalories] = useState(null);
  const [waterIntakeLiters, setWaterIntakeLiters] = useState(null);
  const [carbPercentage, setCarbPercentage] = useState(null);
  const [proteinPercentage, setProteinPercentage] = useState(null);
  const [fatPercentage, setFatPercentage] = useState(null);
  const [carbGrams, setCarbGrams] = useState(null);
  const [proteinGrams, setProteinGrams] = useState(null);
  const [fatGrams, setFatGrams] = useState(null);

  const calculateMaintenanceCalories = () => {
    // Parse height, weight, and age as numbers
    const parsedHeightFeet = parseFloat(heightFeet);
    const parsedHeightInches = parseFloat(heightInches);
    const parsedWeight = parseFloat(weight);
    const parsedAge = parseFloat(age);

    // Convert height to centimeters (1 foot = 30.48 cm, 1 inch = 2.54 cm)
    const totalHeightInCm =
      parsedHeightFeet * 30.48 + parsedHeightInches * 2.54;

    // Convert weight to kilograms (1 lb = 0.453592 kg)
    const weightInKg = parsedWeight * 0.453592;

    // Calculate BMR based on Mifflin-St Jeor formula
    let bmr;
    if (sex === "Male") {
      bmr = 10 * weightInKg + 6.25 * totalHeightInCm - 5 * parsedAge + 5;
    } else if (sex === "Female") {
      bmr = 10 * weightInKg + 6.25 * totalHeightInCm - 5 * parsedAge - 161;
    } else {
      // Handle case where sex is not selected
      console.error("Please select your gender.");
      return;
    }

    // Adjust BMR based on activity level
    const activityMultiplier = {
      Sedentary: 1.2,
      "Lightly Active": 1.375,
      "Moderately Active": 1.55,
      "Very Active": 1.725,
      "Extremely Active": 1.9,
    }[activityLevel];

    const maintenanceCalories = Math.floor(bmr * activityMultiplier);

    // Calculate Water Intake
    const waterIntakeFactor = {
      Sedentary: 0.5,
      "Lightly Active": 0.6,
      "Moderately Active": 0.7,
      "Very Active": 0.8,
      "Extremely Active": 0.9,
    }[activityLevel];

    const waterIntakeOunces = weight * waterIntakeFactor;
    const waterIntakeLiters = waterIntakeOunces * 0.0295735; // 1 fluid ounce = 0.0295735 liters

    // Calculate Macronutrients
    const carbRatio = 0.5; // Example: 50% of total calories
    const proteinRatio = 0.25; // Example: 25% of total calories
    const fatRatio = 0.25; // Example: 25% of total calories

    const carbCalories = maintenanceCalories * carbRatio;
    const proteinCalories = maintenanceCalories * proteinRatio;
    const fatCalories = maintenanceCalories * fatRatio;

    const carbGrams = Math.floor(carbCalories / 4); // 1 gram of carbs = 4 calories
    const proteinGrams = Math.floor(proteinCalories / 4); // 1 gram of protein = 4 calories
    const fatGrams = Math.floor(fatCalories / 9); // 1 gram of fat = 9 calories

    console.log("Maintenance Calories:", maintenanceCalories);
    console.log("Water Intake (liters):", waterIntakeLiters);
    console.log("Carbohydrates (grams):", carbGrams);
    console.log("Proteins (grams):", proteinGrams);
    console.log("Fats (grams):", fatGrams);

    setMaintenanceCalories(maintenanceCalories);
    setWaterIntakeLiters(waterIntakeLiters);
    setCarbPercentage(carbRatio);
    setProteinPercentage(proteinRatio);
    setFatPercentage(fatRatio);
    setCarbGrams(carbGrams);
    setProteinGrams(proteinGrams);
    setFatGrams(fatGrams);
  };

  return (
    <Modal
      isVisible={isVisible}
      style={{ flex: 1, height: "100%", width: "100%", margin: 0 }}
      avoidKeyboard={true}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <KeyboardAvoidingView
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: theme.colors.screenBackground,
          alignItems: "center",
          paddingBottom: 0,
        }}
        // behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              closeModal();
            }}
          >
            <Feather
              name="chevron-left"
              color={theme.colors.sectionHeaderTextColor}
              size={38}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Nutrition Calculator</Text>
          <ScrollView>
            <Card style={{ marginVertical: 20, marginHorizontal: 20 }}>
              <Card.Content>
                <Text style={styles.infoBox}>
                  This calculator uses a standard BMR equation (the Mifflin-St
                  Jeor formula) to estimate your Calorie needs. We also make
                  some rough macronutrient suggestions, but you're free to
                  completely customize these values when you create a free
                  account.
                </Text>
                <Text style={styles.infoBox}>
                  <Text
                    style={{
                      fontWeight: "500",
                      color: theme.colors.cardHeaderTextColor,
                    }}
                  >
                    Keep in mind that this is a general estimate.{" "}
                  </Text>
                  For best results, consult your healthcare provider.
                </Text>
              </Card.Content>
            </Card>

            <View style={styles.formContainer}>
              {/* New label and buttons */}
              <View style={{ gap: 5 }}>
                <Text style={styles.label}>I want to</Text>
                <View style={styles.segmentedButtonContainer}>
                  <SegmentedButtons
                    style={{ width: "100%" }}
                    density="medium"
                    value={goal}
                    onValueChange={setGoal}
                    buttons={[
                      {
                        value: "Lose",
                        label: "Lose Weight",
                      },
                      {
                        value: "Maintain",
                        label: "Maintain",
                      },
                      { value: "Build", label: "Build Muscle" },
                    ]}
                  />
                </View>
              </View>
              {/* New label and buttons */}
              <View style={{ gap: 5 }}>
                <Text style={styles.label}>Preferred units</Text>
                <View style={styles.segmentedButtonContainer}>
                  <SegmentedButtons
                    style={{ width: "100%" }}
                    density="medium"
                    value={unit}
                    onValueChange={setUnit}
                    buttons={[
                      {
                        value: "Standard",
                        label: "U.S. Standard",
                      },
                      {
                        value: "Metric",
                        label: "Metric",
                      },
                    ]}
                  />
                </View>
              </View>
              {/* New label and buttons */}
              <View style={{ gap: 5 }}>
                <Text style={styles.label}>I am</Text>
                <View style={styles.segmentedButtonContainer}>
                  <SegmentedButtons
                    style={{ width: "100%" }}
                    density="medium"
                    value={sex}
                    onValueChange={setSex}
                    buttons={[
                      {
                        value: "Male",
                        label: "Male",
                      },
                      {
                        value: "Female",
                        label: "Female",
                      },
                    ]}
                  />
                </View>
              </View>
              {/* New labels and input fields */}
              <View style={{ gap: 5 }}>
                <Text style={styles.label}>Height</Text>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 20,
                  }}
                >
                  <TextInput
                    mode="outlined"
                    style={styles.input}
                    placeholder="Feet"
                    keyboardType="numeric"
                    value={heightFeet}
                    onChangeText={(text) => setHeightFeet(text)}
                  />
                  <TextInput
                    mode="outlined"
                    style={styles.input}
                    placeholder="Inches"
                    keyboardType="numeric"
                    value={heightInches}
                    onChangeText={(text) => setHeightInches(text)}
                  />
                </View>
              </View>
              {/* New label and buttons */}
              <View style={{ gap: 5 }}>
                <Text style={styles.label}>Weight (lbs)</Text>
                <TextInput
                  mode="outlined"
                  style={styles.input}
                  placeholder="Weight in lbs"
                  keyboardType="numeric"
                  value={weight}
                  onChangeText={(text) => setWeight(text)}
                />
              </View>
              {/* New label and buttons */}
              <View style={{ gap: 5 }}>
                <Text style={styles.label}>Age (years)</Text>
                <TextInput
                  mode="outlined"
                  style={styles.input}
                  placeholder="Age in years"
                  keyboardType="numeric"
                  value={age}
                  onChangeText={(text) => setAge(text)}
                />
              </View>
              {/* New label and buttons */}
              <View style={{ gap: 5 }}>
                <Text style={styles.label}>Bodyfat</Text>
                <View style={styles.segmentedButtonContainer}>
                  <SegmentedButtons
                    style={{ width: "100%" }}
                    density="medium"
                    value={bodyfat}
                    onValueChange={setBodyfat}
                    buttons={[
                      {
                        value: "Low",
                        label: "Low",
                      },
                      {
                        value: "Medium",
                        label: "Medium",
                      },
                      { value: "High", label: "High" },
                    ]}
                  />
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}
                >
                  <Text style={{ color: "gray" }}>under 14%</Text>
                  <Text style={{ color: "gray" }}>14% to 22%</Text>
                  <Text style={{ color: "gray" }}>above 22%</Text>
                </View>
              </View>
              {/* New label and buttons */}
              <View style={{ gap: 5 }}>
                <Text style={styles.label}>Activity level</Text>
                <View style={styles.segmentedButtonContainer}>
                  <SegmentedButtons
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                    density="medium"
                    value={activityLevel}
                    onValueChange={setActivityLevel}
                    buttons={[
                      {
                        value: "Sedentary",
                        label: "Sedentary",
                        style: {
                          flexBasis: "40%",
                          borderWidth: 0,
                          borderBottomWidth: 1,
                          margin: 5,
                        },
                      },
                      {
                        value: "Lightly Active",
                        label: "Lightly Active",
                        style: {
                          flexBasis: "40%",
                          borderWidth: 0,
                          borderBottomWidth: 1,
                          margin: 5,
                        },
                      },
                      {
                        value: "Moderately Active",
                        label: "Moderately Active",
                        style: {
                          flexBasis: "40%",
                          borderWidth: 0,
                          borderBottomWidth: 1,
                          margin: 5,
                        },
                      },
                      {
                        value: "Very Active",
                        label: "Very Active",
                        style: {
                          flexBasis: "40%",
                          borderWidth: 0,
                          borderBottomWidth: 1,
                          margin: 5,
                        },
                      },
                      {
                        value: "Extremely Active",
                        label: "Extremely Active",
                        style: {
                          flexBasis: "40%",
                          borderWidth: 0,
                          borderBottomWidth: 1,
                          margin: 5,
                        },
                      },
                    ]}
                  />
                </View>
              </View>
              {/* New label and buttons */}
              <View style={{ gap: 5 }}>
                <Text style={styles.label}>Set a weight goal?</Text>
                <View style={styles.segmentedButtonContainer}>
                  <SegmentedButtons
                    style={{ width: "100%" }}
                    density="medium"
                    value={weightGoalVisible}
                    onValueChange={setWeightGoalVisible}
                    buttons={[
                      {
                        value: false,
                        label: "No thanks",
                      },
                      {
                        value: true,
                        label: "Yea let's do it!",
                      },
                    ]}
                  />
                </View>
                {/* New label and buttons */}
                {weightGoalVisible && (
                  <View style={{ marginTop: 10, gap: 5 }}>
                    <Text style={styles.label}>Enter your goal weight</Text>
                    <TextInput
                      mode="outlined"
                      style={styles.input}
                      placeholder="Goal Weight in lbs"
                      keyboardType="numeric"
                      value={goalWeight}
                      onChangeText={(text) => setGoalWeight(text)}
                    />
                  </View>
                )}
              </View>
              <Button mode="outlined" onPress={calculateMaintenanceCalories}>
                Calculate
              </Button>
              {maintenanceCalories ? (
                <Card>
                  <Card.Title title="Suggested Daily Nutrition Goals" />
                  <Card.Content style={{ gap: 30 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10,
                      }}
                    >
                      <View>
                        <Text style={styles.resultsLabel}>Calories</Text>
                        <Divider style={{ height: 2, marginVertical: 10 }} />
                        <Text style={styles.results}>
                          {maintenanceCalories} kcal
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.resultsLabel}>Carbs</Text>
                        <Divider style={{ height: 2, marginVertical: 10 }} />
                        <Text style={styles.results}>{carbGrams} g</Text>
                      </View>
                      <View>
                        <Text style={styles.resultsLabel}>Protein</Text>
                        <Divider style={{ height: 2, marginVertical: 10 }} />
                        <Text style={styles.results}>{proteinGrams} g</Text>
                      </View>
                      <View>
                        <Text style={styles.resultsLabel}>Fat</Text>
                        <Divider style={{ height: 2, marginVertical: 10 }} />
                        <Text style={styles.results}>{fatGrams} g</Text>
                      </View>
                    </View>
                    <Button mode="outlined">Apply these settings</Button>
                  </Card.Content>
                </Card>
              ) : null}
            </View>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default DailyNutritionGoalsCalculationModal;
