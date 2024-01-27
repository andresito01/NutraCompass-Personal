import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useThemeContext } from "../../context/ThemeContext.js";

const dateSelectorStyles = () => {
  const paperTheme = useTheme();
  const { theme } = useThemeContext();

  return StyleSheet.create({
    headerDateContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
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
      backgroundColor: theme.colors.screenBackground,
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
    section: {
      // marginHorizontal: 5,
      // borderRadius: theme.dimensions.sectionBorderRadius,
      backgroundColor: theme.colors.screenBackground, // Change to surface color for cards
      elevation: 2, // Add elevation for a card-like effect
    },
    sectionHeaderContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    dateInfo: {
      alignSelf: "center",
      fontWeight: "bold",
      color: theme.colors.sectionHeaderTextColor,
    },
  });
};

export default dateSelectorStyles;
