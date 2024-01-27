import React, { useState, useRef, useEffect } from "react";
import { Text, View, SectionList, Dimensions } from "react-native";
import * as Haptics from "expo-haptics";
import { Card, Button, IconButton } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";
import FoodEntryModal from "../features/foodDiary/components/FoodEntryModal.js";
import MealSectionCustomizationModal from "../features/foodDiary/components/MealSectionCustomizationModal.js";
import DailyNutritionGoalsCustomizationModal from "../features/foodDiary/components/DailyNutritionGoalsCustomizationModal.js";
import DailyNutritionGoalsCalculationModal from "../features/foodDiary/components/DailyNutritionGoalsCalculationModal.js";
import FoodNutrientModal from "../features/foodDiary/components/FoodNutrientModal.js";
import foodDiaryScreenStyles from "./styles/foodDiaryScreenStyles.js";
import SwipeableFoodEntryListItem from "../features/foodDiary/components/SwipeableFoodEntryListItem.js";
import DateSelector from "../components/DateSelector.js";
import FoodlogFabGroupMenu from "../features/foodDiary/components/FabGroupMenu.js";
import { useFoodLog } from "../features/foodDiary/context/FoodLogContext.js";
import { useUserSettings } from "../features/userSettings/context/UserSettingsContext.js";
import { useThemeContext } from "../context/ThemeContext.js";
import CarouselRenderItemComponent from "../features/foodDiary/components/CarouselRenderItemComponent.js";
import CarouselWithIndicators from "../features/foodDiary/components/CarouselWithIndicators.js";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

export default function FoodDiaryScreen() {
  const styles = foodDiaryScreenStyles();
  const { theme, mode } = useThemeContext();
  const { mealSections, foodEntries, saveFoodLogEntry } = useFoodLog();
  const { getNutritionalGoals } = useUserSettings();
  const { calorieGoal } = getNutritionalGoals();
  const [activeMealSection, setActiveMealSection] = useState(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [activeFoodItem, setActiveFoodItem] = useState({});

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
  const [foodNutrientModalType, setFoodNutrientModalType] = useState("");

  const isFocused = useIsFocused();
  const flatListRef = useRef(null);

  const calculateTotalCalories = (entries) => {
    if (!Array.isArray(entries)) {
      return 0;
    }

    return entries.reduce((total, entry) => {
      if (entry && entry?.nutrients?.ENERC_KCAL?.quantity) {
        const entryCalories = parseFloat(
          entry?.nutrients?.ENERC_KCAL?.quantity
        );

        return total + entryCalories;
      } else {
        return total;
      }
    }, 0);
  };

  const handleAddEntry = (mealType) => {
    setActiveMealSection(mealType);
    setIsFoodEntryModalVisible(true);
  };

  const handleSaveEntry = (mealType, selectedFood) => {
    saveFoodLogEntry(mealType, selectedFood, selectedDate);
  };

  const handleCloseFoodEntryModal = () => {
    setIsFoodEntryModalVisible(false);
    setActiveMealSection(null);
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

  const handleOpenFoodNutrientModal = (title, activeItem) => {
    setFoodNutrientModalType(title);
    setActiveFoodItem(activeItem);
    setIsFoodNutrientModalVisible(true);
  };

  const filteredEntriesByMeal = {};
  mealSections.forEach((section) => {
    // Use optional chaining here to handle potential undefined properties
    if (foodEntries?.[section.id]) {
      filteredEntriesByMeal[section.id] = foodEntries[section.id].filter(
        (entry) => entry?.date === selectedDate
      );
    }
  });

  const calorieProgressBarPercentage =
    calculateTotalCalories(
      mealSections.flatMap((section) => filteredEntriesByMeal[section.id])
    ) / calorieGoal;

  const [collapsedSections, setCollapsedSections] = useState([]);
  const toggleSection = (sectionId) => {
    setCollapsedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const [sections, setSections] = useState([]);

  const updateSections = () => {
    const newSections = mealSections
      .filter((section) => section.name)
      .map((section) => {
        const dataForSelectedDate = foodEntries[section.id]
          ?.filter((entry) => entry?.date === selectedDate)
          .map((entry) => ({
            ...entry,
            mealType: section.id, // Set the mealType based on the section.id
          }));

        return {
          id: section.id,
          name: section.name,
          data: dataForSelectedDate || [],
        };
      });

    setSections(newSections);
  };

  const toggleOptions = (sectionId) => {
    console.log("Toggle Options");
  };

  const renderSectionHeader = ({ section }) => {
    //console.log("Meal Section Data: " + JSON.stringify(section, null, 1));
    return (
      <Card style={styles.mealSectionHeaderContainer}>
        <Card.Content
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 14,
            paddingVertical: 5,
          }}
        >
          <Text style={styles.sectionTitle}>{section.name}</Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 30,
            }}
          >
            <Text style={styles.totalMealSectionCalories}>
              {Math.round(calculateTotalCalories(section.data))}
            </Text>
            <IconButton
              icon={"dots-hexagon"}
              iconColor={theme.colors.primary}
              style={{ margin: 0, padding: 0 }}
              onPress={() => toggleSection(section.id)}
            >
              {collapsedSections.includes(section.id) ? "Expand" : "Collapse"}
            </IconButton>
          </View>
        </Card.Content>
      </Card>
    );
  };

  const renderItem = ({ item, section }) => {
    //console.log("Item: " + JSON.stringify(item, null, 2));
    return (
      !collapsedSections.includes(section.id) && (
        <SwipeableFoodEntryListItem
          item={item}
          foodEntryItems={section.data}
          mealType={item.mealType}
          handleOpenFoodNutrientModal={(title, activeItem) =>
            handleOpenFoodNutrientModal(title, activeItem)
          }
        />
      )
    );
  };

  const renderSectionFooter = ({ section }) => {
    return (
      !collapsedSections.includes(section.id) && (
        <View style={styles.mealSectionFooterContainer}>
          <Button
            style={styles.footerButton}
            mode="elevated"
            onPress={() => {
              handleAddEntry(section);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            Add Food
          </Button>
          <IconButton
            size={28}
            icon={"dots-horizontal"}
            style={{ ...styles.footerButton, margin: 0, padding: 0 }}
            onPress={() => toggleOptions(section.id)}
          >
            {collapsedSections.includes(section.id) ? "Expand" : "Collapse"}
          </IconButton>
        </View>
      )
    );
  };

  // Calculate total calories and remaining calories
  const totalCalories = calculateTotalCalories(
    mealSections.flatMap((section) => filteredEntriesByMeal[section.id])
  );

  const caloriesRemaining = calorieGoal - totalCalories;

  const carouselHeight = screenHeight * 0.22; // Set the height to 22% of the screen height
  const carouselWidth = screenWidth; // Set the width to 100% of the screen width

  const carouselSlides = [
    {
      type: "CaloriesProgressSection",
      calorieGoal: calorieGoal,
      totalCalories: totalCalories,
      caloriesRemaining: caloriesRemaining,
      calorieProgressBarPercentage: calorieProgressBarPercentage,
    },
    {
      type: "MacroProgressSection",
    },
    {
      type: "DailyNutritionPerformanceSummary",
      calorieGoal: calorieGoal,
      totalCalories: totalCalories,
      caloriesRemaining: caloriesRemaining,
    },
  ];

  const [refreshSectionList, setRefreshSectionList] = useState(false);

  useEffect(() => {
    setRefreshSectionList(true);
    console.log("useEffect Running. Section List Refreshing.");
    updateSections();
    console.log("useEffect Ran. Section List Done Refreshing.");
    setRefreshSectionList(false);
  }, [selectedDate, foodEntries, mealSections]);

  return (
    <View style={styles.safeAreaView}>
      {/* Date Selector Section */}
      <DateSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
        }}
      >
        <CarouselWithIndicators
          carouselHeight={carouselHeight}
          carouselWidth={carouselWidth}
          carouselSlides={carouselSlides}
          renderItem={({ item }) => <CarouselRenderItemComponent item={item} />}
          theme={theme}
        />
      </View>
      <SectionList
        ref={flatListRef}
        sections={sections}
        keyExtractor={(item, index) => item.id}
        onRefresh={updateSections}
        refreshing={refreshSectionList}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        renderSectionFooter={renderSectionFooter}
        stickySectionHeadersEnabled
        contentContainerStyle={{ paddingBottom: 100 }}
      />
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
        onSave={(selectedFood) =>
          handleSaveEntry(activeMealSection.id, selectedFood)
        }
        onCancel={handleCloseFoodEntryModal}
        activeFoodItem={activeFoodItem}
        setActiveFoodItem={setActiveFoodItem}
        foodNutrientModalType={foodNutrientModalType}
        setFoodNutrientModalType={setFoodNutrientModalType}
        activeMealSection={activeMealSection}
        selectedDate={selectedDate}
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
      {/* Food Nutrient Modal */}

      <FoodNutrientModal
        isVisible={isFoodNutrientModalVisible}
        closeModal={handleCloseFoodNutrientModal}
        activeFoodItem={activeFoodItem}
        setActiveFoodItem={setActiveFoodItem}
        foodNutrientModalType={foodNutrientModalType}
        selectedDate={selectedDate}
      />
    </View>
  );
}
