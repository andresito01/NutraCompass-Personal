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
      paddingTop: "5%",
      paddingBottom: "10%",
    },
    header: {
      width: "100%",
      height: "10%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 10,
    },
    text: {
      color: theme.colors.primaryTextColor,
      fontSize: 24,
      textAlign: "center",
    },
  });
};

export default dashboardScreenStyles;
