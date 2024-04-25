import React, { useState } from "react";
import MenuButtonComponent from "./MenuButtonComponent";
import "../Styles/MenuOptions.css";
import { BackendRequest } from "../Enums/requests";
import { LimitedSession } from "@shared/types";

interface MenuToggleProps {
  callBackend: (type: string, body: BackendRequest) => void;
  state: LimitedSession
  setCreatePanel: (newState: boolean) => void;
}

/**
 * Creates all of the buttons that the landing page
 * will toggle between.
 *
 * @returns All menu button options.
 */
const MenuToggleComponent: React.FC<MenuToggleProps> = ({ callBackend, state, setCreatePanel }) => {

  /* Toggle Button Themes */
  const theme1 = { color: "#FFFFFF", text: "CREATE ROOM", backendCall: "generateGame" };
  const theme2 = { color: "#F7C84F", text: "JOIN ONLINE ROOM", backendCall: "joinRandomGame" };
  const theme3 = { color: "#CBCBCB", text: "USE JOIN CODE", backendCall: "joinGameByID" };

  const themes = [theme1, theme2, theme3];

  const [active, setActive] = useState(themes[0]);
  return (
    <div className="toggleButtonContainer">
      {themes.map((type) => {
        return <MenuButtonComponent key={type.color} color={type.color} text={type.text} callBackend={callBackend} state={state} setCreatePanel={setCreatePanel} backendCall={type.backendCall}/>;
      })}
    </div>
  );
};
export default MenuToggleComponent;
