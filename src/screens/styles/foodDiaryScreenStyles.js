import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useThemeContext } from "../../context/ThemeContext.js";

const foodDiaryScreenStyles = () => {
  const paperTheme = useTheme();
  const { theme } = useThemeContext();

  /**
   * Theme Backgrounds: White, Black, Light Gray, Dark Gray,
   * Meal Cards: Darker Colors
   * primary can't clash with secondary
   */

  return StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor: theme.colors.screenBackground,
      paddingBottom: "25%",
    },
    scrollViewContainer: {
      flex: 1,
      padding: 5,
      paddingBottom: 10,
      backgroundColor: "transparent",
    },
    scrollViewContainerContent: {
      flexGrow: 1,
    },
    headerSection: {
      marginBottom: 7, // Reduce marginBottom for smaller sections
      borderRadius: theme.dimensions.sectionBorderRadius,
      backgroundColor: theme.colors.screenBackground, // Change to surface color for cards
      elevation: 2, // Add elevation for a card-like effect
    },
    headerDateContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: 5,
    },
    date: {
      paddingLeft: 10,
      fontSize: 18,
      fontWeight: "bold",
      color: theme.colors.sectionHeaderTextColor,
    },
    calendarModal: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.cardBackgroundColor,
    },
    calendarWrapper: {
      width: "85%",
      backgroundColor: theme.colors.screenBackground,
    },
    cancelDateButton: {
      padding: 15,
    },
    cancelDateButtonText: {
      color: theme.colors.cardHeaderTextColor,
      textAlign: "center",
    },
    calendarModalButton: {
      flexDirection: "row",
      alignItems: "center",
    },
    totalDayCalories: {
      fontSize: 16,
      paddingTop: 12, // Increase padding for better spacing
      color: theme.colors.cardHeaderTextColor,
    },
    totalDayCaloriesProgressSectionText: {
      fontSize: 14,
      paddingTop: 12, // Increase padding for better spacing
      color: theme.colors.cardHeaderTextColor,
    },
    section: {
      marginBottom: 12, // Reduce marginBottom for smaller sections
      borderRadius: theme.dimensions.sectionBorderRadius,
      backgroundColor: theme.colors.sectionBackgroundColor, // Change to surface color for cards
      elevation: 2, // Add elevation for a card-like effect
    },
    mealSection: {
      marginBottom: 0, // Reduce marginBottom for smaller sections
      paddingVertical: 10,
      backgroundColor: "transparent", // Change to surface color for cards
      borderRadius: theme.dimensions.cardBorderRadius,
      borderColor: theme.colors.cardBorderColor,
      elevation: 2, // Add elevation for a card-like effect
      borderWidth: 0,
    },
    calorieSection: {
      flex: 3,
      height: "100%",
      justifyContent: "center",
      borderRadius: theme.dimensions.sectionBorderRadius,
      backgroundColor: theme.colors.cardDarkGrayBackground,
      borderColor: theme.colors.sectionBorderColor,
      borderRightWidth: 1,
      borderLeftWidth: 1,
      elevation: 4,
    },
    fabMenuSection: {},
    sectionHeaderContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      padding: 0,
    },
    mealSectionHeaderContainer: {
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.cardBorderColor, // Use divider color for separation
      backgroundColor: theme.colors.cardDarkGrayBackground,
    },
    mealSectionFooterContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingBottom: 5,
      marginBottom: 10,
      borderBottomColor: theme.colors.cardBorderColor, // Use divider color for separation
      backgroundColor: theme.colors.surface,
    },
    sectionTitle: {
      fontSize: 16, // Reduce fontSize for the section title
      fontWeight: "bold",
      color: theme.colors.cardHeaderTextColor,
    },
    footerButton: {
      alignSelf: "flex-start",
      marginTop: 15,
      marginHorizontal: 16,
    },
    totalMealSectionCalories: {
      fontSize: 18,
      color: theme.colors.sectionHeaderTextColor,
    },
    dateInfo: {
      alignSelf: "center",
      marginTop: 4, // Reduce marginTop for date info
      fontWeight: "bold",
      color: theme.colors.sectionHeaderTextColor,
    },
    sliderSectionContainer: {
      marginVertical: 20,
      flexDirection: "row",
      minHeight: "22%",
      maxHeight: "30%",
      gap: 10,
      padding: 5,
    },
  });
};

export default foodDiaryScreenStyles;
