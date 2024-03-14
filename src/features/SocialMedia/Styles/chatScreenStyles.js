import { StyleSheet } from 'react-native';

const chatScreenStyles = (theme) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        header: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 10,
            paddingTop: 25, // Add padding to account for status bar height
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
            padding: 10,
            color: theme.colors.text,
            alignSelf: 'center', // Center title
            textAlign: 'center', // Center text
            flex: 1, // Allow title to take up available space
        },
        plusIcon: {
            position: 'absolute', // Position absolutely within the parent view
            right: 10, // 10 pixels from the right
            top: 30, // Adjusted for status bar height
        },
        searchBar: {
            fontSize: 16,
            paddingVertical: 8,
            paddingHorizontal: 15,
            borderWidth: 1,
            borderColor: theme.colors.border,
            borderRadius: 30, // Increased border radius for an oval shape
            color: theme.colors.text,
            backgroundColor: theme.colors.background,
            marginHorizontal: 10,
            marginBottom: 10,
            marginTop: 0, // Add some space between the header and search bar
        },
        chatItem: {
            flexDirection: 'row',
            paddingVertical: 10,
            paddingHorizontal: 15,
            alignItems: 'center',
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: theme.colors.border,
        },
        
        chatInfo: {
            flex: 1,
            justifyContent: 'center',
            color: theme.colors.text,
        },
        chatName: {
            fontSize: 16,
            fontWeight: 'bold',
            color: theme.colors.text,
        },
        lastMessage: {
            fontSize: 14,
            color: theme.colors.text,
        },
        timestamp: {
            fontSize: 12,
            color: theme.colors.text,
        },
        unreadIndicator: {
            width: 10,
            height: 10,
            borderRadius: 5,
            backgroundColor: theme.colors.primary,
            marginLeft: 10,
        },
        // Additional styles can be added here
    });
};

export default chatScreenStyles;