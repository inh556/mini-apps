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
$("#inputArea").submit(function(event) {
	event.preventDefault();
	firstPlayer.name = $("#firstPlayer").val();
	secondPlayer.name = $("#secondPlayer").val();
	$("#players").text(firstPlayer.name + " VS " + secondPlayer.name);
	//$("#firstPlayer").text = '';
	document.getElementById("firstPlayer").value = "";
	document.getElementById("secondPlayer").value = "";
});
var checkColumn = function() {
	for(var i = 0; i < board[0].length; i++) {
		var sumOfMarks = 1;
		if(board[board.length - 1][i]) {
			console.log('test');
			for(var j = board.length - 2; j >= 0; j--) {		
				if(board[j][i]) {
					if(board[j][i] === board[j+1][i]) {
						sumOfMarks +=1;
						if(sumOfMarks === 4) {
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
};
var checkRows = function() {
	for(var i = board.length - 1; i >= 0; i--) {
		var sumOfMarks = 0;
		for(var j = 0; j < board[0].length; j++) {	
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
};

var caculateWin = function() {
	return checkColumn() || checkRows() || checkDiagnals();
};
var checkWin = function() {
	if(caculateWin()) {
		// announce win
		$("#warning").text("Winner is " + winner.name);
		inputAvailable = false;
		winner.score +=1;
		console.log('winner score' + winner.score)
		// set next firstmover
		//firstmover = winner;
		// update rounds 
		return true;
	} else {
		return false;
	}
};

var placeMark = function (position) {
	// conunt for draw
	// check if available for placing
	if(inputAvailable) {
		var column = Number(position[1]);
		counter +=1;
			for(var i = board.length -1; i >= 0; i--) {
				var row = i; 
				var square = board[row][column];
				var currentPlayer = counter % 2? firstPlayer:secondPlayer;
				if(!square) {
					// display on the board
					document.getElementById(row + '' + column).innerHTML = currentPlayer.mark;
					// update board
					board[row][column] = currentPlayer.mark;
					checkWin();
					return;
				}
			} 
		document.getElementById("warning").innerHTML = "No allowed!";
	} else {
		$("#warning").text("Gama over, please restart again!");
	}
};
for(var i = 0; i  < board.length; i++) {
	var $newRow = $(`<div class="rows" id= ${i}></div>`);
	$("#board").append($newRow);
	for(var j = 0; j < board[i].length; j++) {
		var row = i;
		var newSquare = $(`<div class="squares" id=` + row +'' + j +  `></div>`);
		$("#"+i).append(newSquare);
	}
}

// add a listner for each square
var elements = document.getElementsByClassName("squares");
for(var i = 0; i< elements.length; i++) {
	elements[i].addEventListener("click", function() {
		placeMark(this.id);
	})
}
