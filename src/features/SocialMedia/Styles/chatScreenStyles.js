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
            color: theme.colors.cardHeaderTextColor, 
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
            color: theme.colors.cardHeaderTextColor, 
            backgroundColor: theme.colors.background,
            marginHorizontal: 10,
            marginBottom: 10,
            marginTop: 0, // Add some space between the header and search bar
        },
        chatItem: {
            flexDirection: 'row',
            paddingVertical: 10,
            paddingHorizontal: 15,
            borderBottomWidth: StyleSheet.hairlineWidth,
            borderBottomColor: theme.colors.border,
        },
        chatInfo: {
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            width: '100%', // Ensure the container takes the full width
        },
        chatName: {
            fontSize: 16,
            fontWeight: 'bold',
            color: theme.colors.cardHeaderTextColor,
        },
        lastMessage: {
            fontSize: 14,
            color: theme.colors.text,
            // Additional styles if needed
        },
        timestamp: {
            fontSize: 12,
            color: theme.colors.text,
            // Ensure there is space between this and the last message
            paddingLeft: 4,
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