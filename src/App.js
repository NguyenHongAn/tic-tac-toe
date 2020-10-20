import React, {useState} from 'react';
import './App.css';
import Board from './Components/Board';


function App() {

  // constructor(props)
  // {
  //   super(props);
  //   this.state ={
  //     maxSize: 3,
  //     restart: false,
  //     history:[
  //       {
  //         squares: Array(9).fill(null),
  //         pos:-1,
  //       },
  //     ],
  //     stepNumber: 0,
  //   };
  //   this.SaveHistory =this.SaveHistory.bind(this);
  //   this.SetBoardSize = this.SetBoardSize.bind(this);
  //   this.JumpToMove = this.JumpToMove.bind(this);
  //   this.SortListOfMoves = this.SortListOfMoves.bind(this);
  // }

  const [maxSize, setMaxSize] = useState(3);
  const [restart, setRestart] = useState(false);
  const [stepNumber, setStepNumber] = useState(0);
  const [history, setHistory] = useState([{
                                            squares: Array(9).fill(null),
                                            pos:-1,
                                        }]);

  // save history just checked                                      
  const saveHistory = (newSquares) =>
  {
    //B1: Immuatable copy variable

    //const {history, stepNumber} = this.state;
    let newHistory = Array.from(history).slice(0, stepNumber +1);
    
    //B2: push in history's list
    newHistory.push(newSquares);
    
    setHistory(newHistory);
    setStepNumber(newHistory.length - 1);
   
  }

  //set board size with new size and re-render App
  const setBoardSize = (size) =>
  {
    
    
      setMaxSize(size);
      setRestart(restart);
      setHistory([
        {
          squares: Array(size*size).fill(null),
          pos: -1,
        }
      ])
      setStepNumber(0);
    
  }

  const jumpToMove = (move) =>{  
      setStepNumber(move);
      setRestart(!restart);
  }

  //sort list of moves with escend or descend
  const sortListOfMoves = (e) =>{
    //B1: copy variable
    const temp = Array.from(history);
    let sortedHistory = [];

    //B2: sorted by ascend or descend
    if (e.target.value === "Ascend")
    {
      sortedHistory = temp.sort((a,b)=>{
        return a.pos-b.pos;
      });
    }
    else if(e.target.value==="Descend")
    {
      sortedHistory = temp.sort((a,b)=>{
        return b.pos -a.pos;
      });
    }
    else{
      sortedHistory =temp;
    }

    //B3: re-render for game
    
    setHistory(sortedHistory);
    
  }

    //const {maxSize, restart, history, stepNumber} = this.state;
    //console.log(stepNumber)
    let squares = history[stepNumber].squares;
    if (squares.every(square=> square === null))
    {
      squares = history[0].squares;
    }
    return (
    <div className="App">
      <header className="App-header">   
            <h2> TIC - TAC - TOE GAME </h2>
            <div>
              
            <button className="restart-btn" onClick={() =>{setBoardSize(maxSize)}}> Restart </button>
            <div className="dropdown">
            <button className="dropbtn">Board Size</button>
            <div className="dropdown-content">
              <button onClick={() =>{setBoardSize(3)}}>3x3</button>
              <button onClick={() =>{setBoardSize(4)}}>4x4</button>
              <button onClick={() =>{setBoardSize(5)}}>5x5</button>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">History</button>
            <div className="dropdown-content">
              {
                history.map((step, move)=>{
                  const pos = step.pos;
                  let desc = "";
                  if(pos !== -1)
                  {
                    desc += ` (${Math.floor(pos/maxSize)}, ${pos%maxSize})`;
                  }
                  return <button key={move} onClick={()=>{jumpToMove(move)}}>
                    {
                      stepNumber === move? (<b>Go to move #{move} {desc}</b>): `Go to move #${move} ${desc}`
                    }
                    </button>
                })
              }
              
            </div>
          </div>
          <select id="sort" onChange={(e) => sortListOfMoves(e)}>
            <option name="none" defaultValue="None">None</option>
            <option name="Ascend" value="Ascend">Ascend</option>
            <option ame="Descend" value="Descend">Descend</option>
          </select>
        </div>
          
      </header>

      <div className="game">
        <div className="game-board">
          <Board squares={squares} size={maxSize} restart={restart} save={saveHistory} step={stepNumber}/>
        </div>
        
      </div>
    </div>
  );
  
}

export default App;
