import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GameSession from './Pages/GameSession';

function App() {
  return (
  <Router>
    <Routes>

    {/* This will be our home page - unathenticated users*/}

    <Route path="/" element={<GameSession/>} /> 

    {/* This will house the lobby components - authenticated users */}
    <Route path="/lobby" element={<div></div>} />

    {/* This will be for routing to game session - users in game*/}
    <Route path="/session" element={<div></div>}/>

    </Routes>
  </Router>
  );
}

export default App;
