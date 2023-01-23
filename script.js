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
            await sleep(0); // this sleep is here to ensure the symbol gets drawn to the DOM before the next line
            gameController.checkForWinner();
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
        gameController.getActivePlayer() === player2 ? gameController.setActivePlayer(player1) : gameController.setActivePlayer(player2);
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

        // check for a winner
        for (line of possibleWinningLines) {
            if (line.every((element) => element === 'X')) {
                alert("Player 1 (X) wins")
                displayController.resetGameBoard();
                gameController.beginNewGame(player1, player2);
            }

            if (line.every((element) => element === 'O')) {
                alert("Player 2 (O) wins")
                displayController.resetGameBoard();
                gameController.beginNewGame(player1, player2);
            }
        }

        // check for draw
        let totalMoves = 0;
        for (i=0; i<rows.length; i++) {
            gameBoardCells = rows[i].children;
            for (j=0; j<gameBoardCells.length; j++) {
                if (gameBoardCells[j].innerText != '-') {
                    totalMoves += 1;
                }
            }
        }
        if (totalMoves === 9) {
            alert("Draw");
            displayController.resetGameBoard();
            gameController.beginNewGame(player1, player2);
        }
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
    gameController.beginNewGame(player1, player2);
})

const player1 = Player('Player 1 (X)', 'X');
const player2 = Player('Player 2 (O)', 'O');
gameController.beginNewGame(player1, player2);