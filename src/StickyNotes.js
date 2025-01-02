// src/StickyNotes.js
import React, { useState, useEffect } from 'react';
import '../src/StickyNotes.css';

const StickyNotes = () => {
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputDateTime, setInputDateTime] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');
  const [editDate, setEditDate] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [textEditorContent, setTextEditorContent] = useState('');
  const [textEditorRows, setTextEditorRows] = useState(10); // New state for text editor rows
  const [fontSize, setFontSize] = useState('16px'); // New state for font size
  const [fontColor, setFontColor] = useState('#000000'); // New state for font color

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('stickyNotes')) || [];
    setNotes(savedNotes);
  }, []);

  useEffect(() => {
    localStorage.setItem('stickyNotes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (notificationsEnabled) {
      Notification.requestPermission();
    }
  }, [notificationsEnabled]);

  // Test Notification
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Test Notification', {
            body: 'Notifications are working!',
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setNotes((prevNotes) =>
        prevNotes.map((note) => {
          if (note.countdown !== null) {
            const countdown = calculateCountdown(note.date);
            if (countdown <= 0 && !note.notified) {
              showNotification(note.text);
              return { ...note, countdown: 0, notified: true };
            }
            return { ...note, countdown };
          }
          return note;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [notes]);

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
    const confirmed = window.confirm("Are you sure you want to delete this note?");
    if (confirmed) {
      const updatedNotes = notes.filter((_, i) => i !== index);
      setNotes(updatedNotes);
    }
  };
  

  const moveNoteUp = (index) => {
    if (index > 0) {
      const newNotes = [...notes];
      [newNotes[index], newNotes[index - 1]] = [newNotes[index - 1], newNotes[index]];
      setNotes(newNotes);
    }
  };

  const moveNoteDown = (index) => {
    if (index < notes.length - 1) {
      const newNotes = [...notes];
      [newNotes[index], newNotes[index + 1]] = [newNotes[index + 1], newNotes[index]];
      setNotes(newNotes);
    }
  };

  const toggleNotifications = () => {
    setNotificationsEnabled((prev) => !prev);
  };

  const calculateCountdown = (timestamp) => {
    const countdown = Math.max(0, new Date(timestamp) - new Date());
    return Math.ceil(countdown / 1000);
  };

  const showNotification = (message) => {
    if (Notification.permission === 'granted') {
      new Notification('Sticky Note Reminder', {
        body: message,
      });
    } else {
      alert(`Reminder: ${message}`);
    }
  };

  const handleSaveTextEditor = () => {
    if (textEditorContent.trim()) {
      const newNote = {
        text: textEditorContent,
        date: new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" }),
        notified: false,
        countdown: null,
        fontSize: fontSize, // Save font size
        fontColor: fontColor, // Save font color
      };
      setNotes((prevNotes) => [...prevNotes, newNote]);
      setTextEditorContent('');
      setFontSize('16px'); // Reset font size
      setFontColor('#000000'); // Reset font color
    }
  };

  // Function to handle copying note content to clipboard
  const handleCopyNote = (noteContent) => {
    navigator.clipboard.writeText(noteContent).then(() => {
      alert('Note copied to clipboard!');
    }).catch((err) => {
      alert('Failed to copy note: ' + err);
    });
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
        <label>
          Rows:
          <input
            type="number"
            value={textEditorRows}
            min="1"
            max="30"
            onChange={(e) => setTextEditorRows(Number(e.target.value))}
            style={{ width: '50px', marginLeft: '10px' }}
          />
        </label>
               {/* Font Size Dropdown */}
               <label>
          Font Size:
          <select value={fontSize} onChange={(e) => setFontSize(e.target.value)} style={{ marginLeft: '10px' }}>
            <option value="12px">12px</option>
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="18px">18px</option>
            <option value="20px">20px</option>
            <option value="24px">24px</option>
            <option value="28px">28px</option>
            <option value="32px">32px</option>
          </select>
        </label>

        {/* Font Color Input */}
        <label>
          Font Color:
          <input
            type="color"
            value={fontColor}
            onChange={(e) => setFontColor(e.target.value)}
            style={{ marginLeft: '10px' }}
          />
        </label>
        <textarea
          value={textEditorContent}
          onChange={(e) => setTextEditorContent(e.target.value)}
          rows={textEditorRows} // Use dynamic rows value
          placeholder="Write your notes here..."
          style={{
            fontSize: fontSize,
            color: fontColor,
          }}
        />
        <button onClick={handleSaveTextEditor}>Save Note</button>
      </div>

      <div>
        {notes.map((note, index) => {
          const isStickyNote = note.countdown !== null;
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
                    <pre style={{ fontSize: note.fontSize, color: note.fontColor }}>
                    {note.text}
                    </pre>
                  <small>{note.date}</small>
                  {isStickyNote && <p>Countdown: {note.countdown} seconds</p>}
                  <button onClick={() => handleEditNote(index)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDeleteNote(index)} className="delete-btn">Delete</button>
                  <button onClick={() => moveNoteUp(index)} className="move-up-btn" disabled={index === 0}>↑</button>
                  <button onClick={() => moveNoteDown(index)} className="move-down-btn" disabled={index === notes.length - 1}>↓</button>
                  <button onClick={() => handleCopyNote(note.text)} className="copy-btn">Copy</button>
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
