import axios from "axios";

const API_BASE = "/api";

export const clipboardAPI = {
  getClipboard: (clipId) => axios.get(`${API_BASE}/clipboard/${clipId}`),

  addNote: (clipId, content, password) =>
    axios.post(`${API_BASE}/clipboard/${clipId}/notes`, { content, password }),

  updateNote: (clipId, noteId, content, password) =>
    axios.put(`${API_BASE}/clipboard/${clipId}/notes/${noteId}`, { content, password }),

  deleteNote: (clipId, noteId, password) =>
    axios.delete(`${API_BASE}/clipboard/${clipId}/notes/${noteId}`, { data: { password } }),
};
