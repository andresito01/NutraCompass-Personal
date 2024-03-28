import { Dimensions, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useThemeContext } from "../../../../context/ThemeContext.js";

const dailyNutritionGoalsCustomizationModalStyles = () => {
  const paperTheme = useTheme();
  const { theme } = useThemeContext();
  // Get the screen height
  const screenHeight = Dimensions.get("window").height;

  return StyleSheet.create({
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      paddingHorizontal: 20,
      paddingTop: 30,
      paddingBottom: 30,
    },
    closeModalButton: {
      marginTop: 20,
    },
    saveButton: {
      marginTop: 20,
    },
    formContainer: {
      position: "absolute",
      top: screenHeight * 0.15, // Set top to about 20% below the height
      width: "80%",
      padding: 10,
      elevation: 4,
      borderColor: theme.colors.cardBorderColor,
      borderBottomWidth: 1,
      justifyContent: "center",
    },
    inputRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    label: {
      color: theme.colors.primaryTextColor,
    },
    input: {
      width: "50%",
      height: 40,
      marginBottom: 10,
      color: theme.colors.primary,
      backgroundColor: theme.colors.screenBackground,
      textAlign: "center",
    },
    macroInputContainer: {
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    },
    inputText: {
      color: theme.colors.primary,
    },
  });
};

export default dailyNutritionGoalsCustomizationModalStyles;
