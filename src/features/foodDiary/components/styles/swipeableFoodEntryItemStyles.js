import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useThemeContext } from "../../../../context/ThemeContext.js";

const swipeableFoodEntryItemStyles = (SCREEN_WIDTH) => {
  const paperTheme = useTheme();
  const { theme } = useThemeContext();

  return StyleSheet.create({
    containerStyle: {
      flex: 1,
      flexDirection: "row",
      marginBottom: 1,
      marginHorizontal: 5,
      marginTop: 0,
      elevation: 3,
    },
    textContainer: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      //width: SCREEN_WIDTH / 1.2,
      flex: 1,
      borderRadius: theme.dimensions.cardBorderRadius,
      //backgroundColor: theme.colors.screenBackground,
      backgroundColor: theme.colors.cardBackgroundColorLowOpacity, // Matte Gray background color
      elevation: 3,
      zIndex: 2,
    },
    textStyle: {
      fontSize: 16,
    },
    entryInfo: {
      flex: 1, // Take up all available space
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    entryFoodNameText: {
      color: theme.colors.cardHeaderTextColor,
      fontSize: 16,
      fontWeight: "bold",
    },
    entryCaloriesText: {
      color: theme.colors.cardHeaderTextColor,
      fontSize: 16,
    },
    rightButtonContainer: {
      position: "absolute",
      left: SCREEN_WIDTH / 1.24,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 5,
      borderRadius: theme.dimensions.cardBorderRadius,
      paddingHorizontal: 18,
      paddingVertical: 10,
      elevation: 3,
      backgroundColor: "#D50000",
      zIndex: 1,
    },
  });
};

export default swipeableFoodEntryItemStyles;
