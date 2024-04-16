import { Hexagon, Text, Hex } from 'react-hexgrid';
import React from 'react';
import { Tile, community_keys, community_meta_data, road_keys, road_meta_data, road_spaces } from '@shared/types';
import { useEffect, useRef, useState } from 'react';
import { RoadRequest, SettlementRequest } from '../Enums/requests';
import { GameState } from '@shared/types';
import { InvalidIndexError } from '../Enums/errors';
import { GameBoardActionsDisplay } from '../Pages/GameSession';

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

    gamestate: GameState;

    updateState: (newState: GameState) => void;

    showPotenials: GameBoardActionsDisplay;

}

/**
 * An individual component used by the gameboard as a tile. Each resource tile has a 
 * resource type and a number associated.
 * @param props information about the tile passed through, typically from the backend server.
 */
const ResourceTile: React.FC<HexProp> = ({ hex, index, tile, gamestate, updateState, showPotenials }) => {

    interface Line {
        startX: number;
        startY: number;
        endX: number;
        endY: number;
    }
    interface Circle {
        x: number, 
        y: number, 
        level: number, 
        color: string,
        vertex: number
    }
    /**
     * Used to index the community space.
     */
    type numberKey = keyof typeof tile.community_spaces

    const handleCircleClick = () => {
        console.log('true');
    };
    
    const edgeLength = 10;
    const angles = [270, 330, 30, 90, 150, 210];
    const [lines, setLines] = useState<Line[]>([]);
    const [circles, setCircles] = useState<Circle[]>([]);

    useEffect(() => {
        let newLines = [];
        let newCircles = [];

        for (let i = 0; i < 6; i++) {
            const angleDeg = angles[i]; 
            const angleRad = Math.PI / 180 * angleDeg;

            const startX = edgeLength * Math.cos(angleRad);
            const startY = edgeLength * Math.sin(angleRad);
            const endX = edgeLength * Math.cos(angleRad + Math.PI / 3);
            const endY = edgeLength * Math.sin(angleRad + Math.PI / 3);

            let key = translateToNumberKey(i);
            let communitySpaceData = gamestate.gameboard.tiles[index].community_spaces[key];

            const community_two : community_meta_data = {
                tile_index: 5,
                vertex: 3,
           }
            gamestate.client.potential_communities.push(community_two);

            let isValidCommunityVertex = gamestate.client.potential_communities.some(community => 
                community.tile_index === index && community.vertex === i);

            if (communitySpaceData.level > 0 || (showPotenials.settlements && isValidCommunityVertex)) {
                newCircles.push({
                    x: startX, 
                    y: startY, 
                    level: communitySpaceData.level, 
                    color: showPotenials.settlements ? 'grey' : communitySpaceData.color,
                    vertex: i
                });
            }
            newLines.push({ startX, startY, endX, endY });
        }

        setLines(newLines);
        setCircles(newCircles);
    }, [gamestate, showPotenials.settlements]); 


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

    const [colors, setColors] = useState(Object.values(gamestate.gameboard.tiles[index].road_spaces));


    //handle buying a road
    const handleEdgeClick = async (idx: road_keys, e: any) => {
        e.stopPropagation(); 

        const road : road_meta_data = {
            tile_index: index,
            edge: idx
        }
        const body: RoadRequest = {
            roadData: road,
            state: gamestate
        }
        const response = await fetch('http://localhost:5000/buyRoad', {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }});
        let newState = await response.json();
        updateState(newState);
        setColors(Object.values(newState.gameboard.tiles[index].road_spaces));
        console.log(`Tile ${index} clicked at edge ${idx}`);
    };

     //handle buying a settlement
     const handleVertexClick = async (idx: community_keys, e: any) => {
        e.stopPropagation(); 
        if(showPotenials.settlements){ // were in 'buy' mode
            const settlement : community_meta_data = {
                tile_index: index,
                vertex: idx
            }
            const body: SettlementRequest = {
                settlementData: settlement,
                state: gamestate
            }
            console.log("request")
            const response = await fetch('http://localhost:5000/buySettlement', {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                  }});
            let newState = await response.json();
            console.log(newState);
            updateState(newState);
            console.log(`Tile ${index} clicked at vertex ${idx}`);
        }
        console.log("settlement owned")
    };


    return (
        <Hexagon               
            onClick={() => {handleCircleClick}} 
            key={index} 
            q={hex.q} 
            r={hex.r} 
            s={hex.s} 
            fill={tile.type} 
            >
            {lines.map((line, idx) => (
                <line
                    key={idx}
                    x1={line.startX}
                    y1={line.startY}
                    x2={line.endX}
                    y2={line.endY}
                    stroke={colors[idx]}
                    strokeWidth="1"
                    onClick={(e) => handleEdgeClick(idx as road_keys, e)}
                />
            ))} 
            {circles.map((circle, idx) => (
                <React.Fragment key={idx} >
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
                        style={{ fontSize: '0.2rem', cursor: circle.level === 0 ? 'pointer' : 'default'  }} 
                        onClick={(e) => handleVertexClick(circle.vertex as community_keys, e)}
                    >
                        {circle.level}
                    </text>
                </React.Fragment>
            ))}
            <circle cx="0" cy="0.5" r="3.5" fill="white"  />
            <Text style={{ fontSize: '0.3rem', dominantBaseline: "middle", textAnchor: "middle" }} onClick={handleCircleClick}>{tile.number_roll}</Text>  
        </Hexagon>
    );
}

export default ResourceTile;