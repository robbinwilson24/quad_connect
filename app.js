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

//function to populate the game board using the gameArrays array 
function populateFunction() {
    for (let i = 0; i < gameArrays.length; i++) {
      for (let n = 0; n < gameArrays[i].length; n++) {
        const gameSquare = document.createElement("div");
        const innerCircle = document.createElement("div");

        //variables for col and row values
        const cellCol = i;
        const cellRow = n;

        //in the cell row is 0 then add a class of taken - this acts as a base for the cells above it to be played. 
        if (cellRow === 0) {
            gameSquare.classList.add("hiddenBase")
            innerCircle.innerText = "Taken"
        }
        
        //variable for a unique cell number to be added to each cell using their row and col values  
        let cellNumber = `col${i}row${n}`;
        gameSquare.classList.add(cellNumber);
        gameSquare.title = cellNumber;
        gameSquare.classList.add("gameSquare");
        innerCircle.classList.add("innerCircle");
        populateGame.appendChild(gameSquare);
        gameSquare.appendChild(innerCircle);

  
        // Add click event listener to the game square
        innerCircle.addEventListener("click", function () {

        //variables for current and previous cells 
        const previousCell = document.querySelector(`.col${i}row${n-1}`);
        const currentCell = document.querySelector(`.col${i}row${n}`);

            if (winner === false) {
            if(currentCell.classList.contains("blueOccupied") ||
            currentCell.classList.contains("redOccupied") ){
                return
            }

            //check if the cell below the clicked cell is taken (as you can only play a move in the bottom most available cell in a column )
            else if (previousCell.innerText === "Taken" || 
                    previousCell.classList.contains("blueOccupied") || 
                    previousCell.classList.contains("redOccupied")){

                //apply game logic and check for a winning combination
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

  // function that adds the winning class to the winning player. 
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
  

// a fnction to reset the game for a new game 
  newGameButton.addEventListener("click", () => {
    const allSquares = document.querySelectorAll(".gameSquare");
    const allCircles = document.querySelectorAll(".innerCircle");
    bluePLayer.classList.remove("winningPlayer");
    redPLayer.classList.remove("winningPlayer");


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

  //a function to call the populate function once the DOM has loaded. 
  document.addEventListener("DOMContentLoaded", populateFunction);


  
  



