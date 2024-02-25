import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { Card, Button } from "react-native-paper";
import { useThemeContext } from "../../context/ThemeContext.js";

export default function BodyTypeSection({ value, setValue, onNext }) {
  const { theme } = useThemeContext();
  const [selectedBodyType, setSelectedBodyType] = useState(null);

  const bodyTypes = [
    {
      id: 1,
      value: 8,
      description: "Very Lean: 5-10% body fat",
      image: require("../../../assets/squatMan.png"), // Replace with actual image path
    },
    {
      id: 2,
      value: 13,
      description: "Lean: 11-15% body fat",
      image: require("../../../assets/squatMan.png"), // Replace with actual image path
    },
    {
      id: 3,
      value: 18,
      description: "Moderately Lean: 16-20% body fat",
      image: require("../../../assets/squatMan.png"), // Replace with actual image path
    },
    {
      id: 4,
      value: 23,
      description: "Average: 21-25% body fat",
      image: require("../../../assets/squatMan.png"), // Replace with actual image path
    },
    {
      id: 5,
      value: 28,
      description: "Above Average: 26-30% body fat",
      image: require("../../../assets/squatMan.png"), // Replace with actual image path
    },
    {
      id: 6,
      value: 33,
      description: "Overweight: 31-35% body fat",
      image: require("../../../assets/squatMan.png"), // Replace with actual image path
    },
    {
      id: 7,
      value: 40,
      description: "Obese: 36%+ body fat",
      image: require("../../../assets/squatMan.png"), // Replace with actual image path
    },
  ];

  const handleBodyTypeSelect = (bodyType) => {
    setSelectedBodyType(bodyType);
  };

  const handleNext = () => {
    // If user selected a body type then update signup form value state to include that value
    if (selectedBodyType) {
      setValue({ ...value, bodyFatPercentageRange: selectedBodyType.value });
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
          Body Type
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "black",
            textAlign: "center",
          }}
        >
          To improve the accuracy in creating daily nutritional goals for you,
          select your body type below.
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
          <Card.Content
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
          >
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {/** Body Type Selection */}
              {bodyTypes.map((bodyType) => (
                <TouchableOpacity
                  key={bodyType.id}
                  onPress={() => handleBodyTypeSelect(bodyType)}
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    padding: 10,
                    borderColor:
                      selectedBodyType?.id === bodyType.id
                        ? theme.colors.primary
                        : "transparent",
                  }}
                >
                  <Image
                    source={bodyType.image}
                    style={{ width: 150, height: 150, alignSelf: "center" }}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 14,
                      color: theme.colors.cardHeaderTextColor,
                    }}
                  >
                    {bodyType.description}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
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
