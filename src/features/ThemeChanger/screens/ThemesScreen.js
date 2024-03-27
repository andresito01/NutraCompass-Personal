import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useThemeContext } from "../../../context/ThemeContext.js";
import ThemeDisplay from "../components/ThemeDisplay.js";
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
    <SafeAreaView
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
          alignItems: "baseline",
          padding: 10,
          paddingTop: 30,
        }}
      >
        <TouchableOpacity onPress={navigateToMore}>
          <Feather
            name="chevron-left"
            color={theme.colors.sectionHeaderTextColor}
            size={28}
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

      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.surface,
          padding: 5,
          paddingTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: theme.colors.cardHeaderTextColor,
            alignSelf: "center",
          }}
        >
          Current Theme
        </Text>
        <View style={{ flex: 1 }}>
          <ThemeDisplay />
        </View>
      </View>

      <View
        style={{
          flex: 4,
          paddingBottom: "20%",
          alignItems: "center",
        }}
      >
        <ThemeSelector renderStructure="structure1" />
      </View>
    </SafeAreaView>
  );
};

export default ThemeScreen;
