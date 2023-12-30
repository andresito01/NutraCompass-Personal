import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  SafeAreaView,
  Modal,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import {
  Button as PaperButton,
  useTheme,
  ToggleButton,
  Portal,
  Dialog,
} from "react-native-paper";
import Feather from "react-native-vector-icons/Feather";
import noteEditorModalStyles from "./styles/noteEditorModalStyles.js";
import { useThemeContext } from "../../../context/ThemeContext.js";

const ToggleButtonRow = ({ textStyle, handleTextStyleChange }) => {
  const { theme } = useThemeContext();
  const paperTheme = useTheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flexDirection: "row",
        gap: 5,
        backgroundColor: theme.colors.screenBackground,
        padding: 10,
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <ToggleButton.Row
        onValueChange={(value) => handleTextStyleChange("fontWeight", value)}
        value={textStyle.fontWeight}
      >
        <ToggleButton icon="format-bold" value="bold" />
      </ToggleButton.Row>

      <ToggleButton.Row
        onValueChange={(value) => handleTextStyleChange("fontStyle", value)}
        value={textStyle.fontStyle}
      >
        <ToggleButton icon="format-italic" value="italic" />
      </ToggleButton.Row>

      <ToggleButton.Row
        onValueChange={(value) =>
          handleTextStyleChange("textDecorationLine", value)
        }
        value={textStyle.textDecorationLine}
      >
        <ToggleButton icon="format-underline" value="underline" />
      </ToggleButton.Row>
    </KeyboardAvoidingView>
  );
};

const NoteEditorModal = ({
  isVisible,
  onDismiss,
  note,
  updateNoteTitle,
  updateNoteContent,
  deleteNote,
}) => {
  const styles = noteEditorModalStyles();
  const { theme } = useThemeContext();
  const paperTheme = useTheme();
  const [isTextInputActive, setIsTextInputActive] = useState(false);
  const [textStyle, setTextStyle] = useState({});
  const [editableTitle, setEditableTitle] = useState(note?.title);
  const [editableContent, setEditableContent] = useState(note?.content);
  const [showDeleteNoteDialog, setShowDeleteNoteDialog] = useState(false);

  // Get the screen dimensions
  const { height } = Dimensions.get("window");
  // Calculate the midpoint of the screen
  const screenMidpoint = height / 2;
  // Calculate the bottom position for the Dialog
  const dialogBottom = screenMidpoint - 75; // Adjust this value as needed

  console.log("Editor Selected Note: \n", editableTitle, editableContent);

  useEffect(() => {
    // Update the local state when the note prop changes
    setEditableTitle(note?.title || "");
    setEditableContent(note?.content || "");
  }, [note]);

  const handleTextInputFocus = () => {
    setIsTextInputActive(true);
  };

  const handleTextInputBlur = () => {
    setIsTextInputActive(false);
  };

  const handleDonePress = () => {
    // Instead of onSave, just blur the TextInput
    Keyboard.dismiss();
  };

  const handleTextStyleChange = (property, value) => {
    setTextStyle({ ...textStyle, [property]: value });
  };

  const handleTitleChange = (newTitle) => {
    setEditableTitle(newTitle);
    updateNoteTitle(newTitle);
  };

  const handleContentChange = (newContent) => {
    setEditableContent(newContent);
    updateNoteContent(newContent);
  };

  const handleCloseNoteEditorModal = () => {
    if (
      editableTitle === "" ||
      editableTitle === undefined ||
      editableTitle === null
    ) {
      handleTitleChange("Untitled");
    }

    onDismiss();
  };

  const deleteNoteThroughNoteEditor = () => {
    setShowDeleteNoteDialog(true);
  };

  const handleDeleteNoteConfirm = () => {
    deleteNote();
    setShowDeleteNoteDialog(false);
    handleCloseNoteEditorModal();
  };

  const handleDeleteNoteCancel = () => {
    setShowDeleteNoteDialog(false);
  };

  const handleOverlayPress = () => {
    if (showDeleteNoteDialog) {
      setShowDeleteNoteDialog(false);
    }
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isVisible}
      onRequestClose={handleCloseNoteEditorModal}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    gap: 5,
                  }}
                  onPress={handleCloseNoteEditorModal}
                >
                  <Feather
                    name="arrow-left"
                    size={24}
                    color={theme.colors.cardHeaderTextColor}
                  />
                  <Text
                    style={{
                      fontSize: 18,
                      color: theme.colors.cardHeaderTextColor,
                    }}
                  >
                    Notes
                  </Text>
                </TouchableOpacity>
                <TextInput
                  style={{
                    fontSize: 20,
                    color: theme.colors.cardHeaderTextColor,
                    backgroundColor: theme.colors.sectionBackgroundColor,
                    padding: 10,
                  }}
                  value={editableTitle}
                  onChangeText={handleTitleChange}
                  onFocus={handleTextInputFocus}
                  onBlur={handleTextInputBlur}
                  placeholder="Title Name"
                  placeholderTextColor={"gray"}
                />

                <PaperButton
                  onPress={handleDonePress}
                  mode="elevated"
                  style={{
                    ...styles.headerButton,
                    opacity: isTextInputActive ? 1 : 0,
                  }}
                  disabled={!isTextInputActive}
                >
                  Done
                </PaperButton>
              </View>

              <TextInput
                inputMode="text"
                style={{
                  flex: 1,
                  minHeight: "73%",
                  color: theme.colors.cardHeaderTextColor,
                  backgroundColor: theme.colors.sectionBackgroundColor,
                  marginTop: 10,
                  padding: 10,
                  borderWidth: 1,
                  borderColor: theme.colors.sectionBorderColor,
                  ...textStyle,
                }}
                activeUnderlineColor="transparent"
                underlineColor="transparent"
                placeholder="Write your notes here..."
                placeholderTextColor="#888"
                value={editableContent}
                onFocus={handleTextInputFocus}
                onBlur={handleTextInputBlur}
                onChangeText={handleContentChange}
                multiline={true}
                editable={true}
              />

              <PaperButton
                onPress={deleteNoteThroughNoteEditor}
                mode="elevated"
                style={{
                  position: "absolute",
                  right: 10,
                  bottom: 10,
                  alignSelf: "flex-end",
                }}
              >
                Delete
              </PaperButton>

              {showDeleteNoteDialog && (
                <TouchableWithoutFeedback onPress={handleOverlayPress}>
                  <View
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: 0,
                      right: 0,
                      backgroundColor: "transparent",
                    }}
                  />
                </TouchableWithoutFeedback>
              )}

              <Portal.Host>
                <Dialog
                  style={{
                    position: "absolute",
                    alignSelf: "center",
                    bottom: dialogBottom,
                  }}
                  visible={showDeleteNoteDialog}
                  onDismiss={handleDeleteNoteCancel}
                >
                  <Dialog.Title>Delete note</Dialog.Title>
                  <Dialog.Content>
                    <Text>Are you sure you want to delete this note page?</Text>
                  </Dialog.Content>
                  <Dialog.Actions>
                    <PaperButton onPress={handleDeleteNoteCancel}>
                      Cancel
                    </PaperButton>
                    <PaperButton onPress={handleDeleteNoteConfirm}>
                      Delete
                    </PaperButton>
                  </Dialog.Actions>
                </Dialog>
              </Portal.Host>

              {/* Editor Toggle Button Options */}
              {isTextInputActive && (
                <ToggleButtonRow
                  textStyle={textStyle}
                  handleTextStyleChange={handleTextStyleChange}
                />
              )}
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </Modal>
  );
};

export default NoteEditorModal;
