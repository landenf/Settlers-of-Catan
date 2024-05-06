import React, { useEffect, useState } from "react";
import "../Styles/LandingAuth/LandingPage.css";
import MenuToggleComponent from "../Components/LandingPage/MenuToggleComponent";
import { MockLimitedGameState } from "../StaticData/GameStateStatic";
import { LimitedSession } from "@shared/types";
import { BackendRequest } from "../Enums/requests";
import RoomPanel from "../Components/LandingPage/RoomPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import InstructionsModal from "../Components/LandingPage/InstructionsModal";
import PlayerStatisticsComponent from "../Components/LandingPage/PlayerStatisticsComponent";
import { useNavigate } from "react-router-dom";

interface LandingProps {
  backend: WebSocket,
  state: LimitedSession,
  setState: (newState: LimitedSession) => void
}

/**
 * Page where the user starts after logging in and sees their individual player stats.
 * From here they can choose to create a game, join an online game, or join an already
 * existing game with a join code.
 *
 * @returns Landing page for the user.
 */
const LandingPage: React.FC<LandingProps> = ({ backend, state, setState }) => {
  const [roomPanelOpen, setOpenPanel] = useState(false);
  const [buttonsActive, setButtonsActive] = useState(true);
  const [instructionsModalEnabled, setInstructionsModal] = useState(false);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    if (state.isStarted) {
      navigate("/session")
    }
  })

  const updateInstructionsModal = () => {
    setInstructionsModal(!instructionsModalEnabled);
  };

  /**
   * Used to update the rendering of the client's screen when we
   * receive the gamestate from the backend.
   */
  backend.addEventListener("message", (msg) => {
    const newState: LimitedSession = JSON.parse(msg.data);
    setState(newState);
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
      body: body,
    };

    backend.send(JSON.stringify(message));
  };

  return (
    <div className="landing-page">
      <InstructionsModal
        setInstructionsModal={() => setInstructionsModal(false)}
        instructionsModalState={instructionsModalEnabled}
      />
      <div className="menu">
        <div onClick={updateInstructionsModal} className="info-button">
          <FontAwesomeIcon className="info-icon" icon={faCircleInfo} />
        </div>
        <p className="catanTitle">CATAN</p>
        <MenuToggleComponent
          callBackend={callBackend}
          state={state}
          setRoomPanel={setOpenPanel}
          buttonsActive={buttonsActive}
          setButtonsActive={setButtonsActive}
        />
      </div>

      {!roomPanelOpen && (<PlayerStatisticsComponent/>)}
      {(roomPanelOpen && <RoomPanel state={state} callBackend={callBackend} setRoomPanel={setOpenPanel} 
        setButtonsActive={setButtonsActive}/>)}
    </div>
  );
};

export default LandingPage;
