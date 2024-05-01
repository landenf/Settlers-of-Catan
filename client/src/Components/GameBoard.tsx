import React, { useState } from 'react';
import { HexGrid, Layout, Hexagon, Text, GridGenerator, HexUtils, Pattern } from 'react-hexgrid';
import { GameBoardConfiguration } from '../StaticData/GameBoardStatic';
import Patterns from '../Styles/Patterns';
import ResourceTile from './ResourceTile';
import { LimitedSession, Tile } from '@shared/types';
import { GameBoardActionsDisplay } from '../Pages/GameSession';
import { BackendRequest } from '../Enums/requests';

interface GameBoardProp {
  tiles: Tile[],
  gamestate: LimitedSession,
  updateState: (newState: LimitedSession) => void;
  showPotenialBuildOptions: GameBoardActionsDisplay;
  
  /**
   * Function to call the backend through the main websocket.
   */
  callBackend: (type: string, body: BackendRequest) => void;
}

/**
 * The gameboard where the magic happens. Rendered at the center of the screen,
 * it shows each individual tile, their resource type, and their number to roll.
 * @param props a boardstate often retrieved and modified in the backend
 */
const GameBoard: React.FC<GameBoardProp> = ({ tiles, gamestate, updateState, showPotenialBuildOptions, callBackend }) => {
  // generate hexagonal grid
  const BoardGenerator = GridGenerator.getGenerator('hexagon');
  const initialHexagons = BoardGenerator.apply(null, GameBoardConfiguration.mapProps as any);
  const [hexagons, setHexagons] = useState(initialHexagons);
  const [config, setConfig] = useState(GameBoardConfiguration);
  const layout = config.layout;
  const size = { x: layout.width, y: layout.height };


  return (
    <div id='GameBoard' style={{textAlign: 'center'}}>
      <HexGrid width={config.width} height={config.height} >
        <Patterns/>
        <Layout size={size} flat={layout.flat} spacing={layout.spacing} origin={config.origin}>
          {hexagons.map((hex, i) => (
            <ResourceTile 
              key={`tile-${i}`}
              hex={hex}
              index={i} 
              tile={tiles[i]}
              gamestate={ gamestate }
              updateState={updateState}
              showPotenialBuildOptions={showPotenialBuildOptions}
              callBackend={callBackend}
              />
          ))}
        </Layout>
      </HexGrid>
    </div>
  );
}

export default GameBoard;
