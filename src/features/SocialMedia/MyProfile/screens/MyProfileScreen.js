import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useThemeContext } from "../../../../context/ThemeContext.js";
import OpenDrawerToggle from "../../components/OpenDrawerToggle.js";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Import the Icon component
import LinearGradientCard from "../../../../components/LinearGradientCard.js";

export default function MyProfileScreen() {
  const { theme } = useThemeContext();
  // Move the styles inside the component to access theme
  const styles = getStyles(theme);
  // Placeholder data for profile information and posts
  const [profile, setProfile] = useState({
    username: "BigBuffBlackGuy",
    bio: "Digital Explorer 📷 | Travelling the world | 📍Current Location: Earth",
    followers: "1,234",
    following: "567",
    posts: [
      { imageUrl: "https://via.placeholder.com/150" },
      { imageUrl: "https://via.placeholder.com/150" },
      // Add more posts as needed
    ],
  });

  useEffect(() => {
    // Fetch user profile data from an API or local storage
    // This is a placeholder for fetching data
  }, []);

  return (
    <ScrollView style={{ backgroundColor: theme.colors.screenBackground }}>
      <View style={styles.container}>
        <ImageBackground
          source={{
            uri: "https://w0.peakpx.com/wallpaper/809/335/HD-wallpaper-sci-fi-cyberpunk-car-city-futuristic-thumbnail.jpg",
          }}
          resizeMode="cover"
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <OpenDrawerToggle />
            <TouchableOpacity
              onPress={() => console.log("Edit profile pressed")}
            >
              <Icon
                name="pencil"
                size={24}
                color={theme.colors.cardHeaderTextColor}
              />
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View style={styles.profileInfoContainer}>
          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Image
                style={styles.profilePic}
                source={require("../../../../../assets/ProfilePicUpdated.jpeg")}
                alt="Profile Image"
              />
            </View>

            <View style={styles.statsContainer}>
              <View style={{ gap: 5, alignItems: "center" }}>
                <Text style={styles.stat}>{profile.followers}</Text>
                <Text style={styles.stat}>Followers</Text>
              </View>

              <View style={{ gap: 5, alignItems: "center" }}>
                <Text style={styles.stat}>{profile.following}</Text>
                <Text style={styles.stat}>Following</Text>
              </View>
            </View>
          </View>

          <View style={{ gap: 5, paddingHorizontal: 12 }}>
            <Text style={styles.fullName}>Justin Mickle</Text>
            <Text style={styles.username}>@{profile.username}</Text>
          </View>
          <View style={{ paddingVertical: 10, paddingHorizontal: 12 }}>
            <Text style={styles.bio}>{profile.bio}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View
            style={{ flexDirection: "row", gap: 10, paddingHorizontal: 12 }}
          >
            <LinearGradientCard
              style={{
                borderRadius: 8,
                flex: 1,
              }}
            >
              <TouchableOpacity style={styles.button}>
                <Icon
                  name="account-plus"
                  size={24}
                  color={theme.colors.cardHeaderTextColor}
                />
                <Text style={styles.buttonText}>Add Friend</Text>
              </TouchableOpacity>
            </LinearGradientCard>

            <LinearGradientCard
              style={{
                borderRadius: 8,
                flex: 1,
              }}
            >
              <TouchableOpacity style={styles.button}>
                <Icon
                  name="scan-helper"
                  size={24}
                  color={theme.colors.cardHeaderTextColor}
                />
                <Text style={styles.buttonText}>Share Me</Text>
              </TouchableOpacity>
            </LinearGradientCard>
          </View>

          <LinearGradientCard
            style={{
              alignItems: "center",
              padding: 2,
              marginHorizontal: 12,
            }}
          >
            <View
              style={{
                width: "100%",
                alignItems: "center",
                backgroundColor: theme.colors.screenBackground,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  color: theme.colors.primary,
                  padding: 8,
                }}
              >
                Albums
              </Text>
            </View>
          </LinearGradientCard>
        </View>

        <View style={styles.postsContainer}>
          {profile.posts.map((post, index) => (
            <Image
              key={index}
              style={styles.postImage}
              source={{ uri: post.imageUrl }}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

// Convert the StyleSheet.create to a function that returns the styles
const getStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      paddingTop: "5%",
    },
    header: {
      width: "100%",
      height: 150,
    },
    headerContent: {
      flex: 1,
      flexDirection: "row",
      alignItems: "flex-start",
      padding: 10,
      justifyContent: "space-between",
    },
    profileInfoContainer: { alignItems: "stretch" },
    profilePic: {
      width: 120,
      height: 120,
      borderRadius: 60,
      borderWidth: 2,
      //borderColor: theme.colors.primary,
      position: "absolute",
      left: 20,
      top: -60,
    },
    fullName: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors.cardHeaderTextColor,
    },
    username: {
      fontSize: 14,
      fontWeight: "bold",
      color: theme.colors.primary,
    },
    bio: {
      textAlign: "left",
      color: theme.colors.cardHeaderTextColor,
    },
    statsContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: "100%",
      padding: 12,
    },
    stat: {
      alignItems: "center",
      marginHorizontal: 10,
      fontSize: 16,
      color: theme.colors.cardHeaderTextColor,
    },
    postsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      marginTop: 20,
    },
    postImage: {
      width: 120,
      height: 120,
      margin: 2,
    },
    buttonContainer: {
      justifyContent: "center",
      alignItems: "stretch",
      gap: 10,
      width: "100%",
      paddingVertical: 10,
    },
    button: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 8,
      paddingHorizontal: 12,
      gap: 5,
    },
    buttonText: {
      marginLeft: 5,
      color: theme.colors.cardHeaderTextColor, // Use text color from your theme
      fontSize: 16,
    },
  });
