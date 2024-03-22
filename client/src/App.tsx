import React from "react";
import GameSession from "./Pages/GameSession";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MockGameState } from "./StaticData/GameStateStatic";
import AuthenticationPage from "./Pages/Authentication";

function App() {
  return (
    <Router>
      <Routes>
        {/* This will be our home page - unathenticated users*/}
        <Route path="/" element={<AuthenticationPage/>} />
        {/* This will be for routing to game session - users in game*/}
        <Route path="/session" element={<GameSession gamestate={MockGameState}/>} />

      </Routes>
    </Router>
  );
}

export default App;
