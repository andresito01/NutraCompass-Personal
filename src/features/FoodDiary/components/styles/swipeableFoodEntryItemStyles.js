import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useThemeContext } from "../../../../context/ThemeContext.js";

const swipeableFoodEntryItemStyles = () => {
  const paperTheme = useTheme();
  const { theme } = useThemeContext();

  return StyleSheet.create({
    containerStyle: {
      flex: 1,
      flexDirection: "row",
      marginBottom: 1,
      marginHorizontal: 0,
      marginTop: 0,
      elevation: 3,
    },
    textContainer: {
      //width: SCREEN_WIDTH / 1.2,
      flex: 1,
      // borderRadius: theme.dimensions.cardBorderRadius,
      //backgroundColor: theme.colors.screenBackground,
      backgroundColor: theme.colors.surface, // Matte Gray background color
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
      padding: 10,
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
      left: null,
      right: 0,
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
