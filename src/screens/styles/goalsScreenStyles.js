import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useThemeContext } from "../../context/ThemeContext.js";

const gymScreenStyles = () => {
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
    navigateToChatButton: {
      position: "absolute",
      top: 20,
      right: 20,
    },
  });
};

export default gymScreenStyles;
