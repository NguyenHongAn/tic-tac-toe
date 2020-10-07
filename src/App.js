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
    };
    this.SetBoardSize = this.SetBoardSize.bind(this);
  }

  SetBoardSize(size)
  {
    console.log(size);
    this.setState({
      maxSize: size,
      restart: !this.state.restart,
    });
  }

  render()
  {
    const size = this.state.maxSize;
  
  return (
    <div className="App">
      <header className="App-header">   
            <h2> TIC - TAC - TOE GAME </h2>
            <div>
              
            <button className="restart-btn" onClick={() =>{this.SetBoardSize(size)}}> Restart </button>
            <div className="dropdown">
            <button className="dropbtn">Board Size</button>
            <div className="dropdown-content">
              <button onClick={() =>{this.SetBoardSize(3)}}>3x3</button>
              <button onClick={() =>{this.SetBoardSize(4)}}>4x4</button>
              <button onClick={() =>{this.SetBoardSize(5)}}>5x5</button>
            </div>
          </div>
            </div>
          
      </header>

      <div className="game">
        <div className="game-board">
          <Board size={this.state.maxSize} restart={this.state.restart}/>
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    </div>
  );
  }
}

export default App;
