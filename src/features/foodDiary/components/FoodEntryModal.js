import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
} from "react-native";
import * as Haptics from "expo-haptics";
import {
  useTheme,
  Appbar,
  Searchbar,
  Card,
  Button,
  Snackbar,
  IconButton,
} from "react-native-paper";
import foodEntryModalStyles from "./styles/foodEntryModalStyles.js";
import {
  getNutrientsForFoodItem,
  searchFood,
  searchForFoodItemNutrients,
} from "../api/EdamamFoodDB/edamamMethods.js";
import BarcodeScanner from "./BarcodeScanner.js";
import { useThemeContext } from "../../../context/ThemeContext.js";
import { useFoodLog } from "../context/FoodLogContext.js";
import FoodNutrientModal from "./FoodNutrientModal.js";

console.log("Food Entry Modal Rendered.");

const FoodEntryModal = React.memo(
  ({
    isVisible,
    onCancel,
    activeFoodItem,
    setActiveFoodItem,
    activeMealSection,
    selectedDate,
    isBuildingMeal, // New prop to indicate if building a meal
  }) => {
    const { theme } = useThemeContext();
    const {
      customMeals,
      saveMealToFoodLog,
      saveOrUpdateSingleFoodItemToFoodLog,
      saveFoodToTempCustomMeal,
    } = useFoodLog();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showCustomMeals, setShowCustomMeals] = useState(false); // Track whether to show search results or custom meals
    const [isBarcodeScannerVisible, setIsBarcodeScannerVisible] =
      useState(false);
    // State to manage snackbar visibility
    const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
    // State to track actions that should trigger the snackbar
    const [snackbarTriggered, setSnackbarTriggered] = useState(false);
    // State used to track which food entry item's icon button should be animated
    const [selectedItem, setSelectedItem] = useState(null);

    const [isFoodNutrientModalVisible, setIsFoodNutrientModalVisible] =
      useState(false);

    const [selectedScale] = useState(new Animated.Value(1));
    const styles = foodEntryModalStyles();

    // useEffect to toggle snackbar visibility when snackbarTriggered changes
    useEffect(() => {
      if (snackbarTriggered) {
        setIsSnackbarVisible(true);
        // Hide snackbar after 1000ms
        const timeout = setTimeout(() => {
          setIsSnackbarVisible(false);
          setSnackbarTriggered(false); // Reset the trigger
        }, 1000);

        // Clear timeout on component unmount or when snackbarTriggered changes again
        return () => clearTimeout(timeout);
      }
    }, [snackbarTriggered]);

    // Function to handle toggling the snackbar
    const toggleSnackbar = () => {
      setSnackbarTriggered(true);
    };

    const handleCloseFoodNutrientModal = () => {
      setIsFoodNutrientModalVisible(false);
    };

    const handleOpenFoodNutrientModal = () => {
      setIsFoodNutrientModalVisible(true);
    };

    const handleViewFoodNutrients = (selectedFood) => {
      if (selectedFood.isCustomMeal) {
        console.log("You need to process selectedFood because its a meal.");
      }
      if (selectedFood) {
        // No need to format or fetch nutrient data, it's already available

        setActiveFoodItem(selectedFood);

        handleOpenFoodNutrientModal();

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } else {
        console.error("There is no selected food.");
      }
    };

    const handleBarcodeScanned = (resultsOrErrorMessage) => {
      console.log(
        "RESULTS OR ERROR: " + JSON.stringify(resultsOrErrorMessage, null, 2)
      );
      if (Array.isArray(resultsOrErrorMessage)) {
        setSearchResults(resultsOrErrorMessage);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setIsBarcodeScannerVisible(false);
      } else {
        console.log("FoodEntryModal: ", resultsOrErrorMessage);
      }
    };

    const handleFoodSearch = async () => {
      Keyboard.dismiss();
      try {
        const foodSearchResults = await searchFood(searchTerm);
        setSearchResults(foodSearchResults);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch (error) {
        console.error("Data processing error:", error);
      }
    };

    // Function to handle selecting an item
    const handleSelectItem = (item) => {
      setSelectedItem(item);
    };

    const handleSaveFood = async (selectedFood) => {
      // If not building a meal, an active meal section exists, selected date is valid,
      // an active food item is selected, and the active food item is a custom meal
      if (
        !isBuildingMeal &&
        activeMealSection &&
        selectedDate &&
        selectedFood &&
        selectedFood?.isCustomMeal
      ) {
        // Save the custom meal to the food log
        saveMealToFoodLog(activeMealSection.id, selectedDate, selectedFood);
      }
      // If not building a meal, an active meal section exists, selected date is valid,
      // and an active food item is selected
      else if (
        !isBuildingMeal &&
        activeMealSection &&
        selectedDate &&
        selectedFood
      ) {
        const updatedSelectedFood = await getNutrientsForFoodItem(selectedFood);

        // Update existing/create the food entry with the provided details
        saveOrUpdateSingleFoodItemToFoodLog(
          activeMealSection.id,
          selectedFood?.id || null,
          updatedSelectedFood,
          selectedDate
        );
      }
      // If building a meal and the active food item is a custom meal
      else if (isBuildingMeal && selectedFood?.isCustomMeal) {
        // Save or update the custom meal
        saveOrUpdateCustomMeal(selectedFood);
      }
      // If building a meal and the active food item is not a custom meal
      else if (isBuildingMeal && selectedFood) {
        const updatedSelectedFood = await getNutrientsForFoodItem(selectedFood);

        // Save the active food item to the temporary custom meal
        saveFoodToTempCustomMeal(updatedSelectedFood);
      }
      // If none of the above conditions are met
      else {
        // Log an error indicating an invalid state
        console.error(
          "Invalid state encountered while attempting to handle food entry: " +
            "isBuildingMeal:",
          isBuildingMeal,
          ", activeMealSection:",
          activeMealSection,
          ", selectedDate:",
          selectedDate,
          ", selectedFood:",
          selectedFood
        );

        return;
      }

      // Animate the save button
      Animated.timing(selectedScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }).start(async () => {
        try {
          // Provide feedback to the user
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          // Trigger snackbar
          toggleSnackbar();

          // Reset the scale value after a delay
          setTimeout(() => {
            setIsSnackbarVisible(false);
            selectedScale.setValue(1);
          }, 2000);
        } catch (error) {
          // Handle any errors that occur during the save operation
          console.error("Error saving food:", error);
          // Optionally, display an error message to the user
          // You can use a Snackbar, Alert, or any other UI component for this purpose
        }
      });
    };

    const handleCloseModal = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setSearchResults([]);
      setSearchTerm("");
      onCancel();
    };

    const openBarcodeScanner = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setIsBarcodeScannerVisible(true);
    };

    const closeBarcodeScanner = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setIsBarcodeScannerVisible(false);
    };

    return (
      <Modal visible={isVisible} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Appbar.Header
                mode="center-aligned"
                style={{
                  height: 40,
                  backgroundColor: theme.colors.screenBackground,
                }}
              >
                <Appbar.BackAction
                  color={theme.colors.cardHeaderTextColor}
                  onPress={handleCloseModal}
                />
                <Appbar.Content title="Add Food" />
              </Appbar.Header>
            </View>
            <View style={styles.modalContent}>
              <Searchbar
                placeholder="Search for a food"
                placeholderTextColor={theme.colors.cardHeaderTextColor}
                value={searchTerm}
                onChangeText={setSearchTerm}
                onIconPress={handleFoodSearch}
                onSubmitEditing={handleFoodSearch}
                mode="bar"
                editable={!showCustomMeals ? true : false}
              />
              <Card
                style={{
                  backgroundColor: "white",
                  alignItems: "flex-start",
                }}
              >
                <Card.Actions>
                  <Button onPress={() => setShowCustomMeals(false)}>All</Button>
                  <Button onPress={() => setShowCustomMeals(true)}>
                    My Meals
                  </Button>
                </Card.Actions>
              </Card>
              <Card
                style={{
                  backgroundColor: theme.colors.cardBackgroundColor,
                  alignItems: "flex-start",
                  marginBottom: 10,
                }}
              >
                <Card.Actions>
                  <Button onPress={openBarcodeScanner}>Scan a Barcode</Button>
                </Card.Actions>
              </Card>
              <FlatList
                styles={styles.flatlist}
                data={showCustomMeals ? customMeals : searchResults} // Show custom meals or search results based on button click
                keyExtractor={(item) => item.foodId}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    key={`${item.foodId}_${index}`}
                    onPress={() => handleViewFoodNutrients(item)}
                    style={styles.foodItemContainer}
                  >
                    <View style={styles.foodInfoContainer}>
                      <Text style={styles.foodLabel}>{item.foodLabel}</Text>
                      <View style={{ flexDirection: "row", gap: 5 }}>
                        <Text style={styles.foodLabelCalories}>
                          {showCustomMeals
                            ? Math.round(
                                parseFloat(
                                  item?.nutrients?.ENERC_KCAL?.quantity
                                )
                              )
                            : Math.round(
                                parseFloat(item?.defaultNutrients?.ENERC_KCAL)
                              )}{" "}
                          cal,
                        </Text>
                        <Text style={styles.foodLabelServingSize}>
                          {showCustomMeals
                            ? 1
                            : Math.round(item?.activeMeasure?.weight)}{" "}
                          {showCustomMeals
                            ? "meal"
                            : item?.activeMeasure?.label}
                          {item?.foodBrand ? "," : ""}
                        </Text>
                        <Text style={styles.foodLabelServingSize}>
                          {item?.foodBrand}
                        </Text>
                      </View>
                    </View>
                    <Animated.View
                      style={{
                        transform: [{ scale: selectedScale }],
                      }}
                    >
                      <IconButton
                        iconColor={theme.colors.primary}
                        containerColor={theme.colors.screenBackground}
                        icon={
                          selectedItem === item && isSnackbarVisible
                            ? "check"
                            : "plus"
                        }
                        color={theme.colors.cardHeaderTextColor}
                        size={24}
                        onPress={() => {
                          handleSelectItem(item); // Select the current item
                          handleSaveFood(item); // Save the selected food
                        }}
                      />
                    </Animated.View>
                  </TouchableOpacity>
                )}
              />
            </View>

            {isBarcodeScannerVisible && (
              <View style={styles.barcodeScannerContainer}>
                <BarcodeScanner
                  onBarcodeScanned={handleBarcodeScanned}
                  onClose={closeBarcodeScanner}
                />
              </View>
            )}

            <Snackbar
              visible={isSnackbarVisible}
              onDismiss={() => setIsSnackbarVisible(false)}
              style={{ backgroundColor: theme.colors.surface }}
            >
              <Text
                style={{
                  fontSize: 16,
                  alignSelf: "center",
                  color: theme.colors.cardHeaderTextColor,
                }}
              >
                Food Logged!
              </Text>
            </Snackbar>

            {/* Food Nutrient Modal */}
            {activeFoodItem && (
              <FoodNutrientModal
                isVisible={isFoodNutrientModalVisible}
                closeModal={handleCloseFoodNutrientModal}
                activeFoodItem={activeFoodItem}
                setActiveFoodItem={setActiveFoodItem}
                foodNutrientModalType={"Add Food"}
                activeMealSection={activeMealSection}
                selectedDate={selectedDate}
                isBuildingMeal={isBuildingMeal}
                toggleSnackbar={toggleSnackbar}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
);

export default FoodEntryModal;
