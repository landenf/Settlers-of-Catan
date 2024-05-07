import React, { useState } from "react";
import GameSession from "./Pages/GameSession";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MockGameState, MockLimitedGameState } from "./StaticData/GameStateStatic";
import AuthenticationPage from "./Pages/Authentication";
import LandingPage from "./Pages/LandingPage";

// ------Use if you have added AWS server to your env file-----------
//const backend = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL!); 

//-------Use if you are using the local server.---------------------
const backend = new WebSocket("ws://localhost:5000");


function App() {

  const [state, setState] = useState(MockLimitedGameState);

  return (
    <Router>
      <Routes>
        {/* This will be our home page - unathenticated users*/}
        <Route path="/" element={<AuthenticationPage/>} />
        {/* This will be for routing to the landing page, where users will join or create games */}
        <Route path="/home" element={<LandingPage backend={backend} state={state} setState={setState} />}></Route>
        {/* This will be for routing to game session - users in game*/}
        <Route path="/session" element={<GameSession state={state} setState={setState} backend={backend} />} />
      </Routes>
    </Router>
  );
}

export default App;
