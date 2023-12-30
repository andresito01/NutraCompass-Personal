import { StyleSheet } from "react-native";
import { useThemeContext } from "../../../../context/ThemeContext.js";

const notesScreenStyles = () => {
  const { theme } = useThemeContext();
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 16,
    },
    noteCard: {
      marginVertical: 8,
    },
  });
};
export default notesScreenStyles;
