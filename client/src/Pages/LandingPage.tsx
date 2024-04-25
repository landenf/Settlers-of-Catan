import React, { useState } from "react";
import "../Styles/LandingPage.css";
import MenuToggleComponent from "../Components/MenuToggleComponent";
import JoinRoomWithCodeComponent from "../Components/JoinRoomWithCodeComponent";
import { MockLimitedGameState } from "../StaticData/GameStateStatic";
import { LimitedSession } from "@shared/types";
import { BackendRequest } from "../Enums/requests";

interface LandingProps {
  backend: WebSocket
}

/**
 * Page where the user starts after logging in and sees their individual player stats.
 * From here they can choose to create a game, join an online game, or join an already
 *  existing game with a join code.
 *
 * @returns Landing page for the user.
 */
const LandingPage: React.FC<LandingProps> = ({ backend }) => {
  const [isNotInGame, setisNotInGame] = useState(true);
  const [state, setState] = useState(MockLimitedGameState);
  const [createRoomPanelOpen, setCreateRoomPanel] = useState(false);

  const toggleGameMode = () => setisNotInGame(!isNotInGame);

   /**
   * Used to update the rendering of the client's screen when we
   * receive the gamestate from the backend.
   */
   backend.addEventListener("message", (msg) => {
    const newState: LimitedSession = JSON.parse(msg.data)
    console.log(newState)
    setState(newState)
  });

  /**
   * Uses the websocket to send information to the backend and retrieve
   * gamestate information.
   * @param type the "endpoint" to hit (/roll or /buyDevCard for example) 
   * @param body any payload information to send to the backend
   */
  const callBackend = (type: string, body: BackendRequest) => {
    const message = {
      endpoint: type,
      body: body
    }

    backend.send(JSON.stringify(message))

  }  

  backend.addEventListener("message", (msg) => {
    const newState: LimitedSession = JSON.parse(msg.data)
    setState(newState)
  });

  return (
    <div className="landing-page">
      <div className="menu">
        <p className="catanTitle">CATAN</p>
        <MenuToggleComponent callBackend={callBackend} state={state} setCreatePanel={setCreateRoomPanel}/>
      </div>
      {(createRoomPanelOpen && <JoinRoomWithCodeComponent state={state}/>)}
    </div>
  );
};

export default LandingPage;
