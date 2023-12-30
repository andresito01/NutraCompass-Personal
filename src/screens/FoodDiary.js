import React, { useState } from "react";
import { Text, View, SafeAreaView, ScrollView } from "react-native";
import { useTheme, Card, Button, ProgressBar, FAB } from "react-native-paper"; // Import Paper components
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";
import FoodEntryModal from "../features/foodDiary/components/FoodEntryModal.js";
import MealSectionCustomizationModal from "../features/foodDiary/components/MealSectionCustomizationModal.js";
import DailyNutritionGoalsCustomizationModal from "../features/foodDiary/components/DailyNutritionGoalsCustomizationModal.js";
import DailyNutritionGoalsCalculationModal from "../features/foodDiary/components/DailyNutritionGoalsCalculationModal.js";
import FoodNutrientModal from "../features/foodDiary/components/FoodNutrientModal.js";
import foodDiaryScreenStyles from "./styles/foodDiaryScreenStyles.js";
import FoodEntryList from "../features/foodDiary/components/FoodEntryList.js";
import DateSelector from "../components/DateSelector.js";
import FoodlogFabGroupMenu from "../features/foodDiary/components/FabGroupMenu.js";
import { useFoodLog } from "../features/foodDiary/context/FoodLogContext.js";
import { useUserSettings } from "../features/userSettings/context/UserSettingsContext.js";
import { useThemeContext } from "../context/ThemeContext.js";

export default function FoodDiaryScreen() {
  const styles = foodDiaryScreenStyles(); // Use the imported styles
  const paperTheme = useTheme();
  const { theme } = useThemeContext();
  const { mealSections, foodEntries, saveFoodLogEntry } = useFoodLog();

  const { getNutritionalGoals } = useUserSettings();
  const { calorieGoal } = getNutritionalGoals();

  const [activeMealSection, setActiveMealSection] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  // Modal State Management
  const [isFoodEntryModalVisible, setIsFoodEntryModalVisible] = useState(false);
  const [
    isMealSectionCustomizationModalVisible,
    setIsMealSectionCustomizationModalVisible,
  ] = useState(false);
  const [
    isDailyNutritionGoalsCustomizationModalVisible,
    setIsDailyNutritionGoalsCustomizationModalVisible,
  ] = useState(false);
  const [
    isDailyNutritionGoalsCalculationModalVisible,
    setIsDailyNutritionGoalsCalculationModalVisible,
  ] = useState(false);
  const [isFoodNutrientModalVisible, setIsFoodNutrientModalVisible] =
    useState(false);

  const isFocused = useIsFocused(); // Variable to determin whether the FoodLogScreen is the current screen in focus, therefore the FoodlogFabGroupMenu should be visible

  const calculateTotalCalories = (entries) => {
    if (!Array.isArray(entries)) {
      return 0;
    }

    return entries.reduce((total, entry) => {
      if (entry && entry.foodCalories) {
        return total + entry.foodCalories;
      } else {
        return total;
      }
    }, 0);
  };

  const handleAddEntry = (mealType) => {
    setActiveMealSection(mealType); // Set the active meal section
    setIsFoodEntryModalVisible(true); // Show modal
  };

  const handleSaveEntry = (mealType, newFoodName, newFoodCalories) => {
    // Call the context method to save the food entry
    saveFoodLogEntry(mealType, newFoodName, newFoodCalories, selectedDate);

    setIsFoodEntryModalVisible(false); // Hide modal
    setActiveMealSection(null); // Reset active meal section
  };

  const handleCancelEntry = () => {
    setIsFoodEntryModalVisible(false); // Hide modal
  };

  const handleCloseDailyNutritionGoalsCalculationModal = () => {
    setIsDailyNutritionGoalsCalculationModalVisible(false);
  };

  const handleOpenDailyNutritionGoalsCalculationModal = () => {
    setIsDailyNutritionGoalsCalculationModalVisible(true);
  };

  const handleCloseMealSectionCustomizationModal = () => {
    setIsMealSectionCustomizationModalVisible(false);
  };

  const handleOpenMealSectionCustomizationModal = () => {
    setIsMealSectionCustomizationModalVisible(true);
  };

  const handleCloseDailyNutritionGoalsCustomizationModal = () => {
    setIsDailyNutritionGoalsCustomizationModalVisible(false);
  };

  const handleOpenDailyNutritionGoalsCustomizationModal = () => {
    setIsDailyNutritionGoalsCustomizationModalVisible(true);
  };

  const handleCloseFoodNutrientModal = () => {
    setIsFoodNutrientModalVisible(false);
  };

  const handleOpenFoodNutrientModal = () => {
    setIsFoodNutrientModalVisible(true);
  };

  const filteredEntriesByMeal = {};
  mealSections.forEach((section) => {
    if (foodEntries[section.id]) {
      filteredEntriesByMeal[section.id] = foodEntries[section.id].filter(
        (entry) => entry.date === selectedDate
      );
      // console.log(
      //   `Entries for ${section.name}:`,
      //   filteredEntriesByMeal[section.id]
      // );
    }
  });

  const calorieProgressBarPercentage =
    calculateTotalCalories(
      mealSections.flatMap((section) => filteredEntriesByMeal[section.id])
    ) / calorieGoal;

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {/* Date Selector Section */}
      <DateSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* Total Day Calories Progress Section */}
      <View
        style={{
          flexDirection: "row",
          minHeight: "22%",
          maxHeight: "30%",
          gap: 5,
          padding: 5,
        }}
      >
        <Card style={styles.calorieSection}>
          <Card.Content>
            <View style={styles.sectionHeaderContainer}>
              <Text style={styles.sectionTitle}>Calories Remaining</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
              }}
            >
              <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
                <Text style={styles.totalDayCalories}>
                  {calorieGoal} {"  -  "}
                </Text>
                <Text style={styles.totalDayCaloriesProgressSectionText}>
                  Goal
                </Text>
              </View>
              <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
                <Text style={styles.totalDayCalories}>
                  {calculateTotalCalories(
                    mealSections.flatMap(
                      (section) => filteredEntriesByMeal[section.id]
                    )
                  )}
                  {"  +  "}
                </Text>
                <Text style={styles.totalDayCaloriesProgressSectionText}>
                  Food
                </Text>
              </View>
              <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
                <Text style={styles.totalDayCalories}>0 {"  =  "}</Text>
                <Text style={styles.totalDayCaloriesProgressSectionText}>
                  Exercise
                </Text>
              </View>
              <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
                <Text style={styles.totalDayCalories}>
                  {calorieGoal -
                    calculateTotalCalories(
                      mealSections.flatMap(
                        (section) => filteredEntriesByMeal[section.id]
                      )
                    )}
                </Text>
                <Text style={styles.totalDayCaloriesProgressSectionText}>
                  Remaining
                </Text>
              </View>
            </View>
            <ProgressBar
              style={{
                marginTop: 20,
                backgroundColor: "rgba(255, 255,255,0.5)",
                // backgroundColor: theme.colors.cardHeaderTextColor,
              }}
              color={
                calorieProgressBarPercentage > 1.0 ? "red" : "#239B56" // green
              }
              progress={calorieProgressBarPercentage}
            />
          </Card.Content>
        </Card>

        {/* Other Section */}
        <Card
          style={{
            flex: 1,
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: theme.dimensions.sectionBorderRadius,
            //backgroundColor: theme.colors.sectionBackgroundColor, // Change to surface color for cards
            backgroundColor: theme.colors.cardDarkGrayBackground,
            borderColor: theme.colors.sectionBorderColor,
            //borderWidth: 1,
            borderRightWidth: 1,
            borderLeftWidth: 0,
            elevation: 4, // Add elevation for a card-like effect
          }}
        >
          <Card.Content>
            <Text
              style={{
                fontSize: 14,
                color: theme.colors.cardHeaderTextColor,
                paddingBottom: 5,
              }}
            >
              Spider Diagram of Diet/Meal Choices
            </Text>
          </Card.Content>
        </Card>
      </View>

      <View
        style={{
          minHeight: "9%",
          maxHeight: "9%",
          marginHorizontal: 5,
          marginBottom: 5,
        }}
      >
        {/* Other Section */}
        <Card
          style={{
            flex: 1,
            borderRadius: theme.dimensions.sectionBorderRadius,
            //backgroundColor: theme.colors.sectionBackgroundColor, // Change to surface color for cards
            backgroundColor: theme.colors.cardDarkGrayBackground,
            borderColor: theme.colors.sectionBorderColor,
            //borderWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            elevation: 4, // Add elevation for a card-like effect
          }}
        >
          <Card.Content>
            <Text
              style={{
                fontSize: 14,
                color: theme.colors.cardHeaderTextColor,
                paddingBottom: 5,
              }}
            >
              Summary of the daily eating report
            </Text>
          </Card.Content>
        </Card>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollViewContainerContent}
        style={styles.scrollViewContainer}
      >
        {mealSections.map(
          (section) =>
            section.name && (
              <Card
                style={{
                  marginBottom: 10,
                  borderRadius: theme.dimensions.cardBorderRadius,
                }}
                key={section.id}
              >
                <LinearGradient
                  colors={[theme.colors.cardBackgroundColor, "#B2B2B2"]} // Adjust the colors as needed
                  style={styles.mealSection}
                  start={{ x: 0.0, y: 0.0 }} // Top left corner
                  end={{ x: 0.0, y: 2.5 }} // Bottom right corner
                >
                  <Card.Content>
                    <View style={styles.mealSectionHeaderContainer}>
                      <Text style={styles.sectionTitle}>{section.name}</Text>
                      <Text style={styles.totalMealSectionCalories}>
                        {calculateTotalCalories(
                          filteredEntriesByMeal[section.id]
                        )}
                      </Text>
                    </View>
                    <FoodEntryList
                      foodEntryItems={filteredEntriesByMeal[section.id]}
                      mealType={section.id}
                      handleOpenFoodNutrientModal={handleOpenFoodNutrientModal}
                    />
                    <Button
                      style={styles.addButton}
                      mode="elevated"
                      onPress={() => handleAddEntry(section.id)}
                    >
                      Add Food
                    </Button>
                  </Card.Content>
                </LinearGradient>
              </Card>
            )
        )}
      </ScrollView>

      <FoodlogFabGroupMenu
        isFocused={isFocused}
        openMealSectionCustomizationModal={
          handleOpenMealSectionCustomizationModal
        }
        openDailyNutritionGoalsCustomizationModal={
          handleOpenDailyNutritionGoalsCustomizationModal
        }
        openDailyNutritionGoalsCalculationModal={
          handleOpenDailyNutritionGoalsCalculationModal
        }
      />

      {/* Food Entry Modal opens when Add Food button is clicked */}
      <FoodEntryModal
        isVisible={isFoodEntryModalVisible}
        onSave={(foodName, calories) =>
          handleSaveEntry(activeMealSection, foodName, calories)
        }
        onCancel={handleCancelEntry}
        handleOpenFoodNutrientModal={handleOpenFoodNutrientModal}
      />

      {/* Food Nutrient Modal */}
      <FoodNutrientModal
        isVisible={isFoodNutrientModalVisible}
        closeModal={handleCloseFoodNutrientModal}
      />

      {/* Meal Section Customization Modal opens when the Fab Group action button called Customize Meal Names is clicked */}
      <MealSectionCustomizationModal
        isVisible={isMealSectionCustomizationModalVisible}
        closeModal={handleCloseMealSectionCustomizationModal}
      />
      {/* Daily Nutrition Goals Customization opens when the Fab Group action button called Customize Daily Nutrition Goals is clicked */}
      <DailyNutritionGoalsCustomizationModal
        isVisible={isDailyNutritionGoalsCustomizationModalVisible}
        closeModal={handleCloseDailyNutritionGoalsCustomizationModal}
      />

      {/* Daily Nutrition Goals Calculation opens when the Fab Group action button called Calculate Daily Nutrition Goals is clicked */}
      <DailyNutritionGoalsCalculationModal
        isVisible={isDailyNutritionGoalsCalculationModalVisible}
        closeModal={handleCloseDailyNutritionGoalsCalculationModal}
      />
    </SafeAreaView>
  );
}
