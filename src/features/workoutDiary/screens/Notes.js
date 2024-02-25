import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import {
  Button as PaperButton,
  useTheme,
  Card,
  Portal,
  Dialog,
} from "react-native-paper";
import * as Haptics from "expo-haptics";
import Feather from "react-native-vector-icons/Feather";
import notesScreenStyles from "./styles/notesScreenStyles.js";
import NoteEditorModal from "../components/NoteEditorModal.js";
import { useThemeContext } from "../../../context/ThemeContext.js";
const NotesScreen = () => {
  const styles = notesScreenStyles();
  const { theme } = useThemeContext();
  const [isEditing, setIsEditing] = useState(false);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(-1);
  const [notePages, setNotePages] = useState([]);
  const [showDeleteNoteDialog, setShowDeleteNoteDialog] = useState(false);

  const toggleNoteEditor = (index) => {
    setIsEditing(!isEditing);
    setSelectedNoteIndex(index);
  };

  const createNewNote = () => {
    const newNote = { title: "Untitled", content: "" };
    setNotePages([...notePages, newNote]);
    toggleNoteEditor(notePages.length); // Pass the index of the new note
  };

  const deleteNoteThroughNoteList = (noteToDelete) => {
    if (noteToDelete) {
      setSelectedNoteIndex(notePages.indexOf(noteToDelete));
      setShowDeleteNoteDialog(true);
    }
  };

  const deleteNote = () => {
    if (selectedNoteIndex !== -1) {
      const updatedNotePages = notePages.filter(
        (_, index) => index !== selectedNoteIndex
      );
      setNotePages(updatedNotePages);
    }
  };

  const handleDeleteNoteConfirm = () => {
    deleteNote();
    setShowDeleteNoteDialog(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const handleDeleteNoteCancel = () => {
    setShowDeleteNoteDialog(false);
  };

  const updateNoteTitle = (newTitle) => {
    if (selectedNoteIndex !== -1) {
      const updatedNotePages = [...notePages];
      updatedNotePages[selectedNoteIndex] = {
        ...updatedNotePages[selectedNoteIndex],
        title: newTitle,
      };
      setNotePages(updatedNotePages);
    }
  };

  const updateNoteContent = (newContent) => {
    if (selectedNoteIndex !== -1) {
      const updatedNotePages = [...notePages];
      updatedNotePages[selectedNoteIndex] = {
        ...updatedNotePages[selectedNoteIndex],
        content: newContent,
      };
      setNotePages(updatedNotePages);
    }
  };

  return (
    <View style={styles.container}>
      <PaperButton mode="text" style={{ padding: 10 }} onPress={createNewNote}>
        Create New Note
      </PaperButton>

      {notePages.map((note, index) => (
        <Card key={index} style={styles.noteCard}>
          <Card.Title title={note.title} />
          <Card.Content>
            <Text style={{ color: theme.colors.cardHeaderTextColor }}>
              {note.content}
            </Text>
          </Card.Content>
          <Card.Actions>
            <PaperButton onPress={() => toggleNoteEditor(index)}>
              Edit
            </PaperButton>
            <PaperButton onPress={() => deleteNoteThroughNoteList(note)}>
              Delete
            </PaperButton>
          </Card.Actions>
        </Card>
      ))}

      <NoteEditorModal
        isVisible={isEditing}
        onDismiss={() => toggleNoteEditor(-1)}
        note={notePages[selectedNoteIndex] || {}}
        updateNoteTitle={updateNoteTitle}
        updateNoteContent={updateNoteContent}
        deleteNote={deleteNote}
      />

      <Portal>
        <Dialog
          visible={showDeleteNoteDialog}
          onDismiss={handleDeleteNoteCancel}
        >
          <Dialog.Title>Delete note</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to delete this note page?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={handleDeleteNoteCancel}>Cancel</PaperButton>
            <PaperButton onPress={handleDeleteNoteConfirm}>Delete</PaperButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default NotesScreen;
