import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useThemeContext } from "../../context/ThemeContext.js";

const foodsScreenStyles = () => {
  const paperTheme = useTheme();
  const { theme } = useThemeContext();

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
  });
};

export default foodsScreenStyles;
