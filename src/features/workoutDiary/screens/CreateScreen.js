import React, { useState } from "react";
import { View, Text, TextInput, ScrollView } from "react-native";
import { Button as PaperButton, Card, ToggleButton } from "react-native-paper";
import createScreenStyles from "./styles/createScreenStyles.js";
import Feather from "react-native-vector-icons/Feather";
import CollapsibleSection from "../../../components/CollapsibleSection.js";
import CustomExerciseCard from "../components/CustomExerciseCard.js";

const CreateScreen = () => {
  const styles = createScreenStyles();

  const [exerciseName, setExerciseName] = useState("");
  const [primaryMuscle, setPrimaryMuscle] = useState("");
  const [secondaryMuscles, setSecondaryMuscles] = useState("");
  const [equipment, setEquipment] = useState("");
  const [instructions, setInstructions] = useState("");

  // State for created exercises
  const [createdExercises, setCreatedExercises] = useState([]);

  const handleCreateExercise = () => {
    // Implement logic to handle the creation of a custom exercise
    // Example: creating a new exercise with a random date for demonstration
    const newExercise = {
      name: exerciseName,
      dateCreated: new Date().toLocaleDateString(),
      // Add other properties...
    };

    setCreatedExercises([...createdExercises, newExercise]);
    // You can add API calls or state updates here
  };

  return (
    <View>
      {/* Create Custom Exercises */}
      <CollapsibleSection title="Create Custom Exercise">
        <View style={styles.formContainer}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "baseline",
                paddingRight: 5,
              }}
            >
              <Text style={styles.label}>Exercise Name</Text>
              <Text style={styles.requiredLabel}>Required</Text>
            </View>
            <TextInput
              value={exerciseName}
              onChangeText={(text) => setExerciseName(text)}
              style={styles.input}
            />
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Primary Muscle</Text>
                <TextInput
                  value={primaryMuscle}
                  onChangeText={(text) => setPrimaryMuscle(text)}
                  style={styles.input}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Secondary Muscles</Text>
                <TextInput
                  value={secondaryMuscles}
                  onChangeText={(text) => setSecondaryMuscles(text)}
                  style={styles.input}
                />
              </View>
            </View>

            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Equipment Required</Text>
                <TextInput
                  value={equipment}
                  onChangeText={(text) => setEquipment(text)}
                  style={styles.input}
                />
              </View>

              <PaperButton
                mode="contained"
                onPress={handleCreateExercise}
                style={styles.button}
                labelStyle={{ fontSize: 14 }}
              >
                Create Exercise
              </PaperButton>
            </View>
          </View>

          <View style={styles.bottom}>
            <Text style={styles.label}>Instructions</Text>
            <TextInput
              value={instructions}
              onChangeText={(text) => setInstructions(text)}
              style={[styles.input, { height: 100 }]}
              multiline
            />
          </View>
        </View>

        <Text style={{ ...styles.label, paddingTop: 10 }}>Customs List</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.customExerciseListContainer}
        >
          {createdExercises.map((exercise, index) => (
            <CustomExerciseCard key={index} exercise={exercise} />
          ))}
        </ScrollView>
      </CollapsibleSection>
      {/* Create Customs Workouts */}
      <CollapsibleSection title="Create Custom Workout">
        {/* Add content for the new section */}
        <View style={{ height: 300, backgroundColor: "red" }}></View>
      </CollapsibleSection>
    </View>
  );
};

export default CreateScreen;
