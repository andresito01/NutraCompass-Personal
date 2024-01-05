import React, { useState, useEffect } from "react";
import { Text, View, Image } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import Slider from "@react-native-community/slider";
import * as Haptics from "expo-haptics";
import activityLevelLogo from "../../../assets/adaptive-icon.png";
import signupScreenStyles from "../../screens/styles/signupScreenStyles.js";
import { useThemeContext } from "../../context/ThemeContext.js";
import { connectFirestoreEmulator } from "firebase/firestore";

const ActivityLevelSection = ({ value, setValue, onNext }) => {
  const styles = signupScreenStyles();
  const { theme } = useThemeContext();

  const [customKcal, setCustomKcal] = useState("");

  useEffect(() => {
    // Cleanup function to reset state when the component unmounts
    return () => {
      setValue({ ...value, activityLevel: 0 });
      setCustomKcal("");
    };
  }, []); // Empty dependency array ensures this effect runs only on unmount

  const getActivityLevel = (sliderValue) => {
    console.log("Slider Value: ", sliderValue);
    if (sliderValue === 0) return "None";
    else if (sliderValue === 20) return "Sedentary (BMR x 0.2)";
    else if (sliderValue === 40) return "Lightly Active (BMR x 0.375)";
    else if (sliderValue === 60) return "Moderately Active (BMR x 0.5)";
    else if (sliderValue === 80) return "Very Active (BMR x 0.9)";
  };

  const handleNext = () => {
    // Add validation logic for this section
    // Call onNext only if validation passes
    onNext();
  };

  return (
    <View style={{ flex: 1, width: "100%" }}>
      <View
        style={{
          alignItems: "center",
          paddingTop: 10,
          gap: 5,
        }}
      >
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            color: theme.colors.cardHeaderTextColor,
            textAlign: "center",
          }}
        >
          Activity Level
        </Text>
        <Text
          style={{
            paddingHorizontal: 10,
            fontSize: 16,
            color: theme.colors.cardHeaderTextColor,
            textAlign: "center",
          }}
        >
          Based on your activity level, NutraCompass can estimate the amount of
          energy you burn each day.
        </Text>

        <Card
          style={{
            width: "100%",
            marginTop: 10,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: theme.colors.primary,
          }}
        >
          <Card.Content>
            <View style={{ justifyContent: "center", width: "100%", gap: 10 }}>
              <Image
                source={activityLevelLogo}
                style={{
                  alignSelf: "center",
                  width: 195,
                  height: 54,
                  margin: 20,
                }}
              />
              {value.activityLevel !== 100 && (
                <Text
                  style={{
                    fontSize: 18,
                    color: theme.colors.cardHeaderTextColor,
                    textAlign: "center",
                    fontWeight: "500",
                  }}
                >
                  {getActivityLevel(value.activityLevel)}
                </Text>
              )}

              {value.activityLevel === 100 && (
                <View
                  style={{
                    flexDirection: "row",
                    gap: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 18,
                      color: theme.colors.cardHeaderTextColor,
                      textAlign: "center",
                      fontWeight: "500",
                    }}
                  >
                    Custom
                  </Text>
                  <TextInput
                    style={{
                      alignSelf: "center",
                      height: 40,
                      borderColor: "gray",
                      backgroundColor: "transparent",
                      borderWidth: 1,
                      borderRadius: 8,
                      borderBottomLeftRadius: 0,
                      borderBottomRightRadius: 0,
                      textAlign: "center",
                      color: theme.colors.cardHeaderTextColor,
                    }}
                    underlineColor="transparent"
                    activeOutlineColor="red"
                    activeUnderlineColor={theme.colors.primary}
                    keyboardType="number-pad"
                    value={customKcal}
                    onChangeText={(text) => setCustomKcal(text)}
                    placeholder="2000"
                    defaultValue="2000"
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      color: theme.colors.cardHeaderTextColor,
                      textAlign: "center",
                      fontWeight: "400",
                    }}
                  >
                    kcal
                  </Text>
                </View>
              )}
              <Slider
                style={{ width: "100%" }}
                step={20}
                minimumValue={0}
                maximumValue={100}
                minimumTrackTintColor={theme.colors.primary}
                maximumTrackTintColor="rgba(169, 169, 169, 0.7)"
                onValueChange={(sliderValue) => {
                  setValue({ ...value, activityLevel: sliderValue });
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              />
              {value.activityLevel === 0 && (
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.colors.cardHeaderTextColor,
                    textAlign: "center",
                  }}
                >
                  No activity. Either you are using an activity tracker
                  (includes general activity) or in a coma.
                </Text>
              )}

              {value.activityLevel === 20 && (
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.colors.cardHeaderTextColor,
                    textAlign: "center",
                  }}
                >
                  Little or no exercise or daily activity. You will burn
                  calories over your BMR for light activity such as working at a
                  desk, driving a car, etc. Use this setting if you are synced
                  to a device that tracks workouts only (not tracking general
                  activity).
                </Text>
              )}

              {value.activityLevel === 40 && (
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.colors.cardHeaderTextColor,
                    textAlign: "center",
                  }}
                >
                  Basic daily living (sitting, eating, walking around the office
                  or house) and/or light exercise 1-3 days/week.
                </Text>
              )}

              {value.activityLevel === 60 && (
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.colors.cardHeaderTextColor,
                    textAlign: "center",
                  }}
                >
                  Moving frequently through the day (construction work,
                  cleaning, etc.) and/or moderate exericse 3-5 days/week.
                </Text>
              )}

              {value.activityLevel === 80 && (
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.colors.cardHeaderTextColor,
                    textAlign: "center",
                  }}
                >
                  Intense activity through the day such as manual agricultural
                  work or competitive athletic training.
                </Text>
              )}

              {value.activityLevel === 100 && (
                <Text
                  style={{
                    fontSize: 14,
                    color: theme.colors.cardHeaderTextColor,
                    textAlign: "center",
                  }}
                >
                  Set your own fixed daily value for calories burned due to
                  general exercise.
                </Text>
              )}
            </View>
          </Card.Content>
        </Card>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 20,
        }}
      >
        <Button
          mode="contained"
          labelStyle={{
            color: theme.colors.surface,
            fontSize: 18,
            fontWeight: "bold",
            width: "60%",
          }}
          onPress={handleNext}
        >
          Next
        </Button>
        <Button
          mode="text"
          labelStyle={{
            color: theme.colors.primary,
            fontSize: 18,
            fontWeight: "bold",
            width: "60%",
          }}
          onPress={handleNext}
        >
          Skip
        </Button>
      </View>
    </View>
  );
};

export default ActivityLevelSection;
