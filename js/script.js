const tiles = Array.from(document.querySelectorAll('.block'))
const winnerText = document.getElementById("winner")
const Player = (character, playerNum) => {
    let getCharacter = () => character;
    let getPlayerNum = () => playerNum;
    return { getCharacter, getPlayerNum}
}

const gameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""]

    const getBoard = () => board;

    const updateBoard = () => {
        for(let i = 0; i < tiles.length; i++){
            board[i] = tiles[i].textContent
        }
    }

    const checkHorz = () => {
        for(i = 0; i < 9; i+=3){
            if(board[i] != "" && board[i] == board[i+1] && board[i] == board[i+2]){

                return true
            }
        }
        return false
    }

    const checkVert = () => {
        for(i = 0; i < 3; i++){
            if(board[i] != "" && board[i] == board[i+3] && board[i] == board[i+6]){
                return true
            }
        }
        return false
    }

    const checkDiag = () => {
        if(board[0] != "" && (board[0] == board[4] && board[0] == board[8])){
            return true
        }
        if(board[2] != "" && (board[2] == board[4] && board[2] == board[6])){

            return true
        }
        return false
    }



    const clearBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""]
    }

    
    return { getBoard, updateBoard, checkHorz, checkVert, checkDiag, clearBoard }
})();

const x = Player("x", "1")

const o = Player("o", "2")

const game = (() => {
    let xTurn = true;
    currentPlayer = x

    
    
    const main = () => {
        tiles.forEach(tile => tile.addEventListener("click", chooseTile))
    }

    const chooseTile = (e) => {
        if(e.target.textContent == ""){
            e.target.textContent = currentPlayer.getCharacter()
            gameBoard.updateBoard()
            if(!checkWinner()) checkTie()
            changePlayer()
        } 
    }

    const checkWinner = () => {
        
        if(gameBoard.checkHorz() || gameBoard.checkVert() || gameBoard.checkDiag()){
            winnerText.textContent = `Player ${currentPlayer.getCharacter()} wins!`
            stopGame()
            return true
        }
        return false
    }

    const checkTie = () => {
        let board = gameBoard.getBoard()
        if(!board.some(v => v == "")){
            winnerText.textContent = "Tie!"
            stopGame()
        }
    }

    const resetBoard = () => {
        gameBoard.clearBoard()
        tiles.forEach(tile => tile.textContent = "")
        tiles.forEach(tile => tile.addEventListener("click", chooseTile))
        winnerText.textContent = ""
        xTurn = true;
        currentPlayer = x
    }

    const stopGame = () => {
        tiles.forEach(tile => tile.removeEventListener("click", chooseTile))
    }

    const changePlayer = () => {
        if(xTurn){
            currentPlayer = o
            xTurn = false
        }else{
            currentPlayer = x
            xTurn = true
        }
    }
    return { main, resetBoard }
})();

game.main()