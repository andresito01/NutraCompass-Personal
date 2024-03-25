import React, { useEffect, useRef, useState } from "react";
import * as Haptics from "expo-haptics";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
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
import ThemeScreen from "../features/ThemeChanger/screens/ThemesScreen.js";
import BottomSheet from "../components/BottomSheet.js";
import ThemeSelector from "../features/ThemeChanger/components/ThemeSelector.js";
import CustomMealsModal from "../features/FoodDiary/components/CustomMealsModal.js";
import { CustomDrawerContent } from "../components/CustomDrawerContent.js";
// Social Media Screen Imports
import MyProfileScreen from "../features/SocialMedia/MyProfile/screens/MyProfileScreen.js";
import MyLibraryScreen from "../features/SocialMedia/MyLibrary/screens/MyLibraryScreen.js";
import MyAccomplishmentsScreen from "../features/SocialMedia/MyAccomplishments/screens/MyAccomplishmentsScreen.js";
import MarketPlaceScreen from "../features/SocialMedia/MarketPlace/screens/MarketPlaceScreen.js";
import SocialSettingsScreen from "../features/SocialMedia/SocialSettings/screens/SocialSettingsScreen.js";
import ChatScreen from "../features/SocialMedia/screens/ChatScreen.js";
import SelectFriend from "../features/SocialMedia/screens/SelectFriend.js";
import TextScreen from "../features/SocialMedia/screens/TextScreen.js";

//chat button navigator
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const ChatStack = createStackNavigator();
const HomeStack = createStackNavigator();

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

// Define your Drawer screens
const DrawerScreens = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="Main" component={MainTabs} />
      <Drawer.Screen name="My Profile" component={MyProfileScreen} />
      <Drawer.Screen name="Messages" component={MessagesStack} />
      <Drawer.Screen name="My Library" component={MyLibraryScreen} />
      <Drawer.Screen
        name="My Accomplishments"
        component={MyAccomplishmentsScreen}
      />
      <Drawer.Screen name="Market Place" component={MarketPlaceScreen} />
      <Drawer.Screen name="Social Settings" component={SocialSettingsScreen} />
    </Drawer.Navigator>
  );
};

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

const MessagesStack = () => {
  return (
    <ChatStack.Navigator screenOptions={{ headerShown: false }}>
      <ChatStack.Screen name="Chat" component={ChatScreen} />
      <ChatStack.Screen name="SelectFriend" component={SelectFriend} />
      <ChatStack.Screen name="TextScreen" component={TextScreen} />
    </ChatStack.Navigator>
  );
};

const HomeScreenStack = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Dashboard" component={DashboardScreen} />
      <HomeStack.Screen name="Chat" component={ChatScreen} />
      <HomeStack.Screen name="SelectFriend" component={SelectFriend} />
      <HomeStack.Screen name="TextScreen" component={TextScreen} />
    </HomeStack.Navigator>
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
    console.log(index);
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

  const onTabPress = (route, index) => {
    const isRouteFocused = state.index === index;
    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!event.defaultPrevented) {
      if (isRouteFocused && route.name === "Home") {
        // If the 'Home' tab is already focused, reset to the Dashboard screen
        navigation.reset({
          index: 0,
          routes: [{ name: "Dashboard" }],
        });
      } else {
        // For other tabs, use the default behavior
        navigation.navigate(route.name);
      }
    }
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

          return (
            <TabButton
              key={route.key}
              label={label}
              isFocused={isFocused}
              onPress={() => onTabPress(route, index)} // Use the custom onTabPress
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
        component={HomeScreenStack}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
            const state = navigation.getState();

            // Check if the stack is not at the 'Dashboard' screen
            if (route.state?.index > 0) {
              // Reset the stack to the 'Dashboard' screen
              navigation.navigate("Dashboard");
            } else if (state.index === 0) {
              // When already focused, reset to the initial route (which is 'Dashboard' here)
              navigation.reset({
                index: 0,
                routes: [{ name: "Dashboard" }],
              });
            } else {
              // If the tab press is for another screen (not the Home stack), perform default action
              navigation.navigate("Home");
            }
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

const RootNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, gestureEnabled: false }}
    >
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Drawer" component={DrawerScreens} />
    </Stack.Navigator>
  );
};

const UserStack = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default UserStack;
