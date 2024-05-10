import React from "react";

interface AvatarProps {
    image: string;
    color: string;
    selected: boolean;
    setSelected: (newState: boolean) => void;
    playerSelected: string;
    setPlayerSelected: (newPlayer: string) => void;
}

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