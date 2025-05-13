import React, { useState, useEffect } from 'react';
import { evaluate, format } from 'mathjs';
import './Calculator.css';

const conversions = {
  length: [
    { label: 'Meters to Feet', factor: 3.28084 },
    { label: 'Feet to Meters', factor: 1 / 3.28084 },
  ],
  volume: [
    { label: 'Liters to Gallons', factor: 0.264172 },
    { label: 'Gallons to Liters', factor: 1 / 0.264172 },
  ],
};

const scientificKeys = [
  'sin(', 'cos(', 'tan(', 'log(', 'sqrt(', 'abs(', 'pi', 'e',
  '(', ')', '^', '!', '*', '/', '+', '-', '.'
];

const Calculator = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showSciKeyboard, setShowSciKeyboard] = useState(false);
  const [conversionType, setConversionType] = useState('length');
  const [valueToConvert, setValueToConvert] = useState('');
  const [convertedValue, setConvertedValue] = useState('');

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('calculatorHistory')) || [];
    setHistory(savedHistory);
  }, []);

  useEffect(() => {
    localStorage.setItem('calculatorHistory', JSON.stringify(history));
  }, [history]);

  const handleInputChange = (e) => setInput(e.target.value);

  const handleSciKeyClick = (symbol) => {
    setInput((prev) => prev + symbol);
  };

  const calculateResult = () => {
    try {
      const result = format(evaluate(input), { precision: 14 });
      const newEntry = `${input} = ${result}`;
      setHistory([...history, newEntry]);
      setInput('');
    } catch {
      alert('Invalid expression');
    }
  };

  const clearHistory = () => {
    if (window.confirm("Clear all history?")) {
      setHistory([]);
    }
  };

  const deleteEntry = (index) => {
    const newHistory = history.filter((_, i) => i !== index);
    setHistory(newHistory);
  };

  const handleConversion = (factor) => {
    const num = parseFloat(valueToConvert);
    if (!isNaN(num)) {
      const result = (num * factor).toFixed(4);
      setConvertedValue(result);
    } else {
      alert('Enter a valid number');
    }
  };

  return (
    <div className="calculator-container">
      <h2>Scientific Calculator</h2>

      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="e.g., sin(30 deg), sqrt(16), log(100)"
      />

      <div className="button-group">
        <button onClick={calculateResult}>Calculate</button>
        <button onClick={() => setShowModal(true)}>Conversions</button>
        <button onClick={clearHistory}>Clear History</button>
      </div>

      <label className="toggle-switch">
        <input
          type="checkbox"
          checked={showSciKeyboard}
          onChange={() => setShowSciKeyboard(!showSciKeyboard)}
        />
        Show Scientific Keyboard
      </label>

      {showSciKeyboard && (
        <div className="sci-keyboard">
          {scientificKeys.map((key) => (
            <button key={key} onClick={() => handleSciKeyClick(key)}>
              {key}
            </button>
          ))}
        </div>
      )}

      <h3>History</h3>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            {entry}
            <button onClick={() => deleteEntry(index)}>Delete</button>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Unit Conversions</h3>
            <label>
              Select Type:
              <select
                value={conversionType}
                onChange={(e) => setConversionType(e.target.value)}
              >
                {Object.keys(conversions).map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>
            </label>
            <input
              type="text"
              placeholder="Value to convert"
              value={valueToConvert}
              onChange={(e) => setValueToConvert(e.target.value)}
            />
            <div className="conversion-options">
              {conversions[conversionType].map(({ label, factor }) => (
                <button key={label} onClick={() => handleConversion(factor)}>
                  {label}
                </button>
              ))}
            </div>
            {convertedValue && <p>Result: {convertedValue}</p>}
            <button className="close-btn" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calculator;
