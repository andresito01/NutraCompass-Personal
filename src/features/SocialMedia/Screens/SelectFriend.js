import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import { useTheme } from "react-native-paper";
import selectFriendStyles from "../styles/selectFriendStyles"; // Ensure correct path
import { Ionicons } from "@expo/vector-icons";

const allFriends = [
  { id: "1", name: "Friend One" },
  { id: "2", name: "Friend Two" },
];

const SelectFriend = ({ navigation }) => {
  const theme = useTheme(); // Get the theme
  const styles = selectFriendStyles(theme); // Pass theme to the function
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredFriends = allFriends.filter((friend) =>
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectFriend = (friendId) => {
    // Implementation for selecting a friend
  };

  const handleCreateGroup = () => {
    // Implementation for creating a group
  };

  const renderFriendItem = ({ item }) => (
    <TouchableOpacity
      style={styles.friendItem}
      onPress={() => handleSelectFriend(item.id)}
    >
      <Text style={styles.friendName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.headerSection}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={theme.colors.text} />
        </TouchableOpacity>
      </View>

      {/* Search Bar Section */}
      <View style={styles.searchBarSection}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search friends"
          placeholderTextColor={theme.colors.text}
          onChangeText={handleSearch}
          value={searchQuery}
        />
      </View>

      <TouchableOpacity
        style={styles.createGroupButton}
        onPress={handleCreateGroup}
      >
        <Text style={styles.createGroupText}>Or Create a New Group</Text>
      </TouchableOpacity>
      <FlatList
        data={filteredFriends}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderFriendItem}
      />
    </View>
  );
};

export default SelectFriend;
