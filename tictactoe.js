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
var audioCheer;
var music;
 

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
    audioCheer = document.querySelector('#cheer');
    music = document.querySelector('#background-music');
}
function attachEventHandlers() {
    onButtonGameStart();
    resetGame.onclick = onButtonResetGame;
}

function onButtonGameStart() {

    if(!startGame.onclick) {
        for (var x = 0; x < column.length; x++) {
            column[x].onclick = hasntClickedGameStart;
        }
    }
        
    startGame.onclick = function () {
        music.play();
        title.innerText = "Game Started";
        playerDisplay.innerText = players[whoseTurn] + "'s  Turn";
        for (var x = 0; x < column.length; x++) {
            column[x].onclick = onFieldClicked;
        }
    }
}

function hasntClickedGameStart () {
    alert("Please Press Start Game");
}

function onFieldClicked(e) {
    if (!gameOver) {
        e.target.innerHTML = markers[whoseTurn];
        var currentScore = parseInt(e.target.id);
        if(Number.isNaN(currentScore))
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
            alert(players[whoseTurn] + " Wins!");
            audioCheer.play();        
            gameOver = true;
        }
    }
    if (((scores[0] + scores[1]) == 511) && !gameOver) {
        alert("Its a Tie!");
        gameOver = true;
    }
}

function playerTurn() {
    if (whoseTurn == 0)
        whoseTurn = 1;
    else
        whoseTurn = 0;
    playerDisplay.innerText = players[whoseTurn] + "'s  Turn";
}

function onButtonResetGame() {
    whoseTurn = 0;
    playerDisplay.innerText = "";
    audioCheer.pause();
    title.innerText = "Tic Tac Toe";

    for (var x = 0; x < column.length; x++) {
        column[x].innerText = "";
    }
}


