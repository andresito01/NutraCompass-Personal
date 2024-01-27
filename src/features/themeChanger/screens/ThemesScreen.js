import React from "react";
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  StyleSheet as RNStyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useThemeContext } from "../../../context/ThemeContext.js";
import { Card } from "react-native-paper";

import ThemeDisplay from "../../../components/ThemeDisplay.js";
import ThemeSelector from "../components/ThemeSelector.js";

const ThemeScreen = () => {
  const { toggleDarkMode, theme, mode } = useThemeContext();
  const navigation = useNavigation();

  const navigateToMore = () => {
    navigation.navigate("More");
  };

  const handleToggleDarkMode = () => {
    toggleDarkMode();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.screenBackground,
      }}
    >
      {/* Screen Header */}
      <View
        style={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          padding: 10,
          paddingTop: 30,
        }}
      >
        <TouchableOpacity onPress={navigateToMore}>
          <Feather
            name="chevron-left"
            color={theme.colors.sectionHeaderTextColor}
            size={38}
          />
        </TouchableOpacity>

        <Text
          style={{ color: theme.colors.sectionHeaderTextColor, fontSize: 18 }}
        >
          Theme Palette
        </Text>

        {/* Switch theme between light and dark mode */}
        <TouchableOpacity onPress={handleToggleDarkMode}>
          <FontAwesome
            name={mode === "dark" ? "moon-o" : "sun-o"}
            size={28}
            color={theme.colors.cardHeaderTextColor}
          />
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <ThemeSelector />
      </View>

      <View style={{ flex: 1, width: 440 }}>
        <ThemeDisplay />
      </View>
    </View>
  );
};

const styles = RNStyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: 100,
    height: 100,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  propertiesContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  propertyBox: {
    flex: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ThemeScreen;
