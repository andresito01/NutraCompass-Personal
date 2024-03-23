import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useThemeContext } from "../context/ThemeContext.js";

const LinearGradientCard = ({ children, style }) => {
  const { theme } = useThemeContext();
  return (
    <LinearGradient
      colors={[theme.colors.secondary, theme.colors.primary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        {
          backgroundColor: theme.colors.screenBackground,
        },
        style,
      ]} // Apply the passed style here
    >
      {children}
    </LinearGradient>
  );
};

export default LinearGradientCard;
