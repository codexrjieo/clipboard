const express = require("express");
const router = express.Router();
const Clipboard = require("../models/Clipboard");

// Get or create clipboard
router.get("/:clipId", async (req, res) => {
  try {
    const { clipId } = req.params;

    let clipboard = await Clipboard.findOne({ clipId });

    if (!clipboard) {
      clipboard = new Clipboard({
        clipId,
        notes: [],
      });
      await clipboard.save();
    }

    res.json(clipboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add note
router.post("/:clipId/notes", async (req, res) => {
  try {
    const { clipId } = req.params;
    const { content, password } = req.body;
    if (!password) return res.status(400).json({ error: "Password required" });
    const clipboard = await Clipboard.findOne({ clipId });
    if (!clipboard) {
      return res.status(404).json({ error: "Clipboard not found" });
    }
    const newNote = {
      id: Date.now().toString(),
      content,
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    clipboard.notes.push(newNote);
    clipboard.updatedAt = new Date();
    await clipboard.save();
    res.json(newNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update note
router.put("/:clipId/notes/:noteId", async (req, res) => {
  try {
    const { clipId, noteId } = req.params;
    const { content, password } = req.body;
    if (!password) return res.status(400).json({ error: "Password required" });
    const clipboard = await Clipboard.findOne({ clipId });
    if (!clipboard) {
      return res.status(404).json({ error: "Clipboard not found" });
    }
    const note = clipboard.notes.find((n) => n.id === noteId);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    if (note.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    note.content = content;
    note.updatedAt = new Date();
    clipboard.updatedAt = new Date();
    await clipboard.save();
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete note
router.delete("/:clipId/notes/:noteId", async (req, res) => {
  try {
    const { clipId, noteId } = req.params;
    const { password } = req.body;
    if (!password) return res.status(400).json({ error: "Password required" });
    const clipboard = await Clipboard.findOne({ clipId });
    if (!clipboard) {
      return res.status(404).json({ error: "Clipboard not found" });
    }
    const note = clipboard.notes.find((n) => n.id === noteId);
    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }
    if (note.password !== password) {
      return res.status(401).json({ error: "Incorrect password" });
    }
    clipboard.notes = clipboard.notes.filter((n) => n.id !== noteId);
    clipboard.updatedAt = new Date();
    await clipboard.save();
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
