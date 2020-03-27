import React from 'react';
import Square from './Square';

/*
Figure out a way to create a div board row every row and
call a renderSquare() 3 times per row then move to the next row
function printBoard(){
  let row = 0;
  let col = 0;

  for(;row < 3;row++){
    for(;col < 3;col++){
      <div className="board-row">
            {this.renderSquare(0)}
          </div>
    }
  }
}
*/
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

        //printBoard()
        
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

  export default Board;