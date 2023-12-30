import React, { useState, useEffect } from "react";
import { View, LayoutAnimation, UIManager, Platform } from "react-native";
import { Card, Title, IconButton, useTheme } from "react-native-paper";
import { useThemeContext } from "../context/ThemeContext.js";
// Enable LayoutAnimation for Android
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const SubCollapsibleSection = ({ title, children }) => {
  const { theme } = useThemeContext();
  const paperTheme = useTheme();

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Trigger LayoutAnimation when expanded changes
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
  }, [expanded]);

  return (
    <Card
      style={{
        marginVertical: 5,
        elevation: 2,
        borderRadius: 10,
      }}
    >
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title
            style={{
              fontSize: 16,
              margin: 5,
              color: theme.colors.primary, // You can customize the color
            }}
          >
            {title}
          </Title>
          <IconButton
            icon={expanded ? "chevron-up" : "chevron-down"}
            onPress={() => setExpanded(!expanded)}
          />
        </View>
        <View
          style={{
            height: expanded ? "auto" : 0,
            overflow: "hidden",
          }}
        >
          {expanded && children}
        </View>
      </Card.Content>
    </Card>
  );
};

export default SubCollapsibleSection;
