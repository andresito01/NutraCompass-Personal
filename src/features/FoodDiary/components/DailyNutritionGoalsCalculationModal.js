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
  Snackbar,
} from "react-native-paper";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import * as Haptics from "expo-haptics";
import Modal from "react-native-modal";
import Feather from "react-native-vector-icons/Feather";
import dailyNutritionGoalsCalculationModalStyles from "./styles/dailyNutritionGoalsCalculationModalStyles.js";
import { useThemeContext } from "../../../context/ThemeContext.js";
import { useUserSettings } from "../../UserSettings/context/UserSettingsContext.js";

console.log("Daily Nutrition Goals Calculation Modal Rendered.");

const DailyNutritionGoalsCalculationModal = ({ isVisible, closeModal }) => {
  const styles = dailyNutritionGoalsCalculationModalStyles();
  const { theme } = useThemeContext();
  const { setNutritionalGoals } = useUserSettings();

  // State variable that checks if user used form results to update nutritional goals
  const [formUsedToUpdateGoals, setFormUsedToUpdateGoals] = useState(false);
  // Form User Answer State Variables
  const [goal, setGoal] = useState("Maintain");
  const [unit, setUnit] = useState("Standard");
  const [sex, setSex] = useState("");
  const [heightFeet, setHeightFeet] = useState("");
  const [heightInches, setHeightInches] = useState("");
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [bodyFatPercentageRange, setBodyFatPercentageRange] = useState(null);
  const [weightGoalVisible, setWeightGoalVisible] = useState(false);
  const [goalWeight, setGoalWeight] = useState("");
  const [dateToAchieveWeightGoal, setDateToAchieveWeightGoal] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [activityLevel, setActivityLevel] = useState("");
  // Form Result State Variables
  const [dailyCalories, setDailyCalories] = useState(null);
  const [weightTrendGoal, setWeightTrendGoal] = useState(null);
  const [carbPercentage, setCarbPercentage] = useState(null);
  const [proteinPercentage, setProteinPercentage] = useState(null);
  const [fatPercentage, setFatPercentage] = useState(null);
  const [carbGrams, setCarbGrams] = useState(null);
  const [proteinGrams, setProteinGrams] = useState(null);
  const [fatGrams, setFatGrams] = useState(null);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  useEffect(() => {
    // Reset form fields when modal is closed
    if (!isVisible && !formUsedToUpdateGoals) {
      resetFormFields();
    }
  }, [isVisible]);

  const resetFormFields = () => {
    setGoal("Maintain");
    setUnit("Standard");
    setSex("");
    setHeightFeet("");
    setHeightInches("");
    setWeight("");
    setAge("");
    setBodyFatPercentageRange(null);
    setWeightGoalVisible(false);
    setGoalWeight("");
    setDateToAchieveWeightGoal(new Date().toISOString().split("T")[0]); // Reset date to today
    setActivityLevel("");
    setDailyCalories(null);
    setWeightTrendGoal(null);
    setCarbPercentage(null);
    setProteinPercentage(null);
    setFatPercentage(null);
    setCarbGrams(null);
    setProteinGrams(null);
    setFatGrams(null);
  };

  const handleUpdateNutritionalGoals = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    try {
      if (
        dailyCalories &&
        proteinPercentage &&
        carbPercentage &&
        fatPercentage
      ) {
        setNutritionalGoals({
          calorieGoal: dailyCalories,
          proteinPercentage: proteinPercentage * 100,
          carbPercentage: carbPercentage * 100,
          fatPercentage: fatPercentage * 100,
        });
        setFormUsedToUpdateGoals(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        console.log("Updating nutritional goals");
        setSnackbarMessage("Nutritional goals updated successfully!");
        setSnackbarVisible(true); // Show the Snackbar
      }
    } catch (error) {
      console.error("Error updating nutritional goals:", error);
      setSnackbarMessage("Failed to update nutritional goals.");
      setSnackbarVisible(true); // Show the Snackbar
    }
  };

  const calculateDailyNutritionalGoals = () => {
    // Parse height, weight, and age as numbers
    const parsedHeightFeet = parseFloat(heightFeet);
    const parsedHeightInches = parseFloat(heightInches);
    const parsedWeight = parseFloat(weight);
    const parsedAge = parseFloat(age);
    const weightTrendGoal = calculateWeightTrendGoal();

    // Convert height to centimeters (1 foot = 30.48 cm, 1 inch = 2.54 cm)
    const totalHeightInCm =
      parsedHeightFeet * 30.48 + parsedHeightInches * 2.54;

    // Convert weight to kilograms (1 lb = 0.453592 kg)
    const weightInKg = parsedWeight * 0.453592;

    let dailyCalories;

    // Check if bodyFatPercentageRange exists to determine which formula to use
    if (bodyFatPercentageRange) {
      // Use Katch-McArdle formula for increased accuracy if bodyFatPercentageRange exists

      // Calculate BMR based on Katch-McArdle formula
      const leanBodyMass = calculateLeanBodyMass(
        weightInKg,
        bodyFatPercentageRange
      );
      const bmr = 370 + 21.6 * leanBodyMass;

      // Adjust BMR based on activity level
      const activityMultiplier = getActivityMultiplier(activityLevel);
      const maintenanceCalories = Math.floor(bmr * activityMultiplier);

      // Adjust maintenance calories based on weight trend goal
      dailyCalories = adjustCaloriesForWeightTrend(
        maintenanceCalories,
        weightTrendGoal
      );
    } else {
      // Use Mifflin-St Jeor formula if bodyFatPercentageRange does not exist

      // Calculate BMR based on Mifflin-St Jeor formula
      let bmr;
      if (sex === "Male") {
        bmr = 10 * weightInKg + 6.25 * totalHeightInCm - 5 * parsedAge + 5;
      } else if (
        sex === "Female" ||
        sex === "Pregnant" ||
        sex === "Breastfeeding"
      ) {
        bmr = 10 * weightInKg + 6.25 * totalHeightInCm - 5 * parsedAge - 161;
      } else {
        console.error("Please select your gender.");
        return;
      }

      // Adjust BMR based on activity level
      const activityMultiplier = getActivityMultiplier(activityLevel);
      const maintenanceCalories = Math.floor(bmr * activityMultiplier);

      // Adjust maintenance calories based on weight trend goal
      dailyCalories = adjustCaloriesForWeightTrend(
        maintenanceCalories,
        weightTrendGoal
      );
    }

    // Update nutritional goals state
    // Calculate Macronutrients
    const carbRatio = 0.4; // Example: 40% of total calories
    const proteinRatio = 0.3; // Example: 30% of total calories
    const fatRatio = 0.3; // Example: 30% of total calories

    const carbCalories = dailyCalories * carbRatio;
    const proteinCalories = dailyCalories * proteinRatio;
    const fatCalories = dailyCalories * fatRatio;

    const carbGrams = Math.round(carbCalories / 4); // 1 gram of carbs = 4 calories
    const proteinGrams = Math.round(proteinCalories / 4); // 1 gram of protein = 4 calories
    const fatGrams = Math.round(fatCalories / 9); // 1 gram of fat = 9 calories

    const roundedDailyCalories = Math.round(dailyCalories);

    setDailyCalories(roundedDailyCalories);
    setCarbPercentage(carbRatio);
    setProteinPercentage(proteinRatio);
    setFatPercentage(fatRatio);
    setCarbGrams(carbGrams);
    setProteinGrams(proteinGrams);
    setFatGrams(fatGrams);
    setWeightTrendGoal(weightTrendGoal);
  };

  // Function to calculate the weight trend goal
  const calculateWeightTrendGoal = () => {
    if (!goalWeight || !dateToAchieveWeightGoal) return 0; // handle missing data

    const currentWeightInKg = parseFloat(weight) * 0.453592;
    const goalWeightInKg = parseFloat(goalWeight) * 0.453592;

    // Calculate the difference between current weight and goal weight
    const weightDifference = goalWeightInKg - currentWeightInKg;

    // Calculate the time difference in weeks between today and the selected date
    const millisecondsPerWeek = 1000 * 60 * 60 * 24 * 7;
    const today = new Date();
    const selectedDate = new Date(dateToAchieveWeightGoal);
    const timeDifferenceInWeeks = Math.floor(
      (selectedDate - today) / millisecondsPerWeek
    );

    // Ensure timeDifferenceInWeeks is not zero to avoid division by zero
    if (timeDifferenceInWeeks === 0) return 0;

    // Calculate the weekly weight change needed to reach the goal weight
    const weeklyWeightChange = weightDifference / timeDifferenceInWeeks;

    return weeklyWeightChange;
  };

  // Function to calculate lean body mass based on weight and body fat percentage range
  const calculateLeanBodyMass = (weightInKg, bodyFatPercentageRange) => {
    // Convert body fat percentage to a decimal
    const bodyFatPercentage = parseFloat(bodyFatPercentageRange) / 100;

    // Calculate lean body mass using the formula: Lean Body Mass = Weight - (Weight * Body Fat Percentage)
    const leanBodyMass = weightInKg - weightInKg * bodyFatPercentage;

    return leanBodyMass;
  };

  // Function to get activity multiplier based on activity level
  const getActivityMultiplier = (activityLevel) => {
    // Define activity multipliers based on activity level
    const activityMultipliers = {
      None: 1,
      "Sedentary (BMR x 0.2)": 1.2,
      "Lightly Active (BMR x 0.375)": 1.375,
      "Moderately Active (BMR x 0.5)": 1.5,
      "Very Active (BMR x 0.9)": 1.9,
    };
    return activityMultipliers[activityLevel];
  };

  // Function to adjust maintenance calories based on weight trend goal
  const adjustCaloriesForWeightTrend = (
    maintenanceCalories,
    weightTrendGoal
  ) => {
    // Adjust maintenance calories based on weight trend goal (losing or gaining weight)
    let dailyCalories = maintenanceCalories;
    if (weightTrendGoal < 0) {
      // Losing weight
      dailyCalories -= Math.abs(weightTrendGoal) * 500; // 1 lb per week = 500 calorie deficit per day
    } else if (weightTrendGoal > 0) {
      // Gaining weight
      dailyCalories += weightTrendGoal * 500; // 1 lb per week = 500 calorie surplus per day
    }
    return dailyCalories;
  };

  const bodyTypes = [
    {
      id: 1,
      value: 8,
      description: "Very Lean: 5-10% body fat",
      //image: require("../../../../assets/squatMan.png"), // Replace with actual image path
    },
    {
      id: 2,
      value: 13,
      description: "Lean: 11-15% body fat",
      //image: require("../../../../assets/squatMan.png"), // Replace with actual image path
    },
    {
      id: 3,
      value: 18,
      description: "Moderately Lean: 16-20% body fat",
      //image: require("../../../../assets/squatMan.png"), // Replace with actual image path
    },
    {
      id: 4,
      value: 23,
      description: "Average: 21-25% body fat",
      //image: require("../../../../assets/squatMan.png"), // Replace with actual image path
    },
    {
      id: 5,
      value: 28,
      description: "Above Average: 26-30% body fat",
      //image: require("../../../../assets/squatMan.png"), // Replace with actual image path
    },
    {
      id: 6,
      value: 33,
      description: "Overweight: 31-35% body fat",
      //image: require("../../../../assets/squatMan.png"), // Replace with actual image path
    },
    {
      id: 7,
      value: 40,
      description: "Obese: 36%+ body fat",
      //image: require("../../../../assets/squatMan.png"), // Replace with actual image path
    },
  ];

  // Calculate the minimum date as a whole week ahead of today
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 8);

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
          <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
            <Card style={{ marginVertical: 20, marginHorizontal: 20 }}>
              <Card.Content>
                <Text style={styles.infoBox}>
                  This calculator uses two standard BMR equation (the Mifflin-St
                  Jeor formula and Katch-McArdle) to estimate your Calorie
                  needs. We also make some rough macronutrient suggestions for
                  you to achieve your specified goals.
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
                <Text style={styles.label}>Sex</Text>
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
                <Text style={styles.label}>Body Type</Text>
                <View style={styles.segmentedButtonContainer}>
                  <SegmentedButtons
                    style={{
                      width: "100%",
                      flexDirection: "column",
                    }}
                    density="medium"
                    value={bodyFatPercentageRange}
                    onValueChange={setBodyFatPercentageRange}
                    buttons={bodyTypes.map((type) => ({
                      value: type.value.toString(),
                      label: type.description,
                      style: {
                        borderRadius: 0,
                        borderWidth: 0,
                        borderBottomWidth: 1,
                        margin: 5,
                      },
                    }))}
                  />
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
                        value: "Sedentary (BMR x 0.2)",
                        label: "Sedentary",
                        style: {
                          flexBasis: "40%",
                          borderWidth: 0,
                          borderBottomWidth: 1,
                          margin: 5,
                        },
                      },
                      {
                        value: "Lightly Active (BMR x 0.375)",
                        label: "Lightly Active",
                        style: {
                          flexBasis: "40%",
                          borderWidth: 0,
                          borderBottomWidth: 1,
                          margin: 5,
                        },
                      },
                      {
                        value: "Moderately Active (BMR x 0.5)",
                        label: "Moderately Active",
                        style: {
                          flexBasis: "40%",
                          borderWidth: 0,
                          borderBottomWidth: 1,
                          margin: 5,
                        },
                      },
                      {
                        value: "Very Active (BMR x 0.9)",
                        label: "Very Active",
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
                    <Text style={styles.label}>
                      When do you want to achieve your body weight goal?
                    </Text>
                    {/* Date picker
                     * Note: Not accurate if the date for the body weight goal is within the next week of today's date. It needs to be in the next week. Use this logic to block more days from being selected. And then give today's date a unique indicator even though it can't be selected
                     */}
                    <Calendar
                      current={dateToAchieveWeightGoal}
                      minDate={minDate.toISOString().split("T")[0]}
                      onDayPress={(day) => {
                        setDateToAchieveWeightGoal(day.dateString);
                      }}
                      monthFormat={"MMMM yyyy"}
                      // onMonthChange={(month) => {
                      //   console.log("month changed", month);
                      // }}
                      hideExtraDays={true}
                      disableMonthChange={true}
                      firstDay={1}
                      showWeekNumbers={false} // Set to false to hide week numbers
                      onPressArrowLeft={(subtractMonth) => subtractMonth()}
                      onPressArrowRight={(addMonth) => addMonth()}
                      disableAllTouchEventsForDisabledDays={true}
                      renderHeader={(date) => {
                        return (
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              padding: 10,
                              alignItems: "center",
                            }}
                          >
                            <Text
                              style={{
                                color: theme.colors.cardHeaderTextColor,
                                fontSize: 18,
                                fontWeight: "bold",
                              }}
                            >
                              {date.toString("MMMM yyyy")}
                            </Text>
                            {/* Add any additional components here */}
                          </View>
                        );
                      }}
                      enableSwipeMonths={true}
                      theme={{
                        backgroundColor: theme.colors.surface,
                        calendarBackground: theme.colors.surface,
                        textSectionTitleColor: theme.colors.cardHeaderTextColor,
                        selectedDayBackgroundColor: theme.colors.primary,
                        selectedDayTextColor: theme.colors.cardHeaderTextColor,
                        todayTextColor: theme.colors.cardHeaderTextColor,
                        dayTextColor: theme.colors.cardHeaderTextColor,
                        textDisabledColor: "gray",
                        dotColor: theme.colors.primary,
                        selectedDotColor: theme.colors.cardHeaderTextColor,
                        arrowColor: theme.colors.secondary,
                        monthTextColor: theme.colors.cardHeaderTextColor,
                        indicatorColor: "red",
                      }}
                      markedDates={{
                        [dateToAchieveWeightGoal]: {
                          selected: true,
                          marked: true,
                          selectedColor: theme.colors.primary,
                        },
                        [new Date().toISOString().split("T")[0]]: {
                          marked: true,
                          selectedColor: theme.colors.secondary,
                        },
                      }}
                    />
                  </View>
                )}
              </View>
              <Button mode="outlined" onPress={calculateDailyNutritionalGoals}>
                Calculate
              </Button>
              {dailyCalories ? (
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
                        <Text style={styles.results}>{dailyCalories} kcal</Text>
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
                    <Button
                      mode="outlined"
                      onPress={handleUpdateNutritionalGoals}
                    >
                      Apply these settings
                    </Button>
                  </Card.Content>
                </Card>
              ) : null}
            </View>

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
                  color: theme.colors.cardHeaderTextColor,
                }}
              >
                {snackbarMessage}
              </Text>
            </Snackbar>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default DailyNutritionGoalsCalculationModal;
