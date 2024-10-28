// src/Calculator.js
import React, { useState, useEffect } from 'react';
import '../src/Calculator.css'; // Optional, for styling

const Calculator = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
  }, [history]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const calculateResult = () => {
    try {
      const result = eval(input); // Use eval carefully; consider a safer alternative for production
      const newEntry = `${input} = ${result}`;
      setHistory((prevHistory) => [...prevHistory, newEntry]);
      setInput('');
    } catch (error) {
      alert('Invalid expression');
    }
  };

  const clearHistory = () => {
    if (window.confirm("Are you sure you want to clear the history?")) {
      setHistory([]);
    }
  };

  const deleteEntry = (index) => {
    const newHistory = history.filter((_, i) => i !== index);
    setHistory(newHistory);
  };

  return (
    <div className="calculator-container">
      <h2>Calculator</h2>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter calculation..."
      />
      <button onClick={calculateResult}>Calculate</button>
      <button onClick={clearHistory}>Clear History</button>

      <h3>History</h3>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            {entry}
            <button onClick={() => deleteEntry(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calculator;
