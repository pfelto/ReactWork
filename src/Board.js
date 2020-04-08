import React from 'react';
import Square from './Square';

//Using console.log and F12 way nicer than alert for msgs and vals

class Board extends React.Component {
    renderSquare(i) {
      const winner = this.props.boldSquares;
      return (
        <Square
          value={this.props.squares[i]}
          onClick={() => this.props.onClick(i)}
          boldSquares={winner && winner.includes(i)}
        />
      );
    }

    /*Challenge 3 code
    Figure out a way to create a div board row every row and
    call a renderSquare() 3 times per row then move to the next row
    create 2 arrays one is boardTable with 3 arrays of 3 boardRow that has 3 rendered squares
    */
    printBoard (){
      //Tic tac toe is always 3by3, but can add a max size incase implement connect 4 or something
      //const boardSize = 3;
      let boardTable = [];
      //let buttonRow = []; prints 3 boards
      for(let row = 0;row < 3;row++){
        let boardRow = []; 
        for(let col = 0;col < 3;col++){
          //alert(row);
          //alert(col);
          boardRow.push(this.renderSquare((row * 3 + col)));
        }
      boardTable.push(<div key = {row} className="board-row">{boardRow}</div>);
      }
      //alert(row);

      /* All are undefined
      alert(boardTable[0][0]);
      alert(boardTable[0][1]);
      alert(boardTable[0][2]);
      alert(boardTable[1][0]);
      alert(boardTable[1][1]);
      alert(boardTable[1][2]);
      alert(boardTable[2][0]);
      alert(boardTable[2][1]);
      alert(boardTable[2][2]);
      */

     return boardTable;
    
    }

    render() {
      return (
        <div>
          {this.printBoard()}
        </div>
        
        /*
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
        */
      );
    }
  }

  export default Board;