import React, { useState, useEffect } from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import { Text, Divider, useTheme, Card, Title, FAB } from "react-native-paper";
import workoutDiaryScreenStyles from "./styles/workoutDiaryScreenStyles.js";
import DateSelector from "../components/DateSelector.js";
import WorkoutStatusSection from "../features/workoutDiary/components/WorkoutStatusSection.js";
import ExerciseSection from "../features/workoutDiary/components/ExerciseSection.js";
import NotesScreen from "../features/workoutDiary/screens/Notes.js";
import CreateScreen from "../features/workoutDiary/screens/CreateScreen.js";
import CollapsibleSection from "../components/CollapsibleSection.js";
import SubCollapsibleSection from "../components/SubCollapsibleSection.js";
import {
  fetchBodyParts,
  fetchExercisesByBodypart,
} from "../features/workoutDiary/api/ExerciseDB/exerciseDB.js";
import { useThemeContext } from "../context/ThemeContext.js";

const WorkoutDiaryScreen = () => {
  const styles = workoutDiaryScreenStyles();
  const { theme } = useThemeContext();
  const paperTheme = useTheme();

  const [exercises, setExercises] = useState([
    "Legs",
    "Chest",
    "Back",
    "Arms",
    "Abdominals",
    "Cardio",
  ]);

  // useEffect(() => {
  //   const fetchExercises = async () => {
  //     try {
  //       const bodyParts = await fetchBodyParts();
  //       const fetchedExercises = await Promise.all(
  //         bodyParts.map((bodyPart) => fetchExercisesByBodypart(bodyPart))
  //       );

  //       // Define custom section mapping
  //       const sectionMapping = {
  //         "lower arms": "arms",
  //         "upper arms": "arms",
  //         "lower legs": "legs",
  //         "upper legs": "legs",
  //       };

  //       // Group exercises into sections
  //       const exercisesData = fetchedExercises.reduce((acc, curr, index) => {
  //         const section = sectionMapping[bodyParts[index]] || bodyParts[index];
  //         acc[section] = acc[section] ? [...acc[section], ...curr] : [...curr];
  //         return acc;
  //       }, {});

  //       setExercises(exercisesData);
  //     } catch (error) {
  //       console.log("Error fetching data: ", error);
  //     }
  //   };

  //   fetchExercises();
  // }, []); // Empty dependency array means this effect runs once on mount

  // State Management
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [workoutStatus, setWorkoutStatus] = useState(false);

  const [fabButtonValue, setFabButtonValue] = useState("log");

  const fabButtons = [
    { icon: "plus", label: "Log", value: "log" },
    { icon: "pencil", label: "Create", value: "create" },
    { icon: "dumbbell", label: "Workouts", value: "workouts" },
    { icon: "run", label: "Exercises", value: "exercises" },
    { icon: "notebook", label: "Notes", value: "notes" },
    { icon: "history", label: "History", value: "history" },
  ];

  const renderFABs = () => {
    return (
      <ScrollView
        horizontal
        style={{
          flexDirection: "row",
          paddingBottom: 5,
        }}
      >
        {fabButtons.map((fab, index) => (
          <View
            key={index}
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginHorizontal: 20,
              marginBottom: 5,
              gap: 10,
            }}
          >
            <FAB
              key={index}
              style={{
                borderWidth: 1,
                backgroundColor:
                  fabButtonValue === fab.value
                    ? theme.colors.primary
                    : theme.colors.cardBackgroundColor,
              }}
              icon={fab.icon}
              size="medium"
              // label={fab.label}
              mode="elevated"
              onPress={() => setFabButtonValue(fab.value)}
            />
            <Text style={{ color: theme.colors.cardHeaderTextColor }}>
              {fab.label}
            </Text>
          </View>
        ))}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {/* Date Selector Section */}
      {/* <DateSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      /> */}

      {/* Workout Status Section */}
      {/* <WorkoutStatusSection
        selectedDate={selectedDate}
        workoutStatus={workoutStatus}
        setWorkoutStatus={setWorkoutStatus}
      /> */}

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 10,
          backgroundColor: theme.colors.sectionBackgroundColor,
          borderColor: theme.colors.sectionBorderColor,
          borderTopWidth: 0,
          borderBottomWidth: 1,
          borderStartWidth: 0,
          borderEndWidth: 0,
          // borderTopLeftRadius: 360,
          // borderTopRightRadius: 360,
          // borderBottomLeftRadius: 360,
          // borderBottomRightRadius: 360,
        }}
      >
        <Text style={styles.sectionHeader}>Workout Action Menu</Text>
        {/* FAB Buttons */}
        {renderFABs()}
      </View>

      <ScrollView
        style={{
          flexGrow: 1,
          width: "100%",
          marginBottom: 10,
        }}
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled={true}
      >
        {fabButtonValue === "log" && <></>}

        {fabButtonValue === "create" && <CreateScreen />}

        {fabButtonValue === "workouts" && (
          <>
            {/* Browse Custom Workouts */}
            <CollapsibleSection title="Custom Workouts">
              {/* Add content for the new section */}
              <View
                style={{
                  height: 300,
                  backgroundColor: theme.colors.cardBackgroundColor,
                }}
              ></View>
            </CollapsibleSection>
            {/* Browse Preset Workouts */}
            <CollapsibleSection title="Presets">
              {/* Add content for the new section */}
              <View
                style={{
                  height: 300,
                  backgroundColor: theme.colors.cardBackgroundColor,
                }}
              ></View>
            </CollapsibleSection>
          </>
        )}

        {fabButtonValue === "exercises" && (
          <>
            {/* Browse Custom Exercises */}
            <CollapsibleSection title="Custom Exercises">
              {/* Exercise Section */}
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: theme.colors.cardHeaderTextColor,
                    alignSelf: "center",
                  }}
                >
                  Exercises
                </Text>
                {Object.entries(exercises).map(
                  ([bodyPart, fetchedExercises], index) => (
                    <ExerciseSection
                      key={index}
                      bodyPart={bodyPart}
                      exercises={fetchedExercises}
                    />
                  )
                )}
              </View>
            </CollapsibleSection>
            {/* Browse Preset Exercises */}
            <CollapsibleSection title="Presets">
              {/* Exercise Section */}
              <View
                style={{
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: theme.colors.cardHeaderTextColor,
                    alignSelf: "center",
                  }}
                >
                  Exercises
                </Text>
                {Object.entries(exercises).map(
                  ([bodyPart, fetchedExercises], index) => (
                    <ExerciseSection
                      key={index}
                      bodyPart={bodyPart}
                      exercises={fetchedExercises}
                    />
                  )
                )}
              </View>
            </CollapsibleSection>
          </>
        )}

        {fabButtonValue === "notes" && <NotesScreen />}

        {fabButtonValue === "history" && <></>}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WorkoutDiaryScreen;
