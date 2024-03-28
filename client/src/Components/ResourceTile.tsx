import { HexGrid, Layout, Hexagon, Text, GridGenerator, HexUtils, Pattern } from 'react-hexgrid';
import React from 'react';
import { HexProp } from './types';

/**
 * An individual component used by the gameboard as a tile. Each resource tile has a 
 * resource type and a number associated.
 * @param props information about the tile passed through, typically from the backend server.
 */
const ResourceTile = (props: HexProp) => {

    /**
     * TODO: To be used to build settlements or roads.
     */
    const handleClick = () => {
    };

    return (
        <Hexagon               
            onClick={() => handleClick()} 
            key={props.index} 
            q={props.hex.q} 
            r={props.hex.r} 
            s={props.hex.s} 
            fill={props.tile.type} 
            >
            <circle cx="0" cy="0.5" r="3.5" fill="white" />
            <Text style={{ fontSize: '0.3rem', dominantBaseline: "middle", textAnchor: "middle" }}>{props.tile.number_roll}</Text>  
        </Hexagon>
    );
}

export default ResourceTile;