import React, { useState } from "react";
import { Text, View, Image } from "react-native";
import { TextInput, Button, Card, Icon } from "react-native-paper";
import Slider from "@react-native-community/slider";
import * as Haptics from "expo-haptics";
import signupScreenStyles from "../../screens/styles/signupScreenStyles.js";
import { useThemeContext } from "../../context/ThemeContext.js";

const ActivityLevelSection = ({ value, setValue, onNext }) => {
  const styles = signupScreenStyles();
  const { theme } = useThemeContext();

  const [sliderValue, setSliderValue] = useState(0);
  const [customKcal, setCustomKcal] = useState("");

  const getActivityLevel = (sliderValue) => {
    if (sliderValue === 0) return "None";
    else if (sliderValue === 20) return "Sedentary (BMR x 0.2)";
    else if (sliderValue === 40) return "Lightly Active (BMR x 0.375)";
    else if (sliderValue === 60) return "Moderately Active (BMR x 0.5)";
    else if (sliderValue === 80) return "Very Active (BMR x 0.9)";
  };

  const handleNext = () => {
    // Add validation logic for this section
    // Call onNext only if validation passes
    if ((sliderValue === 100) & customKcal) {
      setValue({
        ...value,
        maintenanceCalories: parseFloat(customKcal),
        activityLevel: "",
      });
    } else {
      setValue({
        ...value,
        activityLevel: getActivityLevel(sliderValue),
        maintenanceCalories: null,
      });
    }

    onNext();
  };

  const handleSkip = () => {
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
            color: "black",
            textAlign: "center",
          }}
        >
          Activity Level
        </Text>
        <Text
          style={{
            paddingHorizontal: 10,
            fontSize: 16,
            color: "black",
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
              <View style={{ alignSelf: "center" }}>
                <Icon source="run-fast" color={"white"} size={80} />
              </View>

              {sliderValue !== 100 && (
                <Text
                  style={{
                    fontSize: 18,
                    color: "white",
                    textAlign: "center",
                    fontWeight: "500",
                  }}
                >
                  {getActivityLevel(sliderValue)}
                </Text>
              )}

              {sliderValue === 100 && (
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
                      color: "white",
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
                      color: "white",
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
                      color: "white",
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
                value={sliderValue}
                onValueChange={(sliderValue) => {
                  setSliderValue(sliderValue);
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              />
              {sliderValue === 0 && (
                <Text
                  style={{
                    fontSize: 14,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  No activity. Either you are using an activity tracker
                  (includes general activity) or in a coma.
                </Text>
              )}

              {sliderValue === 20 && (
                <Text
                  style={{
                    fontSize: 14,
                    color: "white",
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

              {sliderValue === 40 && (
                <Text
                  style={{
                    fontSize: 14,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Basic daily living (sitting, eating, walking around the office
                  or house) and/or light exercise 1-3 days/week.
                </Text>
              )}

              {sliderValue === 60 && (
                <Text
                  style={{
                    fontSize: 14,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Moving frequently through the day (construction work,
                  cleaning, etc.) and/or moderate exericse 3-5 days/week.
                </Text>
              )}

              {sliderValue === 80 && (
                <Text
                  style={{
                    fontSize: 14,
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  Intense activity through the day such as manual agricultural
                  work or competitive athletic training.
                </Text>
              )}

              {sliderValue === 100 && (
                <Text
                  style={{
                    fontSize: 14,
                    color: "white",
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
            color: "black",
            fontSize: 18,
            fontWeight: "bold",
          }}
          style={{
            backgroundColor: "white",
            borderRadius: 8,
            width: "60%",
          }}
          onPress={handleNext}
        >
          Next
        </Button>
        <Button
          mode="text"
          labelStyle={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
          }}
          style={{
            borderRadius: 8,
            width: "60%",
          }}
          onPress={handleSkip}
        >
          Skip
        </Button>
      </View>
    </View>
  );
};

export default ActivityLevelSection;
