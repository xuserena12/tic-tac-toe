

// module for game board
const gameBoard = (() => {
  let play = true;
  let alternate = 0;
  let winner = false;
  const cells = document.querySelectorAll(".cell");
  let cellIndex = "";
  const currentDisplay = document.getElementById('current-display')
  let board = ['','','','','','','','',''];
  
  // render the board
  const render = () => {
    for (let i = 0; i < 9; i++) {
      cells[i].innerHTML = board[i];
    }
  };
  // return the board array
  const getBoard = () => {
    return board;
  };

  // reset the board array
  const reset = () => {
    board = ['','','','','','','','',''];
  };

  const checkBoardFull = () => {
    for (let n = 0; n < 9; n++) {
      if (board[n] == '') {
        return false;
      }
    } return true;
  }

  const checkRoundOver = () => {
    // winning combos
    const winningArrays = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6],
    ];
    winningArrays.forEach((combo) => {
      if (board[combo[0]]
        && board[combo[0]] === board[combo[1]]
        && board[combo[0]] === board[combo[2]]) {
        winner = true;
        console.log(winner);
      } else if  (board[combo[0]]
        && board[combo[0]] === board[combo[1]]
        && board[combo[0]] === board[combo[2]] && gameBoard.checkBoardFull()) {
        winner = true;
        console.log(winner);
        }
      else if (gameBoard.checkBoardFull()) {
        winner = true;
        alternate = 0; // means that there's a tie
      }
    })};

    const updateBoard = (idx,move) => {
      for (let j = 0; j < 9; j++) {
        if (j == idx) {
          board[j] = move;
        }
      }
    }

    const gameOver = () => {
    let phrase = '';
     if (alternate == 0) {
      phrase = 'It&#39;s a tie';
     }
     else if (alternate % 2 == 0) {
       phrase = 'Player 2 wins';
     } else {
       phrase = 'Player 1 wins';
     }
      gameBoard.reset();
      currentDisplay.innerHTML = `GAME OVER! ${phrase}`
      winner = false;
      player = 'X';
      alternate = 0;

    }
    currentDisplay.innerHTML = 'Player 1&#39;s turn!'
    let player = 'X';
    // start a round
    const startRound = () => {
      const cellPressed = e => {
        cellIndex = e.target.id;
        console.log(cellIndex);
        if (alternate % 2 == 0) {
          player = 'X';
          alternate++;
          currentDisplay.innerHTML = 'Player 2&#39;s turn!'
        } else {
          player = 'O';
          alternate++;
          currentDisplay.innerHTML = 'Player 1&#39;s turn!'
        }
        gameBoard.updateBoard(cellIndex,player);
        gameBoard.render();
        gameBoard.checkRoundOver();
        if (winner == true) {  // check to see if someone has won!
          gameBoard.gameOver(); // end the game
        }
       
      }
      
      for (let cell of cells) {
        cell.addEventListener('click',cellPressed);
      }
      

    }

    return {
      render, checkRoundOver, reset, getBoard, updateBoard, startRound, gameOver, checkBoardFull,
    };
})();

gameBoard.startRound();