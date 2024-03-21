import React from "react";
import GameSession from "./Pages/GameSession";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MockGameState } from "./StaticData/GameStateStatic";

function App() {
  return (
    <Router>
      <Routes>
        {/* This will be our home page - unathenticated users*/}
        <Route path="/" element={<GameSession gamestate={MockGameState}/>} />

        {/* This will be for routing to game session - users in game*/}
        <Route path="/session" element={<div></div>} />
      </Routes>
    </Router>
  );
}

export default App;
