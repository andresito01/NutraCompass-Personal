import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  FlatList, // Added to render the albums and their content
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useThemeContext } from "../../../../context/ThemeContext.js";
import OpenDrawerToggle from "../../components/OpenDrawerToggle.js";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import LinearGradientCard from "../../../../components/LinearGradientCard.js";
import { useUserSettings } from "../../../UserSettings/context/UserSettingsContext.js";

export default function MyProfileScreen() {
  const { theme } = useThemeContext();
  // Move the styles inside the component to access theme
  const styles = getStyles(theme);

  const { getUserProfile } = useUserSettings();
  const userProfile = getUserProfile();
  const profilePictureUrl = userProfile.pictureUrl;

  const navigation = useNavigation();

  // Updated state structure to include albums instead of posts
  const [profile, setProfile] = useState({
    username: "BigBuffBlackGuy",
    bio: "Digital Explorer 📷 | Travelling the world | 📍Current Location: Earth",
    followers: "1,234",
    following: "567",
    albums: [
      {
        name: "Reels",
        content: [
          {
            type: "image",
            url: "https://cimg0.ibsrv.net/cimg/www.fitday.com/693x350_85-1/592/fried-20food_000035757888_Small-108592.jpg",
            description: "Fried Chicken",
          },
          {
            type: "image",
            url: "https://cimg0.ibsrv.net/cimg/www.fitday.com/693x350_85-1/592/fried-20food_000035757888_Small-108592.jpg",
            description: "Fried Chicken",
          },
          {
            type: "image",
            url: "https://cimg0.ibsrv.net/cimg/www.fitday.com/693x350_85-1/592/fried-20food_000035757888_Small-108592.jpg",
            description: "Fried Chicken",
          },
          {
            type: "image",
            url: "https://cimg0.ibsrv.net/cimg/www.fitday.com/693x350_85-1/592/fried-20food_000035757888_Small-108592.jpg",
            description: "Fried Chicken",
          },
          // Add more posts as needed
        ],
      },
      {
        name: "Physique Updates",
        content: [
          {
            type: "image",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTizIy7CgapCOBKYF9M2K5MGU0Jh5h-VDwbRA&usqp=CAU",
          },
          {
            type: "image",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTizIy7CgapCOBKYF9M2K5MGU0Jh5h-VDwbRA&usqp=CAU",
          },

          {
            type: "image",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTizIy7CgapCOBKYF9M2K5MGU0Jh5h-VDwbRA&usqp=CAU",
          },
          {
            type: "image",
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTizIy7CgapCOBKYF9M2K5MGU0Jh5h-VDwbRA&usqp=CAU",
          },

          // Add more posts as needed
        ],
      },
      {
        name: "Food Recipes",
        content: [
          {
            type: "image",
            url: "https://cimg0.ibsrv.net/cimg/www.fitday.com/693x350_85-1/592/fried-20food_000035757888_Small-108592.jpg",
            description: "Fried Chicken",
          },
          {
            type: "image",
            url: "https://cimg0.ibsrv.net/cimg/www.fitday.com/693x350_85-1/592/fried-20food_000035757888_Small-108592.jpg",
            description: "Fried Chicken",
          },
          {
            type: "image",
            url: "https://cimg0.ibsrv.net/cimg/www.fitday.com/693x350_85-1/592/fried-20food_000035757888_Small-108592.jpg",
            description: "Fried Chicken",
          },
          {
            type: "image",
            url: "https://cimg0.ibsrv.net/cimg/www.fitday.com/693x350_85-1/592/fried-20food_000035757888_Small-108592.jpg",
            description: "Fried Chicken",
          },
          // Add more posts as needed
        ],
      },
      {
        name: "Workout Plans",
        content: [
          {
            type: "image",
            url: "https://cimg0.ibsrv.net/cimg/www.fitday.com/693x350_85-1/592/fried-20food_000035757888_Small-108592.jpg",
            description: "Fried Chicken",
          },
          {
            type: "image",
            url: "https://cimg0.ibsrv.net/cimg/www.fitday.com/693x350_85-1/592/fried-20food_000035757888_Small-108592.jpg",
            description: "Fried Chicken",
          },
          {
            type: "image",
            url: "https://cimg0.ibsrv.net/cimg/www.fitday.com/693x350_85-1/592/fried-20food_000035757888_Small-108592.jpg",
            description: "Fried Chicken",
          },
          {
            type: "image",
            url: "https://cimg0.ibsrv.net/cimg/www.fitday.com/693x350_85-1/592/fried-20food_000035757888_Small-108592.jpg",
            description: "Fried Chicken",
          },
          // Add more posts as needed
        ],
      },
      // Add more albums as needed
    ],
  });

  useEffect(() => {
    // Fetch user profile data from an API or local storage
    // This is a placeholder for fetching data
  }, []);

  const ProfileHeaderComponent = () => (
    <View>
      <ImageBackground
        source={{
          uri: "https://w0.peakpx.com/wallpaper/809/335/HD-wallpaper-sci-fi-cyberpunk-car-city-futuristic-thumbnail.jpg",
        }}
        resizeMode="cover"
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <OpenDrawerToggle icon={"menu"} />
          <TouchableOpacity onPress={() => console.log("Edit profile pressed")}>
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
            {/* Image component with source set to profileImageUrl */}
            {profilePictureUrl ? (
              <Image
                source={{ uri: profilePictureUrl }}
                style={styles.profilePic}
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
              ></View>
            )}
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
        <View style={{ flexDirection: "row", gap: 10, paddingHorizontal: 12 }}>
          <LinearGradientCard
            style={{
              borderRadius: 8,
              flex: 1,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("SelectFriend")}
              style={styles.button}
            >
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
    </View>
  );

  const renderAlbumContent = (content) => {
    // Render up to 3 items
    return content
      .slice(0, 3)
      .map((item, index) => (
        <Image
          key={index}
          style={styles.postImage}
          source={{ uri: item.url }}
        />
      ));
  };

  const renderAlbum = ({ item }) => (
    <View style={styles.albumContainer}>
      <View style={styles.albumHeader}>
        <Text style={styles.albumName}>{item.name}</Text>
        <TouchableOpacity
          // onPress={() => {} } // Placeholder for future implementation
          style={styles.expandIcon}
        >
          <Icon name="chevron-down" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.albumContent}>
        {renderAlbumContent(item.content)}
      </View>
    </View>
  );

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        paddingTop: "5%",
        backgroundColor: theme.colors.screenBackground,
      }}
    >
      <FlatList
        ListHeaderComponent={ProfileHeaderComponent}
        data={profile.albums}
        renderItem={renderAlbum}
        keyExtractor={(item, index) => index.toString()}
        style={{ backgroundColor: theme.colors.screenBackground }}
      />
    </View>
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
      height: 120,
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
      width: 110,
      height: 110,
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
      borderWidth: 2,
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
    albumContainer: {
      marginVertical: 10,
      paddingHorizontal: 10,
    },
    albumHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    albumName: {
      fontSize: 18,
      color: theme.colors.primary,
    },
    expandIcon: {
      // Adjust as needed
    },
    albumContent: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
  });
