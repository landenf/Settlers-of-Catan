import React from 'react';
import '../../Styles/AuthenticationStyles.css'; 
interface SignInProps {
  onSwitch: () => void;
}

const SignIn: React.FC<SignInProps> = ({ onSwitch }) => (
  <div className="auth-container">
    <div className="login-text">Sign In</div>
      <input className="login-input" placeholder="Username" />
      <input className="login-input" placeholder="Password" type="password" />
      <button className="auth-button">Sign In</button>
      <div className="switch-auth" onClick={onSwitch}>Need an account? Sign Up</div>
  </div>
);

export default SignIn;
