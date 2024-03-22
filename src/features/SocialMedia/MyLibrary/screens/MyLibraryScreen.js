import { View, Text } from "react-native";
import React from "react";
import { useThemeContext } from "../../../../context/ThemeContext.js";
import OpenDrawerToggle from "../../components/OpenDrawerToggle.js";

export default function MyLibraryScreen() {
  const { theme } = useThemeContext();
  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        paddingTop: "5%",
        backgroundColor: theme.colors.screenBackground,
      }}
    >
      {/** Home Header Container */}
      <View
        style={{
          width: "100%",
          height: "10%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
      >
        {/** Side Menu Drawer Toggle */}
        <OpenDrawerToggle />
      </View>
      <Text>MyProfileScreen</Text>
    </View>
  );
}
