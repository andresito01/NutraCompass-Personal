import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useThemeContext } from "../../context/ThemeContext.js";

const dashboardScreenStyles = () => {
  const { theme } = useThemeContext();
  const paperTheme = useTheme();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.screenBackground,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: theme.colors.cardHeaderTextColor,
      fontSize: 24,
      textAlign: "center",
    },
  });
};

export default dashboardScreenStyles;
