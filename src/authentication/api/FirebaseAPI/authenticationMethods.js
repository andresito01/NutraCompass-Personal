import { auth } from "../../../config/firebase.js";
import * as fb from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { Alert } from "react-native";

// ALL METHODS ENGAGE WITH FIREBASE AND FIRESTORE DATABASE

// sex: "",
// birthday: "",
// height: { inches: null, centimeters: null },
// weight: "",
// activityLevel: null,
// weightTrendGoal: null,
// customEnergyTarget: null,
// firstName: "",
// lastName: "",
// email: "",
// password: "",
// confirmPassword: "",
// error: "",

// User Authentication Methods
export async function registration(email, password, defaultSettings) {
  try {
    await fb.createUserWithEmailAndPassword(auth, email, password);

    const currentUser = auth.currentUser;

    const db = getFirestore();
    // const userRef = doc(db, "users", currentUser.uid);

    const userSettingsDocRef = doc(
      db,
      `users/${currentUser.uid}/settings`,
      currentUser.uid
    );

    await setDoc(userSettingsDocRef, defaultSettings);
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}

export async function signIn(email, password) {
  try {
    await fb.signInWithEmailAndPassword(fb.getAuth(), email, password);
  } catch (err) {
    Alert.alert("Invalid email or password");
  }
}

export async function loggingOut() {
  try {
    await fb.signOut(fb.getAuth());
  } catch (err) {
    Alert.alert("There is something wrong!", err.message);
  }
}
