import React from "react";
import { ScrollView, View, Dimensions } from "react-native";
import { Card, Title } from "react-native-paper";
import * as Haptics from "expo-haptics";
import { useThemeContext } from "../../../context/ThemeContext.js";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  interpolate,
} from "react-native-reanimated";
import {
  Default,
  Gold,
  Blue,
  Green,
  Red,
  HotPink,
  Orange,
  Teal,
  Silver,
  Purple,
  AllPink,
  AllPurple,
  AllTeal,
} from "../../../../themes.js";

const themes = [
  Default,
  Gold,
  Blue,
  Green,
  Red,
  HotPink,
  Orange,
  Teal,
  Silver,
  Purple,
  AllPink,
  AllPurple,
  AllTeal,
];

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const MIN_WIDTH = SCREEN_WIDTH / 2.2;

const ThemeSelector = ({ renderStructure }) => {
  const { toggleTheme, theme, mode } = useThemeContext();

  const width = useSharedValue(SCREEN_WIDTH / 2); // Assuming you have SCREEN_WIDTH defined

  const handleThemeChange = (selectedTheme) => {
    toggleTheme(selectedTheme);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const renderThemeButtons = () => {
    if (renderStructure === "structure1") {
      const themeRows = [];
      for (let i = 0; i < themes.length; i += 2) {
        const theme1 = themes[i];
        const theme2 = themes[i + 1];
        themeRows.push(
          <View key={i} style={{ flexDirection: "row", marginHorizontal: 10 }}>
            <ThemeCard theme={theme1} renderStructure={renderStructure} />
            {theme2 && <ThemeCard theme={theme2} />}
          </View>
        );
      }
      return themeRows;
    } else if (renderStructure === "structure2") {
      return themes.map((theme, index) => (
        <ThemeCard key={index} theme={theme} />
      ));
    }
  };

  const ThemeCard = ({ theme }) => {
    return (
      <View style={[{ flex: 1 }]}>
        <Card
          style={{
            margin: 8,
            elevation: 4,
            minWidth: 130,
          }}
          onPress={() => handleThemeChange(theme)}
        >
          <Card.Content>
            <Title
              style={{
                textAlign: "center",
                alignSelf: "center",
                color:
                  mode === "dark"
                    ? theme.dark.colors.cardHeaderTextColor
                    : theme.light.colors.cardHeaderTextColor,
              }}
            >
              {theme.name}
            </Title>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                marginTop: 16,
                gap: 10,
              }}
            >
              <View
                style={{
                  backgroundColor:
                    mode === "dark"
                      ? theme.dark.colors.primary
                      : theme.light.colors.primary,
                  minWidth: 40,
                  minHeight: 40,
                  borderRadius: 8,
                  aspectRatio: 1,
                }}
              />
              <View
                style={{
                  backgroundColor:
                    mode === "dark"
                      ? theme.dark.colors.secondary
                      : theme.light.colors.secondary,
                  minWidth: 40,
                  minHeight: 40,
                  borderRadius: 8,
                }}
              />
            </View>
          </Card.Content>
        </Card>
      </View>
    );
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ width: "100%" }}
      contentContainerStyle={{ alignItems: "center" }}
    >
      {renderThemeButtons()}
    </ScrollView>
  );
};

export default ThemeSelector;
