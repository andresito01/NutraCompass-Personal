// FoodNutrientModal.js
import React, { useState } from "react";
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { TextInput, useTheme, Appbar, ProgressBar } from "react-native-paper";
import Modal from "react-native-modal";
import Feather from "react-native-vector-icons/Feather";
import foodNutrientModalStyles from "./styles/foodNutrientModalStyles.js";
import Svg, { Circle, G, Text as SvgText, Path } from "react-native-svg";
import { useThemeContext } from "../../../context/ThemeContext.js";

const FoodNutrientModal = ({ isVisible, closeModal }) => {
  const styles = foodNutrientModalStyles();
  const { theme } = useThemeContext();
  const paperTheme = useTheme();

  const [showNutritionFactsList, setShowNutritionFactsList] = useState(false);
  const [showVitaminList, setShowVitaminList] = useState(false);
  const [showMineralList, setShowMineralList] = useState(false);

  // Get screen width
  const screenWidth = Dimensions.get("window").width;

  calorieColor = "blue";
  carbColor = "orange";
  proteinColor = "green";
  fatColor = "red";

  // Example daily goals, replace with actual values from UserSettingsContext
  const dailyGoals = {
    carbs: 300,
    protein: 150,
    fat: 70,
  };

  const toggleNutritionFactsList = () => {
    setShowNutritionFactsList(!showNutritionFactsList);
  };

  const toggleVitaminList = () => {
    setShowVitaminList(!showVitaminList);
  };

  const toggleMineralList = () => {
    setShowMineralList(!showMineralList);
  };

  const renderCircularChart = (
    carbsPercentage,
    fatPercentage,
    proteinPercentage,
    calories
  ) => {
    const chartData = [
      { percentage: carbsPercentage, color: carbColor, label: "Carbs" },
      { percentage: proteinPercentage, color: proteinColor, label: "Protein" },
      { percentage: fatPercentage, color: fatColor, label: "Fat" },
    ];

    const radius = 45;
    const circumference = 2 * Math.PI * radius;

    let currentAngle = 0;

    return (
      <Svg height="90" width="90">
        <G transform={{ translate: `${radius}, ${radius}` }}>
          {chartData.map((segment, index) => {
            const angle = (segment.percentage * 360) / 100;
            const path = `M 0 0 L ${
              radius * Math.cos((currentAngle * Math.PI) / 180)
            } ${
              radius * Math.sin((currentAngle * Math.PI) / 180)
            } A ${radius} ${radius} 0 ${angle > 180 ? 1 : 0} 1 ${
              radius * Math.cos(((currentAngle + angle) * Math.PI) / 180)
            } ${radius * Math.sin(((currentAngle + angle) * Math.PI) / 180)} Z`;
            currentAngle += angle;

            return <Path key={index} d={path} fill={segment.color} />;
          })}
          <Circle r={radius - 10} fill={theme.colors.cardBackgroundColor} />

          <SvgText
            fill={theme.colors.cardHeaderTextColor}
            fontSize="20"
            fontWeight="bold"
            textAnchor="middle"
            alignmentBaseline="middle"
            transform="translate(0, -6)"
          >
            {calories}
          </SvgText>
          <SvgText
            fill={theme.colors.cardHeaderTextColor}
            fontSize="12"
            textAnchor="middle"
            alignmentBaseline="middle"
            transform="translate(0, 15)"
          >
            cal
          </SvgText>
        </G>
      </Svg>
    );
  };

  const handleCloseModal = () => {
    setShowMineralList(false);
    setShowVitaminList(false);
    setShowNutritionFactsList(false);
    closeModal();
  };

  return (
    <Modal
      isVisible={isVisible}
      style={styles.container}
      avoidKeyboard={true}
      animationIn="slideInLeft"
      animationOut="slideOutLeft"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView
          onStartShouldSetResponder={() => true}
          style={styles.container}
        >
          {/* Header */}
          <Appbar.Header style={styles.header}>
            <Appbar.Action
              icon="arrow-left"
              onPress={handleCloseModal}
              color={theme.colors.cardHeaderTextColor}
            />
            <Appbar.Content title="Edit Entry" titleStyle={styles.title} />
            <Appbar.Action
              icon="check"
              onPress={closeModal}
              color={theme.colors.cardHeaderTextColor}
            />
          </Appbar.Header>
          <ScrollView>
            <TouchableOpacity
              activeOpacity={1}
              style={{
                backgroundColor: theme.colors.SectionBackgroundColor,
              }}
            >
              {/* Food Item Section */}
              <View style={styles.sectionContainer}>
                <Text style={styles.foodItemName}>Medium Grade A Eggs</Text>
                <Text style={styles.brandCompany}>Sun Valley</Text>
              </View>
              {/* Input Fields Section */}
              <View style={styles.sectionContainer}>
                <Row label="Serving Size" />
                <Row label="Number of Servings" keyboardType="numeric" />
                <Row label="Meal" />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {/* Macronutrient Content: Carbs, Protein, Fat */}
                  {/* Example data, replace with actual values */}
                  {/* Circular Chart that shows calorie and macronutrient breakdown */}
                  {renderCircularChart(40, 30, 30, 500)}
                  <View style={styles.macroNutrientContainer}>
                    <View style={styles.macroNutrientColumn}>
                      <Text
                        style={{
                          ...styles.macroNutrientPercentage,
                          color: carbColor,
                        }}
                      >
                        0%
                      </Text>
                      <Text style={styles.macroNutrientValue}>0 g</Text>
                      <Text style={styles.macroNutrientLabel}>Carbs</Text>
                    </View>
                    <View style={styles.macroNutrientColumn}>
                      <Text
                        style={{
                          ...styles.macroNutrientPercentage,
                          color: proteinColor,
                        }}
                      >
                        60%
                      </Text>
                      <Text style={styles.macroNutrientValue}>8 g</Text>
                      <Text style={styles.macroNutrientLabel}>Protein</Text>
                    </View>
                    <View style={styles.macroNutrientColumn}>
                      <Text
                        style={{
                          ...styles.macroNutrientPercentage,
                          color: fatColor,
                        }}
                      >
                        40%
                      </Text>
                      <Text style={styles.macroNutrientValue}>12 g</Text>
                      <Text style={styles.macroNutrientLabel}>Fat</Text>
                    </View>
                  </View>
                </View>
              </View>
              {/* Calorie and Macronutrient Percent of Daily Goals */}
              <View style={styles.sectionContainer}>
                <Text style={styles.nutritionFactsLabel}>
                  Percent of Daily Goals
                </Text>
                <View style={styles.progressContainer}>
                  {/* Progress bar for Calories */}
                  <View style={styles.progressItem}>
                    <ProgressBar
                      progress={0.25} // Replace with actual progress value
                      color={calorieColor}
                      style={{
                        height: 10,
                        width: screenWidth * 0.22,
                        borderRadius: 5,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: theme.colors.cardHeaderTextColor,
                      }}
                    >
                      25%
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: theme.colors.cardHeaderTextColor,
                      }}
                    >
                      Calories
                    </Text>
                  </View>
                  {/* Progress bar for Carbs */}
                  <View style={styles.progressItem}>
                    <ProgressBar
                      progress={0.3} // Replace with actual progress value
                      color={carbColor}
                      style={{
                        height: 10,
                        width: screenWidth * 0.22,
                        borderRadius: 5,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: theme.colors.cardHeaderTextColor,
                      }}
                    >
                      30%
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: theme.colors.cardHeaderTextColor,
                      }}
                    >
                      Carbs
                    </Text>
                  </View>
                  {/* Progress bar for Protein */}
                  <View style={styles.progressItem}>
                    <ProgressBar
                      progress={0.6} // Replace with actual progress value
                      color={proteinColor}
                      style={{
                        height: 10,
                        width: screenWidth * 0.22,
                        borderRadius: 5,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: theme.colors.cardHeaderTextColor,
                      }}
                    >
                      60%
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: theme.colors.cardHeaderTextColor,
                      }}
                    >
                      Protein
                    </Text>
                  </View>
                  {/* Progress bar for Fat */}
                  <View style={styles.progressItem}>
                    <ProgressBar
                      progress={0.4} // Replace with actual progress value
                      color={fatColor}
                      style={{
                        height: 10,
                        width: screenWidth * 0.22,
                        borderRadius: 5,
                      }}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: theme.colors.cardHeaderTextColor,
                      }}
                    >
                      40%
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        fontWeight: "bold",
                        color: theme.colors.cardHeaderTextColor,
                      }}
                    >
                      Fat
                    </Text>
                  </View>
                </View>
              </View>
              {/* Nutritional Information List Toggle */}
              <View style={styles.sectionContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.nutritionFactsLabel}>
                    Nutrition Facts
                  </Text>
                  <TouchableOpacity
                    onPress={toggleNutritionFactsList}
                    style={{
                      flexDirection: "row",
                      gap: 5,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: theme.colors.primary,
                        fontWeight: "bold",
                      }}
                    >
                      {showNutritionFactsList ? "Hide" : "Show"}
                    </Text>
                    <Feather
                      name={showNutritionFactsList ? "arrow-up" : "arrow-down"}
                      color={theme.colors.primary}
                      size={20}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {showNutritionFactsList && (
                <View
                  style={{ ...styles.sectionContainer, paddingHorizontal: 0 }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: theme.colors.cardHeaderTextColor,
                      alignSelf: "flex-end",
                      marginBottom: 10,
                      paddingHorizontal: 16,
                    }}
                  >
                    % Daily Value
                  </Text>
                  <View style={styles.nutritionFactsRow}>
                    <View style={styles.nutritionalFactsLabelContainer}>
                      <Text style={styles.nutritionFactsLabel}>Calories</Text>
                    </View>
                    <View style={styles.nutritionalFactsValuesContainer}>
                      <Text
                        style={{
                          ...styles.nutritionFactsDailyValue,
                          color: calorieColor,
                        }}
                      >
                        150
                      </Text>
                      <Text
                        style={{
                          ...styles.nutritionFactsDailyValue,
                          color: calorieColor,
                        }}
                      >
                        5%
                      </Text>
                    </View>
                  </View>

                  <View style={styles.nutritionFactsSeparator} />

                  <View style={styles.nutritionFactsSection}>
                    <View style={styles.nutritionFactsRow}>
                      <View style={styles.nutritionalFactsLabelContainer}>
                        <Text style={styles.nutritionFactsLabel}>
                          Total Fat
                        </Text>
                      </View>
                      <View style={styles.nutritionalFactsValuesContainer}>
                        <Text
                          style={{
                            ...styles.nutritionFactsDailyValue,
                            color: fatColor,
                          }}
                        >
                          10 g
                        </Text>
                        <Text
                          style={{
                            ...styles.nutritionFactsDailyValue,
                            color: fatColor,
                          }}
                        >
                          15%
                        </Text>
                      </View>
                    </View>

                    <View style={styles.nutritionFactsRow}>
                      <View style={styles.nutritionalFactsLabelContainer}>
                        <Text style={styles.nutritionFactsIndentLabel}>
                          Saturated
                        </Text>
                      </View>
                      <View style={styles.nutritionalFactsValuesContainer}>
                        <Text style={styles.nutritionFactsIndentValue}>
                          3 g
                        </Text>
                        <Text style={styles.nutritionFactsIndentDailyValue}>
                          15%
                        </Text>
                      </View>
                    </View>

                    <View style={styles.nutritionFactsRow}>
                      <View style={styles.nutritionalFactsLabelContainer}>
                        <Text style={styles.nutritionFactsIndentLabel}>
                          Trans
                        </Text>
                      </View>
                      <View style={styles.nutritionalFactsValuesContainer}>
                        <Text style={styles.nutritionFactsIndentValue}>
                          0 g
                        </Text>
                        <Text style={styles.nutritionFactsIndentDailyValue}>
                          0%
                        </Text>
                      </View>
                    </View>

                    <View style={styles.nutritionFactsRow}>
                      <View style={styles.nutritionalFactsLabelContainer}>
                        <Text style={styles.nutritionFactsIndentLabel}>
                          Polyunsaturated
                        </Text>
                      </View>
                      <View style={styles.nutritionalFactsValuesContainer}>
                        <Text style={styles.nutritionFactsIndentValue}>
                          0 g
                        </Text>
                        <Text style={styles.nutritionFactsIndentDailyValue}>
                          0%
                        </Text>
                      </View>
                    </View>

                    <View style={styles.nutritionFactsRow}>
                      <View style={styles.nutritionalFactsLabelContainer}>
                        <Text style={styles.nutritionFactsIndentLabel}>
                          Monounsaturated
                        </Text>
                      </View>
                      <View style={styles.nutritionalFactsValuesContainer}>
                        <Text style={styles.nutritionFactsIndentValue}>
                          0 g
                        </Text>
                        <Text style={styles.nutritionFactsIndentDailyValue}>
                          0%
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.nutritionFactsSeparator} />

                  <View style={styles.nutritionFactsSection}>
                    <View style={styles.nutritionFactsRow}>
                      <View style={styles.nutritionalFactsLabelContainer}>
                        <Text style={styles.nutritionFactsLabel}>
                          Cholesterol
                        </Text>
                      </View>
                      <View style={styles.nutritionalFactsValuesContainer}>
                        <Text style={styles.nutritionFactsValue}>0 mg</Text>
                        <Text style={styles.nutritionFactsDailyValue}>0%</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.nutritionFactsSeparator} />

                  <View style={styles.nutritionFactsSection}>
                    <View style={styles.nutritionFactsRow}>
                      <View style={styles.nutritionalFactsLabelContainer}>
                        <Text style={styles.nutritionFactsLabel}>Sodium</Text>
                      </View>
                      <View style={styles.nutritionalFactsValuesContainer}>
                        <Text style={styles.nutritionFactsValue}>160 mg</Text>
                        <Text style={styles.nutritionFactsDailyValue}>7%</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.nutritionFactsSeparator} />

                  <View style={styles.nutritionFactsSection}>
                    <View style={styles.nutritionFactsRow}>
                      <View style={styles.nutritionalFactsLabelContainer}>
                        <Text style={styles.nutritionFactsLabel}>
                          Total Carbohydrate
                        </Text>
                      </View>
                      <View style={styles.nutritionalFactsValuesContainer}>
                        <Text
                          style={{
                            ...styles.nutritionFactsDailyValue,
                            color: carbColor,
                          }}
                        >
                          37 g
                        </Text>
                        <Text
                          style={{
                            ...styles.nutritionFactsDailyValue,
                            color: carbColor,
                          }}
                        >
                          13%
                        </Text>
                      </View>
                    </View>

                    <View style={styles.nutritionFactsRow}>
                      <View style={styles.nutritionalFactsLabelContainer}>
                        <Text style={styles.nutritionFactsIndentLabel}>
                          Dietary Fiber
                        </Text>
                      </View>
                      <View style={styles.nutritionalFactsValuesContainer}>
                        <Text style={styles.nutritionFactsIndentValue}>
                          4 g
                        </Text>
                        <Text style={styles.nutritionFactsIndentDailyValue}>
                          14%
                        </Text>
                      </View>
                    </View>

                    <View style={styles.nutritionFactsRow}>
                      <View style={styles.nutritionalFactsLabelContainer}>
                        <Text style={styles.nutritionFactsIndentLabel}>
                          Total Sugars
                        </Text>
                      </View>
                      <View style={styles.nutritionalFactsValuesContainer}>
                        <Text style={styles.nutritionFactsIndentValue}>
                          12 g
                        </Text>
                        <Text style={styles.nutritionFactsIndentDailyValue}>
                          -
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.nutritionFactsSeparator} />

                  <View style={styles.nutritionFactsSection}>
                    <View style={styles.nutritionFactsRow}>
                      <View style={styles.nutritionalFactsLabelContainer}>
                        <Text style={styles.nutritionFactsLabel}>Protein</Text>
                      </View>
                      <View style={styles.nutritionalFactsValuesContainer}>
                        <Text
                          style={{
                            ...styles.nutritionFactsDailyValue,
                            color: proteinColor,
                          }}
                        >
                          7 g
                        </Text>
                        <Text
                          style={{
                            ...styles.nutritionFactsDailyValue,
                            color: proteinColor,
                          }}
                        >
                          5%
                        </Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.nutritionFactsSeparator} />

                  <View style={styles.nutritionFactsSection}>
                    <View style={styles.nutritionFactsRow}>
                      <Text style={styles.nutritionFactsLabel}>Vitamins</Text>
                      <TouchableOpacity
                        onPress={toggleVitaminList}
                        style={{
                          flexDirection: "row",
                          gap: 5,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: theme.colors.primary,
                            fontWeight: "bold",
                          }}
                        >
                          {showVitaminList ? "Hide" : "Show"}
                        </Text>
                        <Feather
                          name={showVitaminList ? "arrow-up" : "arrow-down"}
                          color={theme.colors.primary}
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
                    {showVitaminList && (
                      <View style={{ paddingTop: 10 }}>
                        <View style={styles.nutritionFactsRow}>
                          <View style={styles.nutritionalFactsLabelContainer}>
                            <Text style={styles.nutritionFactsIndentLabel}>
                              Vitamin A
                            </Text>
                          </View>
                          <View style={styles.nutritionalFactsValuesContainer}>
                            <Text style={styles.nutritionFactsIndentValue}>
                              900 mcg
                            </Text>
                            <Text style={styles.nutritionFactsIndentDailyValue}>
                              100%
                            </Text>
                          </View>
                        </View>
                        <View style={styles.nutritionFactsRow}>
                          <View style={styles.nutritionalFactsLabelContainer}>
                            <Text style={styles.nutritionFactsIndentLabel}>
                              Vitamin C
                            </Text>
                          </View>
                          <View style={styles.nutritionalFactsValuesContainer}>
                            <Text style={styles.nutritionFactsIndentValue}>
                              90 mg
                            </Text>
                            <Text style={styles.nutritionFactsIndentDailyValue}>
                              100%
                            </Text>
                          </View>
                        </View>
                        <View style={styles.nutritionFactsRow}>
                          <View style={styles.nutritionalFactsLabelContainer}>
                            <Text style={styles.nutritionFactsIndentLabel}>
                              Vitamin D
                            </Text>
                          </View>
                          <View style={styles.nutritionalFactsValuesContainer}>
                            <Text style={styles.nutritionFactsIndentValue}>
                              20 mcg
                            </Text>
                            <Text style={styles.nutritionFactsIndentDailyValue}>
                              100%
                            </Text>
                          </View>
                        </View>
                        <View style={styles.nutritionFactsRow}>
                          <View style={styles.nutritionalFactsLabelContainer}>
                            <Text style={styles.nutritionFactsIndentLabel}>
                              Vitamin E
                            </Text>
                          </View>
                          <View style={styles.nutritionalFactsValuesContainer}>
                            <Text style={styles.nutritionFactsIndentValue}>
                              15 mg
                            </Text>
                            <Text style={styles.nutritionFactsIndentDailyValue}>
                              100%
                            </Text>
                          </View>
                        </View>
                        <View style={styles.nutritionFactsRow}>
                          <View style={styles.nutritionalFactsLabelContainer}>
                            <Text style={styles.nutritionFactsIndentLabel}>
                              Vitamin K
                            </Text>
                          </View>
                          <View style={styles.nutritionalFactsValuesContainer}>
                            <Text style={styles.nutritionFactsIndentValue}>
                              120 mcg
                            </Text>
                            <Text style={styles.nutritionFactsIndentDailyValue}>
                              100%
                            </Text>
                          </View>
                        </View>
                        <View style={styles.nutritionFactsRow}>
                          <View style={styles.nutritionalFactsLabelContainer}>
                            <Text style={styles.nutritionFactsIndentLabel}>
                              B1 (Thiamine)
                            </Text>
                          </View>
                          <View style={styles.nutritionalFactsValuesContainer}>
                            <Text style={styles.nutritionFactsIndentValue}>
                              1.2 mg
                            </Text>
                            <Text style={styles.nutritionFactsIndentDailyValue}>
                              100%
                            </Text>
                          </View>
                        </View>
                        <View style={styles.nutritionFactsRow}>
                          <View style={styles.nutritionalFactsLabelContainer}>
                            <Text style={styles.nutritionFactsIndentLabel}>
                              B2 (Riboflavin)
                            </Text>
                          </View>
                          <View style={styles.nutritionalFactsValuesContainer}>
                            <Text style={styles.nutritionFactsIndentValue}>
                              1.3 mg
                            </Text>
                            <Text style={styles.nutritionFactsIndentDailyValue}>
                              100%
                            </Text>
                          </View>
                        </View>
                        <View style={styles.nutritionFactsRow}>
                          <View style={styles.nutritionalFactsLabelContainer}>
                            <Text style={styles.nutritionFactsIndentLabel}>
                              B3 (Niacin)
                            </Text>
                          </View>
                          <View style={styles.nutritionalFactsValuesContainer}>
                            <Text style={styles.nutritionFactsIndentValue}>
                              16 mg
                            </Text>
                            <Text style={styles.nutritionFactsIndentDailyValue}>
                              100%
                            </Text>
                          </View>
                        </View>
                        <View style={styles.nutritionFactsRow}>
                          <View style={styles.nutritionalFactsLabelContainer}>
                            <Text style={styles.nutritionFactsIndentLabel}>
                              B5 (Pantothenic Acid)
                            </Text>
                          </View>
                          <View style={styles.nutritionalFactsValuesContainer}>
                            <Text style={styles.nutritionFactsIndentValue}>
                              5 mg
                            </Text>
                            <Text style={styles.nutritionFactsIndentDailyValue}>
                              100%
                            </Text>
                          </View>
                        </View>
                        <View style={styles.nutritionFactsRow}>
                          <View style={styles.nutritionalFactsLabelContainer}>
                            <Text style={styles.nutritionFactsIndentLabel}>
                              B6 (Pyridoxine)
                            </Text>
                          </View>
                          <View style={styles.nutritionalFactsValuesContainer}>
                            <Text style={styles.nutritionFactsIndentValue}>
                              1.7 mg
                            </Text>
                            <Text style={styles.nutritionFactsIndentDailyValue}>
                              100%
                            </Text>
                          </View>
                        </View>
                        <View style={styles.nutritionFactsRow}>
                          <View style={styles.nutritionalFactsLabelContainer}>
                            <Text style={styles.nutritionFactsIndentLabel}>
                              B7 (Biotin)
                            </Text>
                          </View>
                          <View style={styles.nutritionalFactsValuesContainer}>
                            <Text style={styles.nutritionFactsIndentValue}>
                              30 mcg
                            </Text>
                            <Text style={styles.nutritionFactsIndentDailyValue}>
                              100%
                            </Text>
                          </View>
                        </View>
                        <View style={styles.nutritionFactsRow}>
                          <View style={styles.nutritionalFactsLabelContainer}>
                            <Text style={styles.nutritionFactsIndentLabel}>
                              B9 (Folate)
                            </Text>
                          </View>
                          <View style={styles.nutritionalFactsValuesContainer}>
                            <Text style={styles.nutritionFactsIndentValue}>
                              400 mcg
                            </Text>
                            <Text style={styles.nutritionFactsIndentDailyValue}>
                              100%
                            </Text>
                          </View>
                        </View>
                        <View style={styles.nutritionFactsRow}>
                          <View style={styles.nutritionalFactsLabelContainer}>
                            <Text style={styles.nutritionFactsIndentLabel}>
                              B12 (Cobalamin)
                            </Text>
                          </View>
                          <View style={styles.nutritionalFactsValuesContainer}>
                            <Text style={styles.nutritionFactsIndentValue}>
                              2.4 mcg
                            </Text>
                            <Text style={styles.nutritionFactsIndentDailyValue}>
                              100%
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>

                  <View style={styles.nutritionFactsSeparator} />

                  <View style={styles.nutritionFactsSection}>
                    <View style={styles.nutritionFactsRow}>
                      <Text style={styles.nutritionFactsLabel}>Minerals</Text>
                      <TouchableOpacity
                        onPress={toggleMineralList}
                        style={{
                          flexDirection: "row",
                          gap: 5,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: theme.colors.primary,
                            fontWeight: "bold",
                          }}
                        >
                          {showMineralList ? "Hide" : "Show"}
                        </Text>
                        <Feather
                          name={showMineralList ? "arrow-up" : "arrow-down"}
                          color={theme.colors.primary}
                          size={20}
                        />
                      </TouchableOpacity>
                    </View>
                    {showMineralList && (
                      <View style={{ paddingTop: 10 }}>
                        <View style={styles.nutritionFactsRow}>
                          <View style={styles.nutritionalFactsLabelContainer}>
                            <Text style={styles.nutritionFactsIndentLabel}>
                              Calcium
                            </Text>
                          </View>
                          <View style={styles.nutritionalFactsValuesContainer}>
                            <Text style={styles.nutritionFactsIndentValue}>
                              1000 mg
                            </Text>
                            <Text style={styles.nutritionFactsIndentDailyValue}>
                              100%
                            </Text>
                          </View>
                        </View>
                        <View style={styles.nutritionFactsRow}>
                          <View style={styles.nutritionalFactsLabelContainer}>
                            <Text style={styles.nutritionFactsIndentLabel}>
                              Iron
                            </Text>
                          </View>
                          <View style={styles.nutritionalFactsValuesContainer}>
                            <Text style={styles.nutritionFactsIndentValue}>
                              18 mg
                            </Text>
                            <Text style={styles.nutritionFactsIndentDailyValue}>
                              100%
                            </Text>
                          </View>
                        </View>
                        <View style={styles.nutritionFactsRow}>
                          <View style={styles.nutritionalFactsLabelContainer}>
                            <Text style={styles.nutritionFactsIndentLabel}>
                              Magnesium
                            </Text>
                          </View>
                          <View style={styles.nutritionalFactsValuesContainer}>
                            <Text style={styles.nutritionFactsIndentValue}>
                              400 mg
                            </Text>
                            <Text style={styles.nutritionFactsIndentDailyValue}>
                              100%
                            </Text>
                          </View>
                        </View>
                        <View style={styles.nutritionFactsRow}>
                          <View style={styles.nutritionalFactsLabelContainer}>
                            <Text style={styles.nutritionFactsIndentLabel}>
                              Phosphorus
                            </Text>
                          </View>
                          <View style={styles.nutritionalFactsValuesContainer}>
                            <Text style={styles.nutritionFactsIndentValue}>
                              1000 mg
                            </Text>
                            <Text style={styles.nutritionFactsIndentDailyValue}>
                              100%
                            </Text>
                          </View>
                        </View>
                        <View style={styles.nutritionFactsRow}>
                          <View style={styles.nutritionalFactsLabelContainer}>
                            <Text style={styles.nutritionFactsIndentLabel}>
                              Potassium
                            </Text>
                          </View>
                          <View style={styles.nutritionalFactsValuesContainer}>
                            <Text style={styles.nutritionFactsIndentValue}>
                              3500 mg
                            </Text>
                            <Text style={styles.nutritionFactsIndentDailyValue}>
                              100%
                            </Text>
                          </View>
                        </View>
                        <View style={styles.nutritionFactsRow}>
                          <View style={styles.nutritionalFactsLabelContainer}>
                            <Text style={styles.nutritionFactsIndentLabel}>
                              Sodium
                            </Text>
                          </View>
                          <View style={styles.nutritionalFactsValuesContainer}>
                            <Text style={styles.nutritionFactsIndentValue}>
                              2300 mg
                            </Text>
                            <Text style={styles.nutritionFactsIndentDailyValue}>
                              100%
                            </Text>
                          </View>
                        </View>
                        <View style={styles.nutritionFactsRow}>
                          <View style={styles.nutritionalFactsLabelContainer}>
                            <Text style={styles.nutritionFactsIndentLabel}>
                              Zinc
                            </Text>
                          </View>
                          <View style={styles.nutritionalFactsValuesContainer}>
                            <Text style={styles.nutritionFactsIndentValue}>
                              11 mg
                            </Text>
                            <Text style={styles.nutritionFactsIndentDailyValue}>
                              100%
                            </Text>
                          </View>
                        </View>
                        <View style={styles.nutritionFactsRow}>
                          <View style={styles.nutritionalFactsLabelContainer}>
                            <Text style={styles.nutritionFactsIndentLabel}>
                              Copper
                            </Text>
                          </View>
                          <View style={styles.nutritionalFactsValuesContainer}>
                            <Text style={styles.nutritionFactsIndentValue}>
                              2 mg
                            </Text>
                            <Text style={styles.nutritionFactsIndentDailyValue}>
                              100%
                            </Text>
                          </View>
                        </View>
                        <View style={styles.nutritionFactsRow}>
                          <View style={styles.nutritionalFactsLabelContainer}>
                            <Text style={styles.nutritionFactsIndentLabel}>
                              Manganese
                            </Text>
                          </View>
                          <View style={styles.nutritionalFactsValuesContainer}>
                            <Text style={styles.nutritionFactsIndentValue}>
                              2.3 mg
                            </Text>
                            <Text style={styles.nutritionFactsIndentDailyValue}>
                              100%
                            </Text>
                          </View>
                        </View>
                        <View style={styles.nutritionFactsRow}>
                          <View style={styles.nutritionalFactsLabelContainer}>
                            <Text style={styles.nutritionFactsIndentLabel}>
                              Selenium
                            </Text>
                          </View>
                          <View style={styles.nutritionalFactsValuesContainer}>
                            <Text style={styles.nutritionFactsIndentValue}>
                              55 mcg
                            </Text>
                            <Text style={styles.nutritionFactsIndentDailyValue}>
                              100%
                            </Text>
                          </View>
                        </View>
                        <View style={styles.nutritionFactsRow}>
                          <View style={styles.nutritionalFactsLabelContainer}>
                            <Text style={styles.nutritionFactsIndentLabel}>
                              Chromium
                            </Text>
                          </View>
                          <View style={styles.nutritionalFactsValuesContainer}>
                            <Text style={styles.nutritionFactsIndentValue}>
                              120 mcg
                            </Text>
                            <Text style={styles.nutritionFactsIndentDailyValue}>
                              100%
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}
                  </View>

                  {/* Add more sections for other nutrients */}
                </View>
              )}
            </TouchableOpacity>
          </ScrollView>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const Row = ({ label, keyboardType }) => {
  const styles = foodNutrientModalStyles();

  return (
    <View style={styles.rowContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        caretHidden={true}
        keyboardType={keyboardType}
        style={styles.textInput}
      />
    </View>
  );
};

export default FoodNutrientModal;
