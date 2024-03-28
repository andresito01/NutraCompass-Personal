import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  Text,
  View,
  SectionList,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import * as Haptics from "expo-haptics";
import { Card, Button, IconButton, Divider } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";
import FoodEntryModal from "../features/FoodDiary/components/FoodEntryModal.js";
import MealSectionCustomizationModal from "../features/FoodDiary/components/MealSectionCustomizationModal.js";
import DailyNutritionGoalsCustomizationModal from "../features/FoodDiary/components/DailyNutritionGoalsCustomizationModal.js";
import DailyNutritionGoalsCalculationModal from "../features/FoodDiary/components/DailyNutritionGoalsCalculationModal.js";
import FoodNutrientModal from "../features/FoodDiary/components/FoodNutrientModal.js";
import foodDiaryScreenStyles from "./styles/foodDiaryScreenStyles.js";
import SwipeableFoodEntryListItem from "../features/FoodDiary/components/SwipeableFoodEntryListItem.js";
import DateSelector from "../components/DateSelector.js";
import FoodlogFabGroupMenu from "../features/FoodDiary/components/FabGroupMenu.js";
import { useFoodLog } from "../features/FoodDiary/context/FoodLogContext.js";
import { useUserSettings } from "../features/UserSettings/context/UserSettingsContext.js";
import { useThemeContext } from "../context/ThemeContext.js";
import CarouselRenderItemComponent from "../features/FoodDiary/components/CarouselRenderItemComponent.js";
import CarouselWithIndicators from "../features/FoodDiary/components/CarouselWithIndicators.js";
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { Entypo } from "@expo/vector-icons";
// import { SimpleLineIcons } from "@expo/vector-icons";
// import { EvilIcons } from "@expo/vector-icons";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

export default function FoodDiaryScreen() {
  const styles = foodDiaryScreenStyles();
  const { theme, mode } = useThemeContext();
  const {
    mealSections,
    foodEntries,
    calculateTotalCaloriesAndMacros,
    totalDailyCaloriesAndMacrosConsumed,
    selectedDate,
    setSelectedDate,
  } = useFoodLog();
  const { getNutritionalGoals } = useUserSettings();
  const { calorieGoal, macroGoals } = getNutritionalGoals();
  const [activeMealSection, setActiveMealSection] = useState(null);
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
  const [collapsedSections, setCollapsedSections] = useState([]);
  const [sections, setSections] = useState([]);
  const [isMealSectionMenuVisible, setIsMealSectionMenuVisible] =
    useState(false);

  const isFocused = useIsFocused();

  useEffect(() => {
    setRefreshSectionList(true);
    updateSections();
  }, [selectedDate, foodEntries, mealSections]);

  const toggleMealSectionOptionsMenu = (sectionId) => {
    console.log("Meal Id: " + sectionId);
    setIsMenuVisible(!isMenuVisible);
  };

  const handleDeleteMealSectionEntries = () => {
    // Implement your delete functionality here
    console.log("Delete section");
  };

  const handleOpenFoodEntryModal = (mealType) => {
    setActiveMealSection(mealType);
    setIsFoodEntryModalVisible(true);
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

  const handleOpenFoodNutrientModal = (activeItem) => {
    setActiveFoodItem(activeItem);
    setIsFoodNutrientModalVisible(true);
  };

  const toggleSection = (sectionId) => {
    setCollapsedSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId]
    );
  };

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
    setRefreshSectionList(false); // Set refreshing back to false after updating sections
  };

  // Calories remaining in relation to the daily calorie goal
  const caloriesRemaining =
    calorieGoal - totalDailyCaloriesAndMacrosConsumed.calories;

  const calorieProgressBarPercentage =
    totalDailyCaloriesAndMacrosConsumed.calories / calorieGoal;

  const renderSectionHeader = ({ section }) => {
    const totalSectionCaloriesAndMacrosConsumed =
      calculateTotalCaloriesAndMacros(section.data);
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
              {Math.round(totalSectionCaloriesAndMacrosConsumed.calories)}
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
    return (
      !collapsedSections.includes(section.id) && (
        <SwipeableFoodEntryListItem
          item={item}
          foodEntryItems={section.data}
          mealType={item.mealType}
          handleOpenFoodNutrientModal={(activeItem) =>
            handleOpenFoodNutrientModal(activeItem)
          }
        />
      )
    );
  };

  // Meal Section Toggle Action Menu Option
  const QuickAddToMealSection = ({ text, value, iconName, iconColor }) => (
    <MenuOption
      onSelect={() => console.log(`You clicked ${value}`)}
      customStyles={{
        optionWrapper: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
      }}
    >
      <Text style={{ color: theme.colors.primaryTextColor }}>{text}</Text>
      <Entypo name={iconName} size={24} color={iconColor} />
    </MenuOption>
  );

  // Meal Section Toggle Action Menu Option
  const DeleteAllMealSectionEntries = ({
    text,
    value,
    iconName,
    iconColor,
  }) => (
    <MenuOption
      onSelect={() => console.log(`You clicked ${value}`)}
      customStyles={{
        optionWrapper: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
      }}
    >
      <Text style={{ color: theme.colors.primaryTextColor }}>{text}</Text>
      <Entypo name={iconName} size={24} color={iconColor} />
    </MenuOption>
  );

  // Meal Section Toggle Action Menu Option
  const CopyMealSectionFromDate = ({ text, value, iconName, iconColor }) => (
    <MenuOption
      onSelect={() => console.log(`You clicked ${value}`)}
      customStyles={{
        optionWrapper: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
      }}
    >
      <Text style={{ color: theme.colors.primaryTextColor }}>{text}</Text>
      <Entypo name={iconName} size={24} color={iconColor} />
    </MenuOption>
  );

  // Meal Section Toggle Action Menu Option
  const SaveMealSectionEntriesAsCustomMeal = ({
    text,
    value,
    iconName,
    iconColor,
  }) => (
    <MenuOption
      onSelect={() => console.log(`You clicked ${value}`)}
      customStyles={{
        optionWrapper: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
      }}
    >
      <Text style={{ color: theme.colors.primaryTextColor }}>{text}</Text>
      <Entypo name={iconName} size={24} color={iconColor} />
    </MenuOption>
  );

  // Meal Section Toggle Action Menu Option
  const CopyMealSectionToDate = ({ text, value, iconName, iconColor }) => (
    <MenuOption
      onSelect={() => console.log(`You clicked ${value}`)}
      customStyles={{
        optionWrapper: {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        },
      }}
    >
      <Text style={{ color: theme.colors.primaryTextColor }}>{text}</Text>
      <Entypo name={iconName} size={24} color={iconColor} />
    </MenuOption>
  );

  // Meal Section Toggle Action Menu
  const MealSectionToggleMenu = () => {
    return (
      <Menu
        style={{ marginRight: 10 }}
        visible={isMealSectionMenuVisible}
        onDismiss={() => setIsMealSectionMenuVisible(false)}
      >
        <MenuTrigger style={styles.footerButton}>
          <Entypo
            name="dots-three-horizontal"
            size={24}
            color={theme.colors.primaryTextColor}
          />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              borderRadius: 10,
              borderWidth: 1,
              borderColor: theme.colors.cardBorderColor,
              backgroundColor: theme.colors.surface,
            },
          }}
        >
          <QuickAddToMealSection
            text="Quick Add"
            value="Quick Add"
            iconName="add-to-list"
            iconColor={"#53E032"}
          />
          <Divider />
          <DeleteAllMealSectionEntries
            text="Clear All Entries"
            value="Clear All Entries"
            iconName="trash"
            iconColor={"#FE9089"}
          />
          <Divider />
          <CopyMealSectionFromDate
            text="Copy From Date"
            value="Copy From Date"
            iconName="cycle"
            iconColor={"#FED589"}
          />
          <Divider />
          <CopyMealSectionToDate
            text="Copy To Date"
            value="Copy From Date"
            iconName="copy"
            iconColor={"lightblue"}
          />
          <Divider />
          <SaveMealSectionEntriesAsCustomMeal
            text="Save as Meal"
            value="Save as Meal"
            iconName="database"
            iconColor={"#9089FE"}
          />
        </MenuOptions>
      </Menu>
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
              handleOpenFoodEntryModal(section);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            Add Food
          </Button>

          <MealSectionToggleMenu />
        </View>
      )
    );
  };

  const carouselHeight = screenHeight * 0.27; // Set the height to 22% of the screen height
  const carouselWidth = screenWidth; // Set the width to 100% of the screen width

  const carouselSlides = [
    {
      type: "CaloriesAndWaterProgressSection",
      calorieGoal: calorieGoal,
      totalCalories: totalDailyCaloriesAndMacrosConsumed.calories,
      caloriesRemaining: caloriesRemaining,
      calorieProgressBarPercentage: calorieProgressBarPercentage,
    },
    {
      type: "MacroProgressSection",
      carbsData: {
        percentage:
          totalDailyCaloriesAndMacrosConsumed.carbs /
          macroGoals.carb.dailyGrams,
        color: "orange",
        label: "Carbs",
        totalGramsGoal: macroGoals.carb.dailyGrams,
        consumedGrams: totalDailyCaloriesAndMacrosConsumed.carbs, // Example value, replace with actual data
      },
      proteinData: {
        percentage:
          totalDailyCaloriesAndMacrosConsumed.protein /
          macroGoals.protein.dailyGrams,
        color: "green",
        label: "Protein",
        totalGramsGoal: macroGoals.protein.dailyGrams,
        consumedGrams: totalDailyCaloriesAndMacrosConsumed.protein, // Example value, replace with actual data
      },
      fatData: {
        percentage:
          totalDailyCaloriesAndMacrosConsumed.fat / macroGoals.fat.dailyGrams,
        color: "red",
        label: "Fat",
        totalGramsGoal: macroGoals.fat.dailyGrams,
        consumedGrams: totalDailyCaloriesAndMacrosConsumed.fat, // Example value, replace with actual data
      },
    },
    // {
    //   type: "DailyNutritionPerformanceSummary",
    //   calorieGoal: calorieGoal,
    //   totalCalories: totalDailyCaloriesAndMacrosConsumed.calories,
    //   caloriesRemaining: caloriesRemaining,
    // },
  ];

  const [refreshSectionList, setRefreshSectionList] = useState(false);

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

      <View
        style={{
          backgroundColor: theme.colors.screenBackground,
          flex: 1,
        }}
      >
        <SectionList
          sections={sections}
          keyExtractor={(item, index) => item.id}
          onRefresh={updateSections}
          refreshing={refreshSectionList}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          renderSectionFooter={renderSectionFooter}
          stickySectionHeadersEnabled
          contentContainerStyle={{ flexGrow: 1 }}
          style={{
            marginBottom: 16,
            backgroundColor: theme.colors.screenBackground,
          }}
        />
      </View>

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
        onCancel={handleCloseFoodEntryModal}
        activeFoodItem={activeFoodItem}
        setActiveFoodItem={setActiveFoodItem}
        activeMealSection={activeMealSection}
        selectedDate={selectedDate}
        isBuildingMeal={false}
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
        foodNutrientModalType={"Edit Entry"}
        selectedDate={selectedDate}
        isBuildingMeal={false}
      />
    </View>
  );
}
