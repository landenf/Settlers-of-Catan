import React, { useState, useEffect, useCallback } from 'react';
import { HexGrid, Layout, Hexagon, Text, GridGenerator, HexUtils, Pattern } from 'react-hexgrid';
import { GameBoardConfiguration } from '../StaticData/GameBoardStatic';
import Patterns from '../Styles/Patterns';
import ResourceTile from './ResourceTile';

const GameBoard = () => {
  const BoardGenerator = GridGenerator.getGenerator('hexagon');
  const initialHexagons = BoardGenerator.apply(null, GameBoardConfiguration.mapProps as any);
  const [hexagons, setHexagons] = useState(initialHexagons);
  const [config, setConfig] = useState(GameBoardConfiguration);
  const layout = config.layout;
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
