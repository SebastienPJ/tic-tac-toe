const players = function() {
  const playerFactory = (name, mark) => {  
    return {name, mark}
  };

  const first = playerFactory("player1", "X");
  const second = playerFactory("player2", "O");
  const ai = playerFactory("computer", "O")

  return {first, second, ai}
}();





let game = (function(){
  const start = function(currentGameMode) {
    console.log("Game has started");

    _gameMode = currentGameMode;

    if (!_gameHasStarted) {
      gameBoard.createBoard();
      _gameHasStarted = true;
    }

  };



  const isGameOver = function() {


    let _winningCondition1 = gameBoard.grid()[0][0].textContent != "" && gameBoard.grid()[0][0].textContent == gameBoard.grid()[0][1].textContent && gameBoard.grid()[0][0].textContent == gameBoard.grid()[0][2].textContent
    let _winningCondition2 = gameBoard.grid()[0][0].textContent != "" && gameBoard.grid()[0][0].textContent == gameBoard.grid()[1][1].textContent && gameBoard.grid()[0][0].textContent == gameBoard.grid()[2][2].textContent
    let _winningCondition3 = gameBoard.grid()[0][0].textContent != "" && gameBoard.grid()[0][0].textContent == gameBoard.grid()[1][0].textContent && gameBoard.grid()[0][0].textContent == gameBoard.grid()[2][0].textContent
    let _winningCondition4 = gameBoard.grid()[0][1].textContent != "" && gameBoard.grid()[0][1].textContent == gameBoard.grid()[1][1].textContent && gameBoard.grid()[0][1].textContent == gameBoard.grid()[2][1].textContent
    let _winningCondition5 = gameBoard.grid()[0][2].textContent != "" && gameBoard.grid()[0][2].textContent == gameBoard.grid()[1][2].textContent && gameBoard.grid()[0][2].textContent == gameBoard.grid()[2][2].textContent
    let _winningCondition6 = gameBoard.grid()[0][2].textContent != "" && gameBoard.grid()[0][2].textContent == gameBoard.grid()[1][1].textContent && gameBoard.grid()[0][2].textContent == gameBoard.grid()[2][0].textContent
    let _winningCondition7 = gameBoard.grid()[1][0].textContent != "" && gameBoard.grid()[1][0].textContent == gameBoard.grid()[1][1].textContent && gameBoard.grid()[1][0].textContent == gameBoard.grid()[1][2].textContent
    let _winningCondition8 = gameBoard.grid()[2][0].textContent != "" && gameBoard.grid()[2][0].textContent == gameBoard.grid()[2][1].textContent && gameBoard.grid()[2][0].textContent == gameBoard.grid()[2][2].textContent
    
    
    
    
    if (_winningCondition1 || _winningCondition2 || _winningCondition3 || _winningCondition4 || _winningCondition5 || _winningCondition6 || _winningCondition7 || _winningCondition8) {
      return true;
    } else {
      return false
    }
  
  
  };

  const winningMessage = function(winner) {
    console.log("Game over!");
    // console.log(`${getPreviousPlayer().name} has won the game`);

    console.log(`${winner.name} has won the game!`);
    // console.log(this); // "this" refers to window object

  }

  const reset = function() {
    getSquares().forEach((square)=> {
      square.innerHTML = "";
    })
  }

  const playTurn = function (chosenSquare, currentPlayerObj, mode) {
    console.log(chosenSquare);
   
    if (chosenSquare.innerHTML == "" && !isGameOver()) {

      chosenSquare.innerHTML = currentPlayerObj.mark;
      _movesHistory.push(currentPlayerObj);

      changeCurrentPlayer(mode);

      if (isGameOver()) {
        winningMessage(currentPlayerObj);
      }

      if (currentPlayerObj.name == "computer") {
        return
      }

      if (mode == "1Player") {
        setTimeout(() => playTurn(computerMove(), players.ai, mode), 2000);
      };

    };    
  };


  const changeCurrentPlayer = function(numberOfPlayers) {


    if (_currentPlayer == players.first){
      if (numberOfPlayers == "2Player") {
        _currentPlayer = players.second;
      } else { 
        _currentPlayer = players.ai;
      }
    } else {
      _currentPlayer = players.first;
    };
  };


  const getCurrentPlayer = function() {
    return _currentPlayer;
  };
  
  const getCurrentGameMode = function(){
    return _gameMode
  }


  const computerMove = function() {
    let currentBoard = gameBoard.getSquares();
    let openSpaces = currentBoard.filter(square => square.textContent == "")
    let randomNumber = Math.floor(Math.random() * openSpaces.length)


    return openSpaces[randomNumber];

    openSpaces[randomNumber].textContent = "O"



    changeCurrentPlayer()

    // console.log(openSpaces);
    // console.log(randomNumber);
  }
  
  // const  getPreviousPlayer = function() {
  //   return _movesHistory[_movesHistory.length - 1];
  
  // };





  let _currentPlayer = players.first;
  let _gameHasStarted = false;
  let _movesHistory = [];
  let _gameMode; //single player or 2 player game
  


  const _1Player = document.querySelector("._1player")
  _1Player.addEventListener("click", start.bind(_1Player, "1Player"))

  const _2player = document.querySelector("._2player");
  _2player.addEventListener("click", start.bind(_2player, "2Player"));







  return {getCurrentPlayer, changeCurrentPlayer, playTurn, getCurrentGameMode} // removed getPreviousPlayer

})();


let gameBoard = (function(){

  /*** Converts normal array to 2D array */
  const convertToGrid = function(boardArray, rowSize) {

    let _2dArray = []; 
    for(var i = 0; i < boardArray.length; i = i + rowSize){
      _2dArray.push(boardArray.slice(i, i + rowSize));
    };
    return _2dArray;

  };


  const grid = function() {
    return convertToGrid(getSquares(), 3)
  };



  const createBoard = function() {
    const gameDiv = document.querySelector(".game")

    const board = document.createElement("div");
    board.classList.add("board");
    gameDiv.appendChild(board);

    const topRow = document.createElement("div");
    topRow.classList.add("top-row");
    board.appendChild(topRow);

    const topLeftSquare = document.createElement("div");
    topLeftSquare.classList.add("top-left", "square");
    topRow.appendChild(topLeftSquare)

    const topCenterSquare = document.createElement("div");
    topCenterSquare.classList.add("top-center", "square");
    topRow.appendChild(topCenterSquare);

    const topRightSquare = document.createElement("div");
    topRightSquare.classList.add("top-right", "square");
    topRow.appendChild(topRightSquare);

    const middleRow = document.createElement("div");
    middleRow.classList.add("middle-row");
    board.appendChild(middleRow);

    const middleLeftSquare = document.createElement("div");
    middleLeftSquare.classList.add("middle-left", "square");
    middleRow.appendChild(middleLeftSquare);

    const middleCenterSquare = document.createElement("div");
    middleCenterSquare.classList.add("middle-center", "square");
    middleRow.appendChild(middleCenterSquare);

    const middleRightSquare = document.createElement("div");
    middleRightSquare.classList.add("middle-right", "square");
    middleRow.appendChild(middleRightSquare);


    const bottomRow = document.createElement("div");
    bottomRow.classList.add("bottom-row");
    board.appendChild(bottomRow);

    const bottomLeftSquare = document.createElement("div");
    bottomLeftSquare.classList.add("bottom-left", "square");
    bottomRow.appendChild(bottomLeftSquare);

    const bottomCenterSquare = document.createElement("div");
    bottomCenterSquare.classList.add("bottom-center", "square");
    bottomRow.appendChild(bottomCenterSquare);

    const bottomRightSquare = document.createElement("div");
    bottomRightSquare.classList.add("bottom-right", "square");
    bottomRow.appendChild(bottomRightSquare);


    getSquares().forEach((square) => {
      square.addEventListener("click", () => {
        game.playTurn(square, game.getCurrentPlayer(), game.getCurrentGameMode())

      })
    });

  };


  const getSquares = function() {
    return [...document.querySelectorAll(".square")];
  }


  return {grid, createBoard, getSquares}



})();