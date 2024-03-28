import { StyleSheet } from "react-native";

const getTextScreenStyles = (theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingTop: 12,
      paddingHorizontal: 12,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
    },
    backButton: {
      marginRight: 16,
    },
    headerContent: {
      justifyContent: "center",
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: theme.colors.primaryTextColor,
    },
    headerSubtitle: {
      fontSize: 14,
      color: theme.colors.subTextColor,
      paddingTop: 4,
    },
    inputArea: {
      flexDirection: "row",
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderTopWidth: 1,
      borderTopColor: theme.colors.border,
      backgroundColor: theme.colors.border,
      alignItems: "center", // Center the input and button vertically
      justifyContent: "space-between", // Add space between the input and the send button
      marginBottom: Platform.select({ ios: 80, android: 85 }), // Adjust for platform differences
    },
    input: {
      flex: 1,
      height: 40,
      borderRadius: 20,
      paddingHorizontal: 10,
      marginRight: 10,
      backgroundColor: "#f0f0f0",
      color: theme.colors.text,
    },
    sendIcon: {
      // Add styles for send icon if needed
    },
    myMessage: {
      marginVertical: 5,
      marginRight: 10,
      marginLeft: "20%",
      marginBottom: 20,
      marginTop: 10,
      backgroundColor: theme.colors.secondary, // Change to a visible color
      borderRadius: 20,
      padding: 10,
      paddingBottom: 10,
      alignSelf: "flex-end",
      maxWidth: "80%", // Add this line to ensure the bubble doesn't stretch across the entire width
    },
    theirMessage: {
      marginVertical: 5,
      marginLeft: 10,
      marginRight: "20%",
      marginBottom: 20,
      marginTop: 10,
      backgroundColor: theme.colors.primary, // Change to a visible color
      borderRadius: 20,
      padding: 10,
      alignSelf: "flex-start",
      maxWidth: "80%", // Add this line to ensure the bubble doesn't stretch across the entire width
    },
    messageText: {
      fontSize: 16,
      color: theme.colors.text,
    },
    timestamp: {
      alignSelf: "flex-end",
      fontSize: 12,
      color: theme.colors.subtext,
      paddingHorizontal: 4,
      paddingTop: 2,
    },

    // Additional styles if needed
  });
};

export default getTextScreenStyles;
