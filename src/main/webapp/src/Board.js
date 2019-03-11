import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
    return (
        <button className = "square" onClick = {props.onClickMethod}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square
            value = {this.props.squares[i]}
            onClickMethod = {() => this.props.onClickMethodInBoard(i)}
        />;
    }

    render() {
        return (
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history : [{
                squares : Array(9).fill(null)
            }],
            xIsNext : true,
            stepNum : 0
        }
    }

    jumpTo(step) {
        // the unset variable history will remain the same
        this.setState({
            stepNum : step,
            xIsNext : (step % 2) == 0
        });
    }

    // append new square and assess winner; also if "go to step i" is clicked and stepNum is reset,
    // discard the latter steps
    handleClick(i) {
        // this is equivalent to Python [i:j]
        const history = this.state.history.slice(0, this.state.stepNum + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares)) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            // first squares is the key of a single entry map
            history : history.concat([{squares : squares}]),
            xIsNext : !this.state.xIsNext,
            stepNum : history.length
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNum];
        const winner = calculateWinner(current.squares);

        // map the history to a list of buttons shown horizontally
        const moves = history.map((squares, step) => {
            // description based on the step number
            const desc = step ? "Go to step #" + step : "Go to game start";
            return (
                // key is the built-in prop for list item
                <li key = {step}>
                    {/*onClick is built-in prop for button*/}
                    <button onClick = {() => this.jumpTo(step)}>{desc}</button>
                </li>
            );
        })

        let status;
        if (winner) {
            status = "Winner" + winner;
        } else {
            status = "Next Player: " + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares = {current.squares}
                        onClickMethodInBoard = {(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    {/*this orderes list exists on the right of board*/}
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
            // returning X or O to distniguish the calculateWinner
            return squares[a];
        }
    }
    // null indicates no winner yet
    return null;
}


