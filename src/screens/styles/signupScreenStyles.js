import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useThemeContext } from "../../context/ThemeContext.js";

const signupScreenStyles = () => {
  const paperTheme = useTheme();
  const { theme } = useThemeContext();

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: paperTheme.colors.background,
    },
    gradientContainer: {
      flex: 1,
    },
    contentContainer: {
      marginTop: 0,
      paddingBottom: 20,
      paddingHorizontal: 20,
      flex: 1,
      alignItems: "center",
      flexDirection: "column",
    },
    logo: {
      position: "absolute",
      top: 5,
      alignSelf: "center",
      width: 195,
      height: 54,
    },
    title: {
      fontSize: 28,
      fontWeight: "bold",
      color: paperTheme.colors.primary,
      marginVertical: 16,
    },
    link: {
      color: paperTheme.colors.accent,
      textAlign: "center",
    },
    inputContainer: {
      width: "100%",
    },
    input: {
      backgroundColor: "transparent", // Grayish background for text inputs
      paddingHorizontal: 16,
      color: paperTheme.colors.text, // Text color from the theme
    },
    selectInput: {
      borderWidth: 1,
      borderColor: "rgba(169, 169, 169, 0.7)",
      borderRadius: 14,
      padding: 10,
      marginBottom: 10, // Adjust as needed
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    icon: {
      padding: 10,
    },
    datePickerText: {
      color: "white",
      fontSize: 18,
      fontWeight: "bold",
      margin: 5,
    },
    button: {
      backgroundColor: paperTheme.colors.primary,
      borderRadius: 24, // Increased border radius for buttons
      paddingVertical: 10, // Adjusted padding for buttons
      marginVertical: 10,
      width: 150, // Adjusted button width
    },
  });
};

export default signupScreenStyles;
