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

const CollapsibleSection = ({ title, children }) => {
  const { theme, mode } = useThemeContext();
  const paperTheme = useTheme();

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    // Trigger LayoutAnimation when expanded changes
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [expanded]);

  return (
    <Card
      style={{
        elevation: 4,
        borderRadius: 15,
        shadowOffset: { width: -5, height: 2 },
        shadowOpacity: 0.5,
        shadowRadius: 3,
      }}
    >
      <Card.Content>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingHorizontal: 10,
            marginBottom: 10,
            borderRightWidth: 1,
            borderLeftWidth: 1,
            borderColor: "gray",
          }}
        >
          <Title
            style={{
              width: "60%",
              fontSize: 18,
              padding: 10,
              color: theme.colors.primary, // You can customize the color
            }}
          >
            {title}
          </Title>
          <IconButton
            icon={expanded ? "chevron-up" : "chevron-down"}
            onPress={() => setExpanded(!expanded)}
            style={{ flex: 1, height: "100%", alignItems: "stretch" }}
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

export default CollapsibleSection;
