import React, { createContext, useContext, useState, useEffect } from "react";
import { StatusBar } from "react-native";
import {
  Default,
  Gold,
  Blue,
  Green,
  Red,
  HotPink,
  Orange,
  Teal,
  Silver,
  Purple,
  AllPink,
  AllPurple,
  AllTeal,
} from "../../themes";
import { useAuth } from "../authentication/context/AuthContext.js";
import { useUserSettings } from "../features/userSettings/context/UserSettingsContext.js";

const themes = [
  Default,
  Gold,
  Blue,
  Green,
  Red,
  HotPink,
  Orange,
  Teal,
  Silver,
  Purple,
  AllPink,
  AllPurple,
  AllTeal,
];

// Create a theme context
export const ThemeContext = createContext();

export function useThemeContext() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const { user } = useAuth();
  const { getAppAppearance, setAppAppearance } = useUserSettings();
  const { isDark, theme: themeName } = getAppAppearance();
  const [darkMode, setDarkMode] = useState(isDark || true); // Set default dark mode
  const mode = darkMode ? "dark" : "light";
  const [selectedTheme, setSelectedTheme] = useState(Default); // Use Theme1 as the default
  const [theme, setTheme] = useState(
    mode === "dark"
      ? { name: selectedTheme.name, ...selectedTheme.dark }
      : { name: selectedTheme.name, ...selectedTheme.light }
  );

  useEffect(() => {
    if (user) {
      const foundTheme = themes.find((theme) => theme.name === themeName);
      if (foundTheme) {
        setDarkMode(isDark);
        setSelectedTheme(foundTheme);
      }
    } else {
      setSelectedTheme(Default); // Set default theme when user is undefined
    }
  }, [user, themeName]);

  useEffect(() => {
    if (selectedTheme) {
      setTheme(
        mode === "dark"
          ? { name: selectedTheme.name, ...selectedTheme.dark }
          : { name: selectedTheme.name, ...selectedTheme.light }
      );
    }
  }, [darkMode, selectedTheme]);

  useEffect(() => {
    // Set the status bar text color based on the current theme
    StatusBar.setBarStyle(darkMode ? "light-content" : "dark-content");
  }, [darkMode]);

  // Function to toggle theme
  const toggleTheme = (selectedTheme) => {
    setSelectedTheme(selectedTheme);
    // Update theme in Firestore
    setAppAppearance({ isDark: darkMode, theme: selectedTheme.name });
  };

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
    // Update theme in Firestore
    setAppAppearance({ isDark: !darkMode, theme: selectedTheme.name });
  };

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
