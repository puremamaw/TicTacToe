var column;
var title;
var players = [];
var markers = [
    "<img src='pictures/sharingan.png' id='cross'/>",
    "<img src='pictures/rinnegan.png' id='circle'/>"
];
var whoseTurn = 0;
var startGame;
var resetGame;
var playerDisplay;
var scores = [
    0,
    0
];
var winValues = [
    7,
    56,
    73,
    84,
    146,
    273,
    292,
    448
];
var gameOver = false;
var music;
var soundOne;
var soundTwo;
var test;

document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        initialize();
    }
};

function initialize() {
    players[0] = "Sharingan";
    players[1] = "Rinnegan";
    queryAllElements();
    attachEventHandlers();
}

function queryAllElements() {
    column = document.querySelectorAll(".row");
    startGame = document.querySelector("#start-game");
    playerDisplay = document.querySelector("#player-name");
    resetGame = document.querySelector('#reset-game');
    title = document.querySelector('#tictactoe-title');
    music = document.querySelector('#background-music');
    soundOne = document.querySelector('#ms');
    soundTwo = document.querySelector('#st');
    test = document.querySelectorAll('.column');
}
function attachEventHandlers() {
    onButtonGameStart();
    resetGame.onclick = onButtonResetGame;
}

function onButtonGameStart() {

    if (!startGame.onclick) {
        for (var x = 0; x < column.length; x++) {
            column[x].onclick = hasntClickedGameStart;
        }
    }

    startGame.onclick = function () {
        onButtonResetGame();
        music.play();
        title.innerText = "Game Started";
        playerDisplay.style.color = "red";
        playerDisplay.innerText = players[whoseTurn] + "'s  Turn";
        for (var x = 0; x < column.length; x++) {
            column[x].onclick = onFieldClicked;
        }
    }
}

function hasntClickedGameStart() {
    alert("Please Press Start Game");
}

function onFieldClicked(e) {
    if (!gameOver) {
        e.target.innerHTML = markers[whoseTurn];
        var currentScore = parseInt(e.target.id);
        
        if (Number.isNaN(currentScore))
            return;
        scores[whoseTurn] += currentScore;
        gameWinner();
        if (!gameOver)
            playerTurn();
    }
}

function gameWinner() {
    for (var x = 0; x < winValues.length; x++) {
        if ((scores[whoseTurn] & winValues[x]) == winValues[x]) {
            title.innerText = "Game Ended";
            alert(players[whoseTurn] + " Wins!");
            
            if (players[whoseTurn] == "Sharingan") {
                soundOne.play();
            } else
                soundTwo.play();
            gameOver = true;
        }
    }

    if (((scores[0] + scores[1]) == 511) && !gameOver) {
        alert("Its a Tie!");
        gameOver = true;
    }
}

function playerTurn() {
    if (whoseTurn == 0) {
        whoseTurn = 1;
        playerDisplay.style.color = "#a272e0";      
    }   
    else {
        whoseTurn = 0;
        playerDisplay.style.color = "red";  
    }
       
    playerDisplay.innerText = players[whoseTurn] + "'s  Turn";
}

function onButtonResetGame() {
    whoseTurn = 0;
    playerDisplay.innerText = "";
    soundOne.pause();
    soundTwo.pause();
    title.innerText = "Tic Tac Toe";

    scores = [0,0];

    if(gameOver)
        gameOver = false;

    for (var x = 0; x < test.length; x++) {
        test[x].innerHTML = "";
    }
}


