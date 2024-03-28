import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  FlatList,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import { LinearGradient } from "expo-linear-gradient";
import { Card, Button, TextInput, ActivityIndicator } from "react-native-paper";
import * as Haptics from "expo-haptics";
import Feather from "react-native-vector-icons/Feather";
import { useThemeContext } from "../../../context/ThemeContext.js";
import { useFoodLog } from "../context/FoodLogContext.js";
import FoodEntryModal from "./FoodEntryModal.js";
import FoodNutrientModal from "./FoodNutrientModal.js";

export default function CreateCustomMealModal({ isVisible, closeModal }) {
  const { theme } = useThemeContext();
  const {
    saveFoodToTempCustomMeal,
    deleteFoodFromTempCustomMeal,
    tempCustomMeal,
    customMealName,
    setCustomMealName,
  } = useFoodLog();
  const [activeFoodItem, setActiveFoodItem] = useState({});
  const [isFoodEntryModalVisible, setIsFoodEntryModalVisible] = useState(false);
  const [isFoodNutrientModalVisible, setIsFoodNutrientModalVisible] =
    useState(false);
  const [activeCustomMeal, setActiveCustomMeal] = useState(null);

  useEffect(() => {
    // Update custom meal total nutrients when tempCustomMeal changes
    updateActiveCustomMeal();
  }, [tempCustomMeal]);

  useEffect(() => {
    // Update foodLabel property in activeCustomMeal when customMealName changes
    if (activeCustomMeal) {
      setActiveCustomMeal((prevState) => ({
        ...prevState,
        foodLabel: customMealName,
      }));
    }
  }, [customMealName]);

  const updateActiveCustomMeal = () => {
    if (tempCustomMeal.mealItems.length > 0) {
      // Initialize an object to store active custom meal data
      const activeCustomMealObject = {
        id: tempCustomMeal?.id || "",
        foodLabel: customMealName, // Add foodLabel property with meal name
        foodCategory: "Custom Meal",
        isCustomMeal: true,
        numberOfServings: 1,
        mealItems: [], // Array to hold all the items in the meal
        nutrients: {}, // Initialize nutrients property to store processed nutrients
      };
      // Iterate through each meal item
      tempCustomMeal.mealItems.forEach((item) => {
        // Construct new item object based on the item in tempCustomMeal
        const newItem = {
          foodId: item.foodId,
          foodLabel: item.foodLabel,
          nutrients: { ...item.nutrients },
          numberOfServings: item.numberOfServings,
          activeMeasure: { ...item.activeMeasure },
          measures: item.measures,
        };

        // Push the new item into the items array of activeCustomMealObject
        activeCustomMealObject.mealItems.push(newItem);

        // Iterate over the keys in item.nutrients
        for (const key in item.nutrients) {
          if (item.nutrients.hasOwnProperty(key)) {
            if (key === "vitamins" || key === "minerals") {
              // If the nutrient is "vitamins" or "minerals", process each item inside
              if (!activeCustomMealObject.nutrients[key]) {
                activeCustomMealObject.nutrients[key] = {};
              }
              for (const nestedKey in item.nutrients[key]) {
                if (item.nutrients[key].hasOwnProperty(nestedKey)) {
                  // If the nested nutrient exists in nutrients, add the quantity
                  if (activeCustomMealObject.nutrients[key][nestedKey]) {
                    activeCustomMealObject.nutrients[key][nestedKey].quantity =
                      (
                        parseFloat(
                          activeCustomMealObject.nutrients[key][nestedKey]
                            .quantity
                        ) + parseFloat(item.nutrients[key][nestedKey].quantity)
                      ).toFixed(2);
                  } else {
                    // If the nested nutrient doesn't exist in nutrients, initialize it
                    activeCustomMealObject.nutrients[key][nestedKey] = {
                      ...item.nutrients[key][nestedKey],
                    };
                  }
                }
              }
            } else {
              // Process individual nutrient
              if (activeCustomMealObject.nutrients[key]) {
                // If the nutrient already exists in nutrients, add the quantity
                activeCustomMealObject.nutrients[key].quantity = (
                  parseFloat(activeCustomMealObject.nutrients[key].quantity) +
                  parseFloat(item.nutrients[key].quantity)
                ).toFixed(2);
              } else {
                // If the nutrient doesn't exist in nutrients, initialize it
                activeCustomMealObject.nutrients[key] = {
                  ...item.nutrients[key],
                };
              }
            }
          }
        }
      });

      // Set the active custom meal data
      setActiveCustomMeal(activeCustomMealObject);
    } else {
      // If no meal items, reset active custom meal data
      setActiveCustomMeal(null);
    }
  };

  const handleOpenFoodEntryModal = () => {
    setIsFoodEntryModalVisible(true);
  };

  const handleCloseFoodNutrientModal = () => {
    setIsFoodNutrientModalVisible(false);
  };

  const handleOpenFoodNutrientModal = (activeItem) => {
    setActiveFoodItem(activeItem);
    // setShowTotalNutrients(false); // Reset to show the nutrient info of the active food item
    setIsFoodNutrientModalVisible(true);
  };

  const handleSaveFoodToTempMeal = (selectedFoodItem) => {
    // Save the selected food item to the temp meal
    saveFoodToTempCustomMeal(selectedFoodItem);
  };

  const handleDeleteFoodFromTempMeal = (index) => {
    // Delete the selected food item from the temp meal
    deleteFoodFromTempCustomMeal(index);
  };

  const handleNextButtonPress = () => {
    if (!customMealName || tempCustomMeal.mealItems.length === 0) {
      // Check if customMealName is not provided
      // Display an alert with the required message
      Alert.alert(
        "Enter Details",
        "Please input a meal name and a meal item.",
        [{ text: "OK", onPress: () => console.log("OK pressed") }] // Add an "OK" button to close the alert
      );
    } else {
      // Show the total nutrient information when the "Next" button is clicked
      handleOpenFoodNutrientModal(activeCustomMeal);
    }
  };

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      style={{
        flex: 1,
        height: "100%",
        width: "100%",
        margin: 0,
        backgroundColor: theme.colors.screenBackground,
      }}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={Keyboard.dismiss}
        activeOpacity={1}
      >
        {/* Header */}
        <LinearGradient
          style={{
            height: "12%",
            justifyContent: "flex-end",
            borderBottomLeftRadius: 24,
            borderBottomRightRadius: 24,
            borderColor: theme.colors.sectionBorderColor,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            elevation: 4,
            backgroundColor: theme.colors.screenBackground,
          }}
          colors={[
            `${theme.colors.primary}99`, // Adding "99" for 0.99 opacity
            `${theme.colors.secondary}99`, // Adding "99" for 0.99 opacity
          ]}
          start={{ x: 0, y: 1.5 }} // Top left corner
          end={{ x: 1, y: 2 }} // Bottom right corner
        >
          <Card
            style={{
              backgroundColor: "transparent",
            }}
          >
            <Card.Content style={{ paddingHorizontal: "5%" }}>
              <View
                style={{
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    position: "absolute",
                    left: 0,
                  }}
                  onPress={() => {
                    closeModal();
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                >
                  <Feather
                    name="x"
                    color={theme.colors.primaryTextColor}
                    size={28}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 28,
                    fontWeight: "500",
                    color: theme.colors.primaryTextColor,
                  }}
                >
                  Create Meal
                </Text>
              </View>
            </Card.Content>
          </Card>
        </LinearGradient>
        {/* Body */}
        <View
          style={{
            backgroundColor: theme.colors.screenBackground,
            flex: 1,
            padding: 10,
          }}
        >
          <TextInput
            mode="outlined"
            label="Meal Name (Optional)"
            value={customMealName}
            onChangeText={(mealName) => setCustomMealName(mealName)}
            outlineStyle={{ borderRadius: 12 }}
          />

          <Text
            style={{
              fontSize: 18,
              fontWeight: "500",
              color: theme.colors.primaryTextColor,
              paddingTop: 15,
              paddingBottom: 10,
            }}
          >
            Meal Items
          </Text>

          <View
            style={{
              flex: 1,
              backgroundColor: theme.colors.surface,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: theme.colors.cardBorderColor,
            }}
          >
            {/* Button to open FoodEntryModal */}
            <Button
              icon={"plus"}
              style={{
                borderBottomWidth: 1,
                borderColor: theme.colors.cardBorderColor,
                borderRadius: 0,
                padding: 4,
              }}
              onPress={handleOpenFoodEntryModal} // Call handleOpenFoodEntryModal on press
            >
              ADD MEAL ITEM
            </Button>
            {/** Display Food Items In Custom Meal */}
            <FlatList
              style={{ flex: 1 }}
              data={tempCustomMeal.mealItems} // Use the mealItems from tempCustomMeal
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: theme.colors.cardBorderColor,
                  }}
                  onPress={() => {
                    handleOpenFoodNutrientModal(item); // Pass item directly instead of activeItem
                  }}
                >
                  <View style={{ gap: 5 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: theme.colors.primaryTextColor,
                      }}
                    >
                      {item.foodLabel}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: theme.colors.primaryTextColor,
                      }}
                    >
                      {Math.round(item.nutrients.ENERC_KCAL.quantity)} cal,{" "}
                      {Math.round(item.activeMeasure.weight)}{" "}
                      {item.activeMeasure.label}
                    </Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => handleDeleteFoodFromTempMeal(index)}
                  >
                    <Feather
                      style={{ padding: 10 }}
                      name="x"
                      size={18}
                      color={theme.colors.primaryTextColor}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
        <View
          style={{
            height: "10%",
            padding: 10,
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {/* <Button
            mode="contained"
            style={{ width: "48%" }}
            onPress={handleSaveMeal}
          >
            SAVE
          </Button> */}
          <Button
            mode="contained"
            style={{ width: "48%" }}
            onPress={handleNextButtonPress}
          >
            NEXT
          </Button>
        </View>

        {/* Render FoodEntryModal */}
        <FoodEntryModal
          isVisible={isFoodEntryModalVisible}
          onSave={handleSaveFoodToTempMeal}
          onCancel={() => setIsFoodEntryModalVisible(false)}
          activeFoodItem={activeFoodItem}
          setActiveFoodItem={setActiveFoodItem}
          // activeMealSection
          // selectedDate
          isBuildingMeal={true}
        />

        {/* Food Nutrient Modal */}
        <FoodNutrientModal
          isVisible={isFoodNutrientModalVisible}
          closeModal={handleCloseFoodNutrientModal}
          activeFoodItem={activeFoodItem} // Show totalNutrients if showTotalNutrients is true, otherwise show activeFoodItem
          setActiveFoodItem={setActiveFoodItem}
          foodNutrientModalType={
            activeFoodItem?.isCustomMeal === true
              ? "Create Meal"
              : "Edit Meal Item"
          }
          // selectedDate={selectedDate}
          isBuildingMeal={true}
        />
      </TouchableOpacity>
    </Modal>
  );
}
