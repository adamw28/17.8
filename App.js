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
        onChange={()=>(props.onChange(props.id,props.value)) }
        disabled={props.value == "." ? false : true}
    />
);
let id=-1;
const Board = (props,id) => (
    <div className={style.Board}>
        {props.tiles.map((tile,id) => {
            return (
                <Tile key={uuid.v4()} value={tile} id={id} onChange={props.onChange} />
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
    }
    componentDidMount() {
        this.setState({ board: this.state.initialBoard.split("")});
    }
    onChange(id, value) {
        this.setState({board:this.state.board.map((item,index)=>{
            if(index==id){
                return value
            }
            return item
        })});
        console.log('id',this.state.board[id]);
        console.log("board ", id, " ", value);
    }
    newGame() {
        const level = prompt(
            "Wybierz poziom trudności easy medium hard very-hard insane inhuman"
        );
        const initial = sudoku.generate(level, false);
        this.setState({
            initialBoard: initial,
            board: initial.split("")
        });
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
