const gameBoard = (() => {

    const attachEventHandlers = () => {
        const gameBoardCells = document.getElementsByClassName('gameBoardCell');
        for (let i=0; i<gameBoardCells.length; i++) {
            gameBoardCells[i].addEventListener('click', (e) => {
                displayController.markPlayerClick(
                    e.target,
                    gameController.getActivePlayer()
                );
            })
        }
    }

    return {
        attachEventHandlers
    }
})();

const displayController = (() => {

    const markPlayerClick = (gameBoardCell, activePlayer) => {
        if (gameController.isCellUnmarked(gameBoardCell)) {
            gameBoardCell.innerText = activePlayer.getSymbol();
            gameController.switchActivePlayer();
        }
    }

    const resetGameBoard = () => {
        const mainContainer = document.querySelector('#main-container');
        const rows = mainContainer.children;
    
            for (row of rows){
                gameBoardCells = row.children;
                for (gameBoardCell of gameBoardCells) {
                    gameBoardCell.innerText = '-'
                }
            }
    }

    return {
        markPlayerClick,
        resetGameBoard
    }
})();

const gameController = (() => {
    let activePlayer;

    const beginNewGame = (player1, player2) => {
        const startingPlayer = gameController.getRandomStartingPlayer(player1, player2);
        alert(`${startingPlayer.getName()} goes first`);
        gameController.setActivePlayer(startingPlayer);

    };

    const getRandomStartingPlayer = (player1, player2) => {
        const players = [player1, player2];
        const randomIndex = Math.floor(Math.random() * 2);
        const startingPlayer = players[randomIndex]
        return startingPlayer;
    };

    const getActivePlayer = () => {
        return gameController.activePlayer;
    }

    const setActivePlayer = (player) => {
        gameController.activePlayer = player;
    }

    const switchActivePlayer = () => {
        gameController.getActivePlayer() === eloise ? gameController.setActivePlayer(james) : gameController.setActivePlayer(eloise);
    }

    const isCellUnmarked = (gameBoardCell) => {
        return gameBoardCell.innerText === '-';
    }

    return {
        beginNewGame,
        getRandomStartingPlayer,
        getActivePlayer,
        setActivePlayer,
        switchActivePlayer,
        isCellUnmarked
    }
})();

const Player = (name, symbol) => {
    const getName = () => name;
    const getSymbol = () => symbol;

    return {getName, getSymbol};
}

gameBoard.attachEventHandlers();
let resetButton = document.querySelector('#reset-button');
resetButton.addEventListener('click', () => {
    displayController.resetGameBoard();
    gameController.beginNewGame(james, eloise);
})

const james = Player('James', 'X');
const eloise = Player('Eloise', 'O');
gameController.beginNewGame(james, eloise);