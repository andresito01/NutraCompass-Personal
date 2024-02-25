import React, { useEffect, useRef, useState } from "react";
import * as Haptics from "expo-haptics";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  Dimensions,
} from "react-native";
import * as Animatable from "react-native-animatable";
import Feather from "react-native-vector-icons/Feather";
import { IconButton } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useThemeContext } from "../context/ThemeContext.js";
import SplashScreen from "../screens/SplashScreen.js";
import DashboardScreen from "../screens/Dashboard.js";
import FoodDiaryScreen from "../screens/FoodDiary.js";
import FoodsScreen from "../screens/Foods.js";
import WorkoutDiaryScreen from "../screens/WorkoutDiary.js";
import MoreScreen from "../screens/More.js";
import GoalsScreen from "../screens/Goals.js";
import ThemeScreen from "../features/themeChanger/screens/ThemesScreen.js";
import BottomSheet from "../components/BottomSheet.js";
import ThemeSelector from "../features/themeChanger/components/ThemeSelector.js";
import CustomMealsModal from "../features/foodDiary/components/CustomMealsModal.js";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

const AppSettingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="More" component={MoreScreen} />
      <Stack.Screen name="Goals" component={GoalsScreen} />
      <Stack.Screen name="Themes" component={ThemeScreen} />
    </Stack.Navigator>
  );
};

const FoodsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Food Options" component={FoodsScreen} />
      <Stack.Screen name="Custom Meals" component={CustomMealsModal} />
    </Stack.Navigator>
  );
};

const TabButton = ({ label, isFocused, onPress, icon }) => {
  const { theme } = useThemeContext();

  const styles = {
    tab: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    btnContainer: {
      width: 45,
      height: 45,
      borderWidth: 4,
      borderRadius: 25,
      backgroundColor: "transparent",
      justifyContent: "center",
      alignItems: "center",
      borderColor: isFocused
        ? theme.colors.screenBackground
        : theme.colors.primary,
    },
    circle: {
      ...StyleSheet.absoluteFillObject,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.colors.primary,
      borderRadius: 25,
    },
    text: {
      fontSize: 12,
      textAlign: "center",
      color: "black",
    },
  };

  const viewRef = useRef(null);
  const circleRef = useRef(null);
  const textRef = useRef(null);

  const animate1 = {
    0: { scale: 1, translateY: 7 },
    // 0.92: { translateY: -34 },
    1: { scale: 1.2, translateY: -14 },
  };
  const animate2 = {
    0: { scale: 1.2, translateY: 0 },
    1: { scale: 1, translateY: 7 },
  };

  const circle1 = {
    0: { scale: 1 },
    // 0.3: { scale: 0.9 },
    // 0.5: { scale: 0.2 },
    // 0.8: { scale: 0.7 },
    1: { scale: 1 },
  };
  const circle2 = { 0: { scale: 1 }, 1: { scale: 0 } };

  useEffect(() => {
    if (isFocused) {
      viewRef.current.animate(animate1);
      circleRef.current.animate(circle1);
      textRef.current.transitionTo({ scale: 1 });
    } else {
      viewRef.current.animate(animate2);
      circleRef.current.animate(circle2);
      textRef.current.transitionTo({ scale: 0 });
    }
  }, [isFocused]);

  return (
    <TouchableOpacity style={styles.tab} activeOpacity={1} onPress={onPress}>
      <Animatable.View style={styles.tab} ref={viewRef} duration={500}>
        <View style={styles.btnContainer}>
          <Animatable.View ref={circleRef} style={styles.circle} />
          <Ionicons
            name={icon}
            size={26}
            color={isFocused ? "black" : "rgba(0, 0, 0, 0.3)"}
          />
          {/* <Feather
            name={icon}
            size={26}
            color={isFocused ? "black" : "rgba(0, 0, 0, 0.3)"}
          /> */}
        </View>
        <Animatable.Text ref={textRef} style={styles.text}>
          {label === "AppSettings" ? "More" : label}
        </Animatable.Text>
      </Animatable.View>
    </TouchableOpacity>
  );
};

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const { theme } = useThemeContext();

  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

  const toggleBottomSheet = () => {
    setIsBottomSheetVisible(!isBottomSheetVisible);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const styles = {
    tabBar: {
      alignSelf: "center",
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      flexDirection: "row",
      paddingLeft: 5,
      height: SCREEN_HEIGHT / 14,
      elevation: 2,
      borderTopRightRadius: 30,
      borderTopLeftRadius: 30,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      // borderTopWidth: 1,
      // borderColor: theme.colors.secondary,
      backgroundColor: theme.colors.primary,
    },
  };

  const onPress = (index) => {
    navigation.navigate(state.routeNames[index]);
  };

  const getIconName = (routeName) => {
    if (routeName === "Home") {
      return "home";
    } else if (routeName === "Diary") {
      return "book";
    } else if (routeName === "Foods") {
      return "fast-food";
    } else if (routeName === "Workout") {
      return "barbell";
    } else if (routeName === "AppSettings") {
      return "ellipsis-horizontal";
    }

    return "home"; // Default icon name
  };

  return (
    <View style={{ flexDirection: "row" }}>
      <View style={styles.tabBar}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : route.name;

          const isFocused = state.index === index;

          const onPressTab = () => {
            onPress(index);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          };

          return (
            <TabButton
              key={index}
              label={label}
              isFocused={isFocused}
              onPress={onPressTab}
              icon={getIconName(route.name)}
            />
          );
        })}
        {/* Toggle Button */}
        <IconButton
          icon="palette"
          iconColor={
            isBottomSheetVisible ? theme.colors.primary : "rgba(0, 0, 0, 0.3)"
          }
          size={30}
          onPress={toggleBottomSheet}
          rippleColor={"transparent"}
          style={{
            backgroundColor: isBottomSheetVisible
              ? theme.colors.screenBackground
              : "transparent",
            alignSelf: "center",
            position: "relative",
            margin: 3,
          }}
        />
      </View>

      {/* Custom Bottom Sheet */}
      <BottomSheet
        isVisible={isBottomSheetVisible}
        toggleBottomSheet={toggleBottomSheet}
      >
        {isBottomSheetVisible && (
          <View style={{ flex: 1 }}>
            <ThemeSelector renderStructure="structure2" />
          </View>
        )}
      </BottomSheet>
    </View>
  );
};

const MainTabs = () => {
  const { theme } = useThemeContext();

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={DashboardScreen}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        })}
      />
      <Tab.Screen
        name="Diary"
        component={FoodDiaryScreen}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        })}
      />
      <Tab.Screen
        name="Foods"
        options={{ tabBarShowLabel: false }}
        component={FoodsStack}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        })}
      />
      <Tab.Screen
        name="Workout"
        component={WorkoutDiaryScreen}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        })}
      />
      <Tab.Screen
        name="AppSettings"
        options={{ tabBarLabel: "More" }}
        component={AppSettingsStack}
        listeners={() => ({
          tabPress: () => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          },
        })}
      />
    </Tab.Navigator>
  );
};

const UserStack = () => {
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
};

export default UserStack;
