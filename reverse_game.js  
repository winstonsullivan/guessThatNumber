const readline = require('readline');

let rl;

function startReadline() {
  rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

function closeReadline() {
  rl.close();
}

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (input) => resolve(input));
  });
}

async function chooseGame() {
  const choice = await askQuestion('Do you want to play the "guess the computer\'s number" game (1) or the "computer guesses your number" game (2)? Enter 1 or 2: ');
  if (choice === '1') {
    playReverseGame();
  } else if (choice === '2') {
    playOriginalGame();
  } else {
    console.log("Invalid choice. Exiting.");
    closeReadline();
  }
}

async function playOriginalGame() {
  console.log("Welcome to the Number Guessing Game!");
  const highRange = await setHighRange();
  const min = 1;
  console.log(`Please think of a number between ${min} and ${highRange} (inclusive). I will try to guess it.`);
  guessNumber(min, highRange);
}

function setHighRange() {
  return new Promise((resolve) => {
    askQuestion("Enter the maximum number for the guessing range: ").then(answer => {
      resolve(parseInt(answer));
    });
  });
}

let guessCount = 0; // Global guess count for the current game session

function guessNumber(min, max, minLimit = 1, maxLimit = Infinity) {
  guessCount++;
  let guess = Math.floor((min + max) / 2);
  console.log(`Is your number ${guess}? [Guess count: ${guessCount}]`);

  askQuestion("Enter 'H' for higher, 'L' for lower, 'C' for correct: ").then(answer => {
    answer = answer.toUpperCase();
    if (answer === 'C') {
      console.log(`Your number was ${guess}! It took ${guessCount} guesses.`);
      playAgainPrompt();
    } else if (answer === 'H') {
      if (guess >= maxLimit) {
        console.log(`You said it was lower than ${maxLimit + 1}, so it can't also be higher than ${guess}!`);
        guessNumber(min, max, minLimit, maxLimit); // Ask again without incrementing guessCount
      } else {
        guessNumber(guess + 1, max, guess + 1, maxLimit);
      }
    } else if (answer === 'L') {
      if (guess <= minLimit) {
        console.log(`You said it was higher than ${minLimit - 1}, so it can't also be lower than ${guess}!`);
        guessNumber(min, max, minLimit, maxLimit); // Ask again without incrementing guessCount
      } else {
        guessNumber(min, guess - 1, minLimit, guess - 1);
      }
    } else {
      console.log("Please enter a valid response.");
      guessNumber(min, max, minLimit, maxLimit); // Ask again without incrementing guessCount
    }
  });
}

async function playAgainPrompt() {
  const playAgain = await askQuestion('Do you want to play again? (yes/no): ');
  if (playAgain.toLowerCase() === 'yes') {
    guessCount = 0; // Reset guess count for a new game
    chooseGame(); // Let the user choose which game to play again
  } else {
    console.log('Thanks for playing!');
    closeReadline();
  }
}

async function playReverseGame() {
  const min = 1, max = 100;
  let secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  let guessCount = 0;

  console.log(`Welcome to the Reverse Guessing Game! I'm thinking of a number between ${min} and ${max}.`);

  async function guessLoop() {
    const guess = await askQuestion('Guess a number: ');
    guessCount++;
    if (parseInt(guess) === secretNumber) {
      console.log(`Congratulations! You've guessed the number ${secretNumber} correctly in ${guessCount} tries!`);
      playAgainPrompt();
    } else {
      console.log(`Too ${parseInt(guess) < secretNumber ? 'low' : 'high'}! Try again.`);
      guessLoop();
    }
  }

  guessLoop();
}

startReadline(); 
chooseGame(); // Start the game by letting the user choose which game to play
