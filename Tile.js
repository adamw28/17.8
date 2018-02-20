import React from 'react';
import style from './App.css';

const Tile = props => (
     <
        input type = "number"
        min = "1"
        max = "9"
        value = { props.tile }
        />
)

export default Tile;