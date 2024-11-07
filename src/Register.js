// // src/Register.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './Register.css';


// const Register = () => {
//   const [id, setId] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const navigate = useNavigate();

//   const handleRegister = () => {
//     // Validate input fields
//     if (!id || !password || !confirmPassword) {
//       setErrorMessage('Please fill out all fields.');
//       return;
//     }
//     if (password !== confirmPassword) {
//       setErrorMessage('Passwords do not match.');
//       return;
//     }
    
//     // Store credentials in local storage
//     localStorage.setItem('userId', id);
//     localStorage.setItem('userPassword', password);
//     localStorage.setItem('isRegistered', 'true'); // Mark as registered
    
//     // Redirect to login page after successful registration
//     navigate('/login');
//   };

//   return (
//     <div className="register-container">
//       <h2>Register</h2>
//       <div>
//         <label>ID:</label>
//         <input 
//           type="text" 
//           value={id} 
//           onChange={(e) => setId(e.target.value)} 
//           placeholder="Enter your ID" 
//         />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input 
//           type="password" 
//           value={password} 
//           onChange={(e) => setPassword(e.target.value)} 
//           placeholder="Enter your password" 
//         />
//       </div>
//       <div>
//         <label>Confirm Password:</label>
//         <input 
//           type="password" 
//           value={confirmPassword} 
//           onChange={(e) => setConfirmPassword(e.target.value)} 
//           placeholder="Confirm your password" 
//         />
//       </div>
//       <button onClick={handleRegister}>Register</button>
//       {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
//     </div>
//   );
// };

// export default Register;
