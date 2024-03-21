import React, { useEffect, useState } from "react";
import {
  View,
  ActivityIndicator,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import logo from "../../assets/brandmark-design-logo.png";
import { useThemeContext } from "../context/ThemeContext.js";
import { useNavigation } from "@react-navigation/native";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

const SplashScreen = () => {
  const { theme } = useThemeContext();
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigation.navigate("Drawer");
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [navigation]);

  return (
    <LinearGradient
      // colors={[theme.colors.primary, theme.colors.secondary]}
      colors={["black", "white"]}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
      start={{ x: 0, y: 0.8 }} // Start the gradient from the bottom of the screen
      end={{ x: 0, y: 0.2 }} // End the gradient at the top of the screen
    >
      <Image
        source={logo}
        resizeMode="contain"
        style={{
          width: screenWidth / 1.1,
          height: screenHeight / 7,
          alignSelf: "center",
          marginBottom: 30,
        }}
      />
      <ActivityIndicator size="large" color={"white"} />
    </LinearGradient>
  );
};

export default SplashScreen;
