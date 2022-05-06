import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Board from "./components/board.component";

class Game extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>

        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<Game />);
