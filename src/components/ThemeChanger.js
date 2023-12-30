import React from "react";
import { TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useThemeContext } from "../context/ThemeContext.js";

function ThemeChanger() {
  const { toggleDarkMode, darkMode, theme, mode } = useThemeContext();

  return (
    <TouchableOpacity
      style={{ position: "absolute", top: 20, right: 20, zIndex: 100 }}
      onPress={toggleDarkMode}
    >
      <FontAwesome
        name={darkMode ? "moon-o" : "sun-o"}
        size={30}
        color={theme.colors.text} // Assuming a fixed color for the icon
      />
    </TouchableOpacity>
  );
}

export default ThemeChanger;
