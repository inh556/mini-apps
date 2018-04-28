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
      <div id="players">{props.firstPlayer} VS {props.secondPlayer}</div>
      <div id="scores">{props.score1} : {props.score2}</div>
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
      firstPlayer:'',
      test: {name: null, score: 0, mark: 'X'},
      secondPlayer:'',
      score1: 0,
      score2: 0,
      mark1: 'X',
      mark2: 'O',
      currentPlayer: null,
      winner: null,
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
    this.setState({[e.target.id]: e.target.value})
  }
  startNewGame() {
    
    // reset board
    // reset record borad
    // reset firstmover
    // reset currentmover
    this.setState({inputAvailable: true});
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
    console.log(this.state.counter);
    if(this.checkColomns() || this.checkDiagnals() || this.checkRows()) {
      this.setState({winner: this.state.currentPlayer});
      this.setState({inputAvailable: false}); 
      return true;
    }
    if(this.state.counter === 42) {
      // warning Draw!
      // set inputavaiable to false;
      // set warning 
      this.setState({warnnign: "Draw!"})
      this.setState({inputAvailable: false})
    }
    return false;
  }

  handleSquare(e) {
    const test = this.state.test;
    test.name = 'Yanbin';
    this.setState({test: test});
    this.setState({winner: test});
    const id = e.target.id;
    let board = this.state.board;
    const mark = this.state.counter % 2? 'X' : 'O';
    if(this.state.inputAvailable) {
      for(let i = board.length - 1; i >= 0; i--) {
        if(!board[i][id[1]]) {
          board[i][id[1]] = mark;
          break;
        }
        // why can I not put "break" out of if statement?
      }
      this.setState({board: board});
      this.setState({counter: this.state.counter + 1});
      if(this.isWin()) {
        // warning winner!
        // set winner
        // set winner's score
        // 
        this.setState({warning: "winner is Yanbin"});
        
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
          score1 = {this.state.score1}
          score2 = {this.state.score2}
        />
        <Board board={this.state.board} onClick={this.handleSquare}/>
        <Warning warning={this.state.warning}/>
        <button id="newGame" type="button" onClick={this.startNewGame} >Start A new Game!</button>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'));