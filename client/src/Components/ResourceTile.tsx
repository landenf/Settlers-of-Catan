import { Hexagon, Text, Hex } from 'react-hexgrid';
import React from 'react';
import { Tile } from '@shared/types';
import { useEffect, useRef } from 'react';
import { tiles } from '../StaticData/GameBoardStatic';
import { InvalidIndexError } from '../Enums/errors';
import Dice from './Dice';
import SingleDie from './SingleDie';

/**
 * An interface that provides strong typing to a resource tile's hexagon prop.
 */
interface HexProp {
    /**
     * A hexagon object representing this particular tile's placement on the grid.
     */
    hex: Hex;

    /**
     * The numbered index of this tile -- as in, its index placement on the grid.
     */
    index: number;

    /**
     * The backend information related to this hexagonal tile.
     */
    tile: Tile;

}

/**
 * An individual component used by the gameboard as a tile. Each resource tile has a 
 * resource type and a number associated.
 * @param props information about the tile passed through, typically from the backend server.
 */
const ResourceTile = (props: HexProp) => {

    /**
     * Used to index the community space.
     */
    type numberKey = keyof typeof props.tile.community_spaces

    /**
     * TODO: To be used to build settlements or roads.
     */
    const handleClick = () => {

    };
    
    const edgeLength = 10; 
    const lines = [];
    const circles = [];  
    const angles = [270, 330, 30,90,150, 210]

    for (let i = 0; i < 6; i++) {

        const angleDeg = angles[i]; 
        const angleRad = Math.PI / 180 * angleDeg;

        const startX = edgeLength * Math.cos(angleRad);
        const startY = edgeLength * Math.sin(angleRad);
        const endX = edgeLength * Math.cos(angleRad + Math.PI / 3);
        const endY = edgeLength * Math.sin(angleRad + Math.PI / 3);

        let key = translateToNumberKey(i);
        let communitySpaceLevel = +props.tile.community_spaces[key];
        if(communitySpaceLevel > 0){
            circles.push({ x: startX, y: startY, level: communitySpaceLevel, color: 'blue'});  //todo find player color
        }
        lines.push({ startX, startY, endX, endY });
    }

    /**
     * Translates a number into a community space or road space's index.
     * @param toTranslate the index to translate to number key
     * @returns a number key that provides strong 0-5 typing to the index.
     */
    function translateToNumberKey(toTranslate: number) {
        var translation: numberKey
        switch (toTranslate) {
            case 0:
                translation = 0;
                break;
            case 1:
                translation = 1;
                break;
            case 2: 
                translation = 2;
                break;
            case 3: 
                translation = 3;
                break;
            case 4: 
                translation = 4;
                break;
            case 5:
                translation = 5;
                break;
            default:
                throw new InvalidIndexError("Tried accessing an invalid index of a community space!")
        }
        return translation
    }

    const handleEdgeClick = (index: number, idx: number, e: any) => {
        e.stopPropagation(); 
        //todo send request to backend
        console.log(`Tile ${index} clicked at position ${idx}`);
    };

    const number_roll = props.tile.number_roll

    return (
        <Hexagon               
            onClick={() => handleClick()} 
            key={props.index} 
            q={props.hex.q} 
            r={props.hex.r} 
            s={props.hex.s} 
            fill={props.tile.type} 
            >
            {number_roll != 0 && <circle cx="0" cy="0.5" r="3.5" fill="white" />}
            {number_roll != 0 && <Text style={{ fontSize: '0.3rem', dominantBaseline: "middle", textAnchor: "middle" }}>{props.tile.number_roll}</Text>}
            
            {lines.map((line, idx) => (
                <line
                    key={idx}
                    x1={line.startX}
                    y1={line.startY}
                    x2={line.endX}
                    y2={line.endY}
                    stroke="grey"
                    strokeWidth="1"
                    onClick={(e) => handleEdgeClick(props.tile.number_roll, idx, e)}
                />
            ))} 
            {circles.map((circle, idx) => (
                <React.Fragment key={idx}>
                    <circle
                        cx={circle.x}
                        cy={circle.y}
                        r="2"
                        fill={circle.color}
                    />
                    <text
                        x={circle.x}
                        y={circle.y} 
                        fill="white" 
                        dominantBaseline="middle" 
                        textAnchor="middle" 
                        style={{ fontSize: '0.2rem' }} 
                    >
                        {circle.level}
                    </text>
                </React.Fragment>
            ))}
        </Hexagon>
    );
}

export default ResourceTile;

//todo: change color based on gameboard props