import React from "react";
import { ScrollView, View } from "react-native";
import { Card, Title } from "react-native-paper";
import {
  Theme1,
  Theme2,
  Theme3,
  Theme4,
  Theme5,
  Theme6,
  Theme7,
  Theme8,
  Theme9,
} from "../../../../themes.js";
import { useThemeContext } from "../../../context/ThemeContext.js";

const themes = [
  Theme1,
  Theme2,
  Theme3,
  Theme4,
  Theme5,
  Theme6,
  Theme7,
  Theme8,
  Theme9,
];

const ThemeSelector = () => {
  const { toggleTheme, theme, mode } = useThemeContext();

  const handleThemeChange = (selectedTheme) => {
    toggleTheme(selectedTheme);
  };

  const renderThemeButtons = () => {
    return themes.map((selectedTheme, index) => (
      <Card
        key={index}
        style={{
          marginVertical: 8,
          elevation: 4,
        }}
        onPress={() => handleThemeChange(selectedTheme)}
      >
        <Card.Content>
          <Title
            style={{
              color:
                mode === "dark"
                  ? selectedTheme.dark.colors.cardHeaderTextColor
                  : selectedTheme.light.colors.cardHeaderTextColor,
            }}
          >
            Theme {index + 1}
          </Title>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              marginTop: 16,
            }}
          >
            <View
              style={{
                backgroundColor:
                  mode === "dark"
                    ? selectedTheme.dark.colors.primary
                    : selectedTheme.light.colors.primary,
                width: 40,
                height: 40,
                borderRadius: 8,
              }}
            />
            <View
              style={{
                backgroundColor:
                  mode === "dark"
                    ? selectedTheme.dark.colors.secondary
                    : selectedTheme.light.colors.secondary,
                width: 40,
                height: 40,
                borderRadius: 8,
              }}
            />
            <View
              style={{
                backgroundColor:
                  mode === "dark"
                    ? selectedTheme.dark.colors.cardBackgroundColor
                    : selectedTheme.light.colors.cardBackgroundColor,
                width: 40,
                height: 40,
                borderRadius: 8,
              }}
            />

            <View
              style={{
                backgroundColor:
                  mode === "dark"
                    ? selectedTheme.dark.colors.cardBackgroundColorLowOpacity
                    : selectedTheme.light.colors.cardBackgroundColorLowOpacity,
                width: 40,
                height: 40,
                borderRadius: 8,
              }}
            />
          </View>
        </Card.Content>
      </Card>
    ));
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {renderThemeButtons()}
    </ScrollView>
  );
};

export default ThemeSelector;
