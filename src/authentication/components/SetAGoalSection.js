import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput, Button, Card, RadioButton } from "react-native-paper";
import Slider from "@react-native-community/slider";
import * as Haptics from "expo-haptics";
import signupScreenStyles from "../../screens/styles/signupScreenStyles.js";
import { useThemeContext } from "../../context/ThemeContext.js";

export default function SetAGoalSection({ value, setValue, onNext }) {
  const styles = signupScreenStyles();
  const { theme } = useThemeContext();

  const [goal, setGoal] = useState("Weight Goal"); // Selected RadioButton value
  const [customKcalTarget, setCustomKcalTarget] = useState("2000");
  const [weightTrendGoalSliderValue, setWeightTrendGoalSliderValue] =
    useState(0);

  const handleNext = () => {
    // Determine the next action based on the selected goal
    if (goal === "Weight Goal" && weightTrendGoalSliderValue) {
      // Handle weight goal logic
      setValue({
        ...value,
        weightTrendGoal: weightTrendGoalSliderValue,
        customEnergyTarget: null,
      });
    } else if (goal === "Custom Energy Target" && customKcalTarget) {
      // Handle custom energy target logic
      setValue({
        ...value,
        customEnergyTarget: Number(customKcalTarget),
        weightTrendGoal: null,
      });
    }

    // Call onNext only if validation passes
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
          Set A Goal
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "black",
            textAlign: "center",
          }}
        >
          NutraCompass can dynamically calculate your daily calorie budget. Do
          you want to lose, maintain, or gain weight? Or set a custom energy
          target.
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
            <RadioButton.Group
              onValueChange={(newValue) => {
                setGoal(newValue);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              value={goal}
            >
              <View style={{ gap: 20 }}>
                <View style={{ flexDirection: "row", gap: 10 }}>
                  <RadioButton.Android
                    value="Weight Goal"
                    color={theme.colors.primary}
                    uncheckedColor={theme.colors.primary}
                  />
                  <View style={{ flex: 1, gap: 10 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color:
                          goal === "Weight Goal"
                            ? theme.colors.primaryTextColor
                            : "rgba(236, 236, 236, 0.6)",
                      }}
                    >
                      Weight Goal
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        color:
                          goal === "Weight Goal"
                            ? theme.colors.primaryTextColor
                            : "rgba(236, 236, 236, 0.6)",
                      }}
                    >
                      {(() => {
                        switch (true) {
                          case weightTrendGoalSliderValue < 0:
                            return "Lose";
                          case weightTrendGoalSliderValue === 0:
                            return "Maintain";
                          case weightTrendGoalSliderValue > 0:
                            return "Gain";
                          default:
                            return "";
                        }
                      })()}{" "}
                      (
                      {weightTrendGoalSliderValue < 0
                        ? weightTrendGoalSliderValue * -1
                        : weightTrendGoalSliderValue}{" "}
                      lbs/week)
                    </Text>

                    <Slider
                      style={{ width: "100%" }}
                      step={0.25}
                      minimumValue={-2} // Represents "Lose 2lbs/week"
                      maximumValue={2} // Represents "Gain 2lbs/week"
                      minimumTrackTintColor={
                        goal === "Weight Goal"
                          ? theme.colors.primary
                          : theme.colors.surface
                      }
                      maximumTrackTintColor="rgba(169, 169, 169, 0.7)"
                      thumbTintColor={
                        goal === "Weight Goal"
                          ? theme.colors.primary
                          : theme.colors.surface
                      }
                      value={weightTrendGoalSliderValue}
                      onValueChange={(sliderValue) => {
                        setWeightTrendGoalSliderValue(sliderValue);
                        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                      }}
                      disabled={!(goal === "Weight Goal")}
                    />
                  </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <RadioButton.Android
                    value="Custom Energy Target"
                    color={theme.colors.primary}
                    uncheckedColor={theme.colors.primary}
                  />
                  <View style={{ flex: 2 / 3, gap: 10 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color:
                          goal === "Custom Energy Target"
                            ? theme.colors.primaryTextColor
                            : "rgba(236, 236, 236, 0.6)",
                        textAlign: "center",
                      }}
                    >
                      Custom Energy Target
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                    >
                      <TextInput
                        style={{
                          alignSelf: "center",
                          height: 40,
                          color: theme.colors.primaryTextColor,
                          borderColor:
                            goal === "Custom Energy Target"
                              ? theme.colors.primaryTextColor
                              : "rgba(236, 236, 236, 0.6)",
                          backgroundColor: "transparent",
                          borderWidth: 1,
                          borderRadius: 6,
                          textAlign: "center",
                        }}
                        underlineColor="transparent"
                        activeUnderlineColor={theme.colors.primary}
                        keyboardType="number-pad"
                        value={customKcalTarget}
                        onChangeText={(text) => {
                          setCustomKcalTarget(text);
                        }}
                        disabled={!(goal === "Custom Energy Target")}
                      />
                      <Text
                        style={{
                          fontSize: 18,
                          color:
                            goal === "Custom Energy Target"
                              ? theme.colors.primaryTextColor
                              : "rgba(236, 236, 236, 0.6)",
                          textAlign: "center",
                          fontWeight: "400",
                        }}
                      >
                        kcal
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* Add more RadioButton.Item components as needed */}
            </RadioButton.Group>
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
          style={{ width: "60%" }}
          onPress={handleSkip}
        >
          Skip
        </Button>
      </View>
    </View>
  );
}
