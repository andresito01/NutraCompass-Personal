import React from "react";
import { View, Text } from "react-native";
import { Card, ProgressBar } from "react-native-paper";
import foodDiaryScreenStyles from "../../../screens/styles/foodDiaryScreenStyles.js";

const CaloriesProgressSection = ({
  calorieGoal,
  totalCalories,
  caloriesRemaining,
  calorieProgressBarPercentage,
}) => {
  const styles = foodDiaryScreenStyles();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Card style={styles.calorieSection}>
        <Card.Content>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionTitle}>Calories Remaining</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                marginHorizontal: 10,
              }}
            >
              <Text style={styles.totalDayCalories}>
                {calorieGoal} {"      -     "}
              </Text>
              <Text style={styles.totalDayCaloriesProgressSectionText}>
                Goal
              </Text>
            </View>
            <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
              <Text style={styles.totalDayCalories}>
                {Math.round(totalCalories)}
                {"        +      "}
              </Text>
              <Text style={styles.totalDayCaloriesProgressSectionText}>
                Food
              </Text>
            </View>
            <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
              <Text style={styles.totalDayCalories}>
                0 {"              =      "}
              </Text>
              <Text style={styles.totalDayCaloriesProgressSectionText}>
                Exercise
              </Text>
            </View>
            <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
              <Text style={styles.totalDayCalories}>
                {Math.round(caloriesRemaining)}
              </Text>
              <Text style={styles.totalDayCaloriesProgressSectionText}>
                Remaining
              </Text>
            </View>
          </View>
          <ProgressBar
            style={{
              marginTop: 20,
              backgroundColor: "rgba(255, 255,255,0.5)",
              // backgroundColor: theme.colors.cardHeaderTextColor,
            }}
            color={
              calorieProgressBarPercentage > 1.0 ? "red" : "#239B56" // green
            }
            progress={calorieProgressBarPercentage}
          />
        </Card.Content>
      </Card>
    </View>
  );
};

export default CaloriesProgressSection;
