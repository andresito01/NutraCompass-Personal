import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useThemeContext } from "../../context/ThemeContext.js";

const moreScreenStyles = () => {
  const { theme } = useThemeContext();
  const paperTheme = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 0,
      paddingBottom: 30,
      backgroundColor: theme.colors.screenBackground,
    },
    header: {
      height: 45,
      minWidth: "100%",
      padding: 10,
      justifyContent: "flex-end",
    },
    row: {
      backgroundColor: theme.colors.cardBackgroundColor,
      flexDirection: "row",
      alignItems: "center",
      padding: 10,
      marginTop: 0,
      margin: 5,
    },
    text: {
      color: theme.colors.primaryTextColor,
      fontSize: 18,
      marginLeft: 12,
    },
  });
};

export default moreScreenStyles;
