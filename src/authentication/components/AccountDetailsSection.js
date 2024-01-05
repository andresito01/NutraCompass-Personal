import React from "react";
import { ScrollView, Text, View } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import * as Haptics from "expo-haptics";
import signupScreenStyles from "../../screens/styles/signupScreenStyles.js";
import { useThemeContext } from "../../context/ThemeContext.js";

export default function AccountDetailsSection({ value, setValue, onNext }) {
  const styles = signupScreenStyles();
  const { theme } = useThemeContext();

  const handleNext = () => {
    // Add validation logic for this section
    // Call onNext only if validation passes
    onNext();
  };

  return (
    <ScrollView style={{ flex: 1, width: "100%" }}>
      <View
        style={{
          alignItems: "center",
          paddingTop: 10,
          gap: 5,
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
          Account Details
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: theme.colors.cardHeaderTextColor,
            textAlign: "center",
          }}
        >
          Enter your account details to complete the signup process.
        </Text>

        <Card style={{ width: "100%", marginTop: 10 }}>
          <Card.Content>
            <View style={{ justifyContent: "center", width: "100%", gap: 10 }}>
              <TextInput
                label="First Name"
                value={value.firstName}
                style={styles.input}
                onChangeText={(text) => setValue({ ...value, firstName: text })}
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
                onChangeText={(text) => setValue({ ...value, lastName: text })}
                autoCapitalize="none"
                outlineStyle={{ borderRadius: 14 }}
                mode="outlined"
                onFocus={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              />
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
                onChangeText={(text) => setValue({ ...value, password: text })}
                secureTextEntry={true}
                autoCapitalize="none"
                outlineStyle={{ borderRadius: 14 }}
                mode="outlined"
                onFocus={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
              />
              <TextInput
                label="Confirm Password"
                style={styles.input}
                onChangeText={(text) =>
                  setValue({ ...value, confirmPassword: text })
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

        <Card style={{ width: "100%", marginTop: 10 }}>
          <Card.Content>
            <View style={{ justifyContent: "center", width: "100%", gap: 10 }}>
              <Text
                style={{
                  fontSize: 14,
                  color: theme.colors.cardHeaderTextColor,
                  textAlign: "center",
                }}
              >
                Terms of Service & Privacy Settings
              </Text>
              <View style={{ height: 100 }}></View>
            </View>
          </Card.Content>
        </Card>
      </View>

      <View
        style={{
          marginTop: 10,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <Button
          mode="contained"
          labelStyle={{
            color: "white",
            fontSize: 18,
            fontWeight: "bold",
            width: "60%",
          }}
          onPress={handleNext}
        >
          Next
        </Button>
      </View>
    </ScrollView>
  );
}
