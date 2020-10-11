import React from 'react';
import './App.css';
import Board from './Components/Board';


class App extends React.Component {

  constructor(props)
  {
    super(props);
    this.state ={
      maxSize: 3,
      restart: false,
      history:[
        {
          squares: Array(9).fill(null),
          pos:-1,
        },
      ],
      stepNumber: 0,
    };
    this.SaveHistory =this.SaveHistory.bind(this);
    this.SetBoardSize = this.SetBoardSize.bind(this);
    this.JumpToMove = this.JumpToMove.bind(this);
    this.SortListOfMoves = this.SortListOfMoves.bind(this);
  }

  SaveHistory =(newSquares) =>
  {
    //B1: copy variable
    const {history, stepNumber} = this.state;
    let newHistory = history.slice(0, stepNumber +1);
    
    //B2: push in history's list
    newHistory.push(newSquares);
    this.setState({
      history: newHistory,
      stepNumber: newHistory.length - 1
    });
    console.log({history: newHistory});
  }

  SetBoardSize(size)
  {
    //debug
    this.setState({
      maxSize: size,
      restart: !this.state.restart,
      history: [
        {
          squares: Array(size*size).fill(null),
          pos: -1,
        }
      ],
      stepNumber: 0,
    });
  }

  JumpToMove = (move) =>{
    this.setState({
      stepNumber: move,
      restart: !this.state.restart,
    });
  }

  SortListOfMoves = (e)=>{
    //B1: copy variable
    const {history, maxSize} = this.state;
    let sortedHistory = [];

    //B2: sorted by ascend or descend
    if (e.target.value === "Ascend")
    {
      sortedHistory = history.sort((a,b)=>{
        return a.pos-b.pos;
      });
    }
    else if(e.target.value==="Descend")
    {
      sortedHistory = history.sort((a,b)=>{
        return b.pos -a.pos;
      });
    }
    else{
      sortedHistory.push({
          squares: Array(maxSize*maxSize).fill(null),
          pos: -1,
        });
    }

    //B3: re-render for game
    this.setState({
      history: sortedHistory,
    })
  }

  render()
  {
    const {maxSize, restart, history, stepNumber} = this.state;
    console.log(stepNumber)
    const squares = history[stepNumber].squares;
    return (
    <div className="App">
      <header className="App-header">   
            <h2> TIC - TAC - TOE GAME </h2>
            <div>
              
            <button className="restart-btn" onClick={() =>{this.SetBoardSize(maxSize)}}> Restart </button>
            <div className="dropdown">
            <button className="dropbtn">Board Size</button>
            <div className="dropdown-content">
              <button onClick={() =>{this.SetBoardSize(3)}}>3x3</button>
              <button onClick={() =>{this.SetBoardSize(4)}}>4x4</button>
              <button onClick={() =>{this.SetBoardSize(5)}}>5x5</button>
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
                  return <button onClick={()=>{this.JumpToMove(move)}}>
                    {
                      stepNumber === move? (<b>Go to move #{move} {desc}</b>): `Go to move #${move} ${desc}`
                    }
                    </button>
                })
              }
              
            </div>
          </div>
          <select id="sort" onChange={(e) => this.SortListOfMoves(e)}>
            <option name="none" defaultValue="None">None</option>
            <option name="Ascend" value="Ascend">Ascend</option>
            <option ame="Descend" value="Descend">Descend</option>
          </select>
        </div>
          
      </header>

      <div className="game">
        <div className="game-board">
          <Board squares={squares} size={maxSize} restart={restart} save={this.SaveHistory} step={stepNumber}/>
        </div>
        
      </div>
    </div>
  );
  }
}

export default App;
