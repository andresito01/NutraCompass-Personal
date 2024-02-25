import React, { useState, useEffect } from "react";
import {
  UIManager,
  LayoutAnimation,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import SwipeableFoodEntryItem from "./SwipeableFoodEntryItem.js";
import { useFoodLog } from "../context/FoodLogContext.js";

const SwipeableFoodEntryListItem = ({
  item,
  mealType,
  handleOpenFoodNutrientModal,
}) => {
  const { deleteFoodEntry } = useFoodLog();
  const [isSwiping, setIsSwiping] = useState(false);

  useEffect(() => {
    UIManager.setLayoutAnimationEnabledExperimental?.(true);
    LayoutAnimation.spring();
  }, []);

  const handleDeleteEntry = (id) => {
    deleteFoodEntry(mealType, id);
  };

  return (
    <SwipeableFoodEntryItem
      key={item.id}
      swipingCheck={(swiping) => setIsSwiping(swiping)}
      id={item.id}
      itemData={item}
      handleDeleteEntry={(id) => handleDeleteEntry(id)}
      handleEditEntry={() => handleOpenFoodNutrientModal(item)}
    />
  );
};

export default SwipeableFoodEntryListItem;
