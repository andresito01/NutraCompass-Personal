import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Card, Button, Searchbar, Dialog, Portal } from "react-native-paper";
import * as Haptics from "expo-haptics";
import Feather from "react-native-vector-icons/Feather";
import { useThemeContext } from "../../../context/ThemeContext.js";
import { useFoodLog } from "../context/FoodLogContext.js";
import CreateCustomMealModal from "./CreateCustomMealModal.js";

export default function CustomMealsModal({ navigation }) {
  const { theme } = useThemeContext();
  const {
    customMeals,
    deleteCustomMeal,
    setTempCustomMeal,
    setCustomMealName,
    clearTempCustomMeal,
  } = useFoodLog();
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  const [isCreateCustomMealModalVisible, setIsCreateCustomMealModalVisible] =
    useState(false);
  const [showDeleteCustomMealDialog, setShowDeleteCustomMealDialog] =
    useState(false);
  // State reference to id of custom meal to delete
  const [customMealToDelete, setCustomMealToDelete] = useState("");

  const handleDeleteCustomMealConfirm = async () => {
    try {
      await deleteCustomMeal(customMealToDelete);
      setShowDeleteCustomMealDialog(false);
      setCustomMealToDelete("");
    } catch (error) {
      console.log("Error deleting custom meal.");
    }
  };

  const handleOpenDeleteCustomMealDialog = (mealId) => {
    setCustomMealToDelete(mealId);
    setShowDeleteCustomMealDialog(true);
  };

  const handleDeleteCustomMealCancel = () => {
    setShowDeleteCustomMealDialog(false);
    setCustomMealToDelete("");
  };

  const renderMealItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        setCustomMealName(item.foodLabel);
        setTempCustomMeal(item);
        setIsCreateCustomMealModalVisible(true);
      }}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.cardBorderColor,
        padding: 16,
        marginVertical: 5,
        borderRadius: 10,
      }}
    >
      <Text style={{ fontSize: 18, color: theme.colors.primaryTextColor }}>
        {item.foodLabel}
      </Text>

      <View style={{ alignItems: "flex-end", gap: 16 }}>
        <Feather
          name="chevron-right"
          color={theme.colors.primaryTextColor}
          size={24}
        />
        <Button
          onPress={() => handleOpenDeleteCustomMealDialog(item.id)}
          mode="outlined"
        >
          Delete
        </Button>
      </View>
    </TouchableOpacity>
  );

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={Keyboard.dismiss}
      style={{
        flex: 1,
        paddingBottom: "20%",
        backgroundColor: theme.colors.screenBackground,
      }}
    >
      {/** Header */}
      <LinearGradient
        style={{
          height: "13%",
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
                  navigation.navigate("Food Options");
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              >
                <Feather
                  name="chevron-left"
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
                Custom Meals
              </Text>
            </View>
          </Card.Content>
        </Card>
      </LinearGradient>

      {/** Body */}
      <View style={{ flex: 1 }}>
        {/** Create Meal Button and Custom Meals Search Bar */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
            margin: 20,
          }}
        >
          <Button
            icon={"plus"}
            onPress={() => {
              setIsCreateCustomMealModalVisible(true);
            }}
            mode="contained"
          >
            CREATE MEAL
          </Button>

          <Searchbar
            style={{ flex: 1 }}
            placeholder="Search Meals"
            onChangeText={onChangeSearch}
            value={searchQuery}
            editable={false} // Disabled until search functionality is implemented
          />
        </View>

        {/** List of Created Custom Meals */}
        <View style={{ flex: 1 }}>
          <View style={{ padding: 10, alignItems: "flex-end" }}>
            {/* <Text style={{ fontSize: 18, color: theme.colors.primary }}>
              Filters
            </Text> */}
          </View>
          <FlatList
            data={customMeals}
            renderItem={renderMealItem}
            keyExtractor={(item) => item?.id.toString()} // Assuming each meal has a unique id
            style={{ flex: 1 }}
          />
        </View>
      </View>
      <CreateCustomMealModal
        isVisible={isCreateCustomMealModalVisible}
        closeModal={() => {
          setIsCreateCustomMealModalVisible(!isCreateCustomMealModalVisible);
          clearTempCustomMeal();
        }}
      />

      <Portal>
        <Dialog
          visible={showDeleteCustomMealDialog}
          onDismiss={handleDeleteCustomMealCancel}
        >
          <Dialog.Title>Delete Custom Meal</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to delete this custom meal?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleDeleteCustomMealCancel}>Cancel</Button>
            <Button onPress={handleDeleteCustomMealConfirm}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </TouchableOpacity>
  );
}
