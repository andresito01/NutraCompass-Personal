import React from "react";
import * as Haptics from "expo-haptics";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import { useThemeContext } from "../context/ThemeContext.js";
import SplashScreen from "../screens/SplashScreen.js";
import DashboardScreen from "../screens/Dashboard.js";
import FoodDiaryScreen from "../screens/FoodDiary.js";
import WorkoutDiaryScreen from "../screens/WorkoutDiary.js";
import MoreScreen from "../screens/More.js";
import GoalsScreen from "../screens/Goals.js";
import ThemeScreen from "../features/themeChanger/screens/ThemesScreen.js";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AppSettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="More" component={MoreScreen} />
      <Stack.Screen name="Goals" component={GoalsScreen} />
      <Stack.Screen name="Themes" component={ThemeScreen} />
    </Stack.Navigator>
  );
};

const MainTabs = () => {
  const { theme } = useThemeContext();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = "trello";
          } else if (route.name === "Food Diary") {
            iconName = "book-open";
          } else if (route.name === "Workout Diary") {
            iconName = "calendar";
          } else if (route.name === "AppSettings") {
            iconName = "more-horizontal";
          }

          const iconColor = focused ? "black" : "rgba(0, 0, 0, 0.3)";

          return <Feather name={iconName} color={iconColor} size={size} />;
        },
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: "rgba(0, 0, 0, 0.3)",
        tabBarLabelStyle: {
          fontSize: 14,
          marginTop: 5,
        },
        tabBarStyle: {
          borderColor: theme.colors.primary,
          backgroundColor: theme.colors.primary,
          height: "8%",
          paddingBottom: 5,
          paddingTop: 5,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          },
        })}
      />
      <Tab.Screen
        name="Food Diary"
        component={FoodDiaryScreen}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          },
        })}
      />
      <Tab.Screen
        name="Workout Diary"
        component={WorkoutDiaryScreen}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          },
        })}
      />
      <Tab.Screen
        name="AppSettings"
        options={{ tabBarLabel: "More" }}
        component={AppSettingsStack}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          },
        })}
      />
    </Tab.Navigator>
  );
};

function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{ gestureEnabled: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ gestureEnabled: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default UserStack;
