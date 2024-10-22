// src/StickyNotes.js
import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    const checkNotes = setInterval(() => {
      const now = new Date().getTime();
      notes.forEach((note, index) => {
        const noteTime = new Date(note.date).getTime();
        if (noteTime <= now && noteTime + 1000 > now && !note.notified) {
          notifyUser(note.text);
          setNotes((prevNotes) =>
            prevNotes.map((n, i) => (i === index ? { ...n, notified: true } : n))
          );
        }
      });
    }, 1000);

    return () => clearInterval(checkNotes);
  }, [notes]);

  const notifyUser = (message) => {
    if (notificationsEnabled) {
      new Notification('Note Reminder', {
        body: `Reminder: ${message}`,
      });
      alert(`Reminder: ${message}`);
      setTimeout(() => {
        alert('This alert will close in 20 seconds.');
      }, 20000);
    }
  };

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

  useEffect(() => {
    const interval = setInterval(() => {
      setNotes((prevNotes) =>
        prevNotes.map((note) => ({
          ...note,
          countdown: calculateCountdown(note.date),
        }))
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [notes]);

  const handleSaveTextEditor = () => {
    if (textEditorContent.trim()) {
      const newNote = {
        text: textEditorContent,
        date: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
        notified: false,
        countdown: 0,
      };
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setTextEditorContent(''); // Clear the text editor
    }
  };

  return (
    <div style={{ padding: '20px', background: '#f9f9f9', borderRadius: '8px' }}>
      <h2>Sticky Notes</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Write a note..."
        style={{ width: '70%', marginRight: '10px' }}
      />
      <input
        type="datetime-local"
        value={inputDateTime}
        onChange={(e) => setInputDateTime(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <button onClick={handleAddNote}>Add Note</button>

      <div style={{ marginTop: '20px' }}>
        <label>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={toggleNotifications}
          />
          Enable Notifications
        </label>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Text Editor</h3>
        <textarea
          value={textEditorContent}
          onChange={(e) => setTextEditorContent(e.target.value)}
          rows="5"
          style={{ width: '100%', marginBottom: '10px' }}
          placeholder="Write your notes here..."
        />
        <button onClick={handleSaveTextEditor}>Save Note</button>
      </div>

      <div style={{ marginTop: '20px' }}>
        {notes.map((note, index) => (
          <div key={index} style={{ marginBottom: '10px', padding: '10px', background: '#ffeaa7', borderRadius: '5px' }}>
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
                <button onClick={handleSaveEdit} style={{ marginLeft: '10px' }}>
                  Save
                </button>
              </div>
            ) : (
              <div>
                <p>{note.text}</p>
                <small>{note.date}</small>
                <p>Countdown: {note.countdown} seconds</p>
                <button onClick={() => handleEditNote(index)} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                  Edit
                </button>
                <button onClick={() => handleDeleteNote(index)} style={{ marginLeft: '10px', cursor: 'pointer' }}>
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StickyNotes;
