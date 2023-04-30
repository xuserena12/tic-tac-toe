

// module for game board
const gameBoard = (() => {
  let play = true;
  const cells = document.querySelectorAll(".cell");
  let cellIndex = "";
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

    // returns true or false to determine if a round is over
  const checkRoundOver = () => {
    // winning combos
    let winner = false;
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
      } else {
        winner = false;
        console.log(winner);
      }
    })};

    const updateBoard = (idx,move) => {
      for (let j = 0; j < 9; j++) {
        if (j == idx) {
          board[j] = move;
        }
      }
    }

    let player = 'X';
    const startRound = () => {
      const cellPressed = e => {
        cellIndex = e.target.id;
        console.log(cellIndex);
        gameBoard.updateBoard(cellIndex,player);
        gameBoard.render();
      }
      
      for (let cell of cells) {
        cell.addEventListener('click',cellPressed);
      }
      

    }

    return {
      render, checkRoundOver, reset, getBoard, updateBoard, startRound,
    };
})();

gameBoard.startRound();