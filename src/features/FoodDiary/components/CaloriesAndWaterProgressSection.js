import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Card, ProgressBar, Title, IconButton } from "react-native-paper";
import { Entypo } from "@expo/vector-icons";
import foodDiaryScreenStyles from "../../../screens/styles/foodDiaryScreenStyles.js";
import { useThemeContext } from "../../../context/ThemeContext.js";
import VerticalProgressBar from "../../../components/VerticalProgressBar.js";

const screenWidth = Dimensions.get("window").width;

const CaloriesAndWaterProgressSection = ({
  calorieGoal,
  totalCalories,
  caloriesRemaining,
  calorieProgressBarPercentage,
}) => {
  const styles = foodDiaryScreenStyles();
  const { theme, mode } = useThemeContext();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Card style={styles.calorieSection}>
        <Card.Content
          style={{
            height: "100%",
            flexDirection: "row",
            gap: 30,
          }}
        >
          <View
            style={{
              height: "100%",
              width: "85%",
              justifyContent: "center",
              gap: 10,
            }}
          >
            <Text
              style={{
                ...styles.sectionTitle,
                paddingBottom: 10,
                fontSize: 18,
              }}
            >
              Calories Remaining
            </Text>

            <View
              style={{
                flexDirection: "row",
                gap: 20,
                width: "100%",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  marginHorizontal: 0,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    gap: 20,
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.totalDayCalories}>{calorieGoal}</Text>
                  <Text style={styles.totalDayCalories}>-</Text>

                  {/* <Feather
                    name="minus"
                    color={theme.colors.primaryTextColor}
                    size={20}
                  /> */}
                </View>

                <Text style={styles.totalDayCaloriesProgressSectionText}>
                  Goal
                </Text>
              </View>
              <View style={{ flexDirection: "column", marginHorizontal: 0 }}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 20,
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.totalDayCalories}>
                    {Math.round(totalCalories)}
                  </Text>
                  <Text style={styles.totalDayCalories}>+</Text>

                  {/* <Feather
                    name="plus"
                    color={theme.colors.primaryTextColor}
                    size={20}
                  /> */}
                </View>
                <Text style={styles.totalDayCaloriesProgressSectionText}>
                  Food
                </Text>
              </View>
              <View style={{ flexDirection: "column", marginHorizontal: 0 }}>
                <View
                  style={{
                    flexDirection: "row",
                    gap: 20,
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.totalDayCalories}>0</Text>
                  <Text style={styles.totalDayCalories}>=</Text>

                  {/* <Feather
                    name="minus"
                    color={theme.colors.primary}
                    size={20}
                  /> */}
                </View>
                <Text style={styles.totalDayCaloriesProgressSectionText}>
                  Exercise
                </Text>
              </View>
              <View style={{ flexDirection: "column", marginHorizontal: 0 }}>
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
                width: "100%",
                marginTop: 20,
                backgroundColor:
                  mode === "dark"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
              }}
              color={
                calorieProgressBarPercentage > 1.0 ? "red" : "#239B56" // green
              }
              progress={calorieProgressBarPercentage}
            />
          </View>
          <View
            style={{
              height: "100%",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              gap: 15,
            }}
          >
            <Entypo name={"drop"} size={20} color={"lightblue"} />

            {/** Water Progress Bar Not Yet Functional */}
            <VerticalProgressBar
              percentage={0}
              color={"#2196F3"}
              width={3}
              height={screenWidth * 0.2}
            />
            {/* <Text style={{ color: theme.colors.primaryTextColor }}>H2O</Text> */}
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default CaloriesAndWaterProgressSection;
