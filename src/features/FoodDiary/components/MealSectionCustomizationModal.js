import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Animated,
  Easing,
} from "react-native";
import * as Haptics from "expo-haptics";
import Modal from "react-native-modal";
import { useFoodLog } from "../context/FoodLogContext.js";
import { Card, Title } from "react-native-paper";
import mealSectionCustomizationModalStyles from "./styles/mealSectionCustomizationModalStyles.js";
import Feather from "react-native-vector-icons/Feather";
import { useThemeContext } from "../../../context/ThemeContext.js";

console.log("Meal Section Customization Modal Rendered.");

const MealSectionCustomizationModal = ({ isVisible, closeModal }) => {
  const styles = mealSectionCustomizationModalStyles();
  const { theme } = useThemeContext();
  const {
    mealSections,
    loadMealSectionCustomizations,
    updateMealSectionNames,
  } = useFoodLog();

  const [localMealSections, setLocalMealSections] = useState([...mealSections]);
  const [tempMealSections, setTempMealSections] = useState([...mealSections]);
  const [editingStates, setEditingStates] = useState(
    localMealSections.map(() => false)
  );

  // const [animation] = useState(new Animated.Value(0));

  // useEffect(() => {
  //   // Start the animation when the modal opens
  //   let animationInstance;
  //   if (isVisible) {
  //     animationInstance = Animated.loop(
  //       Animated.timing(animation, {
  //         toValue: 1,
  //         duration: 3000,
  //         easing: Easing.linear,
  //         useNativeDriver: false,
  //       })
  //     );
  //     animationInstance.start();
  //   }

  //   // Stop the animation when the modal closes
  //   return () => {
  //     if (animationInstance) {
  //       animationInstance.stop();
  //     }
  //   };
  // }, [isVisible, animation]);

  // const renderAnimatedBorders = () => {
  //   const numLines = 14; // Adjust the number of lines as needed
  //   const spacing = 1; // Adjust the spacing between lines as needed
  //   const lines = [];

  //   for (let i = 0; i < numLines; i++) {
  //     const direction = i % 2 === 0 ? 1 : -1; // Alternate the direction of movement
  //     const initialOffset = direction * 400 * 1;
  //     const translateY = i * (20 + spacing);

  //     lines.push(
  //       <Animated.View
  //         key={i}
  //         style={{
  //           backgroundColor:
  //             i % 2 === 0 ? theme.colors.primary : theme.colors.cardBorderColor,
  //           height: 1,
  //           opacity: animation.interpolate({
  //             inputRange: [0, 0.4, 0.6, 1],
  //             outputRange: [0, 1, 1, 0], // Gradual increase and decrease in opacity
  //           }),
  //           transform: [
  //             { translateY },
  //             {
  //               translateX: animation.interpolate({
  //                 inputRange: [0, 1],
  //                 outputRange: [initialOffset, -initialOffset], // Constant back-and-forth motion
  //               }),
  //             },
  //           ], // Adjust the vertical spacing and horizontal movement
  //         }}
  //       />
  //     );

  //     // Add spacing between lines
  //     lines.push(<View key={`space-${i}`} style={{ height: spacing }} />);
  //   }

  //   return <View style={{ flex: 1, overflow: "hidden" }}>{lines}</View>;
  // };

  useEffect(() => {
    console.log("Meal Customization Modal Effect executed");

    // Load meal section customizations when the modal opens
    if (isVisible) {
      loadMealSectionCustomizations();
      setLocalMealSections([...mealSections]);
      setTempMealSections([...mealSections]);
      setEditingStates(localMealSections.map(() => false));
    }
  }, [isVisible]);

  const handleCloseModal = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    setTempMealSections([...localMealSections]); // Reset temp state to local state
    closeModal();
  };

  const updateTempMealName = (mealId, newName) => {
    const updatedSections = tempMealSections.map((section) => {
      if (section.id === mealId) {
        return { ...section, name: newName };
      }
      return section;
    });
    setTempMealSections(updatedSections);
  };

  const handleSaveCustomizations = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Create an array of objects with updates
    const mealSectionUpdates = localMealSections.map((section, index) => ({
      mealSectionId: section.id,
      newName: tempMealSections[index].name,
    }));

    // Update the global mealSections state in FoodLogContext
    updateMealSectionNames(mealSectionUpdates);

    // Close the modal
    handleCloseModal();
  };

  const renderMealSectionItems = () => {
    return localMealSections.map((item, index) => {
      const isEditing = editingStates[index];
      const editedName = tempMealSections[index].name;
      const placeholderText = "New Meal";

      const handleNameClick = useCallback(() => {
        const newEditingStates = [...editingStates];
        newEditingStates[index] = true;
        setEditingStates(newEditingStates);
      }, [editingStates, index]);

      const handleNameChange = useCallback(
        (newName) => {
          // Update the name in the temporary state
          const updatedSections = [...tempMealSections];
          updatedSections[index] = { ...item, name: newName };
          setTempMealSections(updatedSections);
        },
        [index, item, tempMealSections]
      );

      const handleNameBlur = useCallback(() => {
        const newEditingStates = [...editingStates];
        newEditingStates[index] = false;
        setEditingStates(newEditingStates);

        if (editedName !== item.name) {
          // Save the updated name locally
          updateTempMealName(item.id, editedName);
        }
      }, [index, item, editedName, editingStates]);

      return (
        <TouchableWithoutFeedback key={item.id}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                ...styles.sectionRow,
                backgroundColor: theme.colors.surface,
              }}
            >
              <Text
                style={[
                  { textAlign: "left" },
                  styles.sectionIdText,
                  !editedName && { color: "rgba(169, 169, 169, 0.8)" },
                ]}
                onPress={handleNameClick}
              >
                {item.id}
              </Text>
              <TextInput
                style={{
                  ...styles.sectionInputText,
                  flex: 1,
                  textAlign: "right",
                }}
                value={editedName}
                placeholder={placeholderText}
                placeholderTextColor={"rgba(169, 169, 169, 0.8)"}
                onChangeText={handleNameChange}
                onBlur={handleNameBlur}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    });
  };

  return (
    <Modal
      isVisible={isVisible}
      style={{ flex: 1, height: "100%", width: "100%", margin: 0 }}
      avoidKeyboard={true}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
        <View style={styles.modalContent}>
          <View style={{ ...styles.modalButtonHeader, paddingTop: 20 }}>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={handleCloseModal}
            >
              <Feather
                name="chevron-left"
                color={theme.colors.primaryTextColor}
                size={38}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSaveCustomizations}
            >
              <Feather
                name="check-circle"
                color={theme.colors.primary}
                size={28}
              />
            </TouchableOpacity>
          </View>
          <Card
            style={{
              marginTop: 30,
              marginBottom: 10,
              marginHorizontal: 16,
              elevation: 4,
              borderColor: theme.colors.cardBorderColor,
              borderBottomWidth: 1,
            }}
          >
            <Card.Content>
              <Title
                style={{
                  marginTop: 20,
                  marginBottom: 16,
                  fontSize: 18,
                  alignSelf: "center",
                }}
              >
                Customize Meal Names
              </Title>
              {renderMealSectionItems()}
            </Card.Content>
          </Card>
          {/* {renderAnimatedBorders()} */}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default MealSectionCustomizationModal;
