import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase-config';
import { storage } from '../../firebase-config'; 
import '../../Styles/LandingAuth/AuthenticationStyles.css';
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

interface SignUpComponentProps {
  onSwitch: () => void;
}

const SignUpComponent: React.FC<SignUpComponentProps> = ({ onSwitch }) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigate = useNavigate();

  const uploadImage = async () => {
    if (!file) return null;
    const fileRef = ref(storage, `profile_pictures/${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    return url;
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const imageUrl = await uploadImage(); 
      if (imageUrl) {
        await updateProfile(userCredential.user, {
          photoURL: imageUrl
        });
      }
      await setDoc(doc(db, "UserProfiles", userCredential.user.uid), {
        username: username,
        email: email,
        uid: userCredential.user.uid,
        photoURL: imageUrl || '',
        GamesWon: 0,
        LargestArmy: 0,
        MostRoads: 0,
        VictoryPoints: 0,
        TotalWheat: 0,
        TotalStone: 0,
        TotalWood: 0,
        TotalBrick: 0,
        TotalSheep: 0
      });
      setErrorMessage('');
      navigate('/home');
    } catch (error: any) {
      console.error("Error signing up: ", error);
      setErrorMessage(error.message || 'An error occurred during sign up.');
    }
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
      {uploadSuccess ? (
        <div style={{ paddingTop: '5px', color: 'white'}}>Profile Picture Uploaded Successfully!</div>
      ) : (
        <label className="file-upload-container" htmlFor="profile-upload">
          Upload Profile Picture
          <input
            id="profile-upload"
            className="login-input"
            type="file"
            onChange={(e) => {
              setUploadSuccess(true);
              setFile(e.target.files ? e.target.files[0] : null);
            }}
            style={{ display: 'none' }}
          />
        </label>
      )}

      <button className="auth-button" onClick={handleSignUp}>Sign Up</button>
      {errorMessage && <p>{errorMessage}</p>}
      <div className="switch-auth" onClick={onSwitch}>Already have an account? Sign In</div>
    </div>
  );
};

export default SignUpComponent;
