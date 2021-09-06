

const players = function() {
  const playerFactory = (name, mark) => {  
    return {name, mark}
  }

  const first = playerFactory("player1", "X");
  const second = playerFactory("player2", "O");

  return {first, second}
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

  const placeMark = function () {
    console.log(this); //"this" value refers to div clicked
  };

  let currentPlayer = function(){

  };



  const _startButton = document.querySelector(".start");
  _startButton.addEventListener("click", start);

  const _squares = document.querySelectorAll(".square");
  _squares.forEach((square) => {
    square.addEventListener("click", placeMark)
  });




  return {currentPlayer, placeMark, start}

})();


let gameBoard = (function(){

  const _squares = document.querySelectorAll(".square");


  const convertToGrid = function() {


  };


  const grid = convertToGrid()


  return {grid}



})();

