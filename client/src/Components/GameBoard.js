import React, { useState } from 'react';
import { HexGrid, Layout, Hexagon, Text, GridGenerator, HexUtils, Pattern } from 'react-hexgrid';
import { GameBoardConfiguration } from '../StaticData/GameBoardStatic';
import Patterns from '../Styles/Patterns';
import ResourceTile from './ResourceTile';

// GameBoard component to render a hexagonal grid game board.
const GameBoard = () => {
  // BoardGenerator is a function to generate the layout of the hexagons based on the game board configuration.
  const BoardGenerator = GridGenerator.getGenerator(GameBoardConfiguration.map);
 
  // Generates the initial layout of hexagons for the game board using the configuration specified in GameBoardConfiguration.
  const initialHexagons = BoardGenerator.apply(null, GameBoardConfiguration.mapProps);

  // useState hook to manage the state of hexagons (layout of hexagons) on the game board.
  const [hexagons, setHexagons] = useState(initialHexagons);

  // useState hook to manage the game board configuration state.
  const [config, setConfig] = useState(GameBoardConfiguration);

  // Extracts the layout configuration for the hexagons.
  const layout = config.layout;
  
  // size object specifies the dimensions of each hexagon based on the layout configuration.
  const size = { x: layout.width, y: layout.height };

  return (
    <div id='GameBoard' style={{textAlign: 'center'}}>
      <hr />
      <HexGrid width={config.width} height={config.height} >
        <Patterns/>
        <Layout size={size} flat={layout.flat} spacing={layout.spacing} origin={config.origin}>
          {hexagons.map((hex, i) => (
            <ResourceTile 
              key={`tile-${i}`} 
              hex={hex} 
              index={i}
            />
          ))}
        </Layout>
      </HexGrid>
    </div>
  );
}

export default GameBoard;
