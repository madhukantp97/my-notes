// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StickyNotes from './StickyNotes';
import Calculator from './Calculator';
import ToDoList from './ToDoList';
import CalendarReminder from './CalendarReminder';
import UnitConversion from './UnitConversion'; // import the new component
import './App.css';

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Sticky Notes</Link>
        <Link to="/todo">To-Do List</Link>
        <Link to="/calculator">Calculator</Link>
        <Link to="/calendar">Calendar</Link>
        <Link to="/unit-conversion">Unit Conversion</Link> {/* Add link to Unit Conversion */}
      </nav>
      <Routes>
        <Route path="/" element={<StickyNotes />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/todo" element={<ToDoList />} />
        <Route path="/calendar" element={<CalendarReminder />} />
        <Route path="/unit-conversion" element={<UnitConversion />} /> {/* Add route for Unit Conversion */}
      </Routes>
    </Router>
  );
};

export default App;
