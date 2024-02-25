import React, { useState } from "react";
import logo from "../../assets/brandmark-design-logo.png";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Keyboard,
  Platform,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Feather from "react-native-vector-icons/Feather";
import * as Haptics from "expo-haptics";
import { useThemeContext } from "../context/ThemeContext.js";
import { TextInput, Button } from "react-native-paper";
import signinScreenStyles from "./styles/signinScreenStyles.js";
import { signIn } from "../authentication/api/FirebaseAPI/authenticationMethods.js";

function SignInScreen({ navigation }) {
  const styles = signinScreenStyles(); // Use the imported styles
  const { theme } = useThemeContext();

  const [emailIconColor, setEmailIconColor] = useState("transparent");
  const [passwordIconColor, setPasswordIconColor] = useState("transparent");
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

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

  const renderTextInput = () => {
    if (Platform.OS === "web") {
      return (
        <View style={{ justifyContent: "center", width: "100%", gap: 20 }}>
          <input
            type="text"
            value={value.email}
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setValue({ ...value, email: text })}
          />
          <input
            type="password"
            value={value.password}
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => setValue({ ...value, password: text })}
          />
        </View>
      );
    } else {
      return (
        <View style={{ justifyContent: "center", width: "100%", gap: 20 }}>
          <TextInput
            placeholder="EMAIL"
            value={value.email}
            style={{
              backgroundColor: "transparent",
              paddingHorizontal: 40,
            }}
            textColor="white"
            outlineStyle={{ borderRadius: 14 }}
            onChangeText={(text) => setValue({ ...value, email: text })}
            autoCapitalize="none"
            mode="flat"
            onFocus={() => {
              setEmailIconColor("white");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            onBlur={() => setEmailIconColor("transparent")}
            left={
              <TextInput.Icon
                icon="account"
                color={"lightgray"}
                style={{ backgroundColor: emailIconColor }}
              />
            }
          />
          <TextInput
            placeholder="PASSWORD"
            value={value.password}
            style={{
              backgroundColor: "transparent",
              paddingHorizontal: 40,
            }}
            textColor="white"
            outlineStyle={{ borderRadius: 14 }}
            onChangeText={(text) => setValue({ ...value, password: text })}
            secureTextEntry={isSecureTextEntry}
            autoCapitalize="none"
            mode="flat"
            onFocus={() => {
              setPasswordIconColor("white");
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            }}
            onBlur={() => setPasswordIconColor("transparent")}
            left={
              <TextInput.Icon
                icon="lock"
                color={"lightgray"}
                style={{ backgroundColor: passwordIconColor }}
              />
            }
            right={
              <TextInput.Icon
                icon="eye"
                color={"lightgray"}
                onPress={() => setIsSecureTextEntry(!isSecureTextEntry)}
              />
            }
          />
        </View>
      );
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.screenBackground,
      }}
    >
      <TouchableOpacity
        style={{ flex: 1 }}
        activeOpacity={1}
        onPress={Keyboard.dismiss}
      >
        <LinearGradient
          colors={["black", "white"]}
          style={{
            flex: 1,
          }}
          start={{ x: 0, y: 0.6 }}
          end={{ x: 0, y: 0.2 }}
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
              <Feather name="chevron-left" color={"black"} size={38} />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 1 }}>
            <Image source={logo} style={styles.logo} />
            <View
              style={{
                ...styles.contentContainer,
                gap: 10,
                paddingTop: "15%",
              }}
            >
              {renderTextInput()}
              <Button
                mode="contained"
                style={{
                  backgroundColor: "white",
                  borderRadius: 8,
                  paddingVertical: 2,
                  marginVertical: 15,
                  width: "90%",
                }}
                labelStyle={{
                  color: "black",
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
                  color: "gray",
                  marginTop: 5,
                  marginBottom: 15,
                }}
                onPress={() => {
                  //navigation.navigate("Welcome");
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              >
                Forgot your password?
              </Text>
              <Text
                style={{
                  color: "white",
                  fontSize: 16,
                  marginTop: 20,
                  textAlign: "center",
                  marginBottom: 20,
                }}
              >
                Don't Have an account?{" "}
                <Text
                  style={{ color: "white" }}
                  onPress={() => {
                    navigation.navigate("Sign Up");
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                >
                  SIGN UP
                </Text>
              </Text>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default SignInScreen;
