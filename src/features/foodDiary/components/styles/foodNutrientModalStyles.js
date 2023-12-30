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
      height: 40,
      paddingBottom: 10,
    },
    title: {
      color: theme.colors.sectionHeaderTextColor,
    },
    sectionContainer: {
      padding: 16,
      backgroundColor: theme.colors.surface,
      marginBottom: 10,
    },
    foodItemName: {
      color: theme.colors.cardHeaderTextColor,
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
      marginBottom: 16,
    },
    inputLabel: {
      color: theme.colors.cardHeaderTextColor,
      fontSize: 16,
      fontWeight: "bold",
      marginRight: 16,
      flex: 1,
    },
    textInput: {
      flex: 0.5, // Occupies about a quarter of the row width
      backgroundColor: theme.colors.cardBackgroundColor,
      fontSize: 16,
      height: 40,
      borderWidth: 1,
      borderColor: theme.colors.cardBorderColor,
    },
    macroNutrientContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 50,
      paddingRight: 30,
    },
    macroNutrientColumn: {
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
      color: theme.colors.cardHeaderTextColor,
    },
    macroNutrientLabel: {
      fontSize: 12,
      color: theme.colors.cardHeaderTextColor,
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
      color: theme.colors.cardHeaderTextColor,
    },
    nutritionFactsLabel: {
      fontSize: 16,
      color: theme.colors.cardHeaderTextColor,
    },
    nutritionFactsIndentLabel: {
      fontSize: 15,
      color: theme.colors.cardHeaderTextColor,
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
      color: theme.colors.cardHeaderTextColor,
    },
    nutritionFactsIndentValue: {
      fontSize: 14,
      color: theme.colors.cardHeaderTextColor,
    },
    nutritionFactsDailyValue: {
      fontSize: 15,
      color: theme.colors.cardHeaderTextColor,
    },
    nutritionFactsIndentDailyValue: {
      fontSize: 14,
      color: theme.colors.cardHeaderTextColor,
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
      color: theme.colors.cardHeaderTextColor,
    },
  });
};

export default foodNutrientModalStyles;
