import { StyleSheet } from "react-native";
import { useThemeContext } from "../../../../context/ThemeContext.js";
const dailyNutritionGoalsCalculationModalStyles = () => {
  const { theme } = useThemeContext();
  return StyleSheet.create({
    header: {
      height: 65,
      minWidth: "100%",
      padding: 10,
      justifyContent: "flex-end",
    },
    closeModalButton: {
      alignSelf: "flex-start",
      marginTop: 20,
    },
  });
};

export default dailyNutritionGoalsCalculationModalStyles;
