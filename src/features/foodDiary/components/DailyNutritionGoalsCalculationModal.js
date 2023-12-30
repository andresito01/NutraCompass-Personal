import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Modal from "react-native-modal";
import Feather from "react-native-vector-icons/Feather";
import dailyNutritionGoalsCalculationModalStyles from "./styles/dailyNutritionGoalsCalculationModalStyles.js";
import { useThemeContext } from "../../../context/ThemeContext.js";

const DailyNutritionGoalsCalculationModal = ({ isVisible, closeModal }) => {
  const styles = dailyNutritionGoalsCalculationModalStyles();
  const { theme } = useThemeContext();
  return (
    <Modal
      isVisible={isVisible}
      style={{ flex: 1, height: "100%", width: "100%", margin: 0 }}
      avoidKeyboard={true}
      animationIn="slideInUp"
      animationOut="slideOutDown"
    >
      <KeyboardAvoidingView
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: theme.colors.screenBackground,
          alignItems: "center",
        }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.closeModalButton}
            onPress={closeModal}
          >
            <Feather
              name="arrow-left"
              color={theme.colors.sectionHeaderTextColor}
              size={28}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default DailyNutritionGoalsCalculationModal;
