import React, { createContext, useContext, useState, useEffect } from "react";
import { StatusBar } from "react-native";
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DarkTheme,
} from "react-native-paper";
import { Default } from "../../themes"; // Import Themes 1 - 5

// Create a theme context
export const ThemeContext = createContext();

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(true); // Set default dark mode
  const mode = darkMode ? "dark" : "light";
  const [selectedTheme, setSelectedTheme] = useState(Default); // Use Theme1 as the default
  const [theme, setTheme] = useState(
    mode === "dark" ? selectedTheme.dark : selectedTheme.light
  );

  useEffect(() => {
    setTheme(mode === "dark" ? selectedTheme.dark : selectedTheme.light);
  }, [darkMode, selectedTheme]);

  // Function to toggle theme
  const toggleTheme = (selectedTheme) => {
    setSelectedTheme(selectedTheme);
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  useEffect(() => {
    // Set the status bar text color based on the current theme
    StatusBar.setBarStyle(darkMode ? "light-content" : "dark-content");
  }, [darkMode]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
        toggleDarkMode,
        darkMode,
        mode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
