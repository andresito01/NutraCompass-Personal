import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { Switch } from "react-native-paper";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useThemeContext } from "../context/ThemeContext.js";

function DarkAndLightModeSwitch() {
  const { toggleDarkMode, darkMode, theme, mode } = useThemeContext();
  const [isSwitchOn, setIsSwitchOn] = useState(true);
  const onToggleSwitch = () => {
    toggleDarkMode();
    setIsSwitchOn(!isSwitchOn);
  };

  useEffect(() => {
    if (mode === "dark") {
      setIsSwitchOn(true);
    } else {
      setIsSwitchOn(false);
    }
  }, [mode]);

  return <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />;
}

export default DarkAndLightModeSwitch;
