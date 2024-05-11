import React from "react";

/**
 * Interface for providing strong typing to the avatar's props
 */
interface AvatarProps {

    /**
     * Filepath to this avatar's profile picture
     */
    image: string;

    /**
     * The player's color in this game
     */
    color: string;

    /**
     * Determines if this specific avatar was clicked and selected or not
     */
    selected: boolean;

    /**
     * Updates if this avatar was selected or not
     */
    setSelected: (newState: boolean) => void;

    /**
     * Determines which player was selected
     */
    playerSelected: string;

    /**
     * Sets the player who is currently selected
     */
    setPlayerSelected: (newPlayer: string) => void;
}

/**
 * Component to render whenever the user needs to select a player to steal from.
 */
const AvatarComponent: React.FC<AvatarProps> = ({image, color, selected, setSelected, playerSelected, setPlayerSelected}) => {
   
    /**
     * Lets the player select another player by clicking on their avatar.
     */
    const handleClick = () => {
        if (color == playerSelected) {
            setSelected(!selected);
            setPlayerSelected("");
        } else {
            setPlayerSelected(color);
            setSelected(true);
        }
    }

    const playerChosen = color == playerSelected;

    return (
        <div>
            <img src={image} className={(playerChosen ? "chosen": "") + " player avatar " + color} onClick={() => handleClick()}></img>
        </div>
    )
}

export default AvatarComponent;