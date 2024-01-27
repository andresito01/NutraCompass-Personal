import React from "react";
import logo from "../../assets/brandmark-design.png";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Image,
  Text,
  View,
  Alert,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { TextInput, Button, useTheme, Card } from "react-native-paper"; // Import TextInput and Button from React Native Paper
import ThemeChanger from "../components/ThemeChanger.js";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import signupScreenStyles from "./styles/signupScreenStyles.js";
// Firebase API method imports
import { registration } from "../authentication/api/FirebaseAPI/authenticationMethods.js";
import Feather from "react-native-vector-icons/Feather";
import * as Haptics from "expo-haptics";
import { useThemeContext } from "../context/ThemeContext.js";
import ProfileDetailsSection from "../authentication/components/ProfileDetailsSection.js";
import ActivityLevelSection from "../authentication/components/ActivityLevelSection.js";
import SetAGoalSection from "../authentication/components/SetAGoalSection.js";
import AccountDetailsSection from "../authentication/components/AccountDetailsSection.js";

const SectionBarComponent = ({ currentSection }) => {
  const { theme } = useThemeContext();

  return (
    <View
      style={{
        marginVertical: 10,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 10,
      }}
    >
      <View
        style={{
          borderRadius: 16,
          width: 50,
          height: 8,
          backgroundColor:
            currentSection >= 1
              ? theme.colors.primary
              : "rgba(169, 169, 169, 0.7)",
        }}
      />

      <View
        style={{
          borderRadius: 16,
          width: 50,
          height: 8,
          backgroundColor:
            currentSection >= 2
              ? theme.colors.primary
              : "rgba(169, 169, 169, 0.7)",
        }}
      />

      <View
        style={{
          borderRadius: 16,
          width: 50,
          height: 8,
          backgroundColor:
            currentSection >= 3
              ? theme.colors.primary
              : "rgba(169, 169, 169, 0.7)",
        }}
      />

      <View
        style={{
          borderRadius: 16,
          width: 50,
          height: 8,
          backgroundColor:
            currentSection >= 4
              ? theme.colors.primary
              : "rgba(169, 169, 169, 0.7)",
        }}
      />
    </View>
  );
};

function SignUpScreen({ navigation }) {
  const styles = signupScreenStyles(); // Use the imported styles
  const paperTheme = useTheme();
  const { theme } = useThemeContext();

  const [show, setShow] = React.useState(false);
  // Removed dob: new Date(), from state
  const [value, setValue] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    error: "",
    activityLevel: 0,
    weightGoal: 0,
  });

  const emptyState = () => {
    setValue({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      error: "",
      activityLevel: 0,
      weightGoal: 0,
    });
  };

  const [currentSection, setCurrentSection] = React.useState(1);

  const handleNextSection = () => {
    setCurrentSection(currentSection + 1);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleSignUp = () => {
    // Sign up form validation
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      Alert.alert("Email and password are mandatory.");
    } else {
      // Removed value.dob from registration parameters
      registration(
        value.firstName,
        value.lastName,
        value.email,
        value.password
      );
      emptyState();
      setShow(false);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setValue({ ...value, dob: currentDate });
  };

  const showDatePicker = () => {
    setShow(!show);
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
            height: 70,
            minWidth: "100%",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{ alignSelf: "flex-start", padding: 15, zIndex: 2 }}
            onPress={() => {
              currentSection == 1
                ? navigation.navigate("Welcome")
                : setCurrentSection(currentSection - 1);

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
        <Image source={logo} style={styles.logo} />
        <LinearGradient
          colors={[
            paperTheme.colors.gradientStart,
            paperTheme.colors.gradientEnd,
          ]}
          locations={[0.5, 1]} // Control the position of the gradient colors
          style={styles.gradientContainer}
        >
          <View style={styles.contentContainer}>
            <SectionBarComponent currentSection={currentSection} />
            {currentSection === 1 && (
              <ProfileDetailsSection
                value={value}
                setValue={setValue}
                onNext={handleNextSection}
              />
            )}

            {currentSection === 2 && (
              <ActivityLevelSection
                value={value}
                setValue={setValue}
                onNext={handleNextSection}
              />
            )}

            {currentSection === 3 && (
              <SetAGoalSection
                value={value}
                setValue={setValue}
                onNext={handleNextSection}
              />
            )}

            {currentSection === 4 && (
              <AccountDetailsSection
                value={value}
                setValue={setValue}
                onNext={handleNextSection}
              />
            )}

            {/* Add other section components based on similar pattern */}
            {currentSection === 5 && (
              <Button
                mode="contained"
                labelStyle={{
                  color: "white",
                  fontSize: 18,
                  fontWeight: "bold",
                }}
                onPress={handleSignUp}
              >
                Sign Up
              </Button>
            )}
          </View>
        </LinearGradient>
      </View>

      {/* <View style={styles.contentContainer}>
<View
  style={{
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 15,
    gap: 2,
  }}
>
  <Text
    style={{
      fontSize: 28,
      fontWeight: "bold",
      color: theme.colors.cardHeaderTextColor,
      textAlign: "center",
    }}
  >
    Profile Details
  </Text>
  <Text
    style={{
      fontSize: 18,
      color: theme.colors.cardHeaderTextColor,
      textAlign: "center",
    }}
  >
    Enter your details so NutraCompass can customize your targets.
  </Text>
</View>
<Card style={{ width: "100%" }}>
  <Card.Content>
    <View
      style={{ justifyContent: "center", width: "100%", gap: 10 }}
    >
      <TextInput
        label="First Name"
        value={value.firstName}
        style={styles.input}
        onChangeText={(text) =>
          setValue({ ...value, firstName: text })
        }
        autoCapitalize="none"
        outlineStyle={{ borderRadius: 14 }}
        mode="outlined"
        onFocus={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      />
      <TextInput
        label="Last Name"
        value={value.lastName}
        style={styles.input}
        onChangeText={(text) =>
          setValue({ ...value, lastName: text })
        }
        autoCapitalize="none"
        outlineStyle={{ borderRadius: 14 }}
        mode="outlined"
        onFocus={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      />
      {/* <Pressable onPress={showDatePicker}>
    <Text style={styles.datePickerText}>Select Date of Birth</Text>
  </Pressable>
  {show && (
    <DateTimePicker
      value={value.dob}
      mode="date"
      display="spinner"
      onChange={handleDateChange}
    />
  )} 
      <TextInput
        label="Email"
        value={value.email}
        style={styles.input}
        onChangeText={(text) => setValue({ ...value, email: text })}
        autoCapitalize="none"
        secureTextEntry={false}
        outlineStyle={{ borderRadius: 14 }}
        mode="outlined"
        onFocus={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      />
      <TextInput
        label="Password"
        style={styles.input}
        onChangeText={(text) =>
          setValue({ ...value, password: text })
        }
        secureTextEntry={true}
        autoCapitalize="none"
        outlineStyle={{ borderRadius: 14 }}
        mode="outlined"
        onFocus={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }}
      />
    </View>
  </Card.Content>
</Card>

<Button
  mode="contained"
  style={styles.button}
  labelStyle={{ color: "white", fontSize: 18, fontWeight: "bold" }} // Style the button text
  onPress={handleSignUp}
>
  Sign Up
</Button>
<Text
  style={styles.link}
  onPress={() => navigation.navigate("Welcome")}
>
  Go to Welcome Screen
</Text>
</View> */}
    </TouchableWithoutFeedback>
  );
}

export default SignUpScreen;
