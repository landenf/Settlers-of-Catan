import { HexGrid, Layout, Hexagon, Text, GridGenerator, HexUtils, Pattern } from 'react-hexgrid';
import { Tile_Resources } from '../StaticData/GameBoardStatic';
import React from 'react';

//renders svg !!!
const ResourceTile = (props: any) => {

    const handleClick = () => {
        //implement what happens when tile clicked
        console.log(`Tile ${props.index} Clicked `)
    };
    
    const determineResource = () => {
        return Tile_Resources[props.index];
    };

    return (
        <Hexagon               
            onClick={() => handleClick()}
            key={props.mapProps + props.index} 
            q={props.hex.q} 
            r={props.hex.r} 
            s={props.hex.s} 
            fill={determineResource()} 
            >
            <circle cx="0" cy="0.5" r="3.5" fill="white" />
            <Text style={{ fontSize: '0.3rem', dominantBaseline: "middle", textAnchor: "middle" }}>{props.index}</Text>  
        </Hexagon>
    );
}

export default ResourceTile;