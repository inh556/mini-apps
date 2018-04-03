var counter = 0;
var mark = "X";
var records = Array(9).fill(null);
var inputAvailable = true;
var elements = document.getElementsByClassName("square");
var firstPlayer = prompt("Input your name," , "");
var secondPlayer = prompt("Input your name," , "");
var firstMover = firstPlayer;
var scores = {};
scores[firstPlayer] = 0;
scores[secondPlayer] = 0;
var firstMover;
var rounds = 1;
var displayInfos = function() {
	document.getElementById("players").innerHTML = firstPlayer + ' VS ' + secondPlayer;
	document.getElementById("scores").innerHTML = scores[firstPlayer] + ' : ' + scores[secondPlayer];
	document.getElementById("rounds").innerHTML = rounds;
};
displayInfos();
// restart a new game
var restart = function() {
	for(var i = 0; i < elements.length; i++) {
		elements[i].innerHTML = "";
	}
	records = Array(9).fill(null);
	inputAvailable = true;
	counter = 0;
	rounds+=1;
	displayInfos();
};
// find who is winner
var findWinner = function() {
	var winner = secondPlayer;	
	if(firstMover === secondPlayer) {
		winner = firstPlayer;
	}
	if(counter % 2) {
			winner = firstPlayer;
	}
	scores[winner] += 1;
	firstMover = winner;
	document.getElementById("warning").innerHTML = winner + ' win!';
};
// evaluate if win
var winOrNot = function() {
	var possibleResults = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7 ,8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5 ,8],
		[0, 4, 8],
		[2, 4, 6]
	];
	// check if win 
	for(var i = 0; i < possibleResults.length; i++) {
		[a, b, c] = possibleResults[i];
		if(records[a] && records[a] === records[b] && records[a] === records[c]) {
			findWinner(counter);		
			inputAvailable = false;
		}
	}
	// if no one win, and the last step of one round, evalute to tied game;
	if(counter === 9 && inputAvailable === true) {
		inputAvailable = false;
		document.getElementById('warning').innerHTML = "Game Over, please restart a new game!";
	}
};


// set listener for each square
for(var i = 0; i < elements.length; i++) {
	elements[i].addEventListener("click", function() {
	if(!inputAvailable) {
		document.getElementById("warning").innerHTML = "Game over! Please restart a new game!";
	} else {
			// record each mark in the board
			if(records[Number(this.id)]) {
			document.getElementById("warning").innerHTML = "You are not allowed to put here!";
		} else {
			document.getElementById("warning").innerHTML = "";
			if(counter % 2) {
				mark = "O";
			}
			this.innerHTML = mark;
			records[Number(this.id)] = mark;
			mark = "X";
	  	counter++;
	  	winOrNot();
		}
	}
	});
}