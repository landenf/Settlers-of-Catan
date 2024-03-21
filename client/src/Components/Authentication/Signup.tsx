import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore'; // For Firestore operations
import { auth, db } from '../../firebase-config.js';
import '../../Styles/AuthenticationStyles.css';
import { useNavigate } from 'react-router-dom';

interface SignUpComponentProps {
  onSwitch: () => void;
}

const SignUpComponent: React.FC<SignUpComponentProps> = ({ onSwitch }) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate(); // For navigation

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log(userCredential.user);
      await setDoc(doc(db, "UserProfiles", userCredential.user.uid), {
        username: username,
        email: email,
        uid: userCredential.user.uid
      });
      setErrorMessage('');
    } catch (error: any) { // Adjust error handling as needed
      console.error("Error signing up: ", error);
      setErrorMessage(error.message || 'An error occurred during sign up.');
    }
    navigate('/session'); // Navigate on success
  };

  return (
    <div className="auth-container">
      <div className="login-text">Sign Up</div>
      <input
        className="login-input"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
      <input
        className="login-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <input
        className="login-input"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <button className="auth-button" onClick={handleSignUp}>Sign Up</button>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="switch-auth" onClick={onSwitch}>Already have an account? Sign In</div>
    </div>
  );
};

export default SignUpComponent;
