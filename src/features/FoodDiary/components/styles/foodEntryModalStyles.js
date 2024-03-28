import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useThemeContext } from "../../../../context/ThemeContext.js";

const foodEntryModalStyles = () => {
  const { theme } = useThemeContext();
  const paperTheme = useTheme();

  return StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "transparent", // transparent background
    },
    modalHeader: {
      padding: 0,
      backgroundColor: theme.colors.sectionBackgroundColor,
      width: "100%",
    },
    modalContent: {
      flex: 1,
      width: "100%", // Adjust the width
      backgroundColor: theme.colors.screenBackground, // Use theme background color
      padding: 20,
    },
    flatlist: {
      flex: 1,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 16,
      color: theme.colors.primaryTextColor, // Use theme text color
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.primary, // Use theme primary color for border
      color: theme.colors.primaryTextColor, // Use theme text color
      padding: 10,
      marginBottom: 12,
      width: "100%", // Adjust the width
      borderRadius: 4,
    },
    modalButton: {
      backgroundColor: theme.colors.primary, // Use theme primary color
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 4,
      marginBottom: 12,
      marginTop: 12,
    },
    modalButtonText: {
      color: theme.colors.primaryTextColor, // Use theme text color
      fontWeight: "bold",
    },
    foodItemContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: theme.colors.cardBackgroundColor, // Use theme surface color
      elevation: 4,
      paddingHorizontal: 16,
      paddingVertical: 12,
      marginBottom: 6,
      borderRadius: 8,
    },
    foodInfoContainer: {
      flex: 1,
      marginRight: 12,
      gap: 2,
    },
    foodLabel: {
      fontSize: 16,
      color: theme.colors.primaryTextColor, // Use theme text color
    },
    foodLabelCalories: {
      fontSize: 14,
      color: "gray", // Use theme text color
    },
    foodLabelServingSize: {
      fontSize: 14,
      color: "gray", // Use theme text color
    },
    selectButton: {
      backgroundColor: theme.colors.primary, // Use theme primary color
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 4,
    },
    barcodeScannerContainer: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  });
};

export default foodEntryModalStyles;
