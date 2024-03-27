import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useThemeContext } from "../../../../context/ThemeContext.js";

const noteEditorModalStyles = () => {
  const { theme } = useThemeContext();
  const paperTheme = useTheme();

  return StyleSheet.create({
    modal: {
      margin: 0, // This is the important style you need to set
      alignItems: undefined,
      justifyContent: undefined,
    },
    modalContent: {
      flex: 1,
      backgroundColor: theme.colors.screenBackground,
    },
    modalHeader: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 20,
      paddingBottom: 5,
      paddingHorizontal: 10,
    },
    headerTitle: {
      color: theme.colors.cardHeaderTextColor,
      fontSize: 20,
    },
  });
};
export default noteEditorModalStyles;
