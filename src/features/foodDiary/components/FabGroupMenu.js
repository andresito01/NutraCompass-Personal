import React, { useState, useEffect } from "react";
import { FAB, Portal, useTheme } from "react-native-paper";
import { useThemeContext } from "../../../context/ThemeContext.js";

const FoodlogFabGroupMenu = ({
  isFocused,
  openMealSectionCustomizationModal,
  openDailyNutritionGoalsCustomizationModal,
  openDailyNutritionGoalsCalculationModal,
}) => {
  const paperTheme = useTheme();
  const { theme } = useThemeContext();
  const [state, setState] = useState({ open: false }); // Set open to isFocused initially

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  useEffect(() => {
    // Close the FAB when leaving the FoodLog screen
    if (!isFocused) {
      setState({ open: false });
    }
  }, [isFocused]);

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible={isFocused} // Set to true only when the FoodLog screen is active
        icon={open ? "minus" : "plus"}
        actions={[
          {
            icon: "pencil",
            color: theme.colors.primary,
            label: "Customize Meal Names",
            onPress: openMealSectionCustomizationModal,
          },
          {
            icon: "pencil",
            color: theme.colors.primary,
            label: "Customize Daily Nutrition Goals",
            onPress: openDailyNutritionGoalsCustomizationModal,
          },
          {
            icon: "pencil",
            color: theme.colors.primary,
            label: "Calculate Daily Nutrition Goals",
            onPress: openDailyNutritionGoalsCalculationModal,
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
        style={{
          position: "absolute",
          bottom: "8%",
          backfaceVisibility: "hidden",
        }}
        fabStyle={{ height: 40, justifyContent: "center" }}
        variant="surface"
      />
    </Portal>
  );
};

export default FoodlogFabGroupMenu;
