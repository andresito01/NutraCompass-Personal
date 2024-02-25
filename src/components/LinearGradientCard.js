import React from "react";
import { View } from "react-native";
import { Card } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeContext } from "../context/ThemeContext.js";

const LinearGradientCard = ({ children }) => {
  const { theme } = useThemeContext();
  return (
    <LinearGradient
      colors={[theme.colors.secondary, theme.colors.primary]}
      style={{
        flex: 1,
        borderRadius: 8,
        padding: 5,
        backgroundColor: theme.colors.screenBackground,
      }}
      start={{ x: 0, y: 4 }}
      end={{ x: 1, y: 0.5 }}
    >
      {children}
    </LinearGradient>
  );
};

export default LinearGradientCard;
