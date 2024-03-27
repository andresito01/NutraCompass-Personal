// CreateExerciseForm.js
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { Button as PaperButton, TextInput } from "react-native-paper";
import * as Haptics from "expo-haptics";
import CollapsibleSection from "../../../components/CollapsibleSection.js";
import CustomExerciseCard from "./CustomExerciseCard.js";
import createExerciseFormStyles from "./styles/createExerciseFormStyles.js";

const CreateExerciseForm = () => {
  const styles = createExerciseFormStyles();

  const [exerciseName, setExerciseName] = useState("");
  const [primaryMuscle, setPrimaryMuscle] = useState("");
  const [secondaryMuscles, setSecondaryMuscles] = useState("");
  const [equipment, setEquipment] = useState("");
  const [instructions, setInstructions] = useState("");
  const [createdExercises, setCreatedExercises] = useState([]);

  const handleCreateExercise = () => {
    // Check if exercise name is empty
    if (!exerciseName.trim()) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      // You can show an error message or perform any other required action
      alert("Exercise Name is required");
      return;
    }

    const newExercise = {
      name: exerciseName,
      dateCreated: new Date().toLocaleDateString(),
      // Add other properties...
    };

    setCreatedExercises([...createdExercises, newExercise]);
    // You can add API calls or state updates here

    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Clear input fields
    setExerciseName("");
    setPrimaryMuscle("");
    setSecondaryMuscles("");
    setEquipment("");
    setInstructions("");
  };

  return (
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
            mode="outlined"
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
              mode="elevated"
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
      <View style={{ flex: 1 }}>
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
      </View>
    </CollapsibleSection>
  );
};

export default CreateExerciseForm;
