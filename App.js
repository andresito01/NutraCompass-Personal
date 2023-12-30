import "./src/config/firebase.js";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "./src/authentication/context/AuthContext.js";
import RootNavigation from "./src/navigation/index.js";
import { ThemeProvider } from "./src/context/ThemeContext.js";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();
// setTimeout(SplashScreen.hideAsync, 5000);

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <ThemeProvider>
          {/* Root Navigation */}
          <RootNavigation />
        </ThemeProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
