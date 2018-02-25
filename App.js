import React from "react";
import style from "./App.css";
import uuid from "uuid";
import sudoku from "sudoku-umd";

const Tile = props => (
    <input
        type="number"
        min="1"
        max="9"
        className={style.Tile}
        defaultValue={props.value}
        onChange={props.onChange(props.id, props.value)}
        disabled={props.value == "." ? false : true}
    />
);
const Board = props => (
    <div className={style.Board}>
        {props.tiles.map(tile => {
            return (
                <Tile key={uuid.v4()} value={tile} onChange={props.onChange} />
            );
        })}
    </div>
);
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            initialBoard:
                ".................................................................................",
            board: []
        };
        this.setState({ board: this.state.initialBoard.split("") });
        console.log("board ", this.state.initialBoard);
    }
    onChange(key, value) {
        console.log("board ", key, " ", value);
        console.log(this.state.board[key]);
    }
    newGame() {
        const level = prompt(
            "Wybierz poziom trudności easy medium hard very-hard insane inhuman"
        );
        this.setState({ initialBoard: sudoku.generate(level, false) });
        console.log("initialBoard ", this.state.initialBoard);
        this.setState({ board: this.state.initialBoard.split("") });
        console.log("board ", this.state.board);
    }
    restart() {
        this.setState({ board: this.state.initialBoard.split("") });
    }
    solve() {
        this.setState({
            board: sudoku.solve(this.state.initialBoard).split("")
        });
    }
    check() {
        if (this.state.board == sudoku.solve(this.state.initialBoard).split(""))
            alert("Sudoku rozwiązane");
        else alert("Sudoku ma błąd");
    }
    renderBoard() {
        return (
            <Board
                tiles={this.state.board}
                onChange={this.onChange.bind(this)}
            />
        );
    }
    render() {
        return (
            <div className={style.App}>
                <h1> Sudoku </h1> {this.renderBoard()}
                <div className={style.buttons}>
                    <button onClick={this.check.bind(this)}> Check </button>
                    <button onClick={this.newGame.bind(this)}>New Game</button>
                    <button onClick={this.solve.bind(this)}> Solve </button>
                    <button onClick={this.restart.bind(this)}> Restart </button>
                </div>
            </div>
        );
    }
}

export default App;
