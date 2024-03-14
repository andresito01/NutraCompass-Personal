import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, TextInput } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import chatScreenStyles from "../Styles/chatScreenStyles";
import { friendsList } from "../DummyData/FriendData";

export default function ChatScreen() {
    const theme = useTheme();
    const styles = chatScreenStyles(theme);
    const [searchQuery, setSearchQuery] = useState('');

    // Function to handle search input
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    // Render each chat item
    const renderChatItem = ({ item }) => (
        <TouchableOpacity
            style={styles.chatItem}
        >
            <View style={styles.chatInfo}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.lastMessage}>{item.lastMessage}</Text>
            </View>
            <Text style={styles.timestamp}>{item.timestamp}</Text>
            {item.unread && <View style={styles.unreadIndicator} />}
        </TouchableOpacity>
    );

    // Filtered chats based on search query
    const filteredFriends = friendsList.filter(friend =>
        friend.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Gym Community Chat</Text>
            </View>
            <TextInput
                style={styles.searchBar}
                placeholder="Search"
                placeholderTextColor={theme.colors.text}
                onChangeText={handleSearch}
                value={searchQuery}
            />
            <FlatList
                data={filteredFriends}
                renderItem={renderChatItem}
                keyExtractor={item => item.id}
            />
        </View>
    );
}