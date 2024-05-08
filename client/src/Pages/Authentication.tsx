import React, { useEffect, useState } from 'react';
import SignIn from '../Components/Authentication/SignIn';
import SignUp from '../Components/Authentication/Signup';
import '../Styles/LandingAuth/AuthenticationStyles.css'; 

const AuthenticationPage: React.FC = () => {
  const [isSigningIn, setIsSigningIn] = useState(true); // Start with Sign In

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
