// As users playing a two player game we want to:

// enter our names and have them displayed
// have our order chosen for us by the game
// take turns by dropping our chip into a column on the grid
// not be able to drop a chip into a totally filled column
// be told when a move causes a player to win, or to draw
// start the game over without having to reset the browser
// As a user playing a single player game I additionally want to:

// see the name 'Computer' displayed as my opponent
// have the Computer player choose columns as if it were a human player
// As a user playing a single player game I would be delighted if:

// the Computer chooses the correct column for a win, when possible


let turnTracker = document.querySelector("#turnTracker")
let board = document.querySelector("#gameBoard")
let inputArea = document.querySelector("#inputArea")
let player1Name = document.querySelector('#player1Name')
let player1Input = document.querySelector('#pla1In')
let player2Name = document.querySelector('#player2Name')
let player2Input = document.querySelector('#pla2In')
let isplayer1Turn = true;
let onePlayer = false;
let winner = false;


let gameState = [
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
    ["", "", "", "", "", ""],
]






// ["01", "02", "03", "04", "05", "06"],
// ["07", "08", "09", "10", "11", "12"],
// ["13", "14", "15", "16", "17", "18"],
// ["19", "20", "21", "22", "23", "24"],
// ["25", "26", "27", "28", "29", "30"],
// ["31", "32", "33", "34", "35", "36"],
// ["37", "38", "39", "40", "41", "42"]


// First space 
function firstAvailSpace(num){
    for (let i = 5; i >= 0; i--){
        if (gameState[num][i] != ""){
            continue
        }
        else {
            return i;
        }
    }
}


function checkTest (){
    for (let i = 0; i < gameState.length; i++){
        for (let j = 0; j < gameState[0].length; j++){
            console.log(gameState[i][j], gameState[i + 1][j])
        }
    }
}
// checkTest()

function checkHorizontal(){
    for (let i = 0; i < gameState.length; i++){
        for (let j = 0; j < gameState[0].length; j++){
            if (gameState[i][j] !== "" && 
                gameState[i][j] === gameState[i + 1][j] &&
                gameState[i + 1][j] === gameState[i + 2][j] &&
                gameState[i + 2][j] === gameState[i + 3][j]){
                if (!isplayer1Turn){
                    turnTracker.textContent = ("Player 1 wins horizontally!")
                } else {
                    turnTracker.textContent = ("Player 2 wins horizontally!")
                }
                winner = true;
            }
        }
    }
}

function checkVertical(){
    for (let i = 0; i < gameState.length; i ++){
        for (let j = 0; j < gameState[0].length; j++){
            if(gameState[i][j] !== "" &&
               gameState[i][j] === gameState[i][j + 1] &&
               gameState[i][j + 1] === gameState[i][j + 2] &&
               gameState[i][j + 2] === gameState[i][j + 3]){
                if (!isplayer1Turn){
                    turnTracker.textContent = ("Player 1 wins vertically!")
                } else {
                    turnTracker.textContent = ("Player 2 wins vertically!")
                }
                winner = true;
            }
        }
    }
}

function checkDownRight(){
    for (let i = 0; i < gameState.length; i++){
        for (let j = 0; j < gameState[0].length; j++){
            if (gameState[i][j] !== "" && 
                gameState[i][j] === gameState[i + 1][j + 1] &&
                gameState[i + 1][j + 1] === gameState[i + 2][j + 2] &&
                gameState[i + 2][j + 2] === gameState[i + 3][j + 3]){
                    if (!isplayer1Turn){
                        turnTracker.textContent = ("Player 1 wins diagonally!")
                    } else {
                        turnTracker.textContent = ("Player 2 wins diagonally!")
                    }
                    winner = true;
            }
        }
    }
}

function checkUpRight(){
    for (let i = 0; i < gameState.length; i++){
        for (let j = 5; j >= 0; j--){
            if (gameState[i][j] !== "" && 
            gameState[i][j] === gameState[i + 1][j - 1] &&
            gameState[i + 1][j - 1] === gameState[i + 2][j - 2] &&
            gameState[i + 2][j - 2] === gameState[i + 3][j - 3]){
                if (!isplayer1Turn){
                    turnTracker.textContent = ("Player 1 wins diagonally!")
                } else {
                    turnTracker.textContent = ("Player 2 wins diagonally!")
                }
            winner = true;
            }            
        }
    }
}

function checkDraw(){
    let drawCount = 0
    for (let i = 0; i < gameState.length; i++){
        for (let j = 0; j < gameState[0].length; j++){
            if (gameState[i][j] !== "" && winner === false){
                drawCount++;
            }
        }
    }
    if(drawCount === 42){
        turnTracker.textContent = ("Its a draw!")
        winner = true;
    }
    console.log(drawCount)
}



// Check win
function checkWin(){
    checkVertical()
    checkHorizontal()
    checkDraw()
    checkUpRight()
    checkDownRight()
}




// P2 CPU    
function compOpp(){
    let column = Math.floor(Math.random() * 7)
    let pick = firstAvailSpace(column)
    while (pick === undefined){
        column = Math.floor(Math.random() * 7)
        pick = firstAvailSpace(column)
    }
    if (!isplayer1Turn){
            gameState[column][pick] = 'yellow'
            isplayer1Turn = !isplayer1Turn
        }
}
// compOpp()


// Input section
let submitButton = document.querySelector("#submitButton")
let slider = document.querySelector(".switch input")
slider.addEventListener('change', function(event) {
    player2Input.style.display = event.target.checked ? 'none' : 'block';
})


// Submit Button
submitButton.addEventListener('click', function(){
    if (!slider.checked && (player1Input.value === "" || player2Input.value === "")){
        alert("missing a name")
    } else if (slider.checked && player1Input.value === ""){
        alert("input player 1 name")
    } else{
        player1Name.textContent = ("Player 1: " + player1Input.value)
        player2Name.textContent = ("Player 2: " + (!slider.checked ? player2Input.value : "CPU"))
        onePlayer = slider.checked
        player1Input.value = ""
        player2Input.value = ""
        inputArea.style.display = 'none'
        isplayer1Turn = !!Math.floor(Math.random()*2);
        
        refreshBoard()
    }
})


// Board Refresh 
function refreshBoard(){
    
    if (winner){
        return;
    }
    
    if (onePlayer){
        compOpp()
    }
    
    if (isplayer1Turn){
        turnTracker.textContent = "Player 1 turn!"
    } else {
        turnTracker.textContent = "Player 2 turn!"
    }
    
    board.textContent = ""
    
    for (let i = 0; i < gameState.length; i++) {
        for (let j = 0; j < gameState[0].length; j++) {
            let square = document.createElement("div");
            square.setAttribute("class", "square");
            square.textContent = gameState[i][j];
            
            if (square.textContent === 'red'){
                square.classList.add('player-1')
            } else if (square.textContent === 'yellow'){
                square.classList.add('player-2')
            } 
            
            board.appendChild(square);
            square.dataset.column = i;
            square.dataset.row = j;
        }
    }
    
    checkWin()
}
// refreshBoard();




board.addEventListener("click", function(event){
    let column = event.target.dataset.column;
    let row = event.target.dataset.row;
    let firstSpace = firstAvailSpace(column)
    let square = event.target;
    if (square.classList.contains('square')){
        if (firstSpace === undefined){
            alert("Invalid Move!")
        } else if (isplayer1Turn){
            gameState[column][firstSpace] = 'red'
            isplayer1Turn = !isplayer1Turn
        } else if (!isplayer1Turn){
            gameState[column][firstSpace] = 'yellow'
            isplayer1Turn = !isplayer1Turn
        }
    }
    refreshBoard();
})


// Reset Button
let resetButton = document.querySelector("#resetButton")
function gameReset() {
    let squares = document.querySelectorAll('.square')
    for (let i = 0; i < gameState.length; i++) {
        for (let j = 0; j < gameState[0].length; j++) {
            gameState[i][j] = ''
        }
    }
    // board.innerHTML = ""
    squares.forEach(square => {
        square.remove()
    })
    player1Name.textContent = ""
    player2Name.textContent = ""
    inputArea.style.display = 'flex'
    turnTracker.textContent = "Enter player names"
    winner = false;
}
resetButton.addEventListener('click', gameReset)



