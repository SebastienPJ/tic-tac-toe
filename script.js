const squares = document.querySelectorAll(".square")


let addPiece = function () {
  console.log(this);
}

squares.forEach((square) => {
  square.addEventListener("click", addPiece)
})


