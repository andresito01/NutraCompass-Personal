import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  Alert,
  Linking,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useUserSettings } from "../../UserSettings/context/UserSettingsContext.js";
import { useThemeContext } from "../../../context/ThemeContext.js";

export default function ProfilePicture({ size }) {
  const { uploadProfilePicture, getUserProfile } = useUserSettings();
  const { theme } = useThemeContext();

  const userProfile = getUserProfile();
  const profilePictureUrl = userProfile.pictureUrl;

  const handlePickImage = async () => {
    // Request permission to access the media library
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Required",
        "You've refused to allow this app to access your photos. Please enable access in your settings.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Settings", onPress: () => Linking.openSettings() },
        ]
      );
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.canceled) {
      console.log("User canceled image picker");
      return;
    }

    if (pickerResult.assets && pickerResult.assets.length > 0) {
      const image = pickerResult.assets[0];
      try {
        const uploadUrl = await uploadProfilePicture({
          uri: image.uri,
          type: image.type,
          name: image.fileName || "profile-pic.jpg", // Default file name if fileName is not available
        });
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        Alert.alert("Upload failed", "Unable to upload profile picture.");
      }
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          height: size,
          width: size,
          borderRadius: size / 2,
          borderWidth: 1,
          borderColor: theme.colors.primary,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#cccccc",
        }}
        onPress={handlePickImage}
      >
        {/* Image component with source set to profileImageUrl */}
        {profilePictureUrl ? (
          <Image
            source={{ uri: profilePictureUrl }}
            style={{ width: 150, height: 150, borderRadius: 75 }}
          />
        ) : (
          // Default or placeholder image if no profile picture URL is available
          <View
            style={{
              width: 150,
              height: 150,
              borderRadius: 75,
              backgroundColor: "#cccccc",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>Upload Photo</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
