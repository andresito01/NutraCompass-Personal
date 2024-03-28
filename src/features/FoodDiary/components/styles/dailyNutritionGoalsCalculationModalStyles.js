import { StyleSheet } from "react-native";
import { useThemeContext } from "../../../../context/ThemeContext.js";

const dailyNutritionGoalsCalculationModalStyles = () => {
  const { theme } = useThemeContext();

  return StyleSheet.create({
    // ... your existing styles

    contentContainer: {
      flex: 1,
      justifyContent: "flex-start",
    },
    formContainer: {
      flex: 1,
      justifyContent: "flex-start",
      gap: 20,
      padding: 20,
    },
    header: {
      height: "10%",
      minWidth: "100%",
      padding: 10,
      justifyContent: "flex-end",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.colors.primaryTextColor,
      marginBottom: 10,
      alignSelf: "center",
    },
    infoBox: {
      fontSize: 16,
      textAlign: "left",
      color: "gray",
      marginBottom: 20,
    },
    label: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.colors.primaryTextColor,
      marginBottom: 5,
    },
    answer: {
      fontSize: 16,
      color: theme.colors.primaryTextColor,
      marginBottom: 20,
    },
    segmentedButtonContainer: {
      alignSelf: "center",
    },
    input: {
      flex: 1,
      height: 40,
    },
    resultsLabel: {
      color: theme.colors.primaryTextColor,
    },
    results: {
      color: theme.colors.primaryTextColor,
    },
  });
};

export default dailyNutritionGoalsCalculationModalStyles;
