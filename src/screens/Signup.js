import React, { useEffect } from "react";
import logo from "../../assets/brandmark-design.png";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Image,
  Text,
  View,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import signupScreenStyles from "./styles/signupScreenStyles.js";
// Firebase API method imports
import { registration } from "../authentication/api/FirebaseAPI/authenticationMethods.js";
import Feather from "react-native-vector-icons/Feather";
import * as Haptics from "expo-haptics";
import { useThemeContext } from "../context/ThemeContext.js";
import ProfileDetailsSection from "../authentication/components/ProfileDetailsSection.js";
import ActivityLevelSection from "../authentication/components/ActivityLevelSection.js";
import SetAGoalSection from "../authentication/components/SetAGoalSection.js";
import AccountDetailsSection from "../authentication/components/AccountDetailsSection.js";
import BodyTypeSection from "../authentication/components/BodyTypeSection.js";

const SectionBarComponent = ({ currentSection }) => {
  const { theme } = useThemeContext();

  return (
    <View
      style={{
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <View
        style={{
          borderRadius: 16,
          width: 50,
          height: 8,
          backgroundColor:
            currentSection >= 1
              ? theme.colors.primary
              : "rgba(169, 169, 169, 0.7)",
        }}
      />

      <View
        style={{
          borderRadius: 16,
          width: 50,
          height: 8,
          backgroundColor:
            currentSection >= 2
              ? theme.colors.primary
              : "rgba(169, 169, 169, 0.7)",
        }}
      />

      <View
        style={{
          borderRadius: 16,
          width: 50,
          height: 8,
          backgroundColor:
            currentSection >= 3
              ? theme.colors.primary
              : "rgba(169, 169, 169, 0.7)",
        }}
      />

      <View
        style={{
          borderRadius: 16,
          width: 50,
          height: 8,
          backgroundColor:
            currentSection >= 4
              ? theme.colors.primary
              : "rgba(169, 169, 169, 0.7)",
        }}
      />

      <View
        style={{
          borderRadius: 16,
          width: 50,
          height: 8,
          backgroundColor:
            currentSection >= 4
              ? theme.colors.primary
              : "rgba(169, 169, 169, 0.7)",
        }}
      />
    </View>
  );
};

function SignUpScreen({ navigation }) {
  const styles = signupScreenStyles(); // Use the imported styles
  const { theme } = useThemeContext();

  // Removed dob: new Date(), from state
  const [value, setValue] = React.useState({
    sex: "",
    birthday: "",
    age: null,
    height: { inches: null, centimeters: null },
    weight: "",
    activityLevel: "",
    maintenanceCalories: null,
    weightTrendGoal: null,
    customEnergyTarget: null,
    bodyFatPercentageRange: null,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    error: "",
  });

  const emptyState = () => {
    setValue({
      sex: "",
      birthday: "",
      age: null,
      height: { inches: null, centimeters: null },
      weight: "",
      activityLevel: "",
      maintenanceCalories: null,
      weightTrendGoal: null,
      customEnergyTarget: null,
      bodyFatPercentageRange: null,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: "",
    });
  };

  const [currentSection, setCurrentSection] = React.useState(1);

  const handleNextSection = () => {
    setCurrentSection(currentSection + 1);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleSignUp = () => {
    console.log("Values" + JSON.stringify(value, null, 1));

    // Sign up form validation
    if (value.firstName === "" || value.lastName === "") {
      Alert.alert("Please enter your first name and last name.");
    } else if (value.email === "" || value.password === "") {
      Alert.alert("Email and password are mandatory.");
    } else if (value.password !== value.confirmPassword) {
      Alert.alert("Password and Confirm Password don't match.");
    } else {
      // Determine weight unit
      let weightUnit;
      const weightParts = value.weight.split(" ");
      if (weightParts.length === 2) {
        weightUnit = weightParts[1]; // Get the second word
      }

      // Convert weight to numeric value in kilograms
      let parsedWeight;
      if (weightUnit === "lbs") {
        // Weight is in pounds, convert to kilograms
        parsedWeight = parseFloat(weightParts[0]) * 0.453592; // Convert pounds to kilograms
      } else if (weightUnit === "kg") {
        // Weight is already in kilograms
        parsedWeight = parseFloat(weightParts[0]);
      }

      // First user daily calorie goal upon registration
      let firstCalorieGoal = 0;
      if (value.customEnergyTarget) {
        // If user inputed a custom energy target then assign it as the daily calorie goal
        firstCalorieGoal = value.customEnergyTarget;
      } else if (value.maintenanceCalories) {
        // If user inputed maintenance calories then assign it as the daily calorie goal
        firstCalorieGoal = value.maintenanceCalories;
      } else if (
        value.activityLevel &&
        parsedWeight &&
        value.sex &&
        value.age &&
        value.height.centimeters
      ) {
        // If user inputed an activity level then use it alongside their height, weight, sex, and age to calculate their maintenance calories then assign it as the daily calorie goal
        firstCalorieGoal = calculateDailyCalories(
          parseFloat(value.height.centimeters),
          parsedWeight,
          value.sex,
          value.age,
          value.activityLevel,
          value.weightTrendGoal,
          value.bodyFatPercentageRange
        );
      } else {
        // If user skipped inputs in the activity level section and set a goal section, then use default daily calorie goal
        firstCalorieGoal = 2000;
      }

      // If the user has not directly assigned themself a custom energy target for their daily calorie goal, then process the user's default nutritional goal settings based on the user's weight trend goal if that weight trend goal exists.

      // If user settings document doesn't exist, initialize with default values
      const defaultSettings = {
        profile: {
          firstName: value.firstName,
          lastName: value.lastName,
          email: value.email,
          birthday: value.birthday,
          age: value.age,
          sex: value.sex,
          bodyWeight: value.weight,
          height: {
            inches: value.height.inches,
            centimeters: value.height.centimeters,
          },
        },
        appAppearance: {
          theme: "Default",
          isDark: true, // Default to dark theme
        },
        nutritionalGoals: {
          calorieGoal: firstCalorieGoal,
          macroGoals: {
            carb: {
              dailyPercentage: 0.4,
              dailyCalories: calculateCarbDailyCalories(firstCalorieGoal, 40),
              dailyGrams: calculateCarbDailyGrams(firstCalorieGoal, 40),
            },
            protein: {
              dailyPercentage: 0.3,
              dailyCalories: calculateProteinDailyCalories(
                firstCalorieGoal,
                30
              ),
              dailyGrams: calculateProteinDailyGrams(firstCalorieGoal, 30),
            },
            fat: {
              dailyPercentage: 0.3,
              dailyCalories: calculateFatDailyCalories(firstCalorieGoal, 30),
              dailyGrams: calculateFatDailyGrams(firstCalorieGoal, 30),
            },
          },
        },
        physicalFitnessGoals: {
          // Will add more to this later when building the workout diary.
          bodyWeightGoal: 0,
        },
      };

      console.log(
        "Default Settings" + JSON.stringify(defaultSettings, null, 1)
      );

      registration(value.email, value.password, defaultSettings);
      emptyState();
    }
  };

  // HELPER METHODS FOR DETERMINING DEFAULT USER SETTINGS VALUES

  const calculateDailyCalories = (
    heightInCm,
    weightInKg,
    sex,
    age,
    activityLevel,
    weightTrendGoal,
    bodyFatPercentageRange // This is the user's selected body fat percentage range
  ) => {
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

      console.log(
        "Daily Calorie Goal calculated using Katch-McArdle formula: " +
          dailyCalories
      );
    } else {
      // Use Mifflin-St Jeor formula if bodyFatPercentageRange does not exist

      // Calculate BMR based on Mifflin-St Jeor formula
      let bmr;
      if (sex === "Male") {
        bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age + 5;
      } else if (
        sex === "Female" ||
        sex === "Pregnant" ||
        sex === "Breastfeeding"
      ) {
        bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * age - 161;
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

      console.log(
        "Daily Calorie Goal calculated using Mifflin-St Jeor formula: " +
          dailyCalories
      );
    }

    return dailyCalories;
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

  // Method to calculate total daily calorie carbs goal based on percentage of the total daily calories

  const calculateCarbDailyCalories = (totalDailyCalories, carbPercentage) => {
    return Math.round((totalDailyCalories * carbPercentage) / 100);
  };

  // Method to calculate total daily calorie protein goal based on percentage of the total daily calories
  const calculateProteinDailyCalories = (
    totalDailyCalories,
    proteinPercentage
  ) => {
    return Math.round((totalDailyCalories * proteinPercentage) / 100);
  };

  // Method to calculate total daily calorie fat goal based on percentage of the total daily calories
  const calculateFatDailyCalories = (totalDailyCalories, fatPercentage) => {
    return Math.round((totalDailyCalories * fatPercentage) / 100);
  };

  const calculateCarbDailyGrams = (totalDailyCalories, carbPercentage) => {
    const carbCaloriesPerGram = 4;
    return Math.round(
      (totalDailyCalories * (carbPercentage / 100)) / carbCaloriesPerGram
    );
  };

  const calculateProteinDailyGrams = (
    totalDailyCalories,
    proteinPercentage
  ) => {
    const proteinCaloriesPerGram = 4;
    return Math.round(
      (totalDailyCalories * (proteinPercentage / 100)) / proteinCaloriesPerGram
    );
  };

  const calculateFatDailyGrams = (totalDailyCalories, fatPercentage) => {
    const fatCaloriesPerGram = 9;
    return Math.round(
      (totalDailyCalories * (fatPercentage / 100)) / fatCaloriesPerGram
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.colors.screenBackground,
        }}
      >
        <LinearGradient
          colors={["black", "white"]}
          style={{
            flex: 1,
          }}
          start={{ x: 0, y: 0.6 }}
          end={{ x: 0, y: 0.2 }}
        >
          <View
            style={{
              height: 85,
              minWidth: "100%",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              style={{ alignSelf: "flex-start", padding: 15, zIndex: 2 }}
              onPress={() => {
                currentSection == 1
                  ? navigation.navigate("Welcome")
                  : setCurrentSection(currentSection - 1);

                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              <Feather name="chevron-left" color={"black"} size={38} />
            </TouchableOpacity>
          </View>
          {/* <Image source={logo} style={styles.logo} /> */}

          <View style={styles.contentContainer}>
            <SectionBarComponent currentSection={currentSection} />
            {currentSection === 1 && (
              <ProfileDetailsSection
                value={value}
                setValue={setValue}
                onNext={handleNextSection}
              />
            )}

            {currentSection === 2 && (
              <ActivityLevelSection
                value={value}
                setValue={setValue}
                onNext={handleNextSection}
              />
            )}

            {currentSection === 3 && (
              <SetAGoalSection
                value={value}
                setValue={setValue}
                onNext={handleNextSection}
              />
            )}

            {currentSection === 4 && (
              <BodyTypeSection
                value={value}
                setValue={setValue}
                onNext={handleNextSection}
              />
            )}

            {currentSection === 5 && (
              <AccountDetailsSection
                value={value}
                setValue={setValue}
                handleSignUp={handleSignUp}
              />
            )}
          </View>
        </LinearGradient>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

export default SignUpScreen;
