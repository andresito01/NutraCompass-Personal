import React, { useState } from "react";
import { View } from "react-native";
import createScreenStyles from "./styles/createScreenStyles.js";
import CollapsibleSection from "../../../components/CollapsibleSection.js";
import CreateExerciseForm from "../components/CreateExerciseForm.js";

const CreateScreen = () => {
  const styles = createScreenStyles();

  return (
    <View>
      {/* Create Custom Exercises */}
      <CreateExerciseForm />
      {/* Create Customs Workouts */}
      <CollapsibleSection title="Create Custom Workout">
        {/* Add content for the new section */}
        <View style={{ height: 300 }}></View>
      </CollapsibleSection>
    </View>
  );
};

export default CreateScreen;
