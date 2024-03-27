import { View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import { useThemeContext } from "../../../context/ThemeContext.js";

export default function OpenDrawerToggle({ icon }) {
  const navigation = useNavigation();
  const { theme } = useThemeContext();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View>
      {/** Side Menu Drawer Toggle */}
      <TouchableOpacity onPress={openDrawer} style={{ gap: 8, paddingLeft: 5 }}>
        <Feather
          name={icon}
          color={theme.colors.cardHeaderTextColor}
          size={34}
        />
      </TouchableOpacity>
    </View>
  );
}
