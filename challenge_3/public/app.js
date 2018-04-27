var firstPlayer = {name: null, mark: "X", score: 0};
var secondPlayer = {name: null, mark: "O", score: 0};
var currentPlayer;
var winner = firstPlayer;
var firstmover = firstPlayer;
var rounds =0;
var counter = 0;
var inputAvailable = true;
var board = [
	[null, null, null, null, null,null,null],
	[null, null, null, null, null,null,null],
	[null, null, null, null, null,null,null],
	[null, null, null, null, null,null,null],
	[null, null, null, null, null,null,null],
	[null, null, null, null, null,null,null]
];