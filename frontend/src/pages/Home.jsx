import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [clipId, setClipId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (clipId.trim()) {
      navigate(`/${clipId.trim()}`);
    }
  };

  const generateRandomId = () => {
    const randomId = Math.random().toString(36).substring(2, 8);
    setClipId(randomId);
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>📋 Clipboard App</h1>
        <p>Create and share text clipboards with unique URLs</p>
      </header>

      <div className="home-content">
        <form onSubmit={handleSubmit} className="clipboard-form">
          <div className="form-group">
            <label htmlFor="clipId">Enter Clipboard ID:</label>
            <input
              type="text"
              id="clipId"
              value={clipId}
              onChange={(e) => setClipId(e.target.value)}
              placeholder="e.g., rohit, my-notes, project-ideas"
              className="clip-input"
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-primary">
              Go to Clipboard
            </button>
            <button
              type="button"
              onClick={generateRandomId}
              className="btn-secondary"
            >
              Generate Random ID
            </button>
          </div>
        </form>

        <div className="features">
          <h3>Features:</h3>
          <ul>
            <li>✅ Auto-create clipboards with unique URLs</li>
            <li>✅ Add, edit, and delete notes</li>
            <li>✅ Real-time updates</li>
            <li>✅ Share clipboards via URL</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
