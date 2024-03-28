import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Image,
  SafeAreaView,
} from "react-native";
import { useTheme } from "react-native-paper";
import { friendsList } from "../DummyData/FriendData";
import getTextScreenStyles from "../styles/TextScreenStyles";
import { Ionicons } from "@expo/vector-icons";

const TextScreen = ({ route, navigation }) => {
  const { friendId } = route.params;
  const friendData = friendsList.find((f) => f.id === friendId) || {};
  const [newMessage, setNewMessage] = useState("");

  const theme = useTheme(); // Use theme from react-native-paper
  const styles = getTextScreenStyles(theme); // Get the styles by passing the theme to your styles function

  const sendMessage = () => {
    console.log("Send message:", newMessage);
    setNewMessage("");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={theme.colors.primaryTextColor}
          />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>{friendData.name}</Text>
          <Text style={styles.headerSubtitle}>
            {friendData.status || "Unavailable"}
          </Text>
        </View>
      </View>

      {/* Message List */}
      <FlatList
        data={friendData.messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={item.isMe ? styles.myMessage : styles.theirMessage}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        inverted
      />

      {/* Input Area */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message..."
          placeholderTextColor={theme.colors.text} // Use theme for placeholder color
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons
            name="send"
            size={24}
            color={theme.colors.primary}
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TextScreen;
