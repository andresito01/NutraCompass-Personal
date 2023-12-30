import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useThemeContext } from "../../../../context/ThemeContext.js";

const mealSectionCustomizationModalStyles = () => {
  const paperTheme = useTheme();
  const { theme } = useThemeContext();

  return StyleSheet.create({
    header: {
      height: 75,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    closeModalButton: {
      marginTop: 20,
    },
    saveButton: {
      marginTop: 20,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent", // transparent background
    },
    modalContent: {
      flex: 1,
      width: "100%", // Adjust the width
      minHeight: "97%", // Adjust the height
      backgroundColor: theme.colors.screenBackground, // Use theme background color
      padding: 20,
    },
    modalButtonHeader: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    modalTitle: {
      marginTop: 20,
      marginBottom: 16,
      fontSize: 24,
      color: theme.colors.sectionHeaderTextColor, // Use theme text color
      fontWeight: "bold",
      alignSelf: "center",
    },
    sectionRow: {
      backgroundColor: "transparent",
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 10,
      marginTop: 1,
      elevation: 6,
    },
    sectionIdText: {
      color: theme.colors.sectionHeaderTextColor,
      fontSize: 18,
    },
    sectionInputText: {
      color: theme.colors.primary,
      fontSize: 18,
    },
  });
};

export default mealSectionCustomizationModalStyles;
