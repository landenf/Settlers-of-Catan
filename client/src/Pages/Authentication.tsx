import React, { useState } from 'react';
import SignIn from '../Components/Authentication/SignIn';
import SignUp from '../Components/Authentication/Signup';
import '../Styles/LandingAuth/AuthenticationStyles.css'; 

/**
 * A page constructed of either the sign in or sign up components.
 */
const AuthenticationPage: React.FC = () => {
  const [isSigningIn, setIsSigningIn] = useState(true); // Start with Sign In

  /**
   * Function used to toggle whether or not the user is signing in or signing up
   */
  const toggleAuthMode = () => setIsSigningIn(!isSigningIn);

  return (
    <div className="auth-page">
      <div className="red-box">
        {isSigningIn ? <SignIn onSwitch={toggleAuthMode}/> : <SignUp onSwitch={toggleAuthMode} />}
      </div>
    </div>
  );
};

export default AuthenticationPage;
