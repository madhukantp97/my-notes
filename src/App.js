// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import StickyNotes from './StickyNotes';
import Calculator from './Calculator';
import ToDoList from './ToDoList';
// import Login from './Login';
// import Register from './Register'; // Import the Register page
import './App.css';

const App = () => {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [isRegistered, setIsRegistered] = useState(false);

  // useEffect(() => {
  //   const registeredStatus = localStorage.getItem('isRegistered');
  //   const loggedInStatus = localStorage.getItem('isLoggedIn');

  //   if (registeredStatus === 'true') {
  //     setIsRegistered(true);
  //   }

  //   if (loggedInStatus === 'true') {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

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

      {/* <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={isRegistered ? <Navigate to="/login" /> : <Register />} /> {/* If registered, redirect to login */}
        {/* <Route  */}
          {/* path="/"  */}
          {/* element={isLoggedIn ? <StickyNotes /> : <Navigate to="/login" />}  */}
        {/* /> */}
        {/* <Route  */}
          {/* path="/calculator"  */}
          {/* element={isLoggedIn ? <Calculator /> : <Navigate to="/login" />}  */}
        {/* /> */}
        {/* <Route  */}
          {/* path="/todo"  */}
          {/* element={isLoggedIn ? <ToDoList /> : <Navigate to="/login" />}  */}
        {/* /> */}
      {/* </Routes> */}
    </Router>
  );
};

export default App;
