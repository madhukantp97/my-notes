// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StickyNotes from './StickyNotes';
import Calculator from './Calculator';
import ToDoList from './ToDoList';
import './App.css';

const App = () => {

  return (
    <Router>
      <nav>
        <Link to="/">Sticky Notes</Link>
        <Link to="/todo">To-Do List</Link>
        <Link to="/calculator">Calculator</Link>
      </nav>
      <Routes>
        <Route path="/" element={<StickyNotes />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/todo" element={<ToDoList />} /> {/* Route for To-Do List */}
      </Routes>

    </Router>
  );
};

export default App;
