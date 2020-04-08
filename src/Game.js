import React from 'react';
import Board from './Board';

//Using console.log and F12 way nicer than alert for msgs and vals
/*Added code for challenge 6: 
added isdraw boolean that is false unless sqaures fills up (no more nulls) w/o winner
then going to change status at top of page*/

function calculateWinner(squares) {
    //const maxsize = 9;
    //const arraysize = stepNumber + 1;
    //console.log(arraysize);
    /*for(let j = 0; j < squares.length; j++){
      console.log(squares[j]);
    }
    */
    //console.log(typeof squares);
    
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
    //console.log(squares.length); Always 9 
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        //See what is in all these squares (they are the winning player and return only 1 X or O for winner)
        /* can't set the props like that. Will have to look into something else
        console.log(squares[a]);
        console.log(squares[b]);
        console.log(squares[c]);
        squares[a].props.boldSquare = true;
        squares[b].props.boldSquare = true;
        squares[c].props.boldSquare = true;
        */
       //Might need to return more than just the value in X and use that for boldSquare logic?
       //Return the winner like before and also the line that won
       //Put Draw logic below this for challenge6
        return {
        winner: squares[a],
        winLine: lines[i],
        isDraw: false
        };
      } else if(!squares.includes(null)){
        return {
          winner: null,
          winLine: null,
          isDraw: true
        };
      }
    }
    //Need to change return null to this otherwise error for winner.winner undefined
    return {
      winner: null,
      winLine: null,
      isDraw: false
    };
  }
  

class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
        }],
        stepNumber: 0,
        xIsNext: true,
        isToggle: false
      };
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0,this.state.stepNumber + 1);
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      //console.log(`${squares.length} sqaures length`); always 9
      //console.log(`${current.length} current length`); always undefined
      //console.log(`${history.length} history length`); always stepnumber+1
      //console.log(this.state.stepNumber);

      //If winner or sqaures[i] is not null just return 
      //Need to add .winner since calculateWinner returns an array now 
      if (calculateWinner(squares).winner || squares[i]) {
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
        xIsNext: !this.state.xIsNext
      });
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
  
    }

    //Code to Switch Toggle
    toggleSwitch(){
      //let flipVar = this.state.isToggle;
      //flipVar = 1 - flipVar;
      //alert(flipVar);
      this.setState({
        //history: history.reverse(), This makes the history array flip and the end of the history array is null soooo not right
        isToggle: !this.state.isToggle
        //isToggle: flipVar
      });
      //alert('toggle flip');
    }
    
    render() {
      //alert(this.isToggle); returns undefined because isToggle is part of this.state
      //alert(this.state.isToggle);
      const history = this.state.history;
      //console.log(this.state.stepNumber);
      const current = history[this.state.stepNumber];
      const { winner,winLine, isDraw } = calculateWinner(current.squares);
      //console.log(typeof(winner));

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
      } else if (isDraw){
        status = 'Draw!';
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      
      //Code to change color on button when toggled. Change text inside button as well Challenge 4
      //1 will be Desc and 0 is asc. Asc is normal func already implemented, so In constructutor I made 0 default
      let toggleButton = '';
      let toggleButtonText = 'ASC';
      //if(this.state.isToggle)
      if(this.state.isToggle){
        //alert('change color');
        toggleButton ='button--toggleOn';
        toggleButtonText = 'DESC';
        moves.reverse(); //Reverse changes the actual elements in moves so not immutable
      }

      //let toggle;
      //Expected an assigment of function call and instead saw an expression
      /* Move code to return of Render
      <button id='toggle' onClick= {()=> alert("Hello")}>
        toggle
      </button>
      */
      //add a toggle button below... Is this the right place? IDK yet, but onclick reverse moves
      //Also Not sure if I alert moves here if it will rerender or not.
      // All logic is above in render, not in the return of render. 
      //Call toggleFlip code that just flips isToggle from 1 to 0 when button is clicked. 
      //warning on line 190 that each child in a list should have a unique key prop
      return (
        <div className="game">
          <div className="game-board"> 
            <Board
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              boldSquares={winLine}
            />
          </div>
          <div className="game-info">
            <div>{ status }</div>
            <div>
            <button className = {toggleButton} onClick = {() => this.toggleSwitch()}>
              {toggleButtonText}
            </button>
            </div>
            <ol>{ moves }</ol>
          </div>
        </div>
      );
    }
  }

  export default Game;