import '../App.css';
import React from 'react';
import Square from './Square';

class Board extends React.Component {
    constructor(props) {
      super(props);
      const size = this.props.size;
      this.state = {
        squares: Array(size*size).fill(null),
        isXTurn: true,
        position: -1,
        maxSize: size,
        maxStep: 3,
      };
      this.CalculateWinner = this.CalculateWinner.bind(this);
    }
  
    componentDidUpdate(preProps)
    {
      const size = this.props.size;
      //console.log(`Change from ${preProps.restart} to ${this.props.restart}`);
      if (size !== preProps.size || this.props.restart !== preProps.restart)
      {
        this.setState({
          squares: Array(size*size).fill(null),
          maxSize: this.props.size,
        })
      }
    }
  
    CalculateWinner(squares, position, maxSize, maxStep)
    {
        let size = maxSize;
        const i = Math.floor(position /size);
        const j = Math.floor(position % size);
        let count = 0;
        //ngang
        for (let k = 0; k< size;k++)
        {
            if (squares[position] && squares[size*i+k]===squares[position])
            {
                count++;
            }
        }

        if (count === maxStep)
        {
            return squares[position];
        }
        count = 0;
        //Doc
        for (let k = 0; k< size;k++)
        {
            if (squares[position] && squares[size*k+j]===squares[position])
            {
                count++;
            }
        }
        if (count === maxStep)
        {
            return squares[position];
        }
        //cheo tu trai sang phia
        count = 0;
       
        let factor = Math.abs(i-j);
        j>i? size=1: size = maxSize;
        for(let k=0;k<maxSize;k++)
        {
            
            if(factor*size+ maxSize*k+k < squares.length)
            {
                if (squares[position] && squares[factor*size+ maxSize*k+k]===squares[position])
                {
                    count++;
                }
            }
            else
            {
                break;
            }
        }
        

        if (count === maxStep)
        {
            return squares[position];
        }

        //cheo tu phai sang trai

         count = 0;
        factor = i+j;
        i>j? size=1: size = maxSize;
        for(let k=0;k<maxSize;k++)
        {
            
            if((factor)+(size-1)*i + maxSize*k-k < squares.length)
            {
                if (squares[position] && squares[(factor)+(size-1)*i + maxSize*k-k]===squares[position])
                {
                    count++;
                }
            }
            else
            {
                break;
            }
        }
        

        if (count === maxStep)
        {
            return squares[position];
        }

        return null;
    }
  
    HandleClick(i)
    {
      let {squares, isXTurn, position, maxSize, maxStep} = this.state;
      squares = squares.slice();
      if (this.CalculateWinner(squares,position,maxSize,maxStep)|| squares[i])
      {
          return;
      }
      // is x turn

      if (isXTurn)
      {
        squares[i] = 'X';
      }
      else{
        squares[i] = "O";
      }
      
      this.setState({
        squares: squares,
        isXTurn: !this.state.isXTurn,
        position: i,
      });
    }
  
    setGridStyle(maxSize)
    {
      return {
  
        "justifyContent": "center",
        "display": "grid",
        "gridTemplateColumns":`repeat(${maxSize},4em)` ,
        "gridTemplateRows": `repeat(${maxSize},4em)`,
      }
    }
  
    render() {
      const {squares, isXTurn, position, maxSize, maxStep} = this.state;
      const winner = this.CalculateWinner(squares, position, maxSize, maxStep);
      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      }
      else{
        status = 'Next player: ' + (isXTurn ? 'X' : 'O');
      }
      
      return (
        <div>
          <div className="status">{status}</div>
          <div style={this.setGridStyle(this.state.maxSize)}>
          {
            squares.map((turn,i) => <Square key={i} value={turn} click={() => this.HandleClick(i)} ></Square>)
          }
          </div>
        </div>
      );
    }
  }
  

export default Board;