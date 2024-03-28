// CustomExerciseCard.js

import React from "react";
import { View, Text, Image } from "react-native";
import { Card } from "react-native-paper";
import { useThemeContext } from "../../../context/ThemeContext.js";

const CustomExerciseCard = ({ exercise }) => {
  const { theme } = useThemeContext();

  return (
    <Card
      style={{
        margin: 5,
        width: 200,
        backgroundColor: theme.colors.cardBackgroundColor,
      }}
    >
      <Card.Content style={{ height: "100%", gap: 5 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16, color: theme.colors.primaryTextColor }}>
            {exercise.name}
          </Text>
          <Text style={{ fontSize: 12, color: theme.colors.primaryTextColor }}>
            {exercise.dateCreated}
          </Text>
        </View>
        {/* Add other content here, similar to ExerciseCard */}
      </Card.Content>
    </Card>
  );
};

export default CustomExerciseCard;
