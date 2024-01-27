import React from "react";
import { View } from "react-native";
import CaloriesProgressSection from "./CaloriesProgressSection";
import MacroProgressSection from "./MacroProgressSection.js";
import DailyNutritionPerformanceSummary from "./DailyNutritionPerformanceSummary.js.js";
const CarouselRenderItemComponent = ({ item }) => {
  // Check the type of content based on the item's type
  const renderContent = () => {
    switch (item.type) {
      case "CaloriesProgressSection":
        return (
          <CaloriesProgressSection
            calorieGoal={item.calorieGoal}
            totalCalories={item.totalCalories}
            caloriesRemaining={item.caloriesRemaining}
            calorieProgressBarPercentage={item.calorieProgressBarPercentage}
          />
        );
      case "MacroProgressSection":
        return <MacroProgressSection />;
      case "DailyNutritionPerformanceSummary":
        return <DailyNutritionPerformanceSummary />;
      // Add more cases for other content types

      default:
        return null;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 5,
      }}
    >
      {renderContent()}
    </View>
  );
};

export default CarouselRenderItemComponent;
