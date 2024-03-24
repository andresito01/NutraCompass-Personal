import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useTheme } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import chatScreenStyles from "../Styles/chatScreenStyles";
import { friendsList } from "../DummyData/FriendData";
import SelectFriend from "../Screens/SelectFriend";

// Assuming you are passing navigation prop to ChatScreen component
export default function ChatScreen({ navigation }) {
    const theme = useTheme();
    const styles = chatScreenStyles(theme);
    const [searchQuery, setSearchQuery] = useState('');

    const handlePressFriend = (friend) => {
        navigation.navigate('TextScreen', { friendId: friend.id });
    };

    // Function to handle search input
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    // Function to handle new chat creation
    const handleNewChat = () => {
        navigation.navigate('SelectFriend'); // Navigate to SelectFriend screen
    };

    const getLastMessageDetails = (messages) => {
        // Assuming the most recent message is the last in the array
        const lastMessage = messages[messages.length - 1];
        return lastMessage ? { text: lastMessage.text, timestamp: lastMessage.timestamp } : {};
    };



    // Render each chat item
    const renderChatItem = ({ item }) => {
        // Extract the last message details
        const { text: lastMessage, timestamp } = getLastMessageDetails(item.messages);

        return (
            <TouchableOpacity
                style={styles.chatItem}
                onPress={() => handlePressFriend(item)}
            >
                <View style={styles.chatInfo}>
                    <Text style={styles.chatName}>{item.name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <Text style={styles.lastMessage}>{lastMessage}</Text>
                        <Text style={styles.timestamp}>{timestamp}</Text>
                    </View> 
                </View>
                {item.unread && <View style={styles.unreadIndicator} />}
            </TouchableOpacity>
        );
    };

    // Filtered chats based on search query
    const filteredFriends = friendsList.filter(friend =>
        friend.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Gym Community Chat</Text>
                <TouchableOpacity style={styles.plusIcon} onPress={handleNewChat}>
                    <MaterialCommunityIcons name="plus-circle-outline" size={24} color={theme.colors.text} />
                </TouchableOpacity>
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