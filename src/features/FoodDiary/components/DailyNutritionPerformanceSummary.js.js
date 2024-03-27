import React from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-paper";
import foodDiaryScreenStyles from "../../../screens/styles/foodDiaryScreenStyles.js";

const DailyNutritionPerformanceSummary = ({
  calorieGoal,
  totalCalories,
  caloriesRemaining,
}) => {
  const styles = foodDiaryScreenStyles();

  const belowTargetCaloriesNotMuchLoggedSentences = [
    "You've stayed below your daily calorie goal, but it seems you haven't logged much food yet. Make sure to maintain a balance and meet your nutritional needs.",
    "While you're below your daily target calories, consider logging more meals to ensure you're meeting your body's requirements. Keep up the good work!",
    "Staying below your daily calorie goal is great, but remember to log enough meals for a complete nutritional profile. Keep the momentum going!",
  ];

  const belowTargetCaloriesSentences = [
    "Congratulations on staying below your daily target calories! Your mindful choices have helped you maintain a calorie deficit.",
    "You've done an excellent job in keeping your calories below the daily target. Consistency like this leads to achieving your health goals.",
    "Well done on staying below your daily calorie goal. Your commitment to portion control and healthier choices is paying off!",
  ];

  const calorieGoalAchievedSentences = [
    "You nailed your calorie goal today! Maintaining a balanced intake is key, and you've done a great job managing your portions.",
    "Congratulations on hitting your calorie goal! Your portion control and choices have been on point today.",
    "Great work on staying within your calorie goal. Consistency like this leads to long-term success!",
  ];

  const slightlyExceededTargetCaloriesSentences = [
    "You slightly surpassed your daily calorie goal. It's okay; small deviations happen. Get back on track with your next meal and stay consistent.",
    "A little over the daily target calories today. No need to worry; focus on making healthier choices moving forward to balance it out.",
    "While you've slightly exceeded your daily calorie goal, remember that it's part of the journey. Reflect on your choices and aim for moderation in your next meals.",
  ];

  const exceededTargetCaloriesSentences = [
    "It appears you went over your daily target calories. No worries; occasional indulgences happen. Focus on balance in your next meals.",
    "While you exceeded your daily calorie goal today, remember that progress is not linear. Reflect on your choices and aim for moderation moving forward.",
    "Exceeding your daily target calories is an opportunity to reassess. Tomorrow is a new day to make mindful choices and stay on track.",
  ];

  const massivelyExceededTargetCaloriesSentences = [
    "It looks like you massively surpassed your daily calorie goal today. Take this as a learning opportunity and plan for more balanced meals tomorrow.",
    "A significant surpassing of your daily calorie goal. Reflect on what contributed to this and consider adjusting your choices for better balance.",
    "Exceeding your daily calorie goal by a large margin. Tomorrow is a fresh start; aim for moderation and make mindful food choices.",
  ];

  // Determine the appropriate sentences based on different scenarios
  let feedbackSentences = [];
  if (caloriesRemaining > 0 && totalCalories < 500) {
    feedbackSentences = belowTargetCaloriesNotMuchLoggedSentences;
  } else if (caloriesRemaining > 0) {
    feedbackSentences = belowTargetCaloriesSentences;
  } else if (totalCalories === calorieGoal) {
    feedbackSentences = calorieGoalAchievedSentences;
  } else if (
    totalCalories > calorieGoal &&
    totalCalories <= calorieGoal + 100
  ) {
    feedbackSentences = slightlyExceededTargetCaloriesSentences;
  } else if (
    totalCalories > calorieGoal &&
    totalCalories <= calorieGoal + 500
  ) {
    feedbackSentences = exceededTargetCaloriesSentences;
  } else if (totalCalories > calorieGoal + 500) {
    feedbackSentences = massivelyExceededTargetCaloriesSentences;
  }

  // Get a random sentence
  const getRandomSentence = () => {
    const randomIndex = Math.floor(Math.random() * feedbackSentences.length);
    return feedbackSentences[randomIndex];
  };

  const randomSentence = getRandomSentence();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Card style={styles.calorieSection}>
        <Card.Content>
          <View style={styles.sectionHeaderContainer}>
            <Text style={styles.sectionTitle}>
              Daily Nutrition Performance Summary
            </Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default DailyNutritionPerformanceSummary;
