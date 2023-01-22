function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

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

    const markPlayerClick = async (gameBoardCell, activePlayer) => {
        if (gameController.isCellUnmarked(gameBoardCell)) {
            gameBoardCell.innerText = activePlayer.getSymbol();
            gameController.switchActivePlayer();
            await sleep(200); // this sleep is here to ensure the symbol gets drawn to the DOM before the next line
            if (gameController.checkForWinner() != 0) {
                return;
            }
            
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

    const checkForWinner = () => {
        const mainContainer = document.querySelector('#main-container');
        const rows = mainContainer.children;

        let possibleWinningLines = [];
        
        // winning rows
        for (i=0; i<rows.length; i++) {
            possibleWinningLines.push([]);
            gameBoardCells = rows[i].children;
            for (j=0; j<gameBoardCells.length; j++) {
                possibleWinningLines[i].push(gameBoardCells[j].innerText);
            }
        }

        // winning columns
        for (i=0; i<3; i++) {
            possibleWinningLines.push([]);
            for (j=0; j<rows.length; j++) {
                possibleWinningLines[3+i].push(rows[j].children[i].innerText)
            }
        }

        // winning diagonals
        // TODO - can this be neater?
        possibleWinningLines.push(
            [
                rows[0].children[0].innerText,
                rows[1].children[1].innerText,
                rows[2].children[2].innerText
            ]
        )
        possibleWinningLines.push(
            [
                rows[2].children[0].innerText,
                rows[1].children[1].innerText,
                rows[0].children[2].innerText
            ]
        )


        console.log(possibleWinningLines)

        for (line of possibleWinningLines) {
            if (line.every((element) => element === 'X')) {
                alert("James wins")
                displayController.resetGameBoard();
                gameController.beginNewGame(james, eloise);
            }

            if (line.every((element) => element === 'O')) {
                alert("Eloise wins")
                displayController.resetGameBoard();
                gameController.beginNewGame(james, eloise);
            }
        }

        return 0;
    }

    return {
        beginNewGame,
        getRandomStartingPlayer,
        getActivePlayer,
        setActivePlayer,
        switchActivePlayer,
        isCellUnmarked,
        checkForWinner
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