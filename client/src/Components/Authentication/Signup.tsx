import React from 'react';
import '../../Styles/AuthenticationStyles.css'; 

interface SignUpProps {
  onSwitch: () => void;
}

const SignUp: React.FC<SignUpProps> = ({ onSwitch }) => (
    <div className="auth-container">
        <div className="login-text">Sign Up</div>
        <input className="login-input" placeholder="Username" />
        <input className="login-input" placeholder="Email" type="email" />
        <input className="login-input" placeholder="Password" type="password" />
        <button className="auth-button">Sign Up</button>
        <div className="switch-auth" onClick={onSwitch}>Already have an account? Sign In</div>
    </div>
);

export default SignUp;
