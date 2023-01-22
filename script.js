const gameBoard = (() => {
    const mainContainer = document.querySelector('#main-container');
    const rows = mainContainer.children;
    let board = new Array('X', 'X', 'O', 'X', 'O', 'X', 'X', 'X', 'X');

    const createGameBoard = () => {
        let k=0;
        for (i=0; i<rows.length; i++) {
            for (j=0; j<3; j++) {
                const newCell = document.createElement('div');
                newCell.classList.add('gameBoardCell');
                newCell.innerText = board[i+j+k]
                rows[i].appendChild(newCell);
            }
            k += 2;
        }
    }

    const attachEventHandlers = () => {
        const gameBoardCells = document.getElementsByClassName('gameBoardCell');
        for (let i=0; i<gameBoardCells.length; i++) {
            gameBoardCells[i].addEventListener('click', (e) => {
                displayController.markPlayerClick(e.target);
            })
        }
    }

    return {
        createGameBoard,
        attachEventHandlers
    }
})();

const displayController = (() => {
    const markPlayerClick = (gameBoardCell) => {
        gameBoardCell.innerText = 'X';
    }

    return {
        markPlayerClick
    }
})();

gameBoard.createGameBoard();
gameBoard.attachEventHandlers();