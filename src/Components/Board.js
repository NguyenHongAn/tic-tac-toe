import '../App.css';
import React from 'react';
import Square from './Square';

class Board extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        squares: this.props.squares,
        size: this.props.size,
        isXTurn: (this.props.step % 2) === 0,
        position: -1,
        maxSize: this.props.size,
        maxStep: 3,
      };
      this.CalculateWinner = this.CalculateWinner.bind(this);
      this.SaveHistory = this.props.save;
    }
  
    componentDidUpdate(preProps)
    {
      const {squares,restart,size} = this.props;
      if (restart !== preProps.restart)
      {
        this.setState({
          squares: squares,
          maxSize: size,
          isXTurn: (this.props.step % 2) === 0
        })
      }
    }
  
    IsDrawn = (squares) =>{
      return squares.every(value => value !==null);
    }

    CalculateWinner(squares, position, maxSize, maxStep)
    {
        let size = maxSize;
        let line =[];
        const i = Math.floor(position /size);
        const j = Math.floor(position % size);
        

        let matrix = [];
        for (let i =0 ; i< squares.length; i+= maxSize)
        {
          matrix.push(squares.slice(i,maxSize+i));
        }
        console.log(squares);
        //ngang
        for (let k = 0; k< size;k++)
        {
            if (squares[position] && matrix[i][k]===squares[position])
            {
              line.push(size*i+k);

            }
            else if(line.length !==0)
            {
              break;
            }
        }

        if (line.length >= maxStep)
        {
            return {
              msg: squares[position],
              line: line,
            }
        }
        line = [];
        //Doc
        for (let k = 0; k< size;k++)
        {
            if (squares[position] && matrix[k][j]===squares[position])
            {
              line.push(size*k+j);
            }
            else if(line.length !==0)
            {
              break;
            }
        }

        if (line.length >= maxStep)
        {
            return {
              msg: squares[position],
              line: line,
            };
        }
        //cheo tu trai sang phia
        line = [];
       
        let row = 0, col = 0;
        i>j? row = i-j: col = j-i;
        for(let k=0;k<maxSize;k++)
        {
            
            if(row+k < maxSize && col+k<maxSize)
            {
                if (squares[position] && matrix[row+k][col+k]===squares[position])
                {
                    line.push((row+k)*size + col+k);
                }
                else if(line.length !==0)
                {
                  break;
                }
            }
            else
            {
                break;
            }
        }
        
        if (line.length >= maxStep)
        {
            return {
              msg: squares[position],
              line: line,
            };
        }

        //cheo tu phai sang trai

        line = [];
        col =0;
        row = 0;  
        if (i + j > maxSize -1)
        {
          col = maxSize - 1;
          row = i+j - (maxSize -1);
        }
        else
        {
          col = i+j;
        }

        for(let k=0;k<maxSize;k++)
        {
            
            if(row + k <maxSize && col - k >= 0)
            {
                if (squares[position] && matrix[row + k][col - k]===squares[position])
                {
                    line.push((row+k)*maxSize +col -k);
                }
                else if(line.length !==0)
                {
                  break;
                }
            }
            else
            {
                break;
            }
        }

        if (line.length >= maxStep)
        {
            return {
              msg: squares[position],
              line: line,
            };
        }

        if (this.IsDrawn(squares))
        {
          const result = {
                 msg: "===== Draw =====",
                };
          return result;
        }

        return null;
    }
  
    HandleClick(i)
    {
      const {squares, isXTurn, position, maxSize, maxStep} = this.state;
      let newsquares = squares.slice();
      if (this.CalculateWinner(newsquares,position,maxSize,maxStep)|| newsquares[i])
      {
          return;
      }
      // is x turn

      if (isXTurn)
      {
        newsquares[i] = 'X';
      }
      else{
        newsquares[i] = "O";
      }
      
      this.setState({
        squares: newsquares,
        isXTurn: !this.state.isXTurn,
        position: i,
      });
      this.SaveHistory({
        squares: newsquares,
        pos: i
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
        if(winner.msg.length > 2)
        {
          status = winner.msg;
        }
        else
        {
          status = 'Winner: ' + winner.msg;
          console.log(winner.line);
        }
      }
      else{
        status = 'Next player: ' + (isXTurn ? 'X' : 'O');
      }
      
      return (
        <div>
          <div className="status">{status}</div>
          <div style={this.setGridStyle(this.state.maxSize)}>
          {
            squares.map((turn,i) => {
            return <Square key={i} value={turn} click={() => this.HandleClick(i)}
             class={
               (winner && winner.line && winner.line.includes(i))?
               "active":null
              }
             ></Square>
            }
             )
          }
          </div>
        </div>
      );
    }
  }
  

export default Board;