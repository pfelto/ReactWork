import React from 'react';

//Using console.log and F12 way nicer than alert for msgs and vals

function Square(props) {
  //See if props.value is 0-8 or X,O and null
  //console.log(props.value);
  //console.log(props.boldSquares); Returns nulls until winline is passed then true and falses
  const squareCss = props.boldSquares ? 'square--bold' : ''
  return (
    <button className={`${squareCss} square`} onClick={props.onClick}>
      {props.value}
    </button>
  );
}

  export default Square;