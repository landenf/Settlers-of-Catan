import React, { useEffect, useState } from "react";
import "../Styles/LandingAuth/LandingPage.css";
import MenuToggleComponent from "../Components/LandingPage/MenuToggleComponent";
import { MockGameState, MockLimitedGameState } from "../StaticData/GameStateStatic";
import { LimitedSession, Player } from "@shared/types";
import { BackendRequest } from "../Enums/requests";
import RoomPanel from "../Components/LandingPage/RoomPanel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import InstructionsModal from "../Components/LandingPage/InstructionsModal";
import PlayerStatisticsComponent from "../Components/LandingPage/PlayerStatisticsComponent";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

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
  const [setupNeeded, setSetupNeeded] = useState(true);
  const [roomPanelOpen, setOpenPanel] = useState(false);
  const [buttonsActive, setButtonsActive] = useState(true);
  const [instructionsModalEnabled, setInstructionsModal] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    if (state.isStarted) {
      navigate("/session")
    }
    if (setupNeeded) {
      generateUser();
      setSetupNeeded(false);
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

  const generateUser = async () => {
    if (user) {
        const userProfilesRef = collection(db, "UserProfiles");
        const q = query(userProfilesRef, where("uid", "==", user.uid));
        try {
            const querySnapshot = await getDocs(q);
            const userProfileDoc = querySnapshot.docs[0]; 
            if (userProfileDoc.exists()) {

              const user_data = userProfileDoc.data()
              console.log(user_data)

              let photo_URL = user.photoURL
              if (photo_URL == null || photo_URL == "") {
                photo_URL = "empty-avatar"
              }

              const player: Player = {
                id: user_data.uid,
                name: user_data.username,
                image: photo_URL,
                color: "red",
                vp: 0,
                hasLargestArmy: false,
                hasMostRoads: false,
                hand: MockGameState.client.hand,
                hasKnight: false,
                resources: 0,
                knightCards: 0,
                resource_gain: MockGameState.client.resource_gain,
                communities_owned: [],
                potential_communities: [],
                roads_owned: [],
                potential_roads: [],
                player_stats: {
                  total_wins: user_data.GamesWon,
                  largest_armies: user_data.LargestArmy,
                  most_roads: user_data.MostRoads,
                  total_vp: user_data.VictoryPoints
                },
                ready: false
              }
              const newState: LimitedSession = {
                id: MockLimitedGameState.id,
                client: player,
                diceNumber: {
                  number1: 0,
                  number2: 0
                },
                players: [],
                current_player: MockLimitedGameState.current_player,
                gameboard: {
                  tiles: []
                },
                isValid: false,
                canStart: false,
                isStarted: false,
                roundNumber: 0
              }
              setState(newState);
            } 
        } catch (error: any) {
            console.log(error.message);
        }
    }
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
