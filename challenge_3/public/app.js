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
