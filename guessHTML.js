let secretNumber, guessCount = 0, gameType;
let minGuess = 1;
let maxGuess = 100;
let computerGuess;

document.addEventListener("DOMContentLoaded", () => {
    toggleGameButtons(true); // Initially show the game selection buttons
    document.getElementById("message").textContent = "Choose a game to start playing.";

    document.getElementById("inputForm").addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the form from submitting traditionally, which would reload the page
        submitGuess();
    });
});

function playReverseGame() {
    gameType = 1; // Player guesses the computer's number
    secretNumber = Math.floor(Math.random() * 100) + 1;
    guessCount = 0;
    document.getElementById("message").textContent = "Guess the number I'm thinking of between 1 and 100.";
    toggleInput(true); // Show the input field
}

function playOriginalGame() {
    gameType = 2; // Computer guesses your number
    minGuess = 1;
    maxGuess = 100;
    guessCount = 0;
    makeComputerGuess();
}

function submitGuess() {
    const userInput = document.getElementById("userInput").value.toUpperCase();
    document.getElementById("userInput").value = ''; // Clear the input field

    if (gameType === 1) {
        processPlayerGuess(parseInt(userInput));
    } else if (gameType === 2) {
        processHint(userInput);
    }
}

function processPlayerGuess(guess) {
    guessCount++;
    if (guess === secretNumber) {
        document.getElementById("message").textContent = `Correct! The number was ${secretNumber}. It took you ${guessCount} guesses.`;
        toggleInput(false); // Hide the input field
        toggleGameButtons(true); // Show the game selection buttons again
    } else if (guess < secretNumber) {
        document.getElementById("message").textContent = "Too low! Guess again.";
    } else if (guess > secretNumber) {
        document.getElementById("message").textContent = "Too high! Guess again.";
    }
}

function makeComputerGuess() {
    computerGuess = Math.floor((minGuess + maxGuess) / 2);
    document.getElementById("message").textContent = `Is your number ${computerGuess}? (Enter H for higher, L for lower, C for correct)`;
    toggleInput(true); // Show the input field for hints
}

function processHint(hint) {
    guessCount++;
    if (hint === 'C') {
        document.getElementById("message").textContent = `Hooray! I've guessed your number ${computerGuess} correctly in ${guessCount} attempts.`;
        toggleInput(false); // Hide the input field
        toggleGameButtons(true); // Show the game selection buttons again
    } else if (hint === 'H') {
        minGuess = computerGuess + 1;
        makeComputerGuess();
    } else if (hint === 'L') {
        maxGuess = computerGuess - 1;
        makeComputerGuess();
    } else {
        document.getElementById("message").textContent = "Please enter a valid hint (H, L, C).";
    }
}

function toggleInput(show) {
    document.getElementById("inputForm").style.display = show ? "block" : "none";
}

function toggleGameButtons(show) {
    document.getElementById("guessComputerNumber").style.display = show ? "block" : "none";
    document.getElementById("computerGuesses").style.display = show ? "block" : "none";
    if (show) {
        toggleInput(false); // Hide the input field when showing game selection buttons
    }
}
