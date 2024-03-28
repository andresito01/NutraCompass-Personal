import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Card, Button, Icon } from "react-native-paper";
import * as Haptics from "expo-haptics";
import Feather from "react-native-vector-icons/Feather";
import { useThemeContext } from "../context/ThemeContext.js";
import { useFoodLog } from "../features/FoodDiary/context/FoodLogContext.js";
import CreateCustomMealModal from "../features/FoodDiary/components/CreateCustomMealModal.js";

export default function FoodsScreen({ navigation }) {
  const { theme } = useThemeContext();
  const { customMeals, clearTempCustomMeal } = useFoodLog();
  const [isCreateCustomMealModalVisible, setIsCreateCustomMealModalVisible] =
    useState(false);

  return (
    <View
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
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  fontSize: 28,
                  fontWeight: "500",
                  color: theme.colors.primaryTextColor,
                }}
              >
                Foods
              </Text>

              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  right: 0,
                }}
                onPress={() => {
                  navigation.navigate("Food Options");
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              >
                <Feather
                  name="search"
                  color={theme.colors.primaryTextColor}
                  size={28}
                />
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      </LinearGradient>

      {/** Body */}
      <ScrollView style={{ flex: 1, padding: 20 }}>
        <Card style={{ padding: 5 }}>
          <Card.Content>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Custom Meals");
              }}
              style={{ flexDirection: "row" }}
            >
              <View style={{ flex: 1, alignItems: "flex-start", gap: 15 }}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                  }}
                >
                  <Icon
                    source="silverware-fork-knife"
                    color={theme.colors.primary}
                    size={32}
                  />
                  <View style={{ gap: 5 }}>
                    <Text
                      style={{
                        color: theme.colors.primaryTextColor,
                        fontSize: 18,
                        fontWeight: 600,
                      }}
                    >
                      Custom Meals
                    </Text>
                    <Text style={{ color: theme.colors.primaryTextColor }}>
                      {customMeals.length} Meals
                    </Text>
                  </View>
                </View>
                <Button
                  icon={"plus"}
                  onPress={() => {
                    setIsCreateCustomMealModalVisible(true);
                  }}
                  mode="contained"
                >
                  CREATE MEAL
                </Button>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Feather
                  name="chevron-right"
                  color={theme.colors.primaryTextColor}
                  size={28}
                />
              </View>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      </ScrollView>

      <CreateCustomMealModal
        isVisible={isCreateCustomMealModalVisible}
        closeModal={() => {
          setIsCreateCustomMealModalVisible(!isCreateCustomMealModalVisible);
          clearTempCustomMeal();
        }}
      />
    </View>
  );
}
