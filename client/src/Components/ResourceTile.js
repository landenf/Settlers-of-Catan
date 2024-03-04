import { HexGrid, Layout, Hexagon, Text, GridGenerator, HexUtils, Pattern } from 'react-hexgrid';
import { Tile_Resources } from '../StaticData/GameBoardStatic';

// ResourceTile component renders a single hexagon tile on the game board.
const ResourceTile = (props) => {

    // handleClick function defines the behavior when a tile is clicked.
    // Change to trigger backend function
    const handleClick = () => {
        console.log(`Tile ${props.index} Clicked `); 
    };
    
    // DetermineResource function maps the tile's index to a specific resource
    const determineResource = () => {
        return Tile_Resources[props.index]; // Get resource for current tile
    };

    return (
        <Hexagon
            onClick={() => handleClick()} 
            key={props.mapProps + props.index} 
            q={props.hex.q} // Column coordinate of the hexagon
            r={props.hex.r} // Row coordinate of the hexagon
            s={props.hex.s} // Diagonal coordinate of the hexagon, for hexagonal grid calculations
            fill={determineResource()} 
        >
            {/* Small circle and text within the hexagon to indicate the tile's number */}
            <circle cx="0" cy="0.5" r="3.5" fill="white" />
            <Text style={{ fontSize: '0.3rem', dominantBaseline: "middle", textAnchor: "middle" }}>
                {props.index}
            </Text>
        </Hexagon>
    );
}

export default ResourceTile;
