import React, { useState } from "react";

const NoteCard = ({ note, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(note.content);
  const [password, setPassword] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!password) {
      setError("Password required");
      return;
    }
    setError("");
    await onUpdate(note.id, content, password, setError);
    setIsEditing(false);
    setPassword("");
  };

  const handleCancel = () => {
    setContent(note.content);
    setIsEditing(false);
    setPassword("");
    setError("");
  };

  const handleDelete = async () => {
    if (!deletePassword) {
      setError("Password required");
      return;
    }
    setError("");
    await onDelete(note.id, deletePassword, setError);
    setShowDelete(false);
    setDeletePassword("");
  };

  return (
    <div className="note-card">
      {isEditing ? (
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="note-textarea"
            rows="4"
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="note-password"
          />
          <div className="note-actions">
            <button onClick={handleSave} className="btn-save">
              Save
            </button>
            <button onClick={handleCancel} className="btn-cancel">
              Cancel
            </button>
          </div>
          {error && <div className="note-error">{error}</div>}
        </div>
      ) : (
        <div>
          <div className="note-content">{note.content}</div>
          <div className="note-actions">
            <button onClick={() => setIsEditing(true)} className="btn-edit">
              Edit
            </button>
            <button onClick={() => setShowDelete(true)} className="btn-delete">
              Delete
            </button>
          </div>
          <div className="note-date">
            {new Date(note.updatedAt).toLocaleString()}
          </div>
        </div>
      )}
      {showDelete && (
        <div className="note-delete-modal">
          <input
            type="password"
            placeholder="Enter password to delete"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            className="note-password"
          />
          <div className="note-actions">
            <button onClick={handleDelete} className="btn-delete-confirm">
              Confirm Delete
            </button>
            <button
              onClick={() => {
                setShowDelete(false);
                setDeletePassword("");
                setError("");
              }}
              className="btn-cancel"
            >
              Cancel
            </button>
          </div>
          {error && <div className="note-error">{error}</div>}
        </div>
      )}
    </div>
  );
};

export default NoteCard;
