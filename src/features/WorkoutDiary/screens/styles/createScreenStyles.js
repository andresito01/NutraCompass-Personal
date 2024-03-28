import { StyleSheet } from "react-native";
import { useThemeContext } from "../../../../context/ThemeContext.js";

const createScreenStyles = () => {
  const { theme } = useThemeContext();
  return StyleSheet.create({
    formContainer: {
      padding: 16,
      backgroundColor: theme.colors.surface,
    },
    row: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    bottom: { flex: 1 },
    label: {
      fontSize: 16,
      color: theme.colors.primaryTextColor,
      marginBottom: 5,
    },
    requiredLabel: {
      fontSize: 12,
      color: theme.colors.primary,
    },
    input: {
      width: "100%",
      marginBottom: 5,
      color: theme.colors.primaryTextColor,
      backgroundColor: theme.colors.cardBackgroundColor,
    },
    button: {
      padding: 3,
    },
    customExerciseListContainer: {
      flex: 1,
      marginTop: 16,
    },
  });
};

export default createScreenStyles;