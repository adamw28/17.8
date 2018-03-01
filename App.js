import React from "react";
import style from "./App.css";
import uuid from "uuid";
import sudoku from "sudoku-umd";

class Tile extends React.Component{

    onInputChange(ev){
        this.props.onChange(this.props.id, ev.target.value);

    }
    render(){
        return(
            <input
                type="number"
                min="1"
                max="9"
                className={style.Tile}
                defaultValue={this.props.value}
                onChange={this.onInputChange.bind(this)}
                disabled={this.props.value == "." ? false : true}
            />
        )

    }
}

const Board = (props,id) => (
    <div className={style.Board}>
        {props.tiles.map((tile,id) => {
            return (
                <Tile key={uuid.v4()} value={tile} id={id} onChange={props.onChange} initial={props.initial}/>
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
        console.log(this.state.board)
    }
    newGame() {
        const initial = sudoku.generate('easy', false);
        this.setState({
            initialBoard: initial,
            board: initial.replace(/"."/g," ").split("")
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
                initial={this.state.initialBoard}
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
