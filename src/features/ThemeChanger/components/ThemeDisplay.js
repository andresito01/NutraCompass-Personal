import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useThemeContext } from "../../../context/ThemeContext.js";

const ThemeDisplay = () => {
  const { theme } = useThemeContext(); // Make sure you have the correct context hook

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    section: {
      padding: 10,
      margin: 5,
      backgroundColor: theme.colors.sectionBackgroundColor,
      borderColor: theme.colors.sectionBorderColor,
      borderWidth: 1,
      borderRadius: theme.dimensions.sectionBorderRadius,
    },
    card: {
      padding: 10,
      margin: 5,
      backgroundColor: theme.colors.cardBackgroundColor,
      borderColor: theme.colors.cardBorderColor,
      borderWidth: 1,
      borderRadius: theme.dimensions.cardBorderRadius,
    },
    sectionLowOpacity: {
      padding: 10,
      margin: 5,
      backgroundColor: theme.colors.sectionBackgroundColorLowOpacity,
      borderColor: theme.colors.sectionBorderColor,
      borderWidth: 1,
      borderRadius: theme.dimensions.sectionBorderRadius,
    },
    cardLowOpacity: {
      padding: 10,
      margin: 5,
      backgroundColor: theme.colors.cardBackgroundColorLowOpacity,
      borderColor: theme.colors.cardBorderColor,
      borderWidth: 1,
      borderRadius: theme.dimensions.cardBorderRadius,
    },
    cardDarkGrayBackgroundColor: {
      padding: 10,
      margin: 5,
      backgroundColor: theme.colors.cardDarkGrayBackgroundColor,
      borderColor: theme.colors.cardBorderColor,
      borderWidth: 1,
      borderRadius: theme.dimensions.cardBorderRadius,
    },
    cardShadow: {
      padding: 10,
      margin: 5,
      backgroundColor: theme.colors.shadow,
      borderColor: theme.colors.cardBorderColor,
      borderWidth: 1,
      borderRadius: theme.dimensions.cardBorderRadius,
    },
    headerText: {
      color: theme.colors.primaryTextColor,
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
    },
    cardHeaderText: {
      color: theme.colors.primaryTextColor,
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
    },
  });

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          margin: 8,
          elevation: 4,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginTop: 16,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              alignSelf: "center",
              color: theme.colors.primaryTextColor,
            }}
          >
            {theme.name}
          </Text>
          <View
            style={{
              backgroundColor: theme.colors.primary,

              width: 40,
              height: 40,
              borderRadius: 8,
            }}
          />
          <View
            style={{
              backgroundColor: theme.colors.secondary,
              width: 40,
              height: 40,
              borderRadius: 8,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ThemeDisplay;
