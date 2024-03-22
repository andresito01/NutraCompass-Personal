import { View, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, DrawerActions } from "@react-navigation/native";

export default function OpenDrawerToggle() {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  return (
    <View>
      {/** Side Menu Drawer Toggle */}
      <TouchableOpacity onPress={openDrawer} style={{ gap: 8, paddingLeft: 5 }}>
        <View
          style={{
            backgroundColor: "gray",
            paddingVertical: 1,
            paddingHorizontal: 14,
          }}
        />
        <View
          style={{
            backgroundColor: "gray",
            paddingVertical: 1,
            paddingHorizontal: 14,
          }}
        />
        <View
          style={{
            backgroundColor: "gray",
            paddingVertical: 1,
            paddingHorizontal: 14,
          }}
        />
        {/* <Feather
            name="menu"
            color={theme.colors.cardHeaderTextColor}
            size={34}
          /> */}
      </TouchableOpacity>
    </View>
  );
}
