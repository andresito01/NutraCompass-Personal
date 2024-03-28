// foodNutrientModalStyles.js
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useThemeContext } from "../../../../context/ThemeContext.js";
const foodNutrientModalStyles = () => {
  const { theme } = useThemeContext();
  const paperTheme = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.screenBackground,
      margin: 0,
    },
    header: {
      backgroundColor: theme.colors.screenBackground,
      height: 50,
      paddingBottom: 10,
    },
    title: {
      color: theme.colors.primaryTextColor,
    },
    sectionContainer: {
      padding: 16,
      backgroundColor: theme.colors.surface,
    },
    foodItemName: {
      color: theme.colors.primaryTextColor,
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 8,
    },
    brandCompany: {
      color: "gray",
    },
    rowContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    inputLabel: {
      color: theme.colors.primaryTextColor,
      fontSize: 16,
      marginRight: 16,
      flex: 1,
    },
    textInput: {
      flex: 0.5, // Occupies about a quarter of the row width
      fontSize: 16,
      height: 40,
      borderWidth: 1,
      borderRadius: 8,
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.primary,
    },
    macroNutrientContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 50,
      paddingRight: 30,
    },
    macroNutrientColumn: {
      flex: 1,
      flexDirection: "column",
      gap: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    macroNutrientPercentage: {
      fontSize: 12,
    },
    macroNutrientValue: {
      fontSize: 16,
      fontWeight: "bold",
      color: theme.colors.primaryTextColor,
    },
    macroNutrientLabel: {
      fontSize: 12,
      color: theme.colors.primaryTextColor,
    },
    progressContainer: {
      flexDirection: "row",
      marginTop: 20,
      gap: 20,
    },
    progressItem: {
      flex: 1,
      marginBottom: 10,
      gap: 5,
      alignItems: "center",
      justifyContent: "center",
    },
    percentOfDailyGoalsSectionHeaderText: {
      color: theme.colors.primaryTextColor,
    },
    nutritionFactsLabel: {
      fontSize: 16,
      color: theme.colors.primaryTextColor,
    },
    nutritionFactsIndentLabel: {
      fontSize: 15,
      color: theme.colors.primaryTextColor,
      paddingLeft: 15,
    },
    nutritionalFactsLabelContainer: {
      justifyContent: "flex-start",
      flex: 1,
    },
    nutritionalFactsValuesContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    nutritionFactsValue: {
      fontSize: 15,
      color: theme.colors.primaryTextColor,
    },
    nutritionFactsIndentValue: {
      fontSize: 14,
      color: theme.colors.primaryTextColor,
    },
    nutritionFactsDailyValue: {
      fontSize: 15,
      color: theme.colors.primaryTextColor,
    },
    nutritionFactsIndentDailyValue: {
      fontSize: 14,
      color: theme.colors.primaryTextColor,
    },
    nutritionFactsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 5,
      paddingHorizontal: 16,
    },
    nutritionFactsSeparator: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.cardBorderColor,
      marginVertical: 10,
    },
    nutritionFactsSection: {
      marginTop: 10,
    },
    nutritionFactsSectionHeader: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.colors.primaryTextColor,
    },
  });
};

export default foodNutrientModalStyles;
