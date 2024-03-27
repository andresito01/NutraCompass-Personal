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
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Import Firebase configuration object
import Constants from "../../constants.js";

// Initialize Firebase and Firestore
let app, auth, db, storage;

try {
  app = initializeApp(Constants.firebaseConfig);

  // Set persistence mechanism based on platform
  if (Platform.OS === "web") {
    auth = initializeAuth(app, {
      //persistence: browserLocalPersistence,
    });
  } else {
    // auth = initializeAuth(app, {
    //   persistence: getReactNativePersistence(AsyncStorage),
    // });
    auth = initializeAuth(app); // Initialize without persistence
  }

  db = getFirestore(app);
  storage = getStorage(app);
  // db = initializeFirestore(app, { experimentalAutoDetectLongPolling: true });
} catch (error) {
  console.error("Firebase initialization error", error);
}

// Export Firebase auth and Firestore instances
export { auth, db, storage };
