import React from 'react';

import '../App.css';

function Square({squareStyle, click, value}) {
      const strClassName = squareStyle ? squareStyle + " square": "square";
      return (
        <button className={strClassName} onClick={click}>
          {value}
        </button>
      );
  }

export default Square;