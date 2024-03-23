import { StyleSheet, StatusBar } from 'react-native';
const statusBarHeight = Platform.OS === 'android' ? StatusBar.currentHeight : 0;

const selectFriendStyles = (theme) => {
    // Use StatusBar.currentHeight to get the height of the status bar
    const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight : 0;

    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },

        searchBarContainer: {
            paddingHorizontal: 10, // Add horizontal padding
        },
        searchBar: {
            fontSize: 16,
            paddingVertical: 8,
            paddingHorizontal: 15,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 20, // Oval shape
            color: theme.colors.text,
            backgroundColor: theme.colors.surface,
            marginHorizontal: 10,
            marginTop: 20,
        },
        createGroupButton: {
            // Style it similar to chat items in ChatScreen
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: theme.colors.border,
        },
        createGroupText: {
            fontSize: 16,
            fontWeight: 'bold',
            color: theme.colors.primary,
        },
        friendItem: {
            // Match the style with chat items in ChatScreen
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: theme.colors.border,
        },
        friendName: {
            fontSize: 16,
            color: theme.colors.text,
        },
        friendItem: {
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#ccc',
        },

        header: {
            height: 50, // Set a fixed height for the header, or you can adjust as needed
            paddingTop: statusBarHeight,
            justifyContent: 'center', // Centers the back button vertically
        },
        backButton: {
            marginLeft: 10, // Add left margin instead of absolute positioning
            marginTop: 15,
            // Remove other positioning styles
        },
        searchBarContainer: {
            paddingHorizontal: 10,
            paddingTop: 20, // You might need to adjust this to add more space below the header
            marginTop: 50, // This should be equal to or more than the header's height to prevent overlap
        },
        // Add any additional styles you need
    });
};

export default selectFriendStyles;