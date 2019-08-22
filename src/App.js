import React from "react";
import "./App.css";
import TicTacToe, { X, O, DRAW } from "./components/tic-tac-toe";
import { throwStatement } from "@babel/types";

/**
 * Supporting an N*N Tic-tac-toe board
 */
class App extends React.Component {
  state = {
    size: 3,
    result: null
  };
  arr = new Array(8).fill(0);

  resetHandler = () => {
    this.setState({
      result: null
    });
  };
  resultHandler = result => {
    this.setState({
      result
    });
  };
  sizeChangeHandler = event => {
    const value = event.target.value;
    if (!value) return;
    const size = parseInt(value);
    if (size < 3 || size > 25) return;
    this.setState({
      size
    });
  };
  render() {
    const { size, result } = this.state;
    let resultText = null;
    if (result === DRAW) {
      resultText = "The game is a Draw";
    } else if (result === X || result === O) {
      resultText = `'${result}' has won the game`;
    }
    return (
      <div className="app">
        <h1 className="title">Tic Tac Toe</h1>
        <span>Please select the size of the board</span>
        <select onChange={this.sizeChangeHandler} select={size}>
          {this.arr.map((item, index) => {
            return (
              <option key={index} value={index + 3}>
                {index + 3}
              </option>
            );
          })}
        </select>
        <div className="result">{resultText}</div>
        <TicTacToe
          size={size}
          reset={this.resetHandler}
          resultHandler={this.resultHandler}
        />
      </div>
    );
  }
}

export default App;
