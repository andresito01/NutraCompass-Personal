// Import AsyncStorage for React Native and Platform for determining the platform
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Import Firebase functions from the appropriate SDKs
import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  browserLocalPersistence,
  browserSessionPersistence,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Import Firebase configuration object
import Constants from "../../constants.js";

// Initialize Firebase and Firestore
let app, auth, db;

try {
  app = initializeApp(Constants.firebaseConfig);

  // Set persistence mechanism based on platform
  if (Platform.OS === "web") {
    auth = initializeAuth(app, {
      persistence: browserLocalPersistence,
    });
  } else {
    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  }

  db = getFirestore(app);
} catch (error) {
  console.error("Firebase initialization error", error);
}

// Export Firebase auth and Firestore instances
export { auth, db };
