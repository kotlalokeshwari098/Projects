const choices = ["rock", "papers", "scissors"];
const playerDisplay = document.getElementById("playerDisplay")
const computerDisplay = document.getElementById("computerDisplay");
let resultDisplay = document.getElementById("resultDisplay");
const playerScoredisplay = document.getElementById("playerScoreDisplay");
const computerScoreDisplay = document.getElementById("computerScoreDisplay");
let playerScore = 0;
let computerScore = 0;

function playGame(playerChoice) {
    const computerChoice = choices[Math.floor(Math.random() * 3)];
    let result = "";

    if (playerChoice === computerChoice) {
        result = "IT'S A TIE!!!";
    }
    else {
        switch (playerChoice) {
            case "rock":
                result = (computerChoice === "scissors") ? "YOU WIN!!" : "YOU LOSE";
                break;
            case "papers":
                result = (computerChoice === "rock") ? "YOU WIN!!" : "YOU LOSE";
                break;
            case "scissors":
                result = (computerChoice === "papers") ? "YOU WIN!!" : "YOU LOSE";
                break;

        }
    }
    playerDisplay.textContent = `Player : ${playerChoice}`;
    computerDisplay.textContent = `Computer : ${computerChoice}`;

    switch (result) {
        case "YOU WIN!!":
            resultDisplay.classList.add("greenText");
            playerScore++;
            playerScoredisplay.textContent=playerScore;
            break;
        case "YOU LOSE":
            resultDisplay.classList.add("redText");
            computerScore++;
            computerScoreDisplay.textContent = computerScore; 
            break;
    }
}