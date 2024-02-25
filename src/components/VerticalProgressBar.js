import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Rect, Defs, LinearGradient, Stop } from "react-native-svg";
import { useThemeContext } from "../context/ThemeContext.js";

const VerticalProgressBar = ({ percentage, color, width, height }) => {
  const { theme, mode } = useThemeContext();

  // Calculate the height of the filled portion based on the percentage
  const filledHeight = percentage * height;

  return (
    <View style={{ alignItems: "center" }}>
      <Svg height={height} width={width}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2={height}>
            <Stop offset="0%" stopColor={color} />
            <Stop offset="100%" stopColor="transparent" />
          </LinearGradient>
        </Defs>
        {/* Filled portion of the bar */}
        <Rect
          x={0}
          y={0}
          width={width}
          height={filledHeight}
          fill="url(#grad)"
        />
        {/* Unfilled portion of the bar */}
        <Rect
          x={0}
          y={filledHeight}
          width={width}
          height={height - filledHeight}
          fill={
            mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
          }
          stroke={
            mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
          }
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

export default VerticalProgressBar;
