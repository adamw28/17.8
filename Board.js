import React from 'react';
import style from './App.css';
import uuid from 'uuid';
import Tile from './Tile'



const Board = props => (

               	props.tiles.map((tile) => {
                        return ( < Tile key = { uuid.v4() } tile = { tile }
                        > </Tile>);
                        })
                
        );

        export default Board;