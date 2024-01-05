import { StyleSheet } from "react-native";
import { useThemeContext } from "../../context/ThemeContext.js";

const welcomeScreenStyles = () => {
  const { theme } = useThemeContext();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.screenBackground,
    },
    gradientContainer: {
      flex: 1,
    },
    contentContainer: {
      marginHorizontal: 20,
      flex: 1,
      justifyContent: "top",

      alignItems: "center",
      flexDirection: "column",
      paddingTop: 40,
    },
    appName: {
      fontSize: 28, // Increased font size for app name
      fontWeight: "bold",
      color: theme.colors.cardHeaderTextColor,
      marginVertical: 16,
      textAlign: "center",
    },
    description: {
      color: theme.colors.cardHeaderTextColor,
      fontSize: 18, // Increased font size for description
      textAlign: "center",
      marginHorizontal: 16,
      marginBottom: 24, // Increased margin to separate from buttons
    },
  });
};

export default welcomeScreenStyles;
