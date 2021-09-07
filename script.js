

const players = function() {
  const playerFactory = (name, mark) => {  
    return {name, mark}
  }

  const first = playerFactory("player1", "X");
  const second = playerFactory("player2", "O");
  const ai = playerFactory("computer", "O")

  return {first, second, ai}
}();





let game = (function(){
  const start = function() {
 
    console.log("Game has started");
    console.log(this); // "this" valus refers to start button
  }



  const over = function() {
    console.log("Game over!");
    console.log(this);
  };




  const changeCurrentPlayer = function() {
    if (_currentPlayer == players.first){
      _currentPlayer = players.second;
    } else {
      _currentPlayer = players.first;
    };
  };


  const getCurrentPlayer = function() {
    return _currentPlayer
  };  




  let _currentPlayer = players.first;

  const _startButton = document.querySelector(".start");
  _startButton.addEventListener("click", start);

  const squares = [...document.querySelectorAll(".square")];





  return {getCurrentPlayer, changeCurrentPlayer, squares}

})();


let gameBoard = (function(){

  const placeMark = function () {
    console.log(this); //"this" value refers to div clicked
   
    if (this.innerHTML == "") {
      this.innerHTML = game.getCurrentPlayer().mark;
      movesPlayedArray.push(game.getCurrentPlayer().mark)
      game.changeCurrentPlayer();

    };    
  };
 
  const convertToGrid = function(boardArray, rowSize) {

    let newArray = []; 
    for(var i = 0; i < boardArray.length; i = i + rowSize){
      newArray.push(boardArray.slice(i, i + rowSize));
    };
    return newArray;

  };

  // const movesPlayedGrid = function() {
  //   return convertToGrid(movesPlayedArray, 3)
  // }

  

  let movesPlayedArray = [];

  // const movesPlayedGrid = convertToGrid(movesPlayedArray, 3);




  const grid = convertToGrid(game.squares, 3)

  game.squares.forEach((square) => {
    square.addEventListener("click", placeMark)
  });


  return {grid, movesPlayedGrid}



})();



