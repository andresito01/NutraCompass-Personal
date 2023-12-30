import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useThemeContext } from "../context/ThemeContext.js";

const ThemeDisplay = () => {
  const { theme } = useThemeContext(); // Make sure you have the correct context hook

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
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
      color: theme.colors.sectionHeaderTextColor,
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
    },
    cardHeaderText: {
      color: theme.colors.cardHeaderTextColor,
      fontSize: 16,
      fontWeight: "bold",
      marginBottom: 8,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ width: "80%" }}>
        <View style={styles.section}>
          <Text style={styles.headerText}>Section Background</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardHeaderText}>Card Background</Text>
        </View>

        <View style={styles.sectionLowOpacity}>
          <Text style={styles.headerText}>Section Background Low</Text>
        </View>

        <View style={styles.cardLowOpacity}>
          <Text style={styles.cardHeaderText}>Card Background Low</Text>
        </View>
        <View style={styles.cardDarkGrayBackgroundColor}>
          <Text style={styles.cardHeaderText}>Card Dark Gray</Text>
        </View>

        <View style={styles.cardShadow}>
          <Text style={styles.cardHeaderText}>Shadow</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ThemeDisplay;
