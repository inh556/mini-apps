var counter = 0;
var mark = "X";
var records = Array(9).fill(null);
var inputAvailable = true;
var elements = document.getElementsByClassName("square");
var firstPlayer = prompt("Input your name," , "");
var secondPlayer = prompt("Input your name," , "");
document.getElementById("players").innerHTML = firstPlayer + ' VS ' + secondPlayer;
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
	for(var i = 0; i < possibleResults.length; i++) {
		[a, b, c] = possibleResults[i];
		if(records[a] && records[a] === records[b] && records[a] === records[c]) {
			var winner = secondPlayer;
			if(counter % 2) {
				console.log("working");
				winner = firstPlayer;
			}
			console.log(counter);
			document.getElementById("warning").innerHTML = winner + ' win!';
			inputAvailable = false;
		}
	}
	if(counter === 9 && inputAvailable === true) {
		console.log('it is working!')
		inputAvailable = false;
		document.getElementById('warning').innerHTML = "Game Over, please restart a new game!";
	}
};

var restart = function() {
	console.log('passed in');
	for(var i = 0; i < elements.length; i++) {
		elements[i].innerHTML = "";
		records = Array(9).fill(null);
		inputAvailable = true;
		counter = 0;
	}
}

for(var i = 0; i < elements.length; i++) {
	elements[i].addEventListener("click", function() {
	if(!inputAvailable) {
		document.getElementById("warning").innerHTML = "Game over! Please restart a new game!";
	} else {
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

