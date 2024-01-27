import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
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
  searchFood,
  searchForFoodItemNutrients,
} from "../api/EdamamFoodDB/edamamMethods.js";
import BarcodeScanner from "./BarcodeScanner.js";
import { useThemeContext } from "../../../context/ThemeContext.js";
import FoodNutrientModal from "./FoodNutrientModal.js";

const FoodEntryModal = React.memo(
  ({
    isVisible,
    onSave,
    onCancel,
    activeFoodItem,
    setActiveFoodItem,
    foodNutrientModalType,
    setFoodNutrientModalType,
    activeMealSection,
    selectedDate,
  }) => {
    const { theme } = useThemeContext();
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    // useEffect(
    //   () =>
    //     console.log(
    //       "Search Results: " + JSON.stringify(searchResults, null, 1)
    //     ),
    //   [searchResults]
    // );
    const [isBarcodeScannerVisible, setIsBarcodeScannerVisible] =
      useState(false);
    const [isFoodLoggedSnackBarVisible, setIsFoodLoggedSnackBarVisible] =
      useState(false);
    const [isFoodNutrientModalVisible, setIsFoodNutrientModalVisible] =
      useState(false);

    const [selectedScale] = useState(new Animated.Value(1));
    const styles = foodEntryModalStyles();

    const handleCloseFoodNutrientModal = () => {
      setIsFoodNutrientModalVisible(false);
    };

    const handleOpenFoodNutrientModal = (title) => {
      setFoodNutrientModalType(title);
      setIsFoodNutrientModalVisible(true);
    };

    const handleViewFoodNutrients = (title, selectedFood) => {
      if (selectedFood) {
        // No need to format or fetch nutrient data, it's already available

        setActiveFoodItem(selectedFood);

        handleOpenFoodNutrientModal(title);

        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } else {
        console.error("There is no selected food.");
      }
    };

    const onToggleSnackBar = () => setIsFoodLoggedSnackBarVisible(true);
    const onDismissSnackBar = () => setIsFoodLoggedSnackBarVisible(false);

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

    const handleSaveFood = async (selectedFood) => {
      Animated.timing(selectedScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }).start(() => {
        onSave(selectedFood);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onToggleSnackBar();

        setTimeout(() => {
          setIsFoodLoggedSnackBarVisible(false);
          selectedScale.setValue(1); // Reset the scale value
        }, 2000);
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
          <SafeAreaView style={styles.modalContainer}>
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
              />
              <Card
                style={{
                  backgroundColor: "transparent",
                  alignItems: "flex-start",
                }}
              >
                <Card.Actions>
                  <Button>All</Button>
                  <Button>My Meals</Button>
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
                data={searchResults}
                keyExtractor={(item) => item.foodId}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleViewFoodNutrients("Add Food", item)}
                    style={styles.foodItemContainer}
                  >
                    <View style={styles.foodInfoContainer}>
                      <Text style={styles.foodLabel}>{item.foodLabel}</Text>
                      <View style={{ flexDirection: "row", gap: 5 }}>
                        <Text style={styles.foodLabelCalories}>
                          {Math.round(
                            parseFloat(item.nutrients.ENERC_KCAL?.quantity)
                          )}{" "}
                          cal,
                        </Text>
                        <Text style={styles.foodLabelServingSize}>
                          {Math.round(item?.activeMeasure?.weight)}{" "}
                          {item?.activeMeasure?.label}
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
                        icon={isFoodLoggedSnackBarVisible ? "check" : "plus"}
                        color={theme.colors.cardHeaderTextColor}
                        size={24}
                        onPress={() => handleSaveFood(item)}
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
              visible={isFoodLoggedSnackBarVisible}
              onDismiss={onDismissSnackBar}
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

            <FoodNutrientModal
              isVisible={isFoodNutrientModalVisible}
              closeModal={handleCloseFoodNutrientModal}
              activeFoodItem={activeFoodItem}
              setActiveFoodItem={setActiveFoodItem}
              foodNutrientModalType={foodNutrientModalType}
              activeMealSection={activeMealSection}
              selectedDate={selectedDate}
            />
          </SafeAreaView>
        </TouchableWithoutFeedback>
      </Modal>
    );
  }
);

export default FoodEntryModal;
