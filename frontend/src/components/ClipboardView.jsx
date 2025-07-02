import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { clipboardAPI } from "../services/api";
import NoteCard from "./NoteCard";

const ClipboardView = () => {
  const { clipId } = useParams();
  const [clipboard, setClipboard] = useState(null);
  const [newNote, setNewNote] = useState("");
  const [newNotePassword, setNewNotePassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchClipboard();
  }, [clipId]);

  const fetchClipboard = async () => {
    try {
      setLoading(true);
      const response = await clipboardAPI.getClipboard(clipId);
      setClipboard(response.data);
    } catch (err) {
      setError("Failed to load clipboard");
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    if (!newNotePassword) {
      setError("Password required to add note");
      return;
    }
    try {
      const response = await clipboardAPI.addNote(clipId, newNote, newNotePassword);
      setClipboard((prev) => ({
        ...prev,
        notes: [...prev.notes, response.data],
      }));
      setNewNote("");
      setNewNotePassword("");
      setError("");
    } catch (err) {
      setError("Failed to add note");
    }
  };

  const handleUpdateNote = async (noteId, content, password, setNoteError) => {
    try {
      await clipboardAPI.updateNote(clipId, noteId, content, password);
      setClipboard((prev) => ({
        ...prev,
        notes: prev.notes.map((note) =>
          note.id === noteId
            ? { ...note, content, updatedAt: new Date() }
            : note
        ),
      }));
      if (setNoteError) setNoteError("");
    } catch (err) {
      if (setNoteError) setNoteError("Incorrect password or failed to update note");
      else setError("Failed to update note");
    }
  };

  const handleDeleteNote = async (noteId, password, setNoteError) => {
    try {
      await clipboardAPI.deleteNote(clipId, noteId, password);
      setClipboard((prev) => ({
        ...prev,
        notes: prev.notes.filter((note) => note.id !== noteId),
      }));
      if (setNoteError) setNoteError("");
    } catch (err) {
      if (setNoteError) setNoteError("Incorrect password or failed to delete note");
      else setError("Failed to delete note");
    }
  };

  if (loading) return <div className="loading">Loading clipboard...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="clipboard-container">
      <header className="clipboard-header">
        <h1>📋 Clipboard: {clipId}</h1>
        <p>Share this URL: {window.location.href}</p>
      </header>

      <div className="add-note-section">
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a new note..."
          className="new-note-textarea"
          rows="3"
        />
        <input
          type="password"
          value={newNotePassword}
          onChange={(e) => setNewNotePassword(e.target.value)}
          placeholder="Password for this note"
          className="new-note-password"
        />
        <button onClick={handleAddNote} className="btn-add">
          Add Note
        </button>
      </div>

      <div className="notes-container">
        {clipboard?.notes?.length > 0 ? (
          clipboard.notes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onUpdate={handleUpdateNote}
              onDelete={handleDeleteNote}
            />
          ))
        ) : (
          <div className="empty-state">
            No notes yet. Add your first note above! 📝
          </div>
        )}
      </div>
    </div>
  );
};

export default ClipboardView;
