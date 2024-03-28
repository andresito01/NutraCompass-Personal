import React from "react";
import { View, Text } from "react-native";
import { useTheme, Card, Switch } from "react-native-paper";
import { useThemeContext } from "../../../context/ThemeContext.js";

const WorkoutStatusSection = ({
  selectedDate,
  workoutStatus,
  setWorkoutStatus,
}) => {
  const { theme } = useThemeContext();
  const themes = useTheme();

  const toggleWorkoutStatus = () => {
    setWorkoutStatus(!workoutStatus);
  };

  return (
    <Card style={{ elevation: 4, margin: 10 }}>
      <Card.Content>
        <Text style={{ fontSize: 18, color: theme.colors.primaryTextColor }}>
          Workout Status
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text
            style={{
              fontSize: 16,
              flex: 1,
              color: theme.colors.primaryTextColor,
            }}
          >
            Did you work out on {selectedDate}?
          </Text>
          <Switch value={workoutStatus} onValueChange={toggleWorkoutStatus} />
        </View>
      </Card.Content>
    </Card>
  );
};

export default WorkoutStatusSection;
