import { Hexagon, Text, Hex } from 'react-hexgrid';
import React from 'react';
import { LimitedSession, Tile, community_keys, community_meta_data, road_keys, road_meta_data, road_spaces } from '@shared/types';
import { useEffect, useState } from 'react';
import { BackendRequest, RoadRequest, SettlementRequest } from '../../../Enums/requests';
import { GameState } from '@shared/types';
import { InvalidIndexError } from '../../../Enums/errors';
import { GameBoardActionsDisplay } from '../../../Pages/GameSession';
import { players } from '../../../StaticData/PlayerData';

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

    /**
     * The backend information related to the game state.
     */
    gamestate: LimitedSession;

    /**
     * The function to update the gamestate from this component.
     */
    updateState: (newState: LimitedSession) => void;

    /**
     * Boolean to show or hide potential build options.
     */
    showPotenialBuildOptions: GameBoardActionsDisplay;

    /**
     * Boolean to show if a road has been selected already.
     */
    selectedRoad: boolean;
    /**
     * Function to call the backend through the main websocket.
     */
    callBackend: (type: string, body: BackendRequest) => void;
}

interface Road_Display_Data {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    color: string;
}
interface Settlement_Display_Data {
    x: number, 
    y: number, 
    level: number, 
    color: string,
    vertex: number
}

/**
 * An individual component used by the gameboard as a tile. Each resource tile has a 
 * resource type and a number associated.
 * @param props information about the tile passed through, typically from the backend server.
 */
const ResourceTile: React.FC<HexProp> = ({ hex, index, tile, gamestate, updateState, 
    showPotenialBuildOptions, selectedRoad, callBackend }) => {


    /**
     * Used to index the community space.
     */
    type numberKey = keyof typeof tile.community_spaces

    const edgeLength = 10;
    const angles = [270, 330, 30, 90, 150, 210];
    const [roads, setRoads] = useState<Road_Display_Data[]>([]);
    const [settlements, setSettlements] = useState<Settlement_Display_Data[]>([]);

    useEffect(() => {
        let newRoads = [];
        let newSettlements = [];

        for (let i = 0; i < 6; i++) {
            const angleDeg = angles[i]; 
            const angleRad = Math.PI / 180 * angleDeg;

            const startX = edgeLength * Math.cos(angleRad);
            const startY = edgeLength * Math.sin(angleRad);
            const endX = edgeLength * Math.cos(angleRad + Math.PI / 3);
            const endY = edgeLength * Math.sin(angleRad + Math.PI / 3);

            let key = translateToNumberKey(i);
            let communitySpaceData = gamestate.gameboard.tiles[index].community_spaces[key];

            let isValidPotientialCommunityVertex = gamestate.client.potential_communities.some(community => 
                community.tile_index === index && community.vertex === i);

            //if there is a potential community
            if ((showPotenialBuildOptions.settlements && isValidPotientialCommunityVertex)) {
                 newSettlements.push({
                    x: startX, 
                    y: startY, 
                    level: 0, 
                    color: 'grey',
                    vertex: i
                });
            //owned communtiy
            } else if (communitySpaceData.level > 0){
                newSettlements.push({
                    x: startX, 
                    y: startY, 
                    level: communitySpaceData.level, 
                    color: communitySpaceData.color,
                    vertex: i
                });
            }

            let isValidPotientialRoadEdge = gamestate.client.potential_roads.some(road => 
                road.tile_index === index && road.edge === i);

            newRoads.push({
                startX: startX, 
                startY: startY, 
                endX: endX, 
                endY: endY,
                color:  (showPotenialBuildOptions.roads && isValidPotientialRoadEdge) ? 'grey' : 
                    gamestate.gameboard.tiles[index].road_spaces[translateToNumberKey(i)]
            })
        }

        setRoads(newRoads);
        setSettlements(newSettlements);
    }, [gamestate, showPotenialBuildOptions.settlements, showPotenialBuildOptions.roads]); 


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


    //handle buying a road
    const handleEdgeClick = async (idx: road_keys, e: any) => {
        e.stopPropagation(); 

        if(!selectedRoad){
            const road : road_meta_data = {
                tile_index: index,
                edge: idx
            }
            const body: RoadRequest = {
                roadData: road,
                state: gamestate
            }

            if(gamestate.roundNumber > 2){
                callBackend("buyRoad", body)
            } else {
                callBackend("initialRoadPlacement", body);
            }  
        }

    };

     //handle buying a settlement
     const handleVertexClick = async (idx: community_keys, e: any) => {
        e.stopPropagation(); 
        if(showPotenialBuildOptions.settlements){ // were in 'buy' mode
            const settlement : community_meta_data = {
                tile_index: index,
                vertex: idx
            }
            const body: SettlementRequest = {
                settlementData: settlement,
                state: gamestate
            }
            if(gamestate.roundNumber > 2){

                callBackend("buySettlement", body)
            } else {
                callBackend("initialSettlementPlacement", body);

            }
        }
    };


    return (
        <Hexagon               
            key={index} 
            q={hex.q} 
            r={hex.r} 
            s={hex.s} 
            fill={tile.type} 
            >
            {roads.map((road, idx) => (
                <line
                    key={idx}
                    x1={road.startX}
                    y1={road.startY}
                    x2={road.endX}
                    y2={road.endY}
                    stroke={road.color}
                    strokeWidth="1"
                    onClick={(e) => handleEdgeClick(idx as road_keys, e)}
                />
            ))} 
            {settlements.map((settlement, idx) => (
                <React.Fragment key={idx} >
                    <circle
                        cx={settlement.x}
                        cy={settlement.y}
                        r="2"
                        fill={settlement.color}
                    />
                    <text
                        x={settlement.x}
                        y={settlement.y} 
                        fill="white" 
                        dominantBaseline="middle" 
                        textAnchor="middle" 
                        style={{ fontSize: '0.2rem', cursor: settlement.level === 0 ? 'pointer' : 'default'  }} 
                        onClick={(e) => handleVertexClick(settlement.vertex as community_keys, e)}
                    >
                        {settlement.level}
                    </text>
                </React.Fragment>
            ))}
            <circle cx="0" cy="0.5" r="3.5" fill="white"  />
            <Text style={{ fontSize: '0.3rem', dominantBaseline: "middle", textAnchor: "middle" }}>{tile.number_roll}</Text>  
        </Hexagon>
    );
}

export default ResourceTile;