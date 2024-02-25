import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import {
  addDoc,
  deleteDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  serverTimestamp,
  query,
  where,
  writeBatch,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useAuth } from "../../../authentication/context/AuthContext.js";
import { db } from "../../../config/firebase.js";
import uuid from "react-native-uuid";

const FoodLogContext = createContext();

export function useFoodLog() {
  return useContext(FoodLogContext);
}

export function FoodLogProvider({ children }) {
  const { user } = useAuth();
  const userId = user?.uid;

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [mealSections, setMealSections] = useState([]);
  const [foodEntries, setFoodEntries] = useState({});
  const [customMeals, setCustomMeals] = useState([]);
  const [customMealName, setCustomMealName] = useState("");
  const [tempCustomMeal, setTempCustomMeal] = useState({ mealItems: [] });

  const customMealSectionsCollectionRef = useMemo(
    () => collection(db, `users/${userId}/customMealSections`),
    [userId]
  );

  const foodLogEntriesCollectionRef = useMemo(
    () => collection(db, `users/${userId}/foodLogEntries`),
    [userId]
  );

  const customMealsCollectionRef = useMemo(
    () => collection(db, `users/${userId}/customMeals`),
    [userId]
  );

  useEffect(() => {
    const initializeData = async () => {
      await initializeFirestoreWithInitialMealSections();
      await loadMealSectionCustomizations();
      await loadCustomMeals();
    };

    if (user) {
      initializeData();
    }
  }, [user]);

  useEffect(() => {
    if (mealSections.length > 0) {
      loadFoodEntries();
    }
  }, [mealSections]);

  /** MEAL NAME INITIALIZATION AND CUSTOMIZATION METHODS  **/

  // Function to initialize Firestore with initial meal sections
  const initializeFirestoreWithInitialMealSections = async () => {
    try {
      const querySnapshot = await getDocs(customMealSectionsCollectionRef);
      if (querySnapshot.empty) {
        const batch = [];
        const initialMealSections = Array(6)
          .fill(null)
          .map((_, index) => ({
            id: `Meal ${index + 1}`,
            name: index < 3 ? ["Breakfast", "Lunch", "Dinner"][index] : "",
          }));

        for (let index = 0; index < initialMealSections.length; index++) {
          const mealSection = initialMealSections[index];
          const mealSectionDocRef = doc(
            customMealSectionsCollectionRef,
            mealSection.id
          );
          batch.push(setDoc(mealSectionDocRef, mealSection));
        }

        await Promise.all(batch);
      }
    } catch (error) {
      console.error("Error creating initial customMealSections:", error);
    }
  };

  // Function to load meal section customizations from Firestore and update the local state
  const loadMealSectionCustomizations = async () => {
    try {
      const querySnapshot = await getDocs(customMealSectionsCollectionRef);
      const customMealSections = [];

      querySnapshot.forEach((doc) => {
        customMealSections.push({
          id: doc.id,
          name: doc.data().name || "",
        });
      });

      setMealSections(customMealSections);
    } catch (error) {
      console.error("Error loading meal section customizations:", error);
    }
  };

  // Function to update Firestore with multiple meal section name changes
  const updateMealSectionNames = async (mealSectionUpdates) => {
    const batch = writeBatch(db); // Create a batch

    mealSectionUpdates.forEach((update) => {
      const mealSectionDocRef = doc(
        customMealSectionsCollectionRef,
        update.mealSectionId
      );
      const updateData = { name: update.newName };
      batch.update(mealSectionDocRef, updateData);
    });

    try {
      await batch.commit();
      // Update the local state with the changes
      setMealSections((prevSections) =>
        prevSections.map((section) => {
          const matchingUpdate = mealSectionUpdates.find(
            (update) => update.mealSectionId === section.id
          );
          if (matchingUpdate) {
            return { ...section, name: matchingUpdate.newName };
          }
          return section;
        })
      );
    } catch (error) {
      console.error("Error updating meal section names in Firestore:", error);
    }
  };

  /** FOOD ENTRY METHODS **/

  // Load food entries for all meal sections
  const loadFoodEntries = async () => {
    // Check if there are valid meal sections
    if (mealSections.length === 0) {
      console.error("No meal sections available.");
      return;
    }

    try {
      const updatedEntries = {};

      for (const section of mealSections) {
        const mealType = section.id;

        const querySnapshot = await getDocs(
          query(foodLogEntriesCollectionRef, where("mealType", "==", mealType))
        );

        const entries = [];

        querySnapshot.forEach((doc) => {
          entries.push({ id: doc.id, ...doc.data() });
        });

        // Create a shallow copy of the previous state
        updatedEntries[mealType] = entries;
      }

      // Update the local state with the loaded entries for all meal sections
      setFoodEntries(updatedEntries);
    } catch (error) {
      console.error("Error loading food entries:", error);
      // Handle the error gracefully, e.g., show a message to the user
    }
  };

  // Load food entries for a specific meal section
  const loadFoodEntriesForSpecificMealType = async (mealType) => {
    // Check if the mealType is valid
    if (!mealSections.some((section) => section.id === mealType)) {
      console.error("Invalid mealType:", mealType);
      return;
    }

    try {
      const querySnapshot = await getDocs(
        query(foodLogEntriesCollectionRef, where("mealType", "==", mealType))
      );

      const entries = [];

      querySnapshot.forEach((doc) => {
        entries.push({ id: doc.id, ...doc.data() });
      });

      // Update the local state with the loaded entries
      setFoodEntries((prevEntries) => {
        // Create a shallow copy of the previous state
        const updatedEntries = { ...prevEntries };

        // Check if the mealType exists in the previous state; if not, initialize it as an empty array
        if (!updatedEntries[mealType]) {
          updatedEntries[mealType] = [];
        }

        // Add the new entry to the mealType array
        updatedEntries[mealType].push({ id: docRef.id, ...newEntry });

        return updatedEntries;
      });
    } catch (error) {
      console.error("Error loading food entries:", error);
      // Handle the error gracefully, e.g., show a message to the user
    }
  };

  // Function to save a food log entry
  const saveFoodLogEntry = async (mealType, selectedDate, selectedFood) => {
    // Ensure that the meal section is valid
    if (mealSections.some((section) => section.id === mealType)) {
      try {
        // Generate a unique identifier for the document
        const uniqueId = uuid.v4();

        // Reference to the new document with the unique ID
        const entryDocRef = doc(foodLogEntriesCollectionRef, uniqueId);

        // Create a new entry object
        const newEntry = {
          id: uniqueId,
          foodId: selectedFood.foodId,
          foodLabel: selectedFood.foodLabel,
          foodCategory: selectedFood?.foodCategory || "",
          foodBrand: selectedFood?.foodBrand || "",
          numberOfServings: selectedFood?.numberOfServings,
          activeMeasure: selectedFood?.activeMeasure,
          measures: selectedFood.measures ? selectedFood.measures : [],
          nutrients: selectedFood.nutrients,
          mealType: mealType,
          date: selectedDate,
          timestamp: serverTimestamp(),
        };

        // Save the entry to Firestore
        await setDoc(entryDocRef, newEntry);

        // Update the local state
        setFoodEntries((prevEntries) => {
          const updatedEntries = { ...prevEntries };

          // Add the entry to the updated mealType
          if (mealType in updatedEntries) {
            updatedEntries[mealType] = [
              ...updatedEntries[mealType],
              { ...newEntry },
            ];
            console.log("Entry added to the meal type array.");
          } else {
            console.log("Meal type does not exist. Entry not added.");
          }

          return updatedEntries;
        });
      } catch (error) {
        console.error("Error saving food log entry:", error);
      }
    }
  };

  // Method to save a meal to the food log
  const saveMealToFoodLog = async (mealType, selectedDate, selectedMeal) => {
    try {
      // Iterate through each item in customMeal.mealItems
      for (const mealItem of selectedMeal.mealItems) {
        // Save each item to the food log using saveFoodLogEntry method
        await saveFoodLogEntry(mealType, selectedDate, mealItem);
      }
      console.log("Meal saved to food log successfully!");
    } catch (error) {
      console.error("Error saving meal to food log:", error);
    }
  };

  // Function to save or update a food log entry thats a single item (not a meal)
  const saveOrUpdateSingleFoodItemToFoodLog = async (
    mealType,
    entryId,
    updatedEntry,
    selectedDate
  ) => {
    try {
      // Create a new entry object
      const editedEntry = {
        id: entryId, // Use the existing entryId as Firestore document ID
        foodId: updatedEntry.foodId, // Use the foodId for Edamam API calls
        foodLabel: updatedEntry.foodLabel,
        foodCategory: updatedEntry?.foodCategory || "",
        foodBrand: updatedEntry?.foodBrand || "",
        numberOfServings: updatedEntry?.numberOfServings,
        activeMeasure: updatedEntry?.activeMeasure,
        measures: updatedEntry.measures,
        nutrients: updatedEntry.nutrients,
        mealType: mealType,
        date: selectedDate,
        timestamp: serverTimestamp(),
      };

      if (entryId) {
        // Check if the entryId exists in Firestore
        const entryDocRef = doc(foodLogEntriesCollectionRef, entryId);
        const entryDoc = await getDoc(entryDocRef);

        if (entryDoc.exists()) {
          // Entry exists in Firestore, update the entry
          await setDoc(entryDocRef, editedEntry, { merge: true });

          // Update the local state
          setFoodEntries((prevEntries) => {
            const updatedEntries = { ...prevEntries };

            // Remove the entry from its current mealType
            for (const [
              currentMealType,
              currentMealTypeArray,
            ] of Object.entries(updatedEntries)) {
              const entryIndex = currentMealTypeArray.findIndex(
                (entry) => entry.id === entryId
              );

              if (entryIndex !== -1) {
                console.log(
                  `Removing entry from ${currentMealType} meal type array.`
                );
                const updatedMealTypeArray = [...currentMealTypeArray];
                updatedMealTypeArray.splice(entryIndex, 1);
                updatedEntries[currentMealType] = updatedMealTypeArray;
                break; // Stop after removing from the first occurrence
              }
            }

            // Add the entry to the updated mealType, only if mealType exists
            if (mealType in updatedEntries) {
              updatedEntries[mealType] = [
                ...updatedEntries[mealType],
                { ...editedEntry },
              ];
              console.log("Entry added to the meal type array.");
            } else {
              console.log("Meal type does not exist. Entry not updated.");
            }

            return updatedEntries;
          });
        } else {
          console.log(
            "Entry id exists but an entry doc with this id does not exist."
          );
        }
      } else {
        // Entry doesn't exist in Firestore, generate a unique id
        // Call saveFoodLogEntry to add a new entry
        saveFoodLogEntry(mealType, selectedDate, updatedEntry);
      }
    } catch (error) {
      console.error("Error editing food log entry:", error);
    }
  };

  // Function to delete a food log entry
  const deleteFoodEntry = async (mealType, entryId) => {
    try {
      const entryDocRef = doc(foodLogEntriesCollectionRef, entryId);

      // Delete the entry from Firestore
      await deleteDoc(entryDocRef);

      // Update the local state
      setFoodEntries((prevEntries) => {
        const updatedEntries = { ...prevEntries };

        // Find the meal section based on the id property
        const mealSection = mealSections.find(
          (section) => section.id === mealType
        );

        // Check if the meal section is found
        if (mealSection) {
          updatedEntries[mealSection.id] = updatedEntries[
            mealSection.id
          ].filter((entry) => entry.id !== entryId);
          console.log("Entry removed from the meal type array.");
        } else {
          console.warn(`Meal section with id ${mealType} not found.`);
        }

        // console.log(
        //   "Updated Entries:",
        //   JSON.stringify(updatedEntries, null, 1)
        // );
        return updatedEntries;
      });
    } catch (error) {
      console.error("Error deleting food log entry:", error);
    }
  };

  // CREATE AND EDIT CUSTOM MEAL METHODS

  // Function to load custom meals for the current user
  const loadCustomMeals = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, `users/${userId}/customMeals`)
      );
      const customMealsData = [];
      querySnapshot.forEach((doc) => {
        customMealsData.push({ id: doc.id, ...doc.data() });
      });
      setCustomMeals(customMealsData);
    } catch (error) {
      console.error("Error loading custom meals:", error);
    }
  };

  // Method to add or update a food item in a temp custom meal
  const saveFoodToTempCustomMeal = (selectedFoodItem) => {
    // Note: When user cannot save a new entry for the exact same item more than once

    // Check if the selected food item already exists in mealItems
    const itemExists = tempCustomMeal.mealItems.some(
      (item) => item.foodId === selectedFoodItem.foodId
    );

    if (itemExists) {
      // Update the existing item
      setTempCustomMeal((prevMeal) => {
        const updatedMealItems = prevMeal.mealItems.map((item) =>
          item.foodId === selectedFoodItem.foodId
            ? { ...selectedFoodItem, foodId: item.foodId }
            : item
        );
        return { ...prevMeal, mealItems: updatedMealItems };
      });
    } else {
      // Append the selected food item with a unique ID to mealItems
      setTempCustomMeal((prevMeal) => ({
        ...prevMeal,
        mealItems: [
          ...prevMeal.mealItems,
          {
            ...selectedFoodItem,
            foodId: selectedFoodItem.foodId || item.foodId,
          },
        ],
      }));
    }
  };

  // Method to delete a food item from the temp custom meal
  const deleteFoodFromTempCustomMeal = (index) => {
    // Delete the selected food item from tempCustomMeal
    setTempCustomMeal((prevMeal) => {
      const updatedMealItems = [...prevMeal.mealItems];
      updatedMealItems.splice(index, 1); // Remove the item at the specified index
      return {
        ...prevMeal,
        mealItems: updatedMealItems,
      };
    });
  };

  // Function to save or update a custom meal
  const saveOrUpdateCustomMeal = async (customMeal) => {
    try {
      if (customMeal.id) {
        await updateCustomMeal(customMeal);
      } else {
        await saveNewCustomMeal(customMeal);
      }
    } catch (error) {
      console.error("Error saving or updating custom meal:", error);
    }
  };

  // Function to save a new custom meal
  const saveNewCustomMeal = async (customMeal) => {
    try {
      // Generate a unique identifier
      const uniqueId = uuid.v4();

      // Set the unique identifier as the id property for customMeal
      customMeal.id = uniqueId;

      // Reference to the new document with the unique ID
      const customMealDocRef = doc(customMealsCollectionRef, uniqueId);

      // Save the document with the customMeal data
      await setDoc(customMealDocRef, customMeal);

      // Update customMeals state
      setCustomMeals((prevCustomMeals) => [...prevCustomMeals, customMeal]);

      console.log("New custom meal saved successfully!");
      clearTempCustomMeal();
    } catch (error) {
      console.error("Error saving new custom meal:", error);
    }
  };
  // Function to update an existing custom meal
  const updateCustomMeal = async (customMeal) => {
    try {
      const customMealDocRef = doc(customMealsCollectionRef, customMeal.id);
      await setDoc(customMealDocRef, customMeal, { merge: true });
      setCustomMeals((prevCustomMeals) =>
        prevCustomMeals.map((meal) =>
          meal.id === customMeal.id ? customMeal : meal
        )
      ); // Update customMeals state
      console.log("Custom meal updated successfully!");
      clearTempCustomMeal();
    } catch (error) {
      console.error("Error updating custom meal:", error);
    }
  };

  // Function to delete a custom meal
  const deleteCustomMeal = async (mealId) => {
    try {
      const customMealDocRef = doc(customMealsCollectionRef, mealId);

      // Delete the entry from Firestore
      await deleteDoc(customMealDocRef);

      setCustomMeals(customMeals.filter((meal) => meal.id !== mealId));
      console.log("Custom meal deleted successfully!");
    } catch (error) {
      console.error("Error deleting custom meal:", error);
    }
  };

  // Function to clear the temporary custom meal state
  const clearTempCustomMeal = () => {
    setTempCustomMeal({ mealItems: [] });
    setCustomMealName("");
  };

  // OTHER HELPER METHODS

  // Function to calculate total calories and macros
  const calculateTotalCaloriesAndMacros = (entries) => {
    if (!Array.isArray(entries)) {
      return { calories: 0, carbs: 0, protein: 0, fat: 0 };
    }

    return entries.reduce(
      (total, entry) => {
        if (entry && entry.nutrients) {
          const { ENERC_KCAL, CHOCDF, PROCNT, FAT } = entry.nutrients;

          const entryCalories = parseFloat(ENERC_KCAL?.quantity) || 0;
          const entryCarbs = parseFloat(CHOCDF?.quantity) || 0;
          const entryProtein = parseFloat(PROCNT?.quantity) || 0;
          const entryFat = parseFloat(FAT?.quantity) || 0;

          return {
            calories: total.calories + entryCalories,
            carbs: total.carbs + entryCarbs,
            protein: total.protein + entryProtein,
            fat: total.fat + entryFat,
          };
        } else {
          return total;
        }
      },
      { calories: 0, carbs: 0, protein: 0, fat: 0 }
    );
  };

  // Filtered entries by meal and date
  const filteredEntriesByMeal = {};
  mealSections.forEach((section) => {
    // Use optional chaining here to handle potential undefined properties
    if (foodEntries?.[section.id]) {
      filteredEntriesByMeal[section.id] = foodEntries[section.id].filter(
        (entry) => entry?.date === selectedDate
      );
    }
  });

  // Calculate daily total of consumed calories and macros
  const totalDailyCaloriesAndMacrosConsumed = useMemo(
    () =>
      calculateTotalCaloriesAndMacros(
        mealSections.flatMap((section) => filteredEntriesByMeal[section.id])
      ),
    [mealSections, filteredEntriesByMeal, calculateTotalCaloriesAndMacros]
  );

  const contextValue = useMemo(() => {
    return {
      mealSections,
      setMealSections,
      foodEntries,
      setFoodEntries,
      loadMealSectionCustomizations,
      updateMealSectionNames,
      saveFoodLogEntry,
      saveMealToFoodLog,
      deleteFoodEntry,
      saveOrUpdateSingleFoodItemToFoodLog,
      calculateTotalCaloriesAndMacros,
      filteredEntriesByMeal,
      totalDailyCaloriesAndMacrosConsumed,
      selectedDate,
      setSelectedDate,
      customMeals,
      tempCustomMeal,
      setTempCustomMeal,
      saveFoodToTempCustomMeal,
      deleteFoodFromTempCustomMeal,
      saveOrUpdateCustomMeal,
      deleteCustomMeal,
      customMealName,
      setCustomMealName,
      clearTempCustomMeal,
    };
  }, [
    mealSections,
    setMealSections,
    foodEntries,
    setFoodEntries,
    loadMealSectionCustomizations,
    updateMealSectionNames,
    saveFoodLogEntry,
    saveMealToFoodLog,
    deleteFoodEntry,
    saveOrUpdateSingleFoodItemToFoodLog,
    calculateTotalCaloriesAndMacros,
    filteredEntriesByMeal,
    totalDailyCaloriesAndMacrosConsumed,
    selectedDate,
    setSelectedDate,
    customMeals,
    tempCustomMeal,
    setTempCustomMeal,
    saveFoodToTempCustomMeal,
    deleteFoodFromTempCustomMeal,
    saveOrUpdateCustomMeal,
    deleteCustomMeal,
    customMealName,
    setCustomMealName,
    clearTempCustomMeal,
  ]);

  return (
    <FoodLogContext.Provider value={contextValue}>
      {children}
    </FoodLogContext.Provider>
  );
}
