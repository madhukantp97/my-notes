// src/CalendarReminder.js
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CalendarReminder.css';

const CalendarReminder = () => {
  const [date, setDate] = useState(new Date());
  const [reminders, setReminders] = useState({});
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const savedReminders = JSON.parse(localStorage.getItem('calendarReminders')) || {};
    setReminders(savedReminders);
  }, []);

  useEffect(() => {
    localStorage.setItem('calendarReminders', JSON.stringify(reminders));
  }, [reminders]);

  const handleDateChange = (selectedDate) => {
    setDate(selectedDate);
    setInputValue('');
  };

  const handleAddReminder = () => {
    const formattedDate = date.toDateString();
    setReminders((prevReminders) => ({
      ...prevReminders,
      [formattedDate]: [...(prevReminders[formattedDate] || []), inputValue],
    }));
    setInputValue('');
  };

  const handleDeleteReminder = (reminderDate, index) => {
    setReminders((prevReminders) => {
      const updatedReminders = { ...prevReminders };
      updatedReminders[reminderDate].splice(index, 1);
      if (updatedReminders[reminderDate].length === 0) {
        delete updatedReminders[reminderDate];
      }
      return updatedReminders;
    });
  };

  // Check if a specific date has reminders
  const hasReminder = (date) => {
    return reminders[date.toDateString()] && reminders[date.toDateString()].length > 0;
  };

  return (
    <div className="calendar-container">
      <h2>Calendar</h2>
      <Calendar
        onChange={handleDateChange}
        value={date}
        tileClassName={({ date }) => (hasReminder(date) ? 'reminder-date' : '')}
      />
      <div className="reminder-section">
        <h3>Reminders for {date.toDateString()}</h3>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a reminder"
        />
        <button onClick={handleAddReminder}>Add Reminder</button>
        <ul>
          {(reminders[date.toDateString()] || []).map((reminder, index) => (
            <li key={index}>
              {reminder}
              <button onClick={() => handleDeleteReminder(date.toDateString(), index)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CalendarReminder;
