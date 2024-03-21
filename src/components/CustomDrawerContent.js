import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

export const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: "center", padding: 20 }}>
        {/* User Profile Picture */}
        <View
          style={{
            height: 100,
            width: 100,
            borderRadius: 50,
            backgroundColor: "#cccccc",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Replace with actual user profile image if available */}
          <Text>User</Text>
        </View>

        {/* Additional User Info can go here */}
      </View>

      {/* Drawer Navigation Items */}
      <DrawerItemList {...props} />

      {/* Add more custom buttons if needed */}
      <TouchableOpacity onPress={() => console.log("Navigate to some feature")}>
        <Text style={{ margin: 20 }}>Custom Feature</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};
