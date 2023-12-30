import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useAuth } from "../authentication/context/AuthContext.js";
import { useThemeContext } from "../context/ThemeContext.js";
import dashboardScreenStyles from "./styles/dashboardScreenStyles.js"; // Import your styles
import ThemesScreen from "../features/themeChanger/screens/ThemesScreen.js";

export default function DashboardScreen() {
  const { user } = useAuth();
  const { theme } = useThemeContext();
  const styles = dashboardScreenStyles(); // Apply your styles

  return (
    <View style={styles.container}>
      <Text style={{ color: theme.colors.cardHeaderTextColor }}>
        First feature of this page is a step tracker
      </Text>
    </View>
  );
}
