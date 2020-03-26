import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
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
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0,this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        //Add code to store the index of the latest square to be clicked
        latestMoveSquare: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });

  }
  
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    
    const moves = history.map((step,move) => {
      //save the latest square clicked into a const
      const lastestMoveSquare = step.latestMoveSquare;
      //logic to take latest square (remember values 0-8 from first step) 
      //and covert to (row,col) based on row = quotient by 3 and  col = remainder by 3
      const row = 1 + (Math.floor(lastestMoveSquare/3));
      const col = 1 + lastestMoveSquare % 3;

      //Strings can be enclosed in '' or "" or ``. `` let us use ${} to embed any expression!
      const desc = move ?
        `Go to move #${move} (${row},${col})` :
        'Go to game start';

      // code to see what move is and what stepNumber is for bold
      //alert(`move is ${move}`);
      //alert(`stepNumber is ${this.state.stepNumber}`);
      //Add code here to check if move === StepNumber and if so highlight button
      /* Tried using JS string function bold to make desc bold but doesn't seem to work
      alert(`desctype is ${typeof desc}`);
      alert(`desc is ${desc}`);
      //alert(`desc is ${desc.bold()}`);
      if(move === this.state.stepNumber){
        desc.bold();
      }*/
      
      //Code below uses a .css apporach to make button different style if it is selected
      const classButton = move === this.state.stepNumber ?  'button--bold'  : '';

      return (
        //Add here to make bold? or above in logic of map function? 
        //className is used to specify a Css class
        <li key ={ move } >
          <button className={classButton} onClick= {() => this.jumpTo(move)}  >
            {desc}
            </button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{ moves }</ol>
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
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
