const players = function() {
  const playerFactory = (name, mark) => {  
    return {name, mark}
  };

  const first = playerFactory("Player 1", "X");
  const second = playerFactory("Payer 2", "O");
  const ai = playerFactory("Computer", "O")

  return {first, second, ai}
}();





let game = (function(){
  const start = function(currentGameMode) {
    console.log("Game has started");


    _gameMode = currentGameMode;

    if (!_gameHasStarted) {
      gameBoard.createBoard();
      _playerButtons.setAttribute("style", "display:none")
      _gameControls.setAttribute("style", "display:flex")
      _gameHasStarted = true;
    }

  };

  const playTurn = function (chosenSquare, currentPlayerObj, mode) {

    let gameStatus = isGameOver(gameBoard.grid())

 
    if (chosenSquare.innerHTML == "" && gameStatus == false) {


      changeCurrentPlayer(mode);

      chosenSquare.innerHTML = currentPlayerObj.mark;


      gameStatus = isGameOver(gameBoard.grid())

     if (gameStatus == true) {
        displayEndgame(currentPlayerObj);
      } else if (gameStatus == "tie") {
        displayEndgame("tie")
      }

      if (mode == "1Player" && _currentPlayer == players.ai && !isGameOver(gameBoard.grid())) {
        setTimeout(() => playTurn(computerMove(), players.ai, mode), 1000);
      };

    };    
  };



  const isGameOver = function(board) {


    let _winningCondition1 = board[0][0].textContent != "" && board[0][0].textContent == board[0][1].textContent && board[0][0].textContent == board[0][2].textContent
    let _winningCondition2 = board[0][0].textContent != "" && board[0][0].textContent == board[1][1].textContent && board[0][0].textContent == board[2][2].textContent
    let _winningCondition3 = board[0][0].textContent != "" && board[0][0].textContent == board[1][0].textContent && board[0][0].textContent == board[2][0].textContent
    let _winningCondition4 = board[0][1].textContent != "" && board[0][1].textContent == board[1][1].textContent && board[0][1].textContent == board[2][1].textContent
    let _winningCondition5 = board[0][2].textContent != "" && board[0][2].textContent == board[1][2].textContent && board[0][2].textContent == board[2][2].textContent
    let _winningCondition6 = board[0][2].textContent != "" && board[0][2].textContent == board[1][1].textContent && board[0][2].textContent == board[2][0].textContent
    let _winningCondition7 = board[1][0].textContent != "" && board[1][0].textContent == board[1][1].textContent && board[1][0].textContent == board[1][2].textContent
    let _winningCondition8 = board[2][0].textContent != "" && board[2][0].textContent == board[2][1].textContent && board[2][0].textContent == board[2][2].textContent
    
    
    
    
    if (_winningCondition1 || _winningCondition2 || _winningCondition3 
          || _winningCondition4 || _winningCondition5 || _winningCondition6 
          || _winningCondition7 || _winningCondition8){

      return true;
    } 
    
    else if (gameBoard.getOpenSpaces().length == 0){
      return "tie"

    }

    
    
    
    return false

    
  
  
  };



  const displayEndgame = function(winner) {
    const endgameMessage = document.querySelector(".endgame-message h2");

    _endgamePopup.setAttribute("style", "display:flex")
    _gameControls.setAttribute("style", "display:none")

    if (winner !== "tie") {
      endgameMessage.textContent = `${winner.name} wins!`
    } else {
      endgameMessage.textContent = "It's a tie!"
    }


  }


  const resetGame = function() {
    const boardGame = document.querySelector(".board");
    const row1 = document.querySelector(".top-row");
    const row2 = document.querySelector(".middle-row");
    const row3 = document.querySelector(".bottom-row");
    boardGame.removeChild(row1);
    boardGame.removeChild(row2);
    boardGame.removeChild(row3);

    _endgamePopup.setAttribute("style", "display:none")
    _playerButtons.setAttribute("style", "display:flex")
    _gameControls.setAttribute("style", "display:none")


    _currentPlayer = players.first;
    _gameHasStarted = false;
  }



  const newRound = function() {
    console.log("Game has restarted")
    gameBoard.getSquares().forEach((square)=> {
      square.innerHTML = "";
    })

    _endgamePopup.setAttribute("style", "display:none")
    _gameControls.setAttribute("style", "display:flex")


    _currentPlayer = players.first;
  }




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

    let currentBoard = gameBoard.getOpenSpaces();
 
    let randomNumber = Math.floor(Math.random() * currentBoard.length)
    console.log(randomNumber);

    return currentBoard[randomNumber];

  }
  






  let _currentPlayer = players.first;
  let _gameHasStarted = false;
  let _gameMode; //single player or 2 player game

  
  


  const _1Player = document.querySelector("._1player-button")
  _1Player.addEventListener("click", start.bind(_1Player, "1Player"))

  const _2player = document.querySelector("._2player-button");
  _2player.addEventListener("click", start.bind(_2player, "2Player"));



  const _endgamePopup = document.querySelector(".endgame-popup");

  const _playerButtons = document.querySelector('.game-mode');

  const _gameControls = document.querySelector(".game-controls");

  const _newRoundButtons = [...document.querySelectorAll(".new-round")];
  _newRoundButtons.forEach((button) =>{
    button.addEventListener("click", newRound)
  })

  const _newGameButtons = [...document.querySelectorAll(".new-game")];
  _newGameButtons.forEach((button) =>{
    button.addEventListener("click", resetGame)
  })








  return {computerMove, getCurrentPlayer, changeCurrentPlayer, playTurn, getCurrentGameMode} // removed getPreviousPlayer

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
    const board = document.querySelector(".board");


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
        let player = game.getCurrentPlayer();

        if (player == players.first || player == players.second) {
          game.playTurn(square, player, game.getCurrentGameMode())

        }

      })
    });

  };


  const getSquares = function() {
    return [...document.querySelectorAll(".square")];

  };

  const getOpenSpaces = function() {

    
    return getSquares().filter(square => square.textContent == "")
  };



  return {grid, createBoard, getSquares, getOpenSpaces}



})();