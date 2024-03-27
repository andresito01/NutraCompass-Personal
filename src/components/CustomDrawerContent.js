import React from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useThemeContext } from "../context/ThemeContext.js";
import ProfilePicture from "../features/SocialMedia/components/ProfilePicture.js";
export const CustomDrawerContent = (props) => {
  const { state, navigation } = props;
  const { theme } = useThemeContext();
  const styles = getStyles(theme); // Call getStyles function with the current theme

  return (
    <DrawerContentScrollView
      style={{ backgroundColor: theme.colors.screenBackground }}
      {...props}
    >
      <View style={styles.profileContainer}>
        <ProfilePicture size={150} />
      </View>

      {/* Custom Drawer Navigation Items */}
      <ScrollView>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          return (
            <TouchableOpacity
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={[styles.item, isFocused ? styles.itemFocused : null]}
            >
              <Text style={styles.itemText}>
                {route.name === "Main" ? "Home" : route.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </DrawerContentScrollView>
  );
};

// Define your styles in a function that receives the theme
const getStyles = (theme) => ({
  profileContainer: { alignItems: "center", padding: 20 },
  profilePicContainer: {
    height: 150,
    width: 150,
    borderRadius: 75, // Ensure this matches half the height/width for a circle
    borderWidth: 1,
    borderColor: theme.colors.primary,
    overflow: "hidden", // Ensures the image respects the container's borderRadius
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#cccccc",
  },
  profileImage: {
    height: "100%",
    width: "100%",
  },
  item: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  itemFocused: {
    backgroundColor: theme.colors.secondary, // Example usage
  },
  itemText: {
    fontSize: 16,
    color: theme.colors.cardHeaderTextColor, // Example usage
  },
  customFeature: { margin: 20 },
});
