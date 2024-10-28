// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StickyNotes from './StickyNotes';
import Calculator from './Calculator';
import './App.css'; // If you have general styles

const App = () => {
  return (
    <Router>
      <nav>
        <Link to="/">Sticky Notes</Link>
        <Link to="/calculator">Calculator</Link>
      </nav>
      <Routes>
        <Route path="/" element={<StickyNotes />} />
        <Route path="/calculator" element={<Calculator />} />
      </Routes>
    </Router>
  );
};

export default App;
