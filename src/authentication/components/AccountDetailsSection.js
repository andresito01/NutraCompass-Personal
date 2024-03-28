import React, { useState } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import * as Haptics from "expo-haptics";
import signupScreenStyles from "../../screens/styles/signupScreenStyles.js";

import { useThemeContext } from "../../context/ThemeContext.js";

export default function AccountDetailsSection({
  value,
  setValue,
  handleSignUp,
}) {
  const styles = signupScreenStyles();
  const { theme } = useThemeContext();

  const [isSecureTextEntry, setIsSecureTextEntry] = useState(true);

  return (
    <ScrollView style={{ flex: 1, width: "100%" }}>
      <TouchableOpacity
        activeOpacity={1}
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
            color: "black",
            textAlign: "center",
          }}
        >
          Account Details
        </Text>
        <Text
          style={{
            fontSize: 18,
            color: "black",
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
                style={styles.input}
                value={value.firstName}
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
                style={styles.input}
                value={value.lastName}
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
                style={styles.input}
                value={value.email}
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
                value={value.password}
                onChangeText={(text) => setValue({ ...value, password: text })}
                secureTextEntry={isSecureTextEntry}
                autoCapitalize="none"
                outlineStyle={{ borderRadius: 14 }}
                mode="outlined"
                onFocus={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
                right={
                  <TextInput.Icon
                    icon="eye"
                    onPress={() => setIsSecureTextEntry(!isSecureTextEntry)}
                  />
                }
              />
              <TextInput
                label="Confirm Password"
                style={styles.input}
                value={value.confirmPassword}
                onChangeText={(text) =>
                  setValue({ ...value, confirmPassword: text })
                }
                secureTextEntry={isSecureTextEntry}
                autoCapitalize="none"
                outlineStyle={{ borderRadius: 14 }}
                mode="outlined"
                onFocus={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                }}
                right={
                  <TextInput.Icon
                    icon="eye"
                    onPress={() => setIsSecureTextEntry(!isSecureTextEntry)}
                  />
                }
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
                  color: theme.colors.primaryTextColor,
                  textAlign: "center",
                }}
              >
                Terms of Service & Privacy Settings
              </Text>
              <View style={{ height: 100 }}></View>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>

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
            color: "black",
            fontSize: 18,
            fontWeight: "bold",
          }}
          style={{
            backgroundColor: "white",
            borderRadius: 8,
            width: "60%",
          }}
          onPress={handleSignUp}
        >
          Sign Up
        </Button>
      </View>
    </ScrollView>
  );
}
