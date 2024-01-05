import React from "react";
import { View, Text } from "react-native";
//import {} from "react-native-paper";
import Slider from "@react-native-community/slider";
import { useUserSettings } from "../features/userSettings/context/UserSettingsContext.js";
import { useThemeContext } from "../context/ThemeContext.js";

const MacroPercentageSlider = ({ selectedValues, onSelect, calories }) => {
  const { theme } = useThemeContext();

  const {
    calculateProteinDailyGrams,
    calculateCarbDailyGrams,
    calculateFatDailyGrams,
  } = useUserSettings();

  // Check if the sum of percentages is equal to 100%
  const isSum100Percent =
    selectedValues.protein + selectedValues.carb + selectedValues.fat === 100;

  // Calculate total daily grams for each macro based on percentage
  const proteinDailyGrams = calculateProteinDailyGrams(
    calories,
    selectedValues.protein
  );
  const carbDailyGrams = calculateCarbDailyGrams(calories, selectedValues.carb);
  const fatDailyGrams = calculateFatDailyGrams(calories, selectedValues.fat);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.cardBackgroundColor,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          width: "100%",
          justifyContent: "flex-start",
          gap: 15,
          paddingTop: 20,
        }}
      >
        <View
          style={{
            gap: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 15,
          }}
        >
          <View style={{ alignItems: "flex-start", width: "20%" }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "blue",
              }}
            >
              Protein
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 15, paddingRight: 40 }}>
            <Slider
              vertical={true}
              style={{ width: 220, height: 40 }}
              step={5}
              minimumValue={0}
              maximumValue={100}
              value={selectedValues.protein}
              onValueChange={(value) => onSelect("protein", value)}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor="#000000"
            />
            <View style={{ gap: 5 }}>
              <Text style={{ color: theme.colors.primary, fontSize: 20 }}>
                {selectedValues.protein}%
              </Text>
              <Text style={{ color: theme.colors.cardHeaderTextColor }}>
                {proteinDailyGrams} g
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            gap: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 15,
          }}
        >
          <View style={{ alignItems: "flex-start", width: "20%" }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "orange",
              }}
            >
              Carb
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 15, paddingRight: 40 }}>
            <Slider
              vertical={true}
              style={{ width: 220, height: 40 }}
              step={5}
              minimumValue={0}
              maximumValue={100}
              value={selectedValues.carb}
              onValueChange={(value) => onSelect("carb", value)}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor="#000000"
            />
            <View style={{ gap: 5 }}>
              <Text style={{ color: theme.colors.primary, fontSize: 20 }}>
                {selectedValues.carb}%
              </Text>
              <Text style={{ color: theme.colors.cardHeaderTextColor }}>
                {carbDailyGrams} g
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            gap: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: 15,
          }}
        >
          <View style={{ alignItems: "flex-start", width: "20%" }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: "bold",
                color: "red",
              }}
            >
              Fat
            </Text>
          </View>
          <View style={{ flexDirection: "row", gap: 15, paddingRight: 40 }}>
            <Slider
              vertical={true}
              style={{ width: 220, height: 40 }}
              step={5}
              minimumValue={0}
              maximumValue={100}
              value={selectedValues.fat}
              onValueChange={(value) => onSelect("fat", value)}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor="#000000"
            />
            <View style={{ gap: 5 }}>
              <Text style={{ color: theme.colors.primary, fontSize: 20 }}>
                {selectedValues.fat}%
              </Text>
              <Text style={{ color: theme.colors.cardHeaderTextColor }}>
                {fatDailyGrams} g
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            backgroundColor: theme.colors.cardBackgroundColor,
            flex: 1,
            flexDirection: "row",
            paddingTop: 10,
            paddingLeft: 25,
            borderTopWidth: 1,
            borderTopColor: theme.colors.cardBorderColor,
          }}
        >
          <View>
            <Text
              style={{ color: theme.colors.cardHeaderTextColor, fontSize: 16 }}
            >
              % Total
            </Text>
            <Text style={{ color: theme.colors.cardHeaderTextColor }}>
              Macronutrients must equal 100%
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: isSum100Percent ? theme.colors.primary : "red",
                fontSize: 24,
              }}
            >
              {selectedValues.protein +
                selectedValues.carb +
                selectedValues.fat}
              %
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MacroPercentageSlider;
