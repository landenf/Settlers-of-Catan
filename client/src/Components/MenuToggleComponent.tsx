import React, { useState } from "react";
import MenuButtonComponent from "./MenuButtonComponent";
import "../Styles/MenuOptions.css";

/* Toggle Button Themes */
const theme1 = { color: "#FFFFFF", text: "CREATE ROOM" };
const theme2 = { color: "#F7C84F", text: "JOIN ONLINE ROOM" };
const theme3 = { color: "#CBCBCB", text: "USE JOIN CODE" };

export const themes = [theme1, theme2, theme3];

/**
 * Creates all of the buttons that the landing page
 * will toggle between.
 *
 * @returns All menu button options.
 */
const MenuToggleComponent = () => {
  const [active, setActive] = useState(themes[0]);
  return (
    <div className="toggleButtonContainer">
      {themes.map((type) => {
        return <MenuButtonComponent key={type.color} color={type.color} text={type.text} />;
      })}
    </div>
  );
};
export default MenuToggleComponent;
