import React from "react";
import { Text, View, Pressable } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { Card } from "react-native-paper";
import { loggingOut } from "../authentication/api/FirebaseAPI/authenticationMethods.js";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import moreScreenStyles from "./styles/moreScreenStyles.js";
import { useThemeContext } from "../context/ThemeContext.js";
import { useNavigation } from "@react-navigation/native";

function MoreScreen() {
  const navigation = useNavigation();
  const styles = moreScreenStyles();
  const { theme, mode, toggleDarkMode } = useThemeContext();

  const handleLogout = () => {
    loggingOut();
  };

  const handleToggleDarkMode = () => {
    toggleDarkMode();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text
          style={{
            color: theme.colors.cardHeaderTextColor,
            alignSelf: "center",
          }}
        >
          More
        </Text>
      </View>
      {/* Customize Goals  */}
      <Pressable
        onPress={() => navigation.navigate("Goals")}
        style={styles.row}
      >
        <Feather
          name="target"
          color={theme.colors.cardHeaderTextColor}
          size={30}
        />

        <Text style={styles.text}>Goals</Text>
        <Feather
          style={{ position: "absolute", right: 10 }}
          name="chevron-right"
          color={theme.colors.cardHeaderTextColor}
          size={24}
        />
      </Pressable>

      {/* Theme Palette  */}
      <Pressable
        onPress={() => navigation.navigate("Themes")}
        style={styles.row}
      >
        <Feather
          name="package"
          color={theme.colors.cardHeaderTextColor}
          size={30}
        />

        <Text style={styles.text}>Theme Palette</Text>
        <Feather
          style={{ position: "absolute", right: 10 }}
          name="chevron-right"
          color={theme.colors.cardHeaderTextColor}
          size={24}
        />
      </Pressable>

      {/* Switch theme between light and dark mode */}
      <Pressable onPress={handleToggleDarkMode} style={styles.row}>
        <FontAwesome
          name={mode === "dark" ? "moon-o" : "sun-o"}
          size={30}
          color={theme.colors.cardHeaderTextColor}
        />

        <Text style={styles.text}>
          Switch To {mode === "dark" ? "Light" : "Dark"} Mode
        </Text>
      </Pressable>

      {/* Logout */}
      <Pressable onPress={handleLogout} style={styles.row}>
        <Feather
          name="log-out"
          color={theme.colors.cardHeaderTextColor}
          size={30}
        />

        <Text style={styles.text}>Logout</Text>
      </Pressable>
    </View>
  );
}

export default MoreScreen;
