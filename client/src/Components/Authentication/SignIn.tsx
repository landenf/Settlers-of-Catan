import React, { useState } from 'react';
import { sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import {auth} from '../../firebase-config.js';
import '../../Styles/LandingAuth/AuthenticationStyles.css'; 
import { useNavigate } from 'react-router-dom';

/**
 * Set of props used to provide functionality to the sign in component.
 */
interface SignInComponentProps {

  /**
   * Function used to determine what happens when a user switches
   * between the sign in component and the sign up component
   */
  onSwitch: () => void;
}

/**
 * Component used to sign in to the game if the player already has an
 * account.
 */
const SignInComponent: React.FC<SignInComponentProps> = ({ onSwitch }) => {
  const [loginEmail, setLoginEmail] = useState<string>('');
  const [loginPassword, setLoginPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate(); // For navigation

  //function to handle firebase authentication and login.
  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      setErrorMessage('');
      navigate('/home'); 
    } catch (error: any) { 
      if (error.code === 'auth/invalid-email') {
        setErrorMessage('Invalid login credentials');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      } else {
        setErrorMessage(error.code);
      }
    }
  };

  //function to handle reseting users password through firebase auth
  const handleForgotPassword = async () => {
    if (!loginEmail) {
      setErrorMessage('Please enter your email address to reset your password.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, loginEmail);
      setErrorMessage('Password reset email sent!');
      setTimeout(() => {
        setErrorMessage('');
      }, 5000);
    } catch (error: any) {
      if (error.code === 'auth/invalid-email') {
        setErrorMessage('Invalid login credentials');
        setTimeout(() => {
          setErrorMessage('');
        }, 3000);
      } else {
        setErrorMessage(error.code);
      }
    }
  };
  

  return (
    <div className="auth-container">
      <div className="login-text">Sign In</div>
      {errorMessage && <p>{errorMessage}</p>}
      <input
        className="login-input"
        type="email"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <input 
        className="login-input"
        type="password"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
        placeholder="Enter your password"
      />
      <button className="auth-button" onClick={handleLogin}>Sign In</button>
      <div className="switch-auth" onClick={onSwitch}>Need an account? Sign Up</div>
      <div className="switch-auth" onClick={handleForgotPassword}>Forgot Password?</div>
    </div>

  );
};

export default SignInComponent;
