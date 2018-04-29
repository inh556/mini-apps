import React from 'react';
import ReactDom from 'react-dom';

function Players(props) {
  return (
    <form id="inputArea" >
      <input type="text" id="firstPlayer" placeholder="enter firstPlayer name" onChange={props.onChange} />
      <input type="text" id="secondPlayer" placeholder="enter secondPlayer name" onChange={props.onChange} />
      <input type="submit" name="submit" onClick={props.onClick}/>
    </form>
  )
}
function InfoArea(props) {
  return (
    <div id="infoArea">
      <div id="players">{props.firstPlayer.name} VS {props.secondPlayer.name}</div>
      <div id="scores">{props.firstPlayer.score} : {props.secondPlayer.score}</div>
      <div id="turn"></div>
    </div>
  )
}

function Square(props) {
  const row = props.row;
  const squares = row.map((square, index) =>
   <div key={index} id={props.id + index.toString()} name={square} className="square">{square}</div>
)
  return(
    <div className="rows" id={props.id}  onClick={props.onClick}>{squares}</div>
  )
}

function Board(props){
  const board = props.board;
  const rows= board.map((row, index) =>
    <Square key={index} row={row} id={index} onClick={props.onClick} />
  )
  return (
    <div id="board"> 
      {rows}
    </div>
  )
}
function Warning(props) {
  return <div id="warning">{props.warning}</div>
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstPlayer: {name: null, score: 0, mark: 'X'},
      secondPlayer: {name: null, score: 0, mark: 'O'},
      firstMover: null,
      winner: '',
      counter: 1,
      inputAvailable:true,
      warning: '',
      // shoud figure it out why Array.fill(Array.fill(null))is not working for two dimension array
      board: [
        [null, null, null, null, null,null,null],
        [null, null, null, null, null,null,null],
        [null, null, null, null, null,null,null],
        [null, null, null, null, null,null,null],
        [null, null, null, null, null,null,null],
        [null, null, null, null, null,null,null]
    ]
    };
    this.startNewGame = this.startNewGame.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSquare = this.handleSquare.bind(this);
  }

  componentDidMount() {
    //this.startNewGame();
  }
  handleSubmit(e) {
    e.preventDefault();

  }
  handleChange(e) {
    const player = this.state[e.target.id];
    player.name = e.target.value;
    this.setState({[e.target.id]: player})
  }
  startNewGame() {
    // reset board
    // reset record borad
    // reset firstmover
    // reset currentmover
    this.setState({inputAvailable: true});
    const board = this.state.board;
    for(let i = 0; i < board.length; i++) {
      for(let j = 0; j < board[i].length; j++) {
        board[i][j] = null;
      }
    }
   this.setState({counter: 1});
   this.setState({warning: ''});
   console.log(this.state);
  }
  checkRows() {
    const board = this.state.board;
    for(let i = board.length - 1; i >= 0; i--) {
      let sumOfMarks = 0;
      for(let j = 0; j < board[0].length; j++) {    
        if(board[i][j]){
          if(board[i][j] === board[i][j - 1]) {
            sumOfMarks += 1;
              if(sumOfMarks === 4) {
                return true;
              }
          } else {
            sumOfMarks = 1;
          }
        }
      }
    }
    return false;
  }
  checkColomns() {
    const board = this.state.board;
    for(var i = 0; i < board[0].length; i++) {
      var sumOfMarks = 1;
      if (board[board.length - 1][i]) {
        for (var j = board.length - 2; j >= 0; j--) {        
          if (board[j][i]) {
            if (board[j][i] === board[j+1][i]) {
              sumOfMarks +=1;
              if(sumOfMarks === 4) {
                // color
                return true;
              }
            } else {
              sumOfMarks = 1;
            }
          }
        }
      }
    }
    return false;
  }
  checkDiagnals() {
    const board = this.state.board;
    for(var i = -1; i <= 3; i++) {
      var sumOfMarks = 1;
      var column = i;
      for(var j = 1; j < board.length; j ++) {
        if(board[j][column]) {
            if(board[j][column] === board[j - 1][column - 1]){
                sumOfMarks += 1;
                if(sumOfMarks === 4) {
                return true;
                }
            } else {
                sumOfMarks = 1;
            }
        }
        column +=1;
      }
    }
    for(var m = 8; m >= 3; m--) {
      var sumOfMarks = 1;
      column = m;
      for(var k = 1; k < board.length; k++) {
        if(board[k][column - 1]) {
          if(board[k][column - 1] === board[k - 1][column]) {
            sumOfMarks +=1;
            if(sumOfMarks ===4) {
              return true;
            }
          } else {
            sumOfMarks = 1;
          }
        }
      column -=1;
      }
    }
    return false; 
  }
  isWin() {
    if(this.checkColomns() || this.checkDiagnals() || this.checkRows()) {
      this.setState({winner: this.state.currentPlayer});
      this.setState({inputAvailable: false}); 
      return true;
    }
    if(this.state.counter === 42) {
      this.setState({warnnign: "Draw!"})
      this.setState({inputAvailable: false})
    }
    return false;
  }
  checkWinner() {
    if(this.state.firstMover === this.state.secondPlayer) {
      return this.state.counter % 2? this.state.secondPlayer : this.state.firstPlayer
    } else {
      return this.state.counter % 2? this.state.firstPlayer : this.state.secondPlayer;
    }
  }
  handleSquare(e) {
    const id = e.target.id;
    let board = this.state.board;
    let mark;
    if(this.state.firstMover === this.state.secondPlayer) {
      mark = this.state.counter % 2? 'O' :'X';
    } else {
      mark = this.state.counter % 2? 'X' : 'O';
    }
     
    if(this.state.inputAvailable) {
      for(let i = board.length - 1; i >= 0; i--) {
        if(!board[i][id[1]]) {
          board[i][id[1]] = mark;
          this.setState({counter: this.state.counter + 1});
          break;
        }
        // why can I not put "break" out of if statement?
      }
      
      if(this.isWin()) {
        const winner = this.checkWinner();
        winner.score += 1;
        this.setState({firstMover: winner});
        // async, so I should use callback to display the winner
        // may there is a better way to do this, figure out later
        this.setState({winner: winner.name}, function() {
          this.setState({warning: "winner is" + this.state.winner});
        });
      }
    } else {
      //  wanning restart new game
      this.setState({warning: "Please restart a new game!"});
    }
  }
  render() {
    return (
      <div id="gameLayout">
        <Players onChange={this.handleChange} onClick={this.handleSubmit} />
        <InfoArea 
          firstPlayer={this.state.firstPlayer}
          secondPlayer={this.state.secondPlayer}
        />
        <Board board={this.state.board} onClick={this.handleSquare}/>
        <Warning warning={this.state.warning}/>
        <button id="newGame" type="button" onClick={this.startNewGame} >Start A new Game!</button>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'));