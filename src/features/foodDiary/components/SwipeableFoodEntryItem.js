import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
  Easing,
} from "react-native";
import { useTheme } from "react-native-paper";
import swipeableFoodEntryItemStyles from "./styles/swipeableFoodEntryItemStyles.js";
import * as Haptics from "expo-haptics";

const SCREEN_WIDTH = Dimensions.get("window").width;
const RIGHT_BUTTON_THRESHOLD = SCREEN_WIDTH / 15;
const FORCE_TO_OPEN_THRESHOLD = SCREEN_WIDTH / 3.5;
const FORCING_DURATION = 100;
const SCROLL_THRESHOLD = SCREEN_WIDTH / 15;

const SwipeableFoodEntryItem = ({
  id,
  itemData,
  swipingCheck,
  handleDeleteEntry,
  handleEditEntry,
}) => {
  const styles = swipeableFoodEntryItemStyles(); // Apply your styles
  const theme = useTheme(); // Theme context

  // Use useRef to create independent Animated.Value instances for each item
  const position = useRef(new Animated.ValueXY(0, 0)).current;
  const hasVibrated = useRef(false);

  useEffect(() => {
    // Cleanup the position value and the vibration flag when the component unmounts
    return () => {
      position.removeAllListeners();
      hasVibrated.current = false;
    };
  }, []);

  const getRightButtonProps = () => {
    const opacity = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, -120, -35],
      outputRange: [0, 1, 0],
    });

    const width = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH, 0],
      outputRange: [SCREEN_WIDTH, 0],
      extrapolate: "clamp", // Ensures that the output value does not go beyond the specified range
    });

    return {
      opacity,
      width,
    };
  };

  const resetPosition = () => {
    Animated.timing(position, {
      toValue: { x: 0, y: 0 },
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const resetPositionAfterEntryDelete = () => {
    position.setValue({ x: 0, y: 0 });
  };

  const completeSwipe = () => {
    Animated.timing(position, {
      toValue: { x: -SCREEN_WIDTH, y: 0 },
      duration: FORCING_DURATION,
      useNativeDriver: false,
    }).start(() => {
      handleDeleteEntry(id);
    });
  };

  const enableScrollView = (isEnabled) => {
    swipingCheck(isEnabled);
  };

  const userSwipedLeft = (gesture) => {
    if (gesture.dx <= -SCREEN_WIDTH / 1.9) {
      completeSwipe();
    } else if (gesture.dx <= -RIGHT_BUTTON_THRESHOLD) {
      showButton();
    } else {
      resetPosition();
    }
  };

  const showButton = () => {
    const x = -SCREEN_WIDTH / 2.5;
    Animated.timing(position, {
      toValue: { x, y: 0 },
      duration: 200,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start(() => enableScrollView(false));
  };

  const handleSwipeMove = (gesture) => {
    if (gesture.dx <= -SCROLL_THRESHOLD) {
      enableScrollView(true);
      const x = gesture.dx + SCROLL_THRESHOLD;
      position.setValue({ x, y: 0 });
      // Check if the user swiped past the threshold to delete and hasn't vibrated yet
      if (gesture.dx <= -SCREEN_WIDTH / 1.9 && !hasVibrated.current) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        hasVibrated.current = true; // Set the flag to prevent continuous vibration
      }
      // Check if the user swiped past the threshold to delete and hasn't vibrated yet
      else if (gesture.dx > -SCREEN_WIDTH / 1.9 && hasVibrated.current) {
        hasVibrated.current = false; // Set the flag to false to vibrate again when the threshold is reached
      }
    }
  };

  return (
    <View style={styles.containerStyle}>
      <Animated.View
        style={[styles.textContainer, position.getLayout()]}
        {...PanResponder.create({
          onStartShouldSetPanResponder: () => false,
          onMoveShouldSetPanResponder: () => true,
          onResponderTerminationRequest: () => false,
          onPanResponderGrant: () => {
            position.setOffset({ x: position.x._value, y: 0 });
            position.setValue({ x: 0, y: 0 });
          },
          onPanResponderMove: (event, gesture) => handleSwipeMove(gesture),
          onPanResponderRelease: (event, gesture) => {
            position.flattenOffset();
            if (gesture.dx <= -RIGHT_BUTTON_THRESHOLD) {
              userSwipedLeft(gesture);
            } else {
              resetPosition();
            }
          },
          onPanResponderTerminate: () => {
            Animated.spring(position, {
              toValue: { x: 0, y: 0 },
              useNativeDriver: false,
            }).start();
          },
        }).panHandlers}
      >
        <TouchableOpacity
          onPress={() => handleEditEntry()}
          onLongPress={() => handleEditEntry()}
          style={styles.entryInfo}
        >
          <Text
            style={{
              ...styles.entryFoodNameText,
              flex: 2 / 3,
              flexWrap: "wrap",
            }}
          >
            {itemData.foodLabel}
          </Text>
          <Text style={styles.entryCaloriesText}>
            {Math.round(itemData?.nutrients?.ENERC_KCAL?.quantity)}
          </Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View
        style={[
          styles.rightButtonContainer,
          {
            opacity: getRightButtonProps().opacity,
            width: getRightButtonProps().width,
            height: "100%",
          },
        ]}
      >
        <TouchableOpacity onPress={completeSwipe}>
          <Text
            style={{
              ...styles.textStyle,
            }}
          >
            Delete
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SwipeableFoodEntryItem;
