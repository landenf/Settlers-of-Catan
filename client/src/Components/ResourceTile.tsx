import { HexGrid, Layout, Hexagon, Text, GridGenerator, HexUtils, Pattern, Hex } from 'react-hexgrid';
import React from 'react';
import { Tile } from '@shared/types';
import { useEffect, useRef } from 'react';

/**
 * An interface that provides strong typing to a resource tile's hexagon prop.
 */
export interface HexProp {
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
     * TODO: To be used to build settlements or roads.
     */
    const handleClick = () => {
    };

    
    const edgeLength = 10; // Adjust based on your actual hexagon size
    const lines = [];
    const angles = [30,90,150,210, 270, 330]
    for (let i = 0; i < 6; i++) {
        const angleDeg = angles[i];  // 30, 60, 90, 150, 210, 330 degrees for flat-topped
        const angleRad = Math.PI / 180 * angleDeg;

        const startX = edgeLength * Math.cos(angleRad);
        const startY = edgeLength * Math.sin(angleRad);
        const endX = edgeLength * Math.cos(angleRad + Math.PI / 3);
        const endY = edgeLength * Math.sin(angleRad + Math.PI / 3);

        lines.push({ startX, startY, endX, endY });
    }

    const handleEdgeClick = (index: any, e: any) => {
        e.stopPropagation(); 
        console.log(`Edge ${index} clicked!`);
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
            {lines.map((line, idx) => (
                <line
                    key={idx}
                    x1={line.startX}
                    y1={line.startY}
                    x2={line.endX}
                    y2={line.endY}
                    stroke="green"
                    strokeWidth="1"
                    onClick={(e) => handleEdgeClick(props.tile.number_roll, e)}
                />
            ))} 
        </Hexagon>
    );
}

export default ResourceTile;

//Need disabled / not disabled
//need indexing to know what edges connect to what numbers 
//need dynamic colors