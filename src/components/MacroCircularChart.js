import React from "react";
import { View, Text } from "react-native";
import Svg, { G, Path, Circle, Text as SvgText } from "react-native-svg";
import Feather from "react-native-vector-icons/Feather";
import { useThemeContext } from "../context/ThemeContext.js";

const MacroCircularChart = ({
  size,
  percentage,
  color,
  fillColor,

  label,
  totalGramsGoal,
  consumedGrams,
}) => {
  const { theme, mode } = useThemeContext();
  const radius = size / 2;

  // Calculate the angle based on the percentage
  const angle = percentage <= 1 ? percentage * 360 : 360;

  // Calculate the path for the entire circle (neutral background)
  const fullCirclePath = `M 0 -${radius} A ${radius} ${radius} 0 1 1 0 ${radius} A ${radius} ${radius} 0 1 1 0 -${radius}`;

  const filledCirclePath = `M 0 0 L ${
    radius * Math.cos((angle / 2) * (Math.PI / 180))
  } ${
    radius * Math.sin((angle / 2) * (Math.PI / 180))
  } A ${radius} ${radius} 0 ${angle > 180 ? 1 : 0} 1 ${
    radius * Math.cos((angle / 2 + angle) * (Math.PI / 180))
  } ${radius * Math.sin((angle / 2 + angle) * (Math.PI / 180))} Z`;

  return (
    <View style={{ gap: 5, marginTop: 5 }}>
      <Text
        style={{
          color: theme.colors.cardHeaderTextColor,
          textAlign: "center",
        }}
      >
        {label}
      </Text>
      <Svg height={size} width={size}>
        <G transform={{ translate: `${radius}, ${radius}` }}>
          {/* The neutral background circle */}
          <Path
            d={fullCirclePath}
            fill={
              mode === "dark"
                ? "rgba(255, 255, 255, 0.1)"
                : "rgba(0, 0, 0, 0.1)"
            }
          />

          {/* The filled portion based on the percentage */}
          <Path d={filledCirclePath} fill={color} />

          {/* The Circle element represents the background of the circle */}
          {/* Adjust the radius and fill color as needed */}
          <Circle r={radius - 4} fill={fillColor} />

          {/* Feather icon */}
          {/* Adjust the position of the icon as needed */}
          <View
            style={{
              position: "absolute",
              top: size - size / 2.5, // Adjust the position as needed
              left: size - size / 1.25, // Adjust the position as needed
            }}
          >
            <Feather name={"flag"} size={size / 9} color={"orange"} />
          </View>

          {/* Text for totalGramsGoal */}
          {/* Adjust the text properties and position as needed */}
          <SvgText
            fill={theme.colors.cardHeaderTextColor}
            fontSize={size / 6.5}
            fontWeight="bold"
            textAnchor="middle"
            alignmentBaseline="middle"
            transform="translate(-10, -6)"
          >
            {Math.round(totalGramsGoal)}g
          </SvgText>

          {/* Text for consumedGrams */}
          {/* Adjust the text properties and position as needed */}
          <SvgText
            fill={theme.colors.cardHeaderTextColor}
            fontSize={size / 7}
            textAnchor="middle"
            alignmentBaseline="middle"
            transform="translate(-2, 16)"
          >
            {Math.round(consumedGrams)}g
          </SvgText>
        </G>
      </Svg>
      <Text
        style={{
          color: theme.colors.cardHeaderTextColor,
          textAlign: "center",
          marginTop: 5,
        }}
      >
        {(percentage * 100).toFixed(0)}%
      </Text>
    </View>
  );
};

export default MacroCircularChart;
