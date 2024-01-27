import React from "react";
import { View, Text } from "react-native";
import { Card } from "react-native-paper";
import foodDiaryScreenStyles from "../../../screens/styles/foodDiaryScreenStyles.js";

const MacroProgressSection = () => {
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
            <Text style={styles.sectionTitle}>Macro Progress Section</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default MacroProgressSection;
