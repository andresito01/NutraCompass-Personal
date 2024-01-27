import React from "react";
import logo from "../../assets/brandmark-design.png";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "react-native-vector-icons/Feather";
import * as Haptics from "expo-haptics";
import { useThemeContext } from "../context/ThemeContext.js";
import { useTheme, TextInput, Button } from "react-native-paper";
import signinScreenStyles from "./styles/signinScreenStyles.js";
import { signIn } from "../authentication/api/FirebaseAPI/authenticationMethods.js";
import ThemeChanger from "../components/ThemeChanger.js";

function SignInScreen({ navigation }) {
  const styles = signinScreenStyles(); // Use the imported styles
  const paperTheme = useTheme();
  const { theme } = useThemeContext();

  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  const emptyState = () => {
    setValue({
      email: "",
      password: "",
      error: "",
    });
  };

  const handleSignIn = () => {
    // Sign in form validation
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      Alert.alert("Email and password are mandatory.");
      return;
    } else {
      signIn(value.email, value.password);
      emptyState();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.colors.screenBackground,
        }}
      >
        <View
          style={{
            height: 85,
            minWidth: "100%",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{ alignSelf: "flex-start", padding: 15 }}
            onPress={() => {
              navigation.navigate("Welcome");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
          >
            <Feather
              name="chevron-left"
              color={theme.colors.sectionHeaderTextColor}
              size={38}
            />
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={[
            paperTheme.colors.gradientStart,
            paperTheme.colors.gradientEnd,
          ]}
          locations={[0.5, 1]} // Control the position of the gradient colors
          style={styles.gradientContainer}
        >
          <Image source={logo} style={styles.logo} />
          <View style={styles.contentContainer}>
            <View style={{ justifyContent: "center", width: "100%", gap: 20 }}>
              <TextInput
                label="Email"
                value={value.email}
                style={styles.input}
                outlineStyle={{ borderRadius: 14 }}
                onChangeText={(text) => setValue({ ...value, email: text })}
                autoCapitalize="none"
                mode="outlined"
                onFocus={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              />
              <TextInput
                label="Password"
                value={value.password}
                style={styles.input}
                outlineStyle={{ borderRadius: 14 }}
                onChangeText={(text) => setValue({ ...value, password: text })}
                secureTextEntry={true}
                autoCapitalize="none"
                mode="outlined"
                onFocus={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              />
            </View>
            <Button
              mode="contained"
              style={{
                backgroundColor: theme.colors.primary,
                borderRadius: 30, // Increased border radius for buttons
                paddingVertical: 2, // Adjusted padding for buttons
                marginVertical: 15,
                width: "80%", // Adjusted button width
              }}
              labelStyle={{
                color: theme.colors.darkGrayBackgroundColor,
                fontSize: 18,
                fontWeight: "bold",
              }}
              onPress={() => {
                handleSignIn();
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              LOG IN
            </Button>
            <Text
              style={{
                color: theme.colors.secondary,
                marginTop: 5,
                marginBottom: 15,
              }}
              onPress={() => {
                navigation.navigate("Welcome");
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
            >
              Forgot your password?
            </Text>
            <Text
              style={{
                color: theme.colors.cardHeaderTextColor,
                fontSize: 16,
                marginTop: 20,
                textAlign: "center",
                marginBottom: 20,
              }}
            >
              Don't Have an account?{" "}
              <Text
                style={{ color: theme.colors.secondary }}
                onPress={() => {
                  navigation.navigate("Sign Up");
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              >
                SIGN UP
              </Text>
            </Text>
          </View>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default SignInScreen;
