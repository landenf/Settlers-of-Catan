import React, { useEffect, useState } from 'react';
import SignIn from '../Components/Authentication/SignIn';
import SignUp from '../Components/Authentication/Signup';
import '../Styles/LandingAuth/AuthenticationStyles.css'; 
import { LimitedSession } from '@shared/types';

interface AuthenticationPageProps {
  state: LimitedSession;
  setState: (newState: LimitedSession) => void;
}

const AuthenticationPage: React.FC<AuthenticationPageProps> = ({ state, setState }) => {
  const [isSigningIn, setIsSigningIn] = useState(true); // Start with Sign In
  const [client, setClient] = useState(state.client)

  const toggleAuthMode = () => setIsSigningIn(!isSigningIn);

  useEffect(() => {
    return function cleanup() {
      console.log("cleanup!")
    }
  })

  return (
    <div className="auth-page">
      <div className="red-box">
        {isSigningIn ? <SignIn onSwitch={toggleAuthMode} /> : <SignUp onSwitch={toggleAuthMode} />}
      </div>
    </div>
  );
};

export default AuthenticationPage;
