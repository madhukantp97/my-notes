// src/UnitConversion.js
import React, { useState } from 'react';
import '../src/UnitConversion.css';

const UnitConversion = () => {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [unitType, setUnitType] = useState('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('kilometer');

  // Conversion factors for length and weight (example)
  const lengthConversions = {
    meter: 1,
    kilometer: 0.001,
    centimeter: 100,
    millimeter: 1000,
  };

  const weightConversions = {
    kilogram: 1,
    gram: 1000,
    pound: 2.20462,
    ounce: 35.274,
  };

  const currencyConversions = {
    USD: 1,
    EUR: 0.92, // Example conversion rates
    GBP: 0.81,
    INR: 84,
  };

  // Convert input value based on selected units
  const handleConversion = () => {
    let conversionRate;
    if (unitType === 'length') {
      conversionRate = lengthConversions[toUnit] / lengthConversions[fromUnit];
    } else if (unitType === 'weight') {
      conversionRate = weightConversions[toUnit] / weightConversions[fromUnit];
    } else if (unitType === 'currency') {
      conversionRate = currencyConversions[toUnit] / currencyConversions[fromUnit];
    }

    const result = inputValue * conversionRate;
    setOutputValue(result);
  };

  return (
    <div>
      <h2>Unit Conversion</h2>
      <div>
        <label>
          Select Unit Type:
          <select value={unitType} onChange={(e) => setUnitType(e.target.value)}>
            <option value="length">Length</option>
            <option value="weight">Weight</option>
            <option value="currency">Currency</option>
          </select>
        </label>
      </div>

      <div>
        <label>
          From Unit:
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
            {unitType === 'length' &&
              Object.keys(lengthConversions).map((unit) => <option key={unit} value={unit}>{unit}</option>)}
            {unitType === 'weight' &&
              Object.keys(weightConversions).map((unit) => <option key={unit} value={unit}>{unit}</option>)}
            {unitType === 'currency' &&
              Object.keys(currencyConversions).map((unit) => <option key={unit} value={unit}>{unit}</option>)}
          </select>
        </label>

        <label>
          To Unit:
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
            {unitType === 'length' &&
              Object.keys(lengthConversions).map((unit) => <option key={unit} value={unit}>{unit}</option>)}
            {unitType === 'weight' &&
              Object.keys(weightConversions).map((unit) => <option key={unit} value={unit}>{unit}</option>)}
            {unitType === 'currency' &&
              Object.keys(currencyConversions).map((unit) => <option key={unit} value={unit}>{unit}</option>)}
          </select>
        </label>
      </div>

      <div>
        <label>
          Input Value:
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </label>
      </div>

      <button onClick={handleConversion}>Convert</button>

      <div>
        <h3>Output Value:</h3>
        <p>{outputValue}</p>
      </div>
    </div>
  );
};

export default UnitConversion;
