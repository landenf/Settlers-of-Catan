import React, { useState } from "react";
import MenuButtonComponent from "./MenuButtonComponent";
import "../../Styles/LandingAuth/MenuOptions.css";
import { BackendRequest } from "../../Enums/requests";
import { LimitedSession } from "@shared/types";

interface MenuToggleProps {

  /**
   * Function used to call the backend given a request type and body
   */
  callBackend: (type: string, body: BackendRequest) => void;

  /**
   * Current state of the game
   */
  state: LimitedSession

  /**
   * Function to set the open / closed state of the room panel
   */
  setRoomPanel: (newState: boolean) => void;

  /**
   * Whether or not the buttons associated with this component
   * should be clickable or not.
   */
  buttonsActive: boolean;

  /**
   * Function to update the active state of the side buttons.
   */
  setButtonsActive: (newState: boolean) => void;
}

/**
 * Creates all of the buttons that the landing page
 * will toggle between.
 *
 * @returns All menu button options.
 */
const MenuToggleComponent: React.FC<MenuToggleProps> = ({ callBackend, state, setRoomPanel, buttonsActive, setButtonsActive }) => {

  /* Toggle Button Themes */
  const theme1 = { color: "#FFFFFF", text: "CREATE ROOM", backendCall: "generateGame" };
  const theme2 = { color: "#F7C84F", text: "JOIN ONLINE ROOM", backendCall: "joinRandomGame" };
  const theme3 = { color: "#CBCBCB", text: "USE JOIN CODE", backendCall: "joinGameByID" };

  const themes = [theme1, theme2, theme3];

  return (
    <div className="toggleButtonContainer">
      {themes.map((type) => {
        return <MenuButtonComponent key={type.color} color={type.color} text={type.text} 
          callBackend={callBackend} state={state} setRoomPanel={setRoomPanel} backendCall={type.backendCall}
          buttonsActive={buttonsActive} setButtonsActive={setButtonsActive}/>;
      })}
    </div>
  );
};
export default MenuToggleComponent;
