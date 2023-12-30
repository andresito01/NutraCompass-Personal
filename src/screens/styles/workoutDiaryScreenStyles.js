// workoutDiaryScreenStyles.js
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useThemeContext } from "../../context/ThemeContext.js";

const workoutDiaryScreenStyles = () => {
  const { theme } = useThemeContext();
  const paperTheme = useTheme();

  return StyleSheet.create({
    safeAreaView: {
      flex: 1,
      backgroundColor: theme.colors.screenBackground,
    },
    sectionHeader: {
      width: "100%",
      textAlign: "center",
      fontSize: 20,
      paddingVertical: 10,
      color: "black", // You can customize the color
      borderRadius: 10,
    },
  });
};

export default workoutDiaryScreenStyles;
