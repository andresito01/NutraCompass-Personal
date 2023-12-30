import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useThemeContext } from "../context/ThemeContext.js";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation

const SplashScreen = () => {
  const { theme } = useThemeContext();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation(); // Get navigation object

  useEffect(() => {
    console.log("SplashScreen useEffect triggered");
    const timer = setTimeout(() => {
      console.log("SplashScreen timer expired");
      setLoading(false);

      // Navigate to the DashboardScreen after 4 seconds
      navigation.navigate("MainTabs");
    }, 4000);

    return () => {
      console.log("SplashScreen cleanup");
      clearTimeout(timer);
    };
  }, [navigation]); // Include navigation in the dependency array

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.screenBackground,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          color: theme.colors.cardHeaderTextColor,
          marginBottom: 20,
        }}
      >
        NutraCompass
      </Text>
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

export default SplashScreen;
