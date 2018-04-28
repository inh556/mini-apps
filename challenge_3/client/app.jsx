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
  return <div id="warning"></div>
}
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstPlayer:'',
      secondPlayer:'',
      score1: 0,
      score2: 0,
      mark1: 'X',
      mark2: 'O',
      winner: null,
      counter: 1,
      inputAvailable:true,
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

  }
  handleSubmit(e) {
    e.preventDefault();
  }
  handleChange(e) {
    this.setState({[e.target.id]: e.target.value})
  }
  startNewGame() {
  }
  checkWin() {

  }

  handleSquare(e) {
    const id = e.target.id;
    let board = this.state.board;
    const mark = this.state.counter % 2? 'X' : 'O';
    for(let i = board.length - 1; i >= 0; i--) {
      if(!board[i][id[1]]) {
        board[i][id[1]] = mark;
        break;
      }
      // why can I not put "break" out of if statement?
    }
    this.setState({board: board});
    this.setState({counter: this.state.counter + 1});
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
        <Warning />
        <button id="newGame" type="button"  >Start A new Game!</button>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'));