import React from 'react';
import style from './App.css';
import uuid from 'uuid';
import sudoku from 'sudoku-umd';

const Tile = props => ( <
    input type = "number"
    min = "1"
    max = "9"
    className = { style.Tile } defaultValue = { props.tile } onChange = { props.onChange(props.id) }

    />
)
const Board = props => ( <
        div className = { style.Board } > {
            props.tiles.map((tile) => { < Tile key = { uuid.v4() } id = { uuid.v4 } value = { tile } onChange = {
                        props.onChange
                    }
                    />})
                } <
                /div>); 
                class App extends React.Component {
                    constructor(props) {
                        super(props);
                        this.state = {
                            initialBoard: sudoku.generate("easy", false),
                            board: ''
                        }
                    }
                    onChange(key) {
                        console.log('board ', this.state.board);
                    }
                    newGame() {
                        this.setState({ initialBoard: sudoku.generate("easy", false) });
                        console.log('initialBoard ', this.state.initialBoard);
                        this.setState({ board: this.state.initialBoard.split("") });
                        console.log('board ', this.state.board);
                    }
                    renderBoard() {
                        return <
                            Board tiles = { this.state.board } onChange = { this.onChange.bind(this) }
                        / >
                    }
                    render() {
                        return <
                            div className = { style.App } >
                            <
                            h1 > Sudoku < /h1>  { this.renderBoard() }

                            <
                            div className = { style.buttons } >
                            <
                            button > Check < /button> <
                        button onClick = { this.newGame.bind(this) } > New Game < /button> <
                        button > Solve < /button> <
                        button > Restart < /button> < /
                        div > <
                            /div>
                    }
                }

                export default App;