import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Board from "./components/board.component";

interface GameState {
  history: any[];
  stepNumber: number;
  xIsNext: boolean;
}

class Game extends React.Component<any, GameState> {
  static calculateWinner(squares: string[] | null[]) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i += 1) {
      const [a, b, c] = lines[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  }

  constructor(props: any) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i: number) {
    this.setState((prevState) => {
      const { history } = prevState;
      const historyCopy = history.slice(0, prevState.stepNumber + 1);
      const current = historyCopy[historyCopy.length - 1];
      const squares = current.squares.slice();

      /** cancel the state change (maintain the same state) if a winner has already been decided,
       * or the square is already filled */
      if (Game.calculateWinner(squares) || squares[i]) {
        return {
          history,
          stepNumber: prevState.stepNumber,
          xIsNext: prevState.xIsNext,
        };
      }

      // else, update the new state
      squares[i] = prevState.xIsNext ? "X" : "O";

      return {
        history: historyCopy.concat([
          {
            squares,
          },
        ]),
        stepNumber: historyCopy.length,
        xIsNext: !prevState.xIsNext,
      };
    });
  }

  jumpTo(step: any) {
    this.setState({ stepNumber: step, xIsNext: step % 2 === 0 });
  }

  render() {
    const { history } = this.state;
    const current = history[this.state.stepNumber];
    const winner = Game.calculateWinner(current.squares);

    const moves = history.map((_, move) => {
      const desc = move ? `Go to move # ${move}` : "Go to game start";

      return (
        // eslint-disable-next-line react/no-array-index-key
        <li key={move}>
          <button type="button" onClick={() => this.jumpTo(move)}>
            {desc}
          </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = `Winner: ${winner}`;
    } else {
      status = `Next player: ${this.state.xIsNext ? "X" : "O"}`;
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i: any) => this.handleClick(i)}
          />
        </div>

        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Game />);
