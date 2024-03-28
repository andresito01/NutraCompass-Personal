import React, { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  runOnJS,
} from "react-native-reanimated";
import Modal from "react-native-modal";
import { PanGestureHandler } from "react-native-gesture-handler";
import { useThemeContext } from "../context/ThemeContext.js";
import DarkAndLightModeSwitch from "./DarkAndLightModeSwitch.js";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");
const MAX_TRANSLATE_X = SCREEN_WIDTH / 1;
const MIN_TRANSLATE_X = SCREEN_WIDTH / 2.5;
const MIDPOINT_X = (MAX_TRANSLATE_X + MIN_TRANSLATE_X) / 2;

const BottomSheet = ({ isVisible, toggleBottomSheet, children }) => {
  const { theme } = useThemeContext();
  const width = useSharedValue(SCREEN_WIDTH);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startWidth = width.value;
    },
    onActive: (event, context) => {
      width.value = context.startWidth + event.translationX;
      width.value = Math.min(width.value, MAX_TRANSLATE_X);
    },
    onEnd: () => {
      if (width.value < MIN_TRANSLATE_X) {
        width.value = withSpring(MIN_TRANSLATE_X);
        // width.value = withSpring(
        //   0,
        //   {
        //     duration: 400,
        //     restSpeedThreshold: 0.01,
        //   },
        //   () => {
        //     runOnJS(toggleBottomSheet)();
        //   }
        // );
      } else if (MIDPOINT_X > width.value && width.value > MIN_TRANSLATE_X) {
        width.value = withSpring(MIN_TRANSLATE_X);
      } else {
        width.value = withSpring(MAX_TRANSLATE_X);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
  }));

  useEffect(() => {
    if (isVisible) {
      width.value = withSpring(SCREEN_WIDTH / 2.5);
    } else {
      width.value = 0;
    }
  }, [isVisible]);

  return (
    <Modal visible={isVisible} style={{ flex: 1, margin: 0, padding: 0 }}>
      <View style={{ flexDirection: "row-reverse" }}>
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={toggleBottomSheet}
        />
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[
              styles.bottomSheetContainer,
              {
                backgroundColor: theme.colors.surface,

                flexDirection: "row",
                overflow: "hidden",
              },
              animatedStyle,
            ]}
          >
            <View
              style={{
                flex: 1,
                paddingTop: 20,
                gap: 10,
                overflow: "hidden",
              }}
            >
              <View style={styles.dragIndicator} />
              <View
                style={{
                  alignSelf: "center",
                  flexDirection: "row",
                  gap: 5,
                  paddingTop: 20,
                }}
              >
                <Text
                  style={{
                    color: theme.colors.primaryTextColor,
                    fontSize: 16,
                    paddingVertical: 5,
                  }}
                >
                  Dark Mode
                </Text>
                <DarkAndLightModeSwitch />
              </View>
              <Text
                style={{
                  fontSize: 20,
                  color: theme.colors.primaryTextColor,
                  alignSelf: "center",
                  minWidth: 120,
                }}
              >
                Theme Palette
              </Text>
              {children}
            </View>
          </Animated.View>
        </PanGestureHandler>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    //backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  bottomSheetContainer: {
    width: "100%",
    height: SCREEN_HEIGHT,
    flexDirection: "row",
    paddingTop: 20,
  },
  dragIndicator: {
    position: "absolute",
    top: SCREEN_HEIGHT / 2.4,
    right: 0,
    paddingVertical: 40,
    width: 5,
    backgroundColor: "gray",
    borderRadius: 8,
  },
});

export default BottomSheet;
