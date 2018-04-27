import React from 'react';
import ReactDom from 'react-dom';

function Players(props) {
  return (
    <form id="inputArea">
      <input type="text" id="firstPlayer" placeholder="enter firstPlayer name" />
      <input type="text" id="secondPlayer" placeholder="enter secondPlayer name" />
      <input type="submit" name="submit" />
    </form>
  )
}
function InfoArea(props) {
  return (
    <div id="infoArea">
      <div id="players"> VS </div>
      <div id="scores"> 0 : 0</div>
      <div id="turn"></div>
    </div>
  )
}
function Board(props) {
  return <div id='board'> </div>
}
function Warning(props) {
  return <div id="warning"></div>
}
class App extends React.Component {
  render() {
    return (
      <div id="gameLayout">
        <Players />
        <InfoArea />
        <Board />
        <Warning />
        <button type="button"  >Start A new Game!</button>
      </div>
    )
  }
}

ReactDom.render(<App />, document.getElementById('app'));