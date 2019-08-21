import React from "react";
import "./tic-tac-toe.css";

const X = "X";
const O = "0";
const DRAW = "Draw";

export default class TicTacToe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: [[]],
      result: null
    };
  }

  componentDidMount() {
    this.init();
  }

  init = () => {
    const { size } = this.props;
    //declaring an instance variable to maintain the next turn X or O
    this.nextStep = X;
    //declaring an instance variable to check if the gqame is a draw
    this.count = 0;
    //filling the 2d array of size N x N with null
    let grid = new Array(size).fill(null);
    grid = grid.map(() => new Array(size).fill(null));
    this.setState({ grid, result: null });
  };

  cellClickHandler = event => {
    const { grid, result } = this.state;
    const { size } = this.props;
    const { row, col } = event.target.dataset;

    /**
     * Tic-tac-toe cells have row and col data props. If the row and col values are undefined
     * that means the click event can be ignored
     */
    if (!row || !col) {
      return;
    }
    /**
     * If grid[row][col] already contains either X or O then simply return
     */
    if (grid[row][col]) {
      return;
    }
    /**
     * If the result for this game is already decided then stop the game
     */
    if (result) {
      return;
    }

    grid[row][col] = this.nextStep;
    this.nextStep = this.nextStep === X ? O : X;

    this.count++;
    const newGrid = [...grid];
    this.setState({
      grid: newGrid
    });

    /**
     * winning case - Check the row and the column corresponding to the cell that was
     * clicked and the diagonals as this reduces time complexity to O(N) rather than checking
     * the entire grid which increases the time complexity to O(N^2)
     * */
    if (this.checkWinner(newGrid, row, col, size)) {
      this.setState({
        result: newGrid[row][col]
      });
    } else if (this.count === size * size) {
      //draw case
      this.setState({
        result: DRAW
      });
    }
  };

  // time complexity O(N)
  checkWinner = (...args) => {
    if (this.checkRow(...args)) {
      return true;
    }
    if (this.checkColumn(...args)) {
      return true;
    }
    if (this.checkDiagonal(...args)) {
      return true;
    }
    if (this.checkRDiagonal(...args)) {
      return true;
    }
    return false;
  };

  checkRow = (grid, row, col, n) => {
    //check row
    const first = grid[row][0];
    if (!first) return false;

    for (let i = 1; i < n; i++) {
      let current = grid[row][i];
      if (first !== current) {
        return false;
      }
    }
    return true;
  };

  checkColumn = (grid, row, col, n) => {
    //check column
    const first = grid[0][col];
    if (!first) return false;

    for (let i = 1; i < n; i++) {
      let current = grid[i][col];
      if (first !== current) {
        return false;
      }
    }
    return true;
  };

  checkDiagonal = (grid, row, col, n) => {
    //check diagonal starting from [0,0]
    const first = grid[0][0];
    if (!first) return false;

    for (let i = 1, j = 1; i < n && j < n; i++, j++) {
      let current = grid[i][j];
      if (first !== current) {
        return false;
      }
    }
    return true;
  };

  checkRDiagonal = (grid, row, col, n) => {
    //check other diagonal starting from [0, N-1]
    const first = grid[0][n - 1];
    if (!first) return false;

    for (let i = 1, j = n - 2; i < n && j >= 0; i++, j--) {
      let current = grid[i][j];
      if (first !== current) {
        return false;
      }
    }
    return true;
  };

  render() {
    const { grid, result } = this.state;
    let resultText = null;
    if (result === DRAW) {
      resultText = "The game is a Draw";
    } else if (result === X || result === O) {
      resultText = `'${result}' has won the game`;
    }
    return (
      <div className="board">
        <table onClick={this.cellClickHandler}>
          <tbody>
            {grid.map((row, rowIndex) => {
              return (
                <tr key={rowIndex}>
                  {row.map((item, colIndex) => {
                    let className = item ? "" : "empty";
                    className = result ? "" : className;
                    return (
                      <td
                        className={className}
                        data-row={rowIndex}
                        data-col={colIndex}
                        key={colIndex}
                      >
                        {item}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="result">{resultText}</div>
        <button onClick={this.init}>Restart</button>
      </div>
    );
  }
}
