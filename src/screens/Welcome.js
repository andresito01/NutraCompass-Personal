import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Card } from "react-native-paper"; // Import Button and Carousel components
import logo from "../../assets/brandmark-design-logo.png";
import welcomeScreenStyles from "./styles/welcomeScreenStyles.js";
import { useThemeContext } from "../context/ThemeContext.js";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");

function WelcomeScreen({ navigation }) {
  const styles = welcomeScreenStyles(); // Destructure styles
  const { theme } = useThemeContext(); // Use the imported theme

  const [currentIndex, setCurrentIndex] = useState(0);

  const carouselHeight = screenHeight * 0.5; // Set the height to 22% of the screen height
  const carouselWidth = screenWidth; // Set the width to 100% of the screen width

  const handleSlideChange = (index) => {
    setCurrentIndex(index);
  };

  // Array of carousel views
  const carouselSlides = [
    require("../../assets/welcome/welcome4.png"),
    require("../../assets/welcome/welcome1.png"),
    require("../../assets/welcome/welcome3.png"),
    require("../../assets/welcome/welcome2.png"),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["black", "white"]}
        style={{
          flex: 1,
        }}
        start={{ x: 0, y: 0.6 }}
        end={{ x: 0, y: 0.2 }}
      >
        <View style={styles.contentContainer}>
          <Image
            source={logo}
            style={{
              width: 360,
              height: 100,
              alignSelf: "center",
              marginBottom: 20,
            }}
          />

          <View>
            {/* Indicator */}
            <View
              style={{
                alignSelf: "center",
                flexDirection: "row",
                marginVertical: 10,
              }}
            >
              {carouselSlides.map((_, index) => (
                <View
                  key={index}
                  style={{
                    height: screenWidth * 0.025,
                    width: screenWidth * 0.025,
                    borderRadius: 30,
                    backgroundColor:
                      index === currentIndex
                        ? theme.colors.primary
                        : "rgba(255, 255, 255, 0.5)",
                    marginHorizontal: 5, // Adjust as needed
                  }}
                />
              ))}
            </View>
            <Carousel
              height={carouselHeight}
              width={carouselWidth}
              data={carouselSlides}
              renderItem={({ item }) => (
                <View style={{ alignSelf: "center", flex: 1 }}>
                  <Image
                    resizeMode="contain"
                    source={item}
                    style={{
                      flex: 1,
                    }}
                  />
                </View>
              )}
              onSnapToItem={handleSlideChange}
              on
            />
          </View>

          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Button
              mode="contained"
              style={{
                backgroundColor: "white",
                borderRadius: 8,
                paddingVertical: 2,
                marginVertical: 15,
                width: "90%",
              }}
              labelStyle={{
                color: "black",
                fontSize: 18,
                fontWeight: "bold",
              }}
              onPress={() => {
                navigation.navigate("Sign Up");
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              SIGN UP
            </Button>
            <Button
              mode="text"
              style={{
                backgroundColor: "transparent",
                borderRadius: 24,
                paddingVertical: 10,
              }}
              onPress={() => {
                navigation.navigate("Sign In");
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              <View style={{ alignItems: "center", gap: 5 }}>
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                  }}
                >
                  Already have an account?
                </Text>
                <Text
                  style={{
                    color: "white",
                    fontSize: 18,
                  }}
                >
                  LOG IN
                </Text>
              </View>
            </Button>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

export default WelcomeScreen;

// import React from "react";
// import { Text, View } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { useTheme, Button } from "react-native-paper"; // Import Button component
// import ThemeChanger from "../components/ThemeChanger.js";
// import welcomeScreenStyles from "./styles/welcomeScreenStyles.js";

// function WelcomeScreen({ navigation }) {
//   const styles = welcomeScreenStyles(); // Use the imported styles
//   const paperTheme = useTheme();

//   return (
//     <View style={styles.container}>
//       <ThemeChanger />
//       <LinearGradient
//         colors={[
//           paperTheme.colors.gradientStart,
//           paperTheme.colors.gradientEnd,
//         ]}
//         locations={[0.5, 1]} // Control the position of the gradient colors
//         style={styles.gradientContainer}
//       >
//         <View style={styles.contentContainer}>
//           <Text style={styles.appName}>NutraCompass</Text>
//           <Text style={styles.description}>
//             Achieve your fitness and health goals with this all-in-one guide and
//             application to manage and track various metrics.
//           </Text>
//           <Button
//             mode="contained"
//             style={styles.button}
//             labelStyle={{ color: "white", fontSize: 18, fontWeight: "bold" }} // Style the button text
//             onPress={() => navigation.navigate("Sign In")}
//           >
//             Sign In
//           </Button>
//           <Button
//             mode="outlined"
//             style={styles.button}
//             labelStyle={{ color: "white", fontSize: 18, fontWeight: "bold" }} // Style the button text
//             onPress={() => navigation.navigate("Sign Up")}
//           >
//             Sign Up
//           </Button>
//         </View>
//       </LinearGradient>
//     </View>
//   );
// }

// export default WelcomeScreen;
