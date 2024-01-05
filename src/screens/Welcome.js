import React from "react";
import { Text, View, ScrollView, Image } from "react-native";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { Button, Card } from "react-native-paper"; // Import Button and Carousel components
import logo from "../../assets/brandmark-design.png";
import ThemeChanger from "../components/ThemeChanger.js";
import welcomeScreenStyles from "./styles/welcomeScreenStyles.js";
import { useThemeContext } from "../context/ThemeContext.js";

function WelcomeScreen({ navigation }) {
  const styles = welcomeScreenStyles(); // Destructure styles
  const { theme } = useThemeContext(); // Use the imported theme

  // Array of carousel views
  const carouselViews = [
    <Text
      key={1}
      style={{ fontSize: 24, color: theme.colors.cardHeaderTextColor }}
    >
      View 1 Content
    </Text>,
    <Text
      key={2}
      style={{ fontSize: 24, color: theme.colors.cardHeaderTextColor }}
    >
      View 2 Content
    </Text>,
    <Text
      key={3}
      style={{ fontSize: 24, color: theme.colors.cardHeaderTextColor }}
    >
      View 3 Content
    </Text>,
    <Text
      key={4}
      style={{ fontSize: 24, color: theme.colors.cardHeaderTextColor }}
    >
      View 4 Content
    </Text>,
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[theme.colors.screenBackground, theme.colors.screenBackground]}
        locations={[0.5, 1]}
        style={styles.gradientContainer}
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

          <Card style={{ flex: 1, width: "100%" }}>
            <Card.Content></Card.Content>
          </Card>

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
                backgroundColor: theme.colors.primary,
                borderRadius: 30, // Increased border radius for buttons
                paddingVertical: 2, // Adjusted padding for buttons
                marginVertical: 10,
                width: "80%", // Adjusted button width
              }}
              labelStyle={{
                color: theme.colors.darkGrayBackgroundColor,
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
                    color: theme.colors.secondary,
                    fontSize: 18,
                  }}
                >
                  Already have an account?
                </Text>
                <Text
                  style={{
                    color: theme.colors.secondary,
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
    </View>
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
