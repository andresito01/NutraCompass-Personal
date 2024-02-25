import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { TextInput, Appbar, ProgressBar, IconButton } from "react-native-paper";
import * as Haptics from "expo-haptics";
import Modal from "react-native-modal";
import Feather from "react-native-vector-icons/Feather";
import foodNutrientModalStyles from "./styles/foodNutrientModalStyles.js";
import Svg, { Circle, G, Text as SvgText, Path } from "react-native-svg";
import { useThemeContext } from "../../../context/ThemeContext.js";
import { useUserSettings } from "../../userSettings/context/UserSettingsContext.js";
import { useFoodLog } from "../context/FoodLogContext.js";
import {
  getNutrientsForFoodItem,
  processActiveFoodItemNumberOfServingsUpdate,
} from "../api/EdamamFoodDB/edamamMethods.js";

console.log("Food Nutrient Modal Rendered.");

const FoodNutrientModal = ({
  isVisible,
  closeModal,
  activeFoodItem,
  setActiveFoodItem,
  foodNutrientModalType,
  activeMealSection,
  selectedDate,
  isBuildingMeal,
  toggleSnackbar,
}) => {
  const styles = foodNutrientModalStyles();
  const { theme, mode } = useThemeContext();

  const {
    mealSections,
    saveOrUpdateSingleFoodItemToFoodLog,
    saveOrUpdateCustomMeal,
    saveFoodToTempCustomMeal,
    saveMealToFoodLog,
    tempCustomMeal,
  } = useFoodLog();
  const { getNutritionalGoals } = useUserSettings();
  const { calorieGoal, macroGoals } = getNutritionalGoals();

  const [showItemList, setShowItemList] = useState(false);
  const [showNutritionFactsList, setShowNutritionFactsList] = useState(false);
  const [showVitaminList, setShowVitaminList] = useState(false);
  const [showMineralList, setShowMineralList] = useState(false);
  // State to store the nutrient data for a single serving
  const [activeFoodItemOneServing, setActiveFoodItemOneServing] = useState({});
  // State for selected serving size
  const [selectedServing, setSelectedServing] = useState(
    activeFoodItem?.activeMeasure
  );
  // State for the number of servings
  const [numberOfServings, setNumberOfServings] = useState(
    activeFoodItem?.numberOfServings || 1
  );
  // State for select/change meal section the food item is to be added to.
  const [selectedMealSection, setSelectedMealSection] = useState(
    activeFoodItem?.mealType ||
      mealSections.filter((mealOption) => mealOption.id === activeMealSection)
  );
  // State for select serving modal visibility
  const [isSelectServingSizeVisible, setIsSelectServingSizeVisible] =
    useState(false);
  // State for select meal modal visibility
  const [isSelectMealVisible, setIsSelectMealVisible] = useState(false);
  // State to keep track of whether to disable inputs
  const [disableInputs, setDisableInputs] = useState(false);

  // Get screen width
  const screenWidth = Dimensions.get("window").width;

  calorieColor = "blue";
  carbColor = "orange";
  proteinColor = "green";
  fatColor = "red";

  // Effect to update selectedServing and numberOfServings when isVisible changes
  useEffect(() => {
    const fetchData = async () => {
      if (isVisible === true) {
        if (activeFoodItem?.isCustomMeal && isBuildingMeal) {
          setDisableInputs(true); // Disable inputs if building a meal and activeFoodItem is a custom meal
          const numberOfServingsNutrientData =
            processActiveFoodItemNumberOfServingsUpdate(
              activeFoodItem,
              activeFoodItem?.numberOfServings || 1
            );

          setActiveFoodItem((prevActiveFoodItem) => ({
            ...prevActiveFoodItem,
            nutrients: numberOfServingsNutrientData,
          }));
        } else if (activeFoodItem?.mealItems && !isBuildingMeal) {
          // Process meal structure
          const totalNutrients = activeFoodItem.nutrients;

          setActiveFoodItem((prevActiveFoodItem) => ({
            ...prevActiveFoodItem,
            nutrients: totalNutrients,
          }));

          setDisableInputs(false); // Disable inputs for meal items
        } else {
          // Process individual food item
          setDisableInputs(false); // Enable inputs otherwise
          // Check if activeFoodItemOneServing is empty
          if (
            !activeFoodItemOneServing ||
            Object.keys(activeFoodItemOneServing).length === 0
          ) {
            try {
              const selectedFoodWithSearchedNutrientInfo =
                await getNutrientsForFoodItem(activeFoodItem);

              const numberOfServingsNutrientData =
                processActiveFoodItemNumberOfServingsUpdate(
                  selectedFoodWithSearchedNutrientInfo,
                  activeFoodItem?.numberOfServings || 1
                );

              setActiveFoodItem((prevActiveFoodItem) => ({
                ...prevActiveFoodItem,
                nutrients: numberOfServingsNutrientData,
              }));
              setActiveFoodItemOneServing(selectedFoodWithSearchedNutrientInfo);
            } catch (error) {
              console.error("Error fetching nutrient data:", error);
            }
          }
        }

        setSelectedServing(activeFoodItem?.activeMeasure);
        setNumberOfServings(activeFoodItem?.numberOfServings || 1);

        const activeMealSectionFromDiary = mealSections.filter(
          (mealOption) => mealOption.id === activeFoodItem?.mealType
        );

        setSelectedMealSection(
          activeMealSection || activeMealSectionFromDiary[0]
        );
      } else {
        setSelectedServing(null);
        setNumberOfServings(null);
        setSelectedMealSection(null);
        setActiveFoodItemOneServing(null);
      }
    };

    fetchData();
  }, [isVisible]);

  const toggleSelectServing = () => {
    if (isSelectMealVisible) {
      toggleSelectMeal();
    }

    setIsSelectServingSizeVisible(!isSelectServingSizeVisible);
  };

  const toggleSelectMeal = () => {
    if (isSelectServingSizeVisible) {
      toggleSelectServing();
    }

    setIsSelectMealVisible(!isSelectMealVisible);
  };

  const hideSelectServingAndSelectMealOnTextInputFocus = () => {
    if (isSelectServingSizeVisible) setIsSelectServingSizeVisible(false);

    if (isSelectMealVisible) setIsSelectMealVisible(false);
  };

  const handleSelectMeal = (mealOption) => {
    if (isSelectMealVisible) {
      toggleSelectMeal(); // Close the meal options modal
    }
    setSelectedMealSection(mealOption);
  };

  // Function to handle serving size selection
  const handleSelectServing = async (servingSizeOption) => {
    if (isSelectServingSizeVisible) {
      toggleSelectServing(); // Close the serving size options modal
    }

    const selectedFoodWithUpdatedNutrientInfoBasedOnServingSize =
      await getNutrientsForFoodItem(activeFoodItem, servingSizeOption);

    const numberOfServingsNutrientData =
      processActiveFoodItemNumberOfServingsUpdate(
        selectedFoodWithUpdatedNutrientInfoBasedOnServingSize,
        numberOfServings
      );

    setActiveFoodItemOneServing(
      selectedFoodWithUpdatedNutrientInfoBasedOnServingSize
    );
    setSelectedServing(servingSizeOption);
    setActiveFoodItem((prevActiveFoodItem) => ({
      ...prevActiveFoodItem,
      activeMeasure: servingSizeOption,
      nutrients: numberOfServingsNutrientData,
    }));
  };

  // Function to update the number of servings
  const updateNumberOfServings = async (newNumberOfServings) => {
    // Check if activeFoodItemOneServing is empty
    if (
      !activeFoodItemOneServing ||
      Object.keys(activeFoodItemOneServing).length === 0
    ) {
      console.log(
        "Cannot update nutrients based on number of serving changes, without activeFoodItemOneServing."
      );
      return;
    }

    const servings = parseFloat(newNumberOfServings);
    setNumberOfServings(servings);

    const updatedActiveItemNutrients =
      processActiveFoodItemNumberOfServingsUpdate(
        activeFoodItemOneServing,
        servings
      );

    setActiveFoodItem((prevActiveFoodItem) => ({
      ...prevActiveFoodItem,
      numberOfServings: servings,
      nutrients: updatedActiveItemNutrients,
    }));
  };

  const handleEditFoodEntryAndSave = () => {
    // If not building a meal, a selected meal section exists, selected date is valid,
    // an active food item is selected, and the active food item is a custom meal
    if (
      !isBuildingMeal &&
      selectedMealSection &&
      selectedDate &&
      activeFoodItem &&
      activeFoodItem?.isCustomMeal
    ) {
      // Save the custom meal to the food log
      saveMealToFoodLog(selectedMealSection.id, selectedDate, activeFoodItem);
    }
    // If not building a meal, a selected meal section exists, selected date is valid,
    // and an active food item is selected
    else if (
      !isBuildingMeal &&
      selectedMealSection &&
      selectedDate &&
      activeFoodItem
    ) {
      // Update or save the individual food item to the food log
      saveOrUpdateSingleFoodItemToFoodLog(
        selectedMealSection.id,
        activeFoodItem?.id || null,
        activeFoodItem,
        selectedDate
      );
    }
    // If building a meal and the active food item is a custom meal
    else if (isBuildingMeal && activeFoodItem?.isCustomMeal) {
      // Save or update the custom meal
      saveOrUpdateCustomMeal(activeFoodItem);
    }
    // If building a meal and the active food item is not a custom meal
    else if (isBuildingMeal && activeFoodItem) {
      // Save the active food item to the temporary custom meal
      saveFoodToTempCustomMeal(activeFoodItem);
    }
    // If none of the above conditions are met
    else {
      // Log an error indicating an invalid state
      console.error(
        "Invalid state encountered while attempting to handle food entry: " +
          "isBuildingMeal:",
        isBuildingMeal,
        ", selectedMealSection:",
        selectedMealSection,
        ", selectedDate:",
        selectedDate,
        ", activeFoodItem:",
        activeFoodItem
      );
      return;
    }
    handleCloseModal();
    // Trigger snackbar if the user is not saving or updating a customMeal
    if (!(isBuildingMeal && activeFoodItem?.isCustomMeal)) {
      toggleSnackbar();
    }
  };

  const handleCloseModal = () => {
    setShowMineralList(false);
    setShowVitaminList(false);
    setShowNutritionFactsList(false);
    setActiveFoodItem(null);
    setIsSelectServingSizeVisible(false);
    setIsSelectMealVisible(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    closeModal();
  };

  const toggleItemList = () => {
    setShowItemList(!showItemList);
  };

  const toggleNutritionFactsList = () => {
    setShowNutritionFactsList(!showNutritionFactsList);
  };

  const toggleVitaminList = () => {
    setShowVitaminList(!showVitaminList);
  };

  const toggleMineralList = () => {
    setShowMineralList(!showMineralList);
  };

  const calculateMacroPercentages = (
    totalCalories,
    gramsOfCarbs,
    gramsOfProtein,
    gramsOfFat
  ) => {
    // Ensure valid numeric inputs
    if (
      isNaN(totalCalories) ||
      isNaN(gramsOfCarbs) ||
      isNaN(gramsOfProtein) ||
      isNaN(gramsOfFat) ||
      totalCalories <= 0
    ) {
      // Handle invalid or missing data
      return {
        percentageOfCarbs: 0,
        percentageOfProtein: 0,
        percentageOfFat: 0,
      };
    }

    // Calculate calories from each macronutrient
    const caloriesFromCarbs = gramsOfCarbs * 4;
    const caloriesFromProtein = gramsOfProtein * 4;
    const caloriesFromFat = gramsOfFat * 9;

    // Calculate total calories and adjust percentages if they surpass 100
    const totalCaloriesFloat = parseFloat(totalCalories); // Convert to float for precision
    let totalPercentage = 0;

    const calculatePercentage = (calories) => {
      return ((calories / totalCaloriesFloat) * 100).toFixed(2);
    };

    const percentageOfCarbs = calculatePercentage(caloriesFromCarbs);
    totalPercentage += parseFloat(percentageOfCarbs);

    const percentageOfProtein = calculatePercentage(caloriesFromProtein);
    totalPercentage += parseFloat(percentageOfProtein);

    const percentageOfFat = calculatePercentage(caloriesFromFat);
    totalPercentage += parseFloat(percentageOfFat);

    // Adjust percentages if they surpass 100
    if (totalPercentage > 100) {
      const adjustmentFactor = 100 / totalPercentage;
      totalPercentage = 0;

      return {
        percentageOfCarbs: (
          parseFloat(percentageOfCarbs) * adjustmentFactor
        ).toFixed(2),
        percentageOfProtein: (
          parseFloat(percentageOfProtein) * adjustmentFactor
        ).toFixed(2),
        percentageOfFat: (
          parseFloat(percentageOfFat) * adjustmentFactor
        ).toFixed(2),
      };
    }

    return {
      percentageOfCarbs: parseFloat(percentageOfCarbs),
      percentageOfProtein: parseFloat(percentageOfProtein),
      percentageOfFat: parseFloat(percentageOfFat),
    };
  };

  // Extract nutrient values
  const totalCalories = activeFoodItem?.nutrients?.ENERC_KCAL?.quantity || 0;
  const gramsOfCarbs = activeFoodItem?.nutrients?.CHOCDF?.quantity || 0;
  const gramsOfProtein = activeFoodItem?.nutrients?.PROCNT?.quantity || 0;
  const gramsOfFat = activeFoodItem?.nutrients?.FAT?.quantity || 0;

  // Calculate macro percentages
  const macroPercentagesInRelationToItemCalories = calculateMacroPercentages(
    totalCalories,
    gramsOfCarbs,
    gramsOfProtein,
    gramsOfFat
  );

  // Calculate percentages of daily goals
  const caloriesPercentageOfGoal = (totalCalories / calorieGoal).toFixed(2);
  const carbsPercentageOfGoal = (
    gramsOfCarbs / macroGoals.carb.dailyGrams
  ).toFixed(2);
  const proteinPercentageOfGoal = (
    gramsOfProtein / macroGoals.protein.dailyGrams
  ).toFixed(2);
  const fatPercentageOfGoal = (gramsOfFat / macroGoals.fat.dailyGrams).toFixed(
    2
  );

  const renderCircularChart = (
    carbsPercentage,
    fatPercentage,
    proteinPercentage,
    calories
  ) => {
    const chartData = [
      { percentage: carbsPercentage, color: carbColor, label: "Carbs" },
      { percentage: proteinPercentage, color: proteinColor, label: "Protein" },
      { percentage: fatPercentage, color: fatColor, label: "Fat" },
    ];

    const radius = 45;
    const circumference = 2 * Math.PI * radius;

    let currentAngle = 0;

    return (
      <Svg height="90" width="90">
        <G transform={{ translate: `${radius}, ${radius}` }}>
          {chartData.map((segment, index) => {
            const angle = (segment.percentage * 360) / 100;
            // Calculate the path for the entire circle (neutral background)
            const fullCirclePath = `M 0 -${radius} A ${radius} ${radius} 0 1 1 0 ${radius} A ${radius} ${radius} 0 1 1 0 -${radius}`;
            const path = `M 0 0 L ${
              radius * Math.cos((currentAngle * Math.PI) / 180)
            } ${
              radius * Math.sin((currentAngle * Math.PI) / 180)
            } A ${radius} ${radius} 0 ${angle > 180 ? 1 : 0} 1 ${
              radius * Math.cos(((currentAngle + angle) * Math.PI) / 180)
            } ${radius * Math.sin(((currentAngle + angle) * Math.PI) / 180)} Z`;
            currentAngle += angle;

            return (
              <React.Fragment key={index}>
                <Path
                  d={fullCirclePath}
                  fill={
                    mode === "dark"
                      ? "rgba(255, 255, 255, 0.1)"
                      : "rgba(0, 0, 0, 0.1)"
                  }
                />
                <Path d={path} fill={segment.color} />
              </React.Fragment>
            );
          })}
          <Circle r={radius - 5} fill={theme.colors.surface} />

          <SvgText
            fill={theme.colors.cardHeaderTextColor}
            fontSize="16"
            fontWeight="bold"
            textAnchor="middle"
            alignmentBaseline="middle"
            transform="translate(0, -6)"
          >
            {Math.round(calories)}
          </SvgText>
          <SvgText
            fill={theme.colors.cardHeaderTextColor}
            fontSize="12"
            textAnchor="middle"
            alignmentBaseline="middle"
            transform="translate(0, 15)"
          >
            cal
          </SvgText>
        </G>
      </Svg>
    );
  };

  const renderNutrientRows = (nutrientKeysOrder, isIndented = false) => {
    if (!Array.isArray(nutrientKeysOrder)) return;

    const NutrientComponent = isIndented
      ? NutritionFactsIndentedRow
      : NutritionFactsRow;

    return nutrientKeysOrder.map((nutrientKey, index) => (
      <NutrientComponent
        key={`${nutrientKey}_${index}`}
        label={activeFoodItem?.nutrients?.[nutrientKey]?.label}
        quantity={activeFoodItem?.nutrients?.[nutrientKey]?.quantity}
        unit={
          nutrientKey === "ENERC_KCAL"
            ? ""
            : activeFoodItem?.nutrients?.[nutrientKey]?.unit
        }
        totalDaily={
          activeFoodItem?.nutrients?.[nutrientKey]?.totalDaily?.quantity
        }
        totalDailyUnit={
          activeFoodItem?.nutrients?.[nutrientKey]?.totalDaily?.unit
        }
        color={theme.colors.cardHeaderTextColor}
      />
    ));
  };

  const renderVitaminNutrientRows = (nutrientKeysOrder, isIndented = false) => {
    if (!Array.isArray(nutrientKeysOrder)) return;

    const NutrientComponent = isIndented
      ? NutritionFactsIndentedRow
      : NutritionFactsRow;

    return nutrientKeysOrder.map((nutrientKey, index) => (
      <NutrientComponent
        key={`${nutrientKey}_${index}`}
        label={activeFoodItem?.nutrients?.vitamins?.[nutrientKey]?.label}
        quantity={activeFoodItem?.nutrients?.vitamins?.[nutrientKey]?.quantity}
        unit={activeFoodItem?.nutrients?.vitamins?.[nutrientKey]?.unit}
        totalDaily={
          activeFoodItem?.nutrients?.vitamins?.[nutrientKey]?.totalDaily
            ?.quantity
        }
        totalDailyUnit={
          activeFoodItem?.nutrients?.vitamins?.[nutrientKey]?.totalDaily?.unit
        }
        color={theme.colors.cardHeaderTextColor}
      />
    ));
  };

  const renderMineralNutrientRows = (nutrientKeysOrder, isIndented = false) => {
    if (!Array.isArray(nutrientKeysOrder)) return;

    const NutrientComponent = isIndented
      ? NutritionFactsIndentedRow
      : NutritionFactsRow;

    return nutrientKeysOrder.map((nutrientKey, index) => (
      <NutrientComponent
        key={`${nutrientKey}_${index}`}
        label={activeFoodItem?.nutrients?.minerals?.[nutrientKey]?.label}
        quantity={activeFoodItem?.nutrients?.minerals?.[nutrientKey]?.quantity}
        unit={activeFoodItem?.nutrients?.minerals?.[nutrientKey]?.unit}
        totalDaily={
          activeFoodItem?.nutrients?.minerals?.[nutrientKey]?.totalDaily
            ?.quantity
        }
        totalDailyUnit={
          activeFoodItem?.nutrients?.minerals?.[nutrientKey]?.totalDaily?.unit
        }
        color={theme.colors.cardHeaderTextColor}
      />
    ));
  };

  const vitaminKeys = [
    "VITA_RAE",
    "VITC",
    "VITD",
    "TOCPHA",
    "VITK1",
    "THIA",
    "RIBF",
    "NIA",
    "VITB6A",
    "FOLDFE",
    "VITB12",
  ];
  const mineralKeys = ["CA", "FE", "MG", "P", "K", "NA", "ZN"];

  return (
    <Modal
      isVisible={isVisible}
      style={styles.container}
      avoidKeyboard={true}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
    >
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <Appbar.Header style={styles.header}>
            <Appbar.Action
              icon="chevron-left"
              size={32}
              onPress={handleCloseModal}
              color={theme.colors.cardHeaderTextColor}
            />
            <Appbar.Content
              title={foodNutrientModalType}
              titleStyle={styles.title}
            />
            <Appbar.Action
              icon="check"
              size={32}
              onPress={() => handleEditFoodEntryAndSave()}
              color={theme.colors.primary}
            />
          </Appbar.Header>

          {activeFoodItem && (
            <ScrollView>
              <TouchableOpacity
                onPress={() => {
                  if (isSelectServingSizeVisible) {
                    toggleSelectServing();
                  }
                  if (isSelectMealVisible) {
                    toggleSelectMeal();
                  }
                }}
                activeOpacity={1}
                style={{
                  gap: 10,
                }}
              >
                {/* Food Item Section */}
                <View style={styles.sectionContainer}>
                  <Text style={styles.foodItemName}>
                    {activeFoodItem?.foodLabel}
                  </Text>
                  <Text style={styles.brandCompany}>
                    {activeFoodItem?.foodBrand || activeFoodItem?.foodCategory}
                  </Text>
                </View>
                {/* Input Fields Section */}
                <View style={styles.sectionContainer}>
                  {!disableInputs && (
                    <View>
                      <View style={{ marginBottom: 16 }}>
                        <ServingSizeRow
                          isVisible={isSelectServingSizeVisible}
                          toggleSelectServing={toggleSelectServing}
                          label="Serving Size"
                          selectedServing={selectedServing}
                        />
                      </View>
                      <View style={{ marginBottom: 16 }}>
                        <NumberOfServingsRow
                          label="Number of Servings"
                          keyboardType="numeric"
                          numberOfServings={numberOfServings}
                          updateNumberOfServings={updateNumberOfServings}
                          hideSelectServingAndSelectMealOnTextInputFocus={
                            hideSelectServingAndSelectMealOnTextInputFocus
                          }
                        />
                      </View>

                      {!isBuildingMeal && (
                        <View style={{ marginBottom: 16 }}>
                          <MealRow
                            isVisible={isSelectMealVisible}
                            toggleSelectMeal={toggleSelectMeal}
                            label="Meal"
                            selectedMealOption={selectedMealSection}
                          />
                        </View>
                      )}
                    </View>
                  )}
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {/* Macronutrient Content: Carbs, Protein, Fat */}
                    {/* Example data, replace with actual values */}
                    {/* Circular Chart that shows calorie and macronutrient breakdown */}
                    <View style={styles.macroNutrientColumn}>
                      {renderCircularChart(
                        macroPercentagesInRelationToItemCalories.percentageOfCarbs,
                        macroPercentagesInRelationToItemCalories.percentageOfFat,
                        macroPercentagesInRelationToItemCalories.percentageOfProtein,
                        totalCalories
                      )}
                    </View>

                    <View style={styles.macroNutrientColumn}>
                      <Text
                        style={{
                          ...styles.macroNutrientPercentage,
                          color: carbColor,
                        }}
                      >
                        {Math.round(
                          macroPercentagesInRelationToItemCalories.percentageOfCarbs
                        )}
                        %
                      </Text>
                      <Text style={styles.macroNutrientValue}>
                        {Math.round(gramsOfCarbs)}{" "}
                        {activeFoodItem?.nutrients?.CHOCDF?.unit}
                      </Text>
                      <Text style={styles.macroNutrientLabel}>Carbs</Text>
                    </View>
                    <View style={styles.macroNutrientColumn}>
                      <Text
                        style={{
                          ...styles.macroNutrientPercentage,
                          color: proteinColor,
                        }}
                      >
                        {Math.round(
                          macroPercentagesInRelationToItemCalories.percentageOfProtein
                        )}
                        %
                      </Text>
                      <Text style={styles.macroNutrientValue}>
                        {Math.round(gramsOfProtein)}{" "}
                        {activeFoodItem?.nutrients?.PROCNT?.unit}
                      </Text>
                      <Text style={styles.macroNutrientLabel}>Protein</Text>
                    </View>
                    <View style={styles.macroNutrientColumn}>
                      <Text
                        style={{
                          ...styles.macroNutrientPercentage,
                          color: fatColor,
                        }}
                      >
                        {Math.round(
                          macroPercentagesInRelationToItemCalories.percentageOfFat
                        )}
                        %
                      </Text>
                      <Text style={styles.macroNutrientValue}>
                        {Math.round(gramsOfFat)}{" "}
                        {activeFoodItem?.nutrients?.FAT?.unit}
                      </Text>
                      <Text style={styles.macroNutrientLabel}>Fat</Text>
                    </View>
                  </View>
                </View>
                {/* Calorie and Macronutrient Percent of Daily Goals */}
                <View style={styles.sectionContainer}>
                  <Text style={styles.nutritionFactsLabel}>
                    Percent of Daily Goals
                  </Text>
                  <View style={styles.progressContainer}>
                    {/* Progress bar for Calories */}
                    <View style={styles.progressItem}>
                      <ProgressBar
                        progress={caloriesPercentageOfGoal} // Replace with actual progress value
                        color={calorieColor}
                        style={{
                          height: 10,
                          width: screenWidth * 0.22,
                          borderRadius: 5,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: theme.colors.cardHeaderTextColor,
                        }}
                      >
                        {Math.round(caloriesPercentageOfGoal * 100)}%
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                          color: theme.colors.cardHeaderTextColor,
                        }}
                      >
                        Calories
                      </Text>
                    </View>
                    {/* Progress bar for Carbs */}
                    <View style={styles.progressItem}>
                      <ProgressBar
                        progress={carbsPercentageOfGoal} // Replace with actual progress value
                        color={carbColor}
                        style={{
                          height: 10,
                          width: screenWidth * 0.22,
                          borderRadius: 5,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: theme.colors.cardHeaderTextColor,
                        }}
                      >
                        {Math.round(carbsPercentageOfGoal * 100)}%
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                          color: theme.colors.cardHeaderTextColor,
                        }}
                      >
                        Carbs
                      </Text>
                    </View>
                    {/* Progress bar for Protein */}
                    <View style={styles.progressItem}>
                      <ProgressBar
                        progress={proteinPercentageOfGoal} // Replace with actual progress value
                        color={proteinColor}
                        style={{
                          height: 10,
                          width: screenWidth * 0.22,
                          borderRadius: 5,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: theme.colors.cardHeaderTextColor,
                        }}
                      >
                        {Math.round(proteinPercentageOfGoal * 100)}%
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                          color: theme.colors.cardHeaderTextColor,
                        }}
                      >
                        Protein
                      </Text>
                    </View>
                    {/* Progress bar for Fat */}
                    <View style={styles.progressItem}>
                      <ProgressBar
                        progress={fatPercentageOfGoal} // Replace with actual progress value
                        color={fatColor}
                        style={{
                          height: 10,
                          width: screenWidth * 0.22,
                          borderRadius: 5,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          color: theme.colors.cardHeaderTextColor,
                        }}
                      >
                        {Math.round(fatPercentageOfGoal * 100)}%
                      </Text>
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "bold",
                          color: theme.colors.cardHeaderTextColor,
                        }}
                      >
                        Fat
                      </Text>
                    </View>
                  </View>
                </View>
                {/* Nutritional Information List Toggle */}
                <View style={styles.sectionContainer}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text style={styles.nutritionFactsLabel}>
                      Nutrition Facts
                    </Text>
                    <TouchableOpacity
                      onPress={toggleNutritionFactsList}
                      style={{
                        flexDirection: "row",
                        gap: 5,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: theme.colors.primary,
                          fontWeight: "bold",
                        }}
                      >
                        {showNutritionFactsList ? "Hide" : "Show"}
                      </Text>
                      <Feather
                        name={
                          showNutritionFactsList ? "arrow-up" : "arrow-down"
                        }
                        color={theme.colors.primary}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {showNutritionFactsList && (
                  <View
                    style={{ ...styles.sectionContainer, paddingHorizontal: 0 }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        color: theme.colors.cardHeaderTextColor,
                        alignSelf: "flex-end",
                        marginBottom: 10,
                        paddingHorizontal: 16,
                      }}
                    >
                      % Daily Value
                    </Text>
                    {renderNutrientRows(["ENERC_KCAL"], false)}

                    <View style={styles.nutritionFactsSeparator} />

                    <View style={styles.nutritionFactsSection}>
                      {renderNutrientRows(["FAT"], false)}
                    </View>

                    {renderNutrientRows(
                      ["FASAT", "FATRN", "FAPU", "FAMS"],
                      true
                    )}

                    <View style={styles.nutritionFactsSeparator} />

                    <View style={styles.nutritionFactsSection}>
                      {renderNutrientRows(["CHOLE"], false)}
                    </View>

                    <View style={styles.nutritionFactsSeparator} />

                    <View style={styles.nutritionFactsSection}>
                      {renderMineralNutrientRows(["NA"], false)}
                    </View>

                    <View style={styles.nutritionFactsSeparator} />

                    <View style={styles.nutritionFactsSection}>
                      {renderNutrientRows(["CHOCDF"], false)}

                      {renderNutrientRows(["FIBTG"], true)}

                      {renderNutrientRows(["SUGAR"], true)}
                    </View>

                    <View style={styles.nutritionFactsSeparator} />

                    <View style={styles.nutritionFactsSection}>
                      {renderNutrientRows(["PROCNT"], false)}
                    </View>

                    <View style={styles.nutritionFactsSeparator} />

                    <View style={styles.nutritionFactsSection}>
                      <View style={styles.nutritionFactsRow}>
                        <Text style={styles.nutritionFactsLabel}>Vitamins</Text>
                        <TouchableOpacity
                          onPress={toggleVitaminList}
                          style={{
                            flexDirection: "row",
                            gap: 5,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: theme.colors.primary,
                              fontWeight: "bold",
                            }}
                          >
                            {showVitaminList ? "Hide" : "Show"}
                          </Text>
                          <Feather
                            name={showVitaminList ? "arrow-up" : "arrow-down"}
                            color={theme.colors.primary}
                            size={20}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={{ paddingTop: 10 }}>
                        {showVitaminList &&
                          renderVitaminNutrientRows(vitaminKeys, true)}
                      </View>
                    </View>

                    <View style={styles.nutritionFactsSeparator} />

                    <View style={styles.nutritionFactsSection}>
                      <View style={styles.nutritionFactsRow}>
                        <Text style={styles.nutritionFactsLabel}>Minerals</Text>
                        <TouchableOpacity
                          onPress={toggleMineralList}
                          style={{
                            flexDirection: "row",
                            gap: 5,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: theme.colors.primary,
                              fontWeight: "bold",
                            }}
                          >
                            {showMineralList ? "Hide" : "Show"}
                          </Text>
                          <Feather
                            name={showMineralList ? "arrow-up" : "arrow-down"}
                            color={theme.colors.primary}
                            size={20}
                          />
                        </TouchableOpacity>
                      </View>
                      <View style={{ paddingTop: 10 }}>
                        {showMineralList &&
                          renderMineralNutrientRows(mineralKeys, true)}
                      </View>
                    </View>
                  </View>
                )}

                {/* Render Meal Items Section if it's a custom meal */}
                {activeFoodItem?.isCustomMeal && (
                  <View style={styles.sectionContainer}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={styles.nutritionFactsLabel}>Items</Text>
                      <TouchableOpacity
                        onPress={toggleItemList}
                        style={{
                          flexDirection: "row",
                          gap: 5,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: theme.colors.primary,
                            fontWeight: "bold",
                          }}
                        >
                          {showItemList ? "Hide" : "Show"}
                        </Text>
                        <Feather
                          name={showItemList ? "arrow-up" : "arrow-down"}
                          color={theme.colors.primary}
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>

                    {/* Meal Items */}

                    {showItemList &&
                      activeFoodItem?.mealItems.map((item, index) => (
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            padding: 10,
                            paddingTop: 14,
                            borderBottomWidth: 1,
                            borderBottomColor: theme.colors.cardBorderColor,
                          }}
                          key={index}
                        >
                          <Text
                            style={{
                              fontSize: 16,
                              color: theme.colors.cardHeaderTextColor,
                            }}
                          >
                            {item.foodLabel}
                          </Text>
                          <View style={{ gap: 5 }}>
                            <Text
                              style={{
                                fontSize: 14,
                                color: theme.colors.cardHeaderTextColor,
                              }}
                            >
                              {Math.round(item.nutrients.ENERC_KCAL.quantity)}{" "}
                              cal, {Math.round(item.activeMeasure.weight)}{" "}
                              {item.activeMeasure.label}
                            </Text>
                          </View>
                        </View>
                      ))}
                  </View>
                )}
              </TouchableOpacity>
            </ScrollView>
          )}
          {isSelectServingSizeVisible && (
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                left: 0,
                top: "66%",
                backgroundColor: theme.colors.screenBackground,
                zIndex: 2,
              }}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    height: "20%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                  }}
                >
                  <Text
                    style={{
                      color: theme.colors.cardHeaderTextColor,
                      fontSize: 20,
                    }}
                  >
                    Select Unit
                  </Text>
                  <IconButton
                    icon="close"
                    iconColor={theme.colors.cardHeaderTextColor}
                    size={26}
                    onPress={toggleSelectServing}
                  />
                </View>
                <ScrollView>
                  <TouchableOpacity activeOpacity={1}>
                    {activeFoodItem &&
                      activeFoodItem?.measures?.map(
                        (servingSizeOption, index) => (
                          <TouchableOpacity
                            key={`${servingSizeOption?.uri}_${index}`}
                            onPress={() =>
                              handleSelectServing(servingSizeOption)
                            }
                            style={{
                              width: "100%",
                              flexDirection: "row",
                              alignItems: "center",
                              backgroundColor:
                                selectedServing === servingSizeOption
                                  ? theme.colors.surface
                                  : "transparent",
                              marginVertical: 5,
                              padding: 10,
                            }}
                          >
                            <View
                              style={{
                                flex: 1,
                                alignItems: "flex-end",
                                paddingRight: 10,
                              }}
                            >
                              <Text
                                style={{
                                  color: theme.colors.cardHeaderTextColor,
                                  fontSize: 20,
                                }}
                              >
                                {Math.round(servingSizeOption?.weight)}
                              </Text>
                            </View>
                            <View style={{ flex: 2 }}>
                              <Text
                                style={{
                                  color: theme.colors.cardHeaderTextColor,
                                  fontSize: 20,
                                }}
                              >
                                {servingSizeOption?.label}
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                alignItems: "flex-end",
                                paddingRight: 5,
                              }}
                            >
                              {selectedServing === servingSizeOption ? (
                                <Feather
                                  name="check-square"
                                  size={28}
                                  color={theme.colors.primary}
                                />
                              ) : null}
                            </View>
                          </TouchableOpacity>
                        )
                      )}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          )}
          {isSelectMealVisible && (
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                left: 0,
                top: "66%",
                backgroundColor: theme.colors.screenBackground,
                zIndex: 2,
              }}
            >
              <View style={{ flex: 1 }}>
                <View
                  style={{
                    height: "20%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: "gray",
                  }}
                >
                  <Text
                    style={{
                      color: theme.colors.cardHeaderTextColor,
                      fontSize: 20,
                    }}
                  >
                    Select Meal
                  </Text>
                  <IconButton
                    icon="close"
                    iconColor={theme.colors.cardHeaderTextColor}
                    size={26}
                    onPress={toggleSelectMeal}
                  />
                </View>
                <ScrollView>
                  <TouchableOpacity activeOpacity={1}>
                    {activeFoodItem &&
                      selectedMealSection &&
                      mealSections
                        ?.filter((mealOption) => mealOption.name)
                        .map((mealOption, index) => (
                          <TouchableOpacity
                            key={`${mealOption?.id}_${index}`}
                            onPress={() => handleSelectMeal(mealOption)}
                            style={{
                              width: "100%",
                              flexDirection: "row",
                              alignItems: "center",
                              backgroundColor:
                                selectedMealSection?.id === mealOption?.id
                                  ? theme.colors.surface
                                  : "transparent",
                              marginVertical: 5,
                              padding: 10,
                            }}
                          >
                            <View style={{ flex: 2 }}>
                              <Text
                                style={{
                                  color: theme.colors.cardHeaderTextColor,
                                  fontSize: 20,
                                }}
                              >
                                {mealOption?.name}
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                alignItems: "flex-end",
                                paddingRight: 5,
                              }}
                            >
                              {selectedMealSection?.id === mealOption?.id ? (
                                <Feather
                                  name="check-square"
                                  size={28}
                                  color={theme.colors.primary}
                                />
                              ) : null}
                            </View>
                          </TouchableOpacity>
                        ))}
                  </TouchableOpacity>
                </ScrollView>
              </View>
            </View>
          )}
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

// Sub-components

const NutritionFactsRow = ({ label, quantity, unit, totalDaily, color }) => {
  const styles = foodNutrientModalStyles();

  return (
    <View style={styles.nutritionFactsRow}>
      <View style={styles.nutritionalFactsLabelContainer}>
        <Text style={styles.nutritionFactsLabel}>{label}</Text>
      </View>
      <View style={styles.nutritionalFactsValuesContainer}>
        <Text style={{ ...styles.nutritionFactsValue, color: color }}>
          {quantity} {unit}
        </Text>
        <Text style={{ ...styles.nutritionFactsDailyValue, color: color }}>
          {totalDaily}%
        </Text>
      </View>
    </View>
  );
};

const NutritionFactsIndentedRow = ({
  label,
  quantity,
  unit,
  totalDaily,
  color,
}) => {
  const styles = foodNutrientModalStyles();

  return (
    <View style={styles.nutritionFactsRow}>
      <View style={styles.nutritionalFactsLabelContainer}>
        <Text style={styles.nutritionFactsIndentLabel}>{label}</Text>
      </View>
      <View style={styles.nutritionalFactsValuesContainer}>
        <Text style={{ ...styles.nutritionFactsIndentValue, color: color }}>
          {quantity} {unit}
        </Text>
        <Text
          style={{ ...styles.nutritionFactsIndentDailyValue, color: color }}
        >
          {totalDaily}%
        </Text>
      </View>
    </View>
  );
};

const ServingSizeRow = ({
  isVisible,
  toggleSelectServing,
  label,
  selectedServing,
}) => {
  const { theme } = useThemeContext();
  const styles = foodNutrientModalStyles();

  return (
    <View style={styles.rowContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TouchableOpacity
        style={{
          width: "40%",
          alignItems: "center",
          borderWidth: 1,
          borderColor: isVisible ? theme.colors.primary : "gray",
          borderRadius: 8,
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}
        onPress={toggleSelectServing}
      >
        <Text style={{ color: theme.colors.cardHeaderTextColor }}>
          {Math.round(parseFloat(selectedServing?.weight))}g{" "}
          {selectedServing?.label}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const NumberOfServingsRow = ({
  label,
  keyboardType,
  numberOfServings,
  updateNumberOfServings,
  hideSelectServingAndSelectMealOnTextInputFocus,
}) => {
  const styles = foodNutrientModalStyles();

  // Convert NaN or null to an empty string for better user experience
  const formattedNumberOfServings =
    numberOfServings !== null && !isNaN(numberOfServings)
      ? numberOfServings.toString()
      : "";

  return (
    <View style={styles.rowContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        onFocus={hideSelectServingAndSelectMealOnTextInputFocus}
        mode="flat"
        keyboardType={keyboardType}
        style={{ ...styles.textInput, width: "40%" }}
        value={formattedNumberOfServings}
        onChangeText={(newNumberOfServings) =>
          updateNumberOfServings(newNumberOfServings)
        }
      />
    </View>
  );
};

const MealRow = ({
  isVisible,
  toggleSelectMeal,
  label,
  selectedMealOption,
}) => {
  const { theme } = useThemeContext();
  const styles = foodNutrientModalStyles();

  return (
    <View style={styles.rowContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TouchableOpacity
        style={{
          width: "40%",
          alignItems: "center",
          borderWidth: 1,
          borderColor: isVisible ? theme.colors.primary : "gray",
          borderRadius: 8,
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}
        onPress={toggleSelectMeal}
      >
        <Text style={{ color: theme.colors.cardHeaderTextColor }}>
          {selectedMealOption?.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FoodNutrientModal;
