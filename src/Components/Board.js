import '../App.css';
import React, {useState, useEffect} from 'react';
import Square from './Square';

function Board(props) {
    
    const [squares, setSquares] = useState(props.squares);

    const [isXTurn, setIsXTurn] = useState(props.step % 2);
    const [position, setPosition] = useState(-1);
    const maxSize = props.size;
    const maxStep = 3;
    const saveHistory = props.save;
    

    useEffect(() =>{
      console.log("Sqqqq");
      setSquares(props.squares);
      setIsXTurn(props.step % 2 === 0);
    }, [props.restart, props.squares, props.step]);
  
    //Check if match is draw or not
    // input: squares = array of symbol which is represent for position of X or O in board
    const IsDrawn = (squares) =>{
      return squares.every(value => value !==null);
    }

    // Check if we have a winner or not 
    //
    //
    //
    //
    //return: null if game isn't finnish or object{
    //  msg: {X,O} if we have winner or string "======= Draw ======="
    //  line: array of position of winning line
    //};
    //  
    const CalculateWinner = (squares, position, maxSize, maxStep) =>
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

        if (IsDrawn(squares))
        {
          const result = {
                 msg: "===== Draw =====",
                };
          return result;
        }

        return null;
    }
  
    const HandleClick = (i) =>
    {
      //const {squares, isXTurn, position, maxSize, maxStep} = this.state;
      
      //B1: Immutable 
      //create temp array and slice it 
      let newsquares = Array.from(squares).slice();

      //B2: Check if the game is finnish or not and this position was checked of not
      if (CalculateWinner(newsquares,position,maxSize,maxStep)|| newsquares[i])
      {
          return;
      }

      //B3: declare turn 
      // is x turn
      if (isXTurn)
      {
        newsquares[i] = 'X';
      }
      else{
        newsquares[i] = "O";
      }
      
      //B4; update state and re-render component
        setSquares(newsquares);
        setIsXTurn(!isXTurn);
        setPosition(i);
      
      saveHistory({
        squares: newsquares,
        pos: i
      });
    }
  
    const setGridStyle = (maxSize) =>
    {
      return {
  
        "justifyContent": "center",
        "display": "grid",
        "gridTemplateColumns":`repeat(${maxSize},4em)` ,
        "gridTemplateRows": `repeat(${maxSize},4em)`,
      }
    }
  
    
      //const {squares, isXTurn, position, maxSize, maxStep} = this.state;
      const tempSquares = Array.from(squares);
      const winner = CalculateWinner(tempSquares, position, maxSize, maxStep);
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
          <div style={setGridStyle(maxSize)}>
          {
            squares.map((turn,i) => {
            return <Square key={i} value={turn} click={() => HandleClick(i)}
             squareStyle={
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
  

export default Board;