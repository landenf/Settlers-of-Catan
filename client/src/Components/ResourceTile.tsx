import { HexGrid, Layout, Hexagon, Text, GridGenerator, HexUtils, Pattern } from 'react-hexgrid';
import React from 'react';
import { HexProp } from './types';

//renders svg !!!
const ResourceTile = (props: HexProp) => {

    const handleClick = () => {
        //implement what happens when tile clicked
        console.log(`Tile ${props.index} Clicked `)
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