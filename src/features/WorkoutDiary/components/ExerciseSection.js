import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Card, useTheme } from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import { useThemeContext } from "../../../context/ThemeContext.js";

// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ExerciseCard = ({ exercise }) => {
  const { theme } = useThemeContext();
  const paperTheme = useTheme();

  return (
    <Card
      style={{
        margin: 5,
        height: 250,
        width: 350,
        backgroundColor: theme.colors.cardBackgroundColor,
      }}
    >
      <Card.Content style={{ height: "100%", gap: 5 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16, color: theme.colors.primaryTextColor }}>
            Exercise:
          </Text>
          <Text style={{ fontSize: 16, color: theme.colors.primaryTextColor }}>
            Select
          </Text>
        </View>
        <View
          style={{
            flex: 3,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <Text
              style={{ fontSize: 12, color: theme.colors.primaryTextColor }}
            >
              Primary Muscle:
            </Text>
            <Text
              style={{ fontSize: 12, color: theme.colors.primaryTextColor }}
            >
              Secondary Muscles:
            </Text>
            <Text
              style={{ fontSize: 12, color: theme.colors.primaryTextColor }}
            >
              Equipment Required:
            </Text>
            <Text
              style={{ fontSize: 12, color: theme.colors.primaryTextColor }}
            >
              Instructions:
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Image
              source={{ uri: exercise.gifUrl }}
              height={200}
              width={150}
              resizeMode="contain"
            />
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};

const ExerciseSection = ({ bodyPart, exercises }) => {
  const { theme } = useThemeContext();
  const paperTheme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const toggleSection = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(!expanded);
  };

  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.sectionBorderColor,
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
        onPress={toggleSection}
      >
        <Text
          style={{
            fontSize: 16,
            margin: 10,
            color: theme.colors.primaryTextColor,
          }}
        >
          {bodyPart.toUpperCase()}
        </Text>
        <Feather
          name={expanded ? "arrow-up" : "arrow-down"}
          color={theme.colors.primary}
          size={20}
        />
      </TouchableOpacity>
      <View
        style={{
          height: expanded ? "auto" : 0,
          overflow: "hidden",
        }}
      >
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {expanded &&
          exercises &&
          Array.isArray(exercises) &&
          exercises.length > 0
            ? exercises.map((exercise, index) => (
                <ExerciseCard key={index} exercise={exercise} />
              ))
            : null}
        </ScrollView>
      </View>
    </View>
  );
};

export default ExerciseSection;
