const populateGame = document.querySelector(".populateGame");
const newGameButton = document.querySelector(".newGameButton");
const bluePLayer = document.querySelector(".bluePLayer");
const redPLayer = document.querySelector(".redPLayer");
let gameUpdate = document.querySelector(".gameUpdate");


const gameArrays = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
];

let moveCount = 0;

let currentTurn = "blue";
let winner = false;


function populateFunction() {
    for (let i = 0; i < gameArrays.length; i++) {
      for (let n = 0; n < gameArrays[i].length; n++) {
        const gameSquare = document.createElement("div");
        const innerCircle = document.createElement("div");

        const cellCol = i;
        const cellRow = n;

        if (cellRow === 0) {
            gameSquare.classList.add("hiddenBase")
            innerCircle.innerText = "Taken"
        }
  
        let cellNumber = `col${i}row${n}`;
        gameSquare.classList.add(cellNumber);
        gameSquare.title = cellNumber;
        gameSquare.classList.add("gameSquare");
        innerCircle.classList.add("innerCircle");
        populateGame.appendChild(gameSquare);
        gameSquare.appendChild(innerCircle);

  
        // Add click event listener to the game square
        innerCircle.addEventListener("click", function () {

        //   console.log(`Column: ${cellCol + 1}, Row: ${cellRow + 1}`)

        const previousCell = document.querySelector(`.col${i}row${n-1}`);
        const currentCell = document.querySelector(`.col${i}row${n}`);

// console.log(currentCell)

            if (winner === false) {
            if(currentCell.classList.contains("blueOccupied") ||
            currentCell.classList.contains("redOccupied") ){
                return
            }

            else if (previousCell.innerText === "Taken" || 
                    previousCell.classList.contains("blueOccupied") || 
                    previousCell.classList.contains("redOccupied")){

                if (currentTurn === "blue"){
                    redPLayer.classList.add("indicateTurn");
                    bluePLayer.classList.remove("indicateTurn")
                    innerCircle.classList.add("blueCircle");
                    gameSquare.classList.add("blueOccupied");
                    currentTurn = "red";
                    checkWin(cellCol, cellRow, "Blue" , "blueOccupied");
                    moveCount++;

                } else if (currentTurn === "red"){
                    bluePLayer.classList.add("indicateTurn");
                    redPLayer.classList.remove("indicateTurn")
                    innerCircle.classList.add("redCircle");
                    gameSquare.classList.add("redOccupied");
                    currentTurn = "blue";
                    checkWin(cellCol, cellRow, "Red", "redOccupied");
                    moveCount++;
                }
            }
        }
        else {
            return
        }
        });
      }
    }
  }


  function addWinningClass(currentPlayer) {
    bluePLayer.classList.remove("winningPlayer");
    redPLayer.classList.remove("winningPlayer");
    redPLayer.classList.remove("indicateTurn");
    bluePLayer.classList.remove("indicateTurn")


    if (currentPlayer === "Blue") {
      bluePLayer.classList.add("winningPlayer");
      gameUpdate.innerText = "BLUE WINS!"
    } else if (currentPlayer === "Red") {
      redPLayer.classList.add("winningPlayer");
      gameUpdate.innerText = "RED WINS!"

    }
  }


// a function to check if there is a winner, that takes the current cell row and column as arguments  

function checkWin(colNum, rowNum, currentPlayer, playerClass) {
    const currentCell = document.querySelector(`.col${colNum}row${rowNum}`);
  
    // Conditional to check winning combinations by using coordinates of the cell
    // Check for the winning player's class in the relevant cells
  
    // Check for a vertical win
    // As pieces can only go to the bottom, we only need to check the pieces in relation to the topmost placed piece.
    if (
      currentCell?.classList.contains(playerClass) &&

      //check that each of the cells relative to the current cell contain the playerClass and if they dont then do nothing. 
      document.querySelector(`.col${colNum}row${rowNum - 1}`)?.classList.contains(playerClass) &&
      document.querySelector(`.col${colNum}row${rowNum - 2}`)?.classList.contains(playerClass) &&
      document.querySelector(`.col${colNum}row${rowNum - 3}`)?.classList.contains(playerClass)
    ) {
      winner = true;
      addWinningClass(currentPlayer)
    }
  
    // Check for horizontal win
    // As pieces can be placed in a horizontal position at any point, we must check all 4 potential winning horizontal combinations when placing a piece.
    else if (
      currentCell?.classList.contains(playerClass) &&
      document.querySelector(`.col${colNum + 1}row${rowNum}`)?.classList.contains(playerClass) &&
      document.querySelector(`.col${colNum + 2}row${rowNum}`)?.classList.contains(playerClass) &&
      document.querySelector(`.col${colNum + 3}row${rowNum}`)?.classList.contains(playerClass)
    ) {
          winner = true;
        addWinningClass(currentPlayer)

    } else if (
      currentCell?.classList.contains(playerClass) &&
      document.querySelector(`.col${colNum - 1}row${rowNum}`)?.classList.contains(playerClass) &&
      document.querySelector(`.col${colNum + 1}row${rowNum}`)?.classList.contains(playerClass) &&
      document.querySelector(`.col${colNum + 2}row${rowNum}`)?.classList.contains(playerClass)
    ) {
          winner = true;
        addWinningClass(currentPlayer)

    } else if (
      currentCell?.classList.contains(playerClass) &&
      document.querySelector(`.col${colNum - 2}row${rowNum}`)?.classList.contains(playerClass) &&
      document.querySelector(`.col${colNum - 1}row${rowNum}`)?.classList.contains(playerClass) &&
      document.querySelector(`.col${colNum + 1}row${rowNum}`)?.classList.contains(playerClass)
    ) {
          winner = true;
        addWinningClass(currentPlayer)

    } else if (
      currentCell?.classList.contains(playerClass) &&
      document.querySelector(`.col${colNum - 1}row${rowNum}`)?.classList.contains(playerClass) &&
      document.querySelector(`.col${colNum - 2}row${rowNum}`)?.classList.contains(playerClass) &&
      document.querySelector(`.col${colNum - 3}row${rowNum}`)?.classList.contains(playerClass)
    ) {
          winner = true;
        addWinningClass(currentPlayer)

    }
  
    // Check diagonal winning combinations, both top-left to bottom-right and top-right to bottom-left
    else if (
      currentCell?.classList.contains(playerClass) &&
      document.querySelector(`.col${colNum + 1}row${rowNum - 1}`)?.classList.contains(playerClass) &&
      document.querySelector(`.col${colNum + 2}row${rowNum - 2}`)?.classList.contains(playerClass) &&
      document.querySelector(`.col${colNum + 3}row${rowNum - 3}`)?.classList.contains(playerClass)
    ) {
          winner = true;
        addWinningClass(currentPlayer)

    } else if (
      currentCell?.classList.contains(playerClass) &&
      document.querySelector(`.col${colNum - 1}row${rowNum - 1}`)?.classList.contains(playerClass) &&
      document.querySelector(`.col${colNum - 2}row${rowNum - 2}`)?.classList.contains(playerClass) &&
      document.querySelector(`.col${colNum - 3}row${rowNum - 3}`)?.classList.contains(playerClass)
    ) {
          winner = true;
        addWinningClass(currentPlayer)

    }
    else if(moveCount === 42) {
        alert("It's a draw. No winner")
    }
  }
  
  
  document.addEventListener("DOMContentLoaded", populateFunction);

  newGameButton.addEventListener("click", () => {
    const allSquares = document.querySelectorAll(".gameSquare");
    const allCircles = document.querySelectorAll(".innerCircle");
    moveCount = 0;

    for( square of allSquares){
        square.classList.remove("blueOccupied");
        square.classList.remove("redOccupied");
    }

    for(circle of allCircles){
        circle.classList.remove("blueCircle");
        circle.classList.remove("redCircle");
    }

    winner = false;
    gameUpdate.innerText = ""

  });



  
  



