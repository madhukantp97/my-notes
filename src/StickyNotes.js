// src/StickyNotes.js
import React, { useState, useEffect } from 'react';
import '../src/StickyNotes.css'; // Import your CSS file

const StickyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputDateTime, setInputDateTime] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [editDate, setEditDate] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [textEditorContent, setTextEditorContent] = useState('');

  // Load notes from Local Storage on component mount
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('stickyNotes')) || [];
    setNotes(savedNotes);
  }, []);

  // Save notes to Local Storage whenever they change
  useEffect(() => {
    localStorage.setItem('stickyNotes', JSON.stringify(notes));
  }, [notes]);

  // Notification check omitted for brevity...

  const handleAddNote = () => {
    if (inputValue.trim() && inputDateTime) {
      const newNote = {
        text: inputValue,
        date: new Date(inputDateTime).toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
        notified: false,
        countdown: calculateCountdown(inputDateTime),
      };
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setInputValue('');
      setInputDateTime('');
    }
  };

  const handleEditNote = (index) => {
    const note = notes[index];
    setEditIndex(index);
    setEditText(note.text);
    setEditDate(note.date);
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      const updatedNotes = notes.map((note, index) =>
        index === editIndex ? { ...note, text: editText, date: editDate, notified: false } : note
      );
      setNotes(updatedNotes);
      setEditIndex(null);
      setEditText('');
      setEditDate('');
    }
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  const calculateCountdown = (timestamp) => {
    const countdown = Math.max(0, new Date(timestamp) - new Date());
    return Math.ceil(countdown / 1000); // Return countdown in seconds
  };

  const handleSaveTextEditor = () => {
    if (textEditorContent.trim()) {
      const newNote = {
        text: textEditorContent,
        date: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
        notified: false,
        countdown: null, // No countdown for text editor notes
      };
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setTextEditorContent(''); // Clear the text editor
    }
  };

  return (
    <div className="container">
      <h2>Sticky Notes</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Write a note..."
      />
      <input
        type="datetime-local"
        value={inputDateTime}
        onChange={(e) => setInputDateTime(e.target.value)}
      />
      <button onClick={handleAddNote}>Add Note</button>

      <div className="checkbox-label">
        <label>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={toggleNotifications}
          />
          Enable Notifications
        </label>
      </div>

      <div className="text-editor">
        <h3>Text Editor</h3>
        <textarea
          value={textEditorContent}
          onChange={(e) => setTextEditorContent(e.target.value)}
          rows="5"
          placeholder="Write your notes here..."
        />
        <button onClick={handleSaveTextEditor}>Save Note</button>
      </div>

      <div>
        {notes.map((note, index) => {
          const isStickyNote = note.countdown !== null; // Check if it's a sticky note
          return (
            <div key={index} className={isStickyNote ? "note" : "saved-note"}>
              {isStickyNote ? (
                <div className="note-label">Sticky Note</div>
              ) : (
                <div className="saved-note-label">Saved Note</div>
              )}
              {editIndex === index ? (
                <div>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editDate}
                    onChange={(e) => setEditDate(e.target.value)}
                    placeholder="YYYY-MM-DD HH:MM"
                    style={{ marginLeft: '10px' }}
                  />
                  <button onClick={handleSaveEdit}>Save</button>
                </div>
              ) : (
                <div>
                  <p>{note.text}</p>
                  <small>{note.date}</small>
                  {isStickyNote && <p>Countdown: {note.countdown} seconds</p>}
                  <button onClick={() => handleEditNote(index)} className="edit-btn">
                    Edit
                  </button>
                  <button onClick={() => handleDeleteNote(index)} className="delete-btn">
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StickyNotes;
