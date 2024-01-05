import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Image } from "react-native";
import logo from "../../assets/brandmark-design.png";
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
    }, 3000);

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
      <Image
        source={logo}
        style={{
          width: 360,
          height: 100,
          alignSelf: "center",
          marginBottom: 20,
        }}
      />
      <ActivityIndicator
        size="large"
        color={theme.colors.cardHeaderTextColor}
      />
    </View>
  );
};

export default SplashScreen;
