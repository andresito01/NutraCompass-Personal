import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useThemeContext } from "../../../../context/ThemeContext.js";

const dailyNutritionGoalsCustomizationModalStyles = () => {
  const paperTheme = useTheme();
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
    formContainer: {
      top: 30,
      width: "80%",
      backgroundColor: theme.colors.sectionBackgroundColor,
      padding: 20,
      borderRadius: 8,
      justifyContent: "center",
    },
    inputRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    label: {
      color: theme.colors.sectionHeaderTextColor,
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
