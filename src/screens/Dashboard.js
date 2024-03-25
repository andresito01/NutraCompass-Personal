import React, { useState, useEffect, useCallback } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { Pedometer } from "expo-sensors";
import { Icon } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import { useAuth } from "../authentication/context/AuthContext.js";
import { useThemeContext } from "../context/ThemeContext.js";
import { useFoodLog } from "../features/FoodDiary/context/FoodLogContext.js";
import { useUserSettings } from "../features/UserSettings/context/UserSettingsContext.js";
import dashboardScreenStyles from "./styles/dashboardScreenStyles.js";
import LinearGradientCard from "../components/LinearGradientCard.js";
import CircularChart from "../components/CircularChart.js";
import MacroCircularChart from "../components/MacroCircularChart.js";
import OpenDrawerToggle from "../features/SocialMedia/components/OpenDrawerToggle.js";
import { useNavigation } from "@react-navigation/native";
import ChatScreen from "../features/SocialMedia/screens/ChatScreen.js";

const DashboardScreen = () => {
  const { user } = useAuth();
  const { theme, mode } = useThemeContext();
  const { totalDailyCaloriesAndMacrosConsumed, selectedDate } = useFoodLog();
  const { getNutritionalGoals } = useUserSettings();
  const { calorieGoal, macroGoals } = getNutritionalGoals();
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const navigation = useNavigation();

  console.log("Macro Goals: " + JSON.stringify(macroGoals, null, 1));
  const styles = dashboardScreenStyles();

  const subscribeToStepCounter = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const end = new Date();
      const start = new Date();
      start.setDate(end.getDate() - 1);

      const pastStepCountResult = await Pedometer.getStepCountAsync(start, end);
      if (pastStepCountResult) {
        setPastStepCount(pastStepCountResult.steps);
      }

      const subscription = Pedometer.watchStepCount((result) => {
        setCurrentStepCount(result.steps);
      });

      return subscription; // Return the subscription object
    }

    return null; // Return null if Pedometer.watchStepCount is not available
  };

  useEffect(() => {
    let subscription = null;

    const setupSubscription = async () => {
      subscription = await subscribeToStepCounter();
      if (subscription) {
        // Ensure subscription is not null before attempting to call remove()
        return () => subscription.remove();
      }
    };

    setupSubscription();

    return () => {
      // Cleanup function
      if (subscription) {
        subscription.remove(); // Remove the subscription if it exists
      }
    };
  }, []);

  const calculateDistanceFromSteps = useCallback((stepCount) => {
    const AVERAGE_STEP_LENGTH_METERS = 0.762;
    const distanceMeters = stepCount * AVERAGE_STEP_LENGTH_METERS;
    const distanceMiles = distanceMeters / 1609.34;
    return distanceMiles;
  }, []);

  // Get the current date
  const currentDate = new Date();

  // Adjust selectedDate to match the timezone of currentDate
  const selectedDateAdjusted = new Date(selectedDate);
  selectedDateAdjusted.setMinutes(
    selectedDateAdjusted.getMinutes() + currentDate.getTimezoneOffset()
  );

  // Format selectedDate to match the currentDate format for display
  const formattedSelectedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(selectedDateAdjusted);

  // Memoize data to prevent unnecessary recalculations on re-renders
  const calorieData = React.useMemo(() => {
    const calorieProgressBarPercentage =
      totalDailyCaloriesAndMacrosConsumed.calories / calorieGoal;
    return {
      calorieGoal,
      totalCalories: totalDailyCaloriesAndMacrosConsumed.calories,
      caloriesRemaining:
        calorieGoal - totalDailyCaloriesAndMacrosConsumed.calories,
      calorieProgressBarPercentage: isNaN(calorieProgressBarPercentage)
        ? 0
        : calorieProgressBarPercentage,
    };
  }, [totalDailyCaloriesAndMacrosConsumed, calorieGoal]);

  const macroData = React.useMemo(() => {
    const calculatePercentage = (consumed, goal) => {
      return consumed / goal.dailyGrams;
    };

    return {
      carbsData: {
        percentage: calculatePercentage(
          totalDailyCaloriesAndMacrosConsumed.carbs,
          macroGoals.carb
        ),
        color: "orange",
        label: "Carbs",
        totalGramsGoal: macroGoals.carb.dailyGrams,
        consumedGrams: totalDailyCaloriesAndMacrosConsumed.carbs,
      },
      proteinData: {
        percentage: calculatePercentage(
          totalDailyCaloriesAndMacrosConsumed.protein,
          macroGoals.protein
        ),
        color: "green",
        label: "Protein",
        totalGramsGoal: macroGoals.protein.dailyGrams,
        consumedGrams: totalDailyCaloriesAndMacrosConsumed.protein,
      },
      fatData: {
        percentage: calculatePercentage(
          totalDailyCaloriesAndMacrosConsumed.fat,
          macroGoals.fat
        ),
        color: "red",
        label: "Fat",
        totalGramsGoal: macroGoals.fat.dailyGrams,
        consumedGrams: totalDailyCaloriesAndMacrosConsumed.fat,
      },
    };
  }, [totalDailyCaloriesAndMacrosConsumed, macroGoals]);

  const totalPercentage = React.useMemo(() => {
    const totalMacroPercentage = Object.values(macroData).reduce(
      (total, { percentage }) => {
        const adjustedPercentage = Math.min(percentage, 1); // Cap percentage at 100%
        return total + adjustedPercentage;
      },
      0
    );

    return totalMacroPercentage / Object.keys(macroData).length;
  }, [macroData]);

  return (
    <View style={styles.container}>
      {/** Home Header Container */}
      <View style={styles.header}>
        {/** Side Menu Drawer Toggle */}
        <OpenDrawerToggle />
        <Text
          style={{
            color: theme.colors.primary,
            fontSize: 26,
            fontWeight: "700",
          }}
        >
          NUTRACOMPASS
        </Text>
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/** Direct Messages Page Navigation Button */}
          <TouchableOpacity
            style={{ justifyContent: "center", alignItems: "center" }}
            onPress={() => navigation.navigate("Chat")}
          >
            <Feather
              name="message-circle"
              color={theme.colors.cardHeaderTextColor}
              size={34}
            />
          </TouchableOpacity>
          {/** Mini Profile Pic */}
          <TouchableOpacity>
            <View
              style={{
                borderWidth: 1,
                borderRadius: 30,
                padding: 12,
                borderColor: theme.colors.cardHeaderTextColor,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        style={{ flexGrow: 1, width: "100%" }}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          paddingBottom: "15%",
        }}
      >
        {/** Today's Date Container */}
        <View style={{ height: "14%", width: "93%" }}>
          <LinearGradientCard style={{ borderRadius: 12, padding: 4 }}>
            <View
              style={{
                flex: 1,
                width: "60%",
                justifyContent: "center",
                padding: 5,
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
                <Text
                  style={{
                    color: "rgba(11, 218, 81, 1)",
                    fontSize: 28,
                    fontWeight: "600",
                  }}
                >
                  Today
                </Text>
                <Feather
                  name="calendar"
                  size={22}
                  color={theme.colors.cardHeaderTextColor}
                />
              </View>
              <View>
                <Text
                  style={{
                    color: theme.colors.cardHeaderTextColor,
                    fontSize: 14,
                    fontWeight: "600",
                  }}
                >
                  {formattedSelectedDate}
                </Text>
              </View>
            </View>
          </LinearGradientCard>
        </View>

        {/** Summary Container Including Calories Remaining, Step Counter, Distance Covered, and Macro Consumption Progress */}
        <View
          style={{
            height: "50%",
            width: "100%",
            padding: 10,
            gap: 10,
          }}
        >
          <Text
            style={{
              color: theme.colors.cardHeaderTextColor,
              fontSize: 18,
              fontWeight: "600",
            }}
          >
            Summary
          </Text>

          {/** Calories Remaining Card */}
          <View
            style={{
              height: "60%",
              backgroundColor: mode === "dark" ? "black" : theme.colors.surface,
              borderRadius: 8,
              padding: 20,
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 2 }}>
              <Text
                style={{
                  color: "rgba(11, 218, 81, 1)",
                  fontSize: 16,
                  fontWeight: "600",
                  marginBottom: 14,
                }}
              >
                Calories Remaining
              </Text>
              <View style={{ flex: 1, flexDirection: "row", paddingLeft: 30 }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: theme.colors.cardHeaderTextColor,
                    }}
                  >
                    Goal
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: theme.colors.cardHeaderTextColor,
                    }}
                  >
                    Food
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      color: theme.colors.cardHeaderTextColor,
                    }}
                  >
                    Exercise
                  </Text>
                </View>
                <View
                  style={{
                    flex: 2,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: theme.colors.cardHeaderTextColor,
                      textAlign: "center",
                    }}
                  >
                    {calorieData.calorieGoal}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: theme.colors.cardHeaderTextColor,
                      textAlign: "center",
                    }}
                  >
                    -
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: theme.colors.cardHeaderTextColor,
                      textAlign: "center",
                    }}
                  >
                    {Math.round(calorieData.totalCalories)}
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: theme.colors.cardHeaderTextColor,
                      textAlign: "center",
                    }}
                  >
                    +
                  </Text>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "500",
                      color: theme.colors.cardHeaderTextColor,
                      textAlign: "center",
                    }}
                  >
                    0
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/** Calories Remaining Chart */}
              <CircularChart
                size={120}
                percentage={calorieData.calorieProgressBarPercentage}
                color={
                  calorieData.calorieProgressBarPercentage > 1
                    ? "red"
                    : "#4CAF50"
                }
                fillColor={mode === "dark" ? "black" : theme.colors.surface}
                bottomLabel={"Remaining"}
                value={calorieData.caloriesRemaining}
              />
            </View>
          </View>

          <View style={{ flexDirection: "row", gap: 10 }}>
            {/** Step Counter  */}
            <View style={{ flex: 1 }}>
              <LinearGradientCard style={{ borderRadius: 12, padding: 4 }}>
                <View
                  style={{
                    flex: 1,
                    padding: 4,
                    gap: 5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "baseline",
                    }}
                  >
                    <Text
                      style={{
                        color: theme.colors.cardHeaderTextColor,
                        fontSize: 18,
                        fontWeight: "600",
                      }}
                    >
                      Steps
                    </Text>
                    <Icon source="flag-variant" color={"orange"} size={14} />
                    <Text
                      style={{
                        color: theme.colors.cardHeaderTextColor,
                        fontSize: 12,
                        fontWeight: "600",
                      }}
                    >
                      10000
                    </Text>
                  </View>

                  <Text
                    style={{
                      color: theme.colors.cardHeaderTextColor,
                      fontSize: 18,
                      fontWeight: "600",
                    }}
                  >
                    {pastStepCount.toLocaleString()}
                  </Text>
                </View>
              </LinearGradientCard>
            </View>
            {/** Distance Traveled  */}
            <View style={{ flex: 1 }}>
              <LinearGradientCard style={{ borderRadius: 12, padding: 4 }}>
                <View
                  style={{
                    flex: 1,
                    padding: 4,
                    gap: 5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "baseline",
                    }}
                  >
                    <Text
                      style={{
                        color: theme.colors.cardHeaderTextColor,
                        fontSize: 18,
                        fontWeight: "600",
                      }}
                    >
                      Distance
                    </Text>
                    <Icon source="flag-variant" color={"orange"} size={14} />
                    <Text
                      style={{
                        color: theme.colors.cardHeaderTextColor,
                        fontSize: 12,
                        fontWeight: "600",
                      }}
                    >
                      5.00 mi
                    </Text>
                  </View>

                  <Text
                    style={{
                      color: theme.colors.cardHeaderTextColor,
                      fontSize: 18,
                      fontWeight: "600",
                    }}
                  >
                    {calculateDistanceFromSteps(pastStepCount).toFixed(2)} mi
                  </Text>
                </View>
              </LinearGradientCard>
            </View>
          </View>

          {/** Macros Card  */}
          <View
            style={{
              height: "65%",
              backgroundColor: mode === "dark" ? "black" : theme.colors.surface,
              borderRadius: 8,
              padding: 20,
              flexDirection: "row",
            }}
          >
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  color: "rgba(11, 218, 81, 1)",
                  fontSize: 16,
                  fontWeight: "600",
                  marginBottom: 14,
                }}
              >
                Macros
              </Text>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <MacroCircularChart
                  fillColor={mode === "dark" ? "black" : theme.colors.surface}
                  size={64}
                  {...macroData.carbsData}
                />
                <MacroCircularChart
                  fillColor={mode === "dark" ? "black" : theme.colors.surface}
                  size={64}
                  {...macroData.proteinData}
                />
                <MacroCircularChart
                  fillColor={mode === "dark" ? "black" : theme.colors.surface}
                  size={64}
                  {...macroData.fatData}
                />

                {/** Total Macro Consumption Progress */}
                <CircularChart
                  size={64}
                  percentage={totalPercentage}
                  color={"#4CAF50"} // Green
                  fillColor={mode === "dark" ? "black" : theme.colors.surface}
                  topLabel={"Total"}
                  value={totalPercentage * 100}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;
