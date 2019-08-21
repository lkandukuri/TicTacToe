import React from "react";
import "./App.css";
import TicTacToe from "./components/tic-tac-toe";

/**
 * Supporting an N*N Tic-tac-toe board
 */
function App() {
  return (
    <div className="app">
      <h1 className="title">Tic Tac Toe</h1>
      <TicTacToe size={3} />
    </div>
  );
}

export default App;
