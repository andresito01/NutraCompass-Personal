import React from "react";
import { View, Text } from "react-native";
import { Card, Title } from "react-native-paper";
import foodDiaryScreenStyles from "../../../screens/styles/foodDiaryScreenStyles.js";
import MacroCircularChart from "../../../components/MacroCircularChart.js";
import { useThemeContext } from "../../../context/ThemeContext.js";
const MacroProgressSection = ({ carbsData, proteinData, fatData }) => {
  const styles = foodDiaryScreenStyles();
  const { theme } = useThemeContext();

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Card style={styles.calorieSection}>
        <Card.Content>
          <Text
            style={{
              ...styles.sectionTitle,
              fontSize: 18,
            }}
          >
            Macros
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <MacroCircularChart
              size={90}
              fillColor={theme.colors.surface}
              {...carbsData}
            />
            <MacroCircularChart
              size={90}
              fillColor={theme.colors.surface}
              {...proteinData}
            />
            <MacroCircularChart
              size={90}
              fillColor={theme.colors.surface}
              {...fatData}
            />
          </View>
        </Card.Content>
      </Card>
    </View>
  );
};

export default MacroProgressSection;
