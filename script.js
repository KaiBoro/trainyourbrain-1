"use strict";

// Selecting elements
const field1El = document.querySelector(".field--1");
const field2El = document.querySelector(".field--2");
const field3El = document.querySelector(".field--3");
const field4El = document.querySelector(".field--4");
const field5El = document.querySelector(".field--5");
const infoEl = document.querySelector(".info");
const buttonStartEl = document.querySelector(".btn--start");
const buttonCheckEl = document.querySelector(".btn--check");
const buttonResetEl = document.querySelector(".btn--reset");
const buttonLevelEl = document.querySelector(".btn--level");
const levelEl = document.querySelector(".level-scores");
const scoresEl = document.querySelector(".current-scores");
const attemptsEl = document.querySelector(".attempts-scores");
const highscoreEl = document.querySelector(".highscore-scores");
const gameEl = document.querySelector(".game");

// Starting conditions
let randomNumbers = [];
let userInputNumbers = [];
let playing = true;
let checking = false;
let reset = false;
let adding = false;
let level = false;
let attempts = 0;
let scores = 0;
let highscore = 0;

// Initialize number of blinks and initialize max attempts
let numberBlinks = 5;
const maxAttempts = 10;

// Change color of bottons
function changeColor(buttonEl, newColor) {
  buttonEl.style.backgroundColor = newColor;
}

// Set text content
function setText(element, newText) {
  element.textContent = newText;
}

// Create random numbers array between 1 - 5
function createRandom() {
  for (let i = 0; i < numberBlinks; i++) {
    randomNumbers.push(Math.floor(Math.random() * 5) + 1);
  }
}

// Show blinking fields to user
function showBlinkingFields() {
  let durationTime;
  // Deactivate playing button
  playing = false;
  setText(infoEl, "Concentrate.");
  infoEl.classList.add("animated");
  // Show fields blinking
  randomNumbers.forEach(function (entry, index) {
    durationTime = index * 2500 + 1500;
    // Interval blinking fields
    setTimeout(function () {
      document.querySelector(".field--" + entry).style.backgroundColor =
        "#ffd523";
      // Duration blinking each field
      setTimeout(function () {
        document.querySelector(".field--" + entry).style.backgroundColor = "";
      }, 1000);
    }, index * 2500);
  });
  setTimeout(function () {
    setText(infoEl, "What is your solution?");
    infoEl.classList.remove("animated");
    // Activate user input
    adding = true;
  }, durationTime);
}

// Collect user input numbers
function addUserInput(numberInput) {
  if (adding) {
    // Only add max numberBlinks items to userInputNumbers array
    if (userInputNumbers.length === numberBlinks - 1) {
      // Activate checking button
      checking = true;
      // Deactive user input
      adding = false;
      userInputNumbers.push(numberInput);
      changeColor(buttonCheckEl, "#ffd523");
    } else if (userInputNumbers.length !== numberBlinks) {
      userInputNumbers.push(numberInput);
    }
  }
}

// Compare user input with random numbers array
function checkUserInput() {
  if (checking) {
    // Deactivate checking button
    checking = false;
    // Activate playing button
    playing = true;
    // check if random sequence order is same as user input sequence order
    let isEqual = userInputNumbers.toString() === randomNumbers.toString();

    attempts += 1;
    setText(attemptsEl, attempts);

    if (isEqual) {
      setText(infoEl, "Correct.");
      scores += 1;
      setText(scoresEl, scores);
    } else {
      setText(infoEl, "Keep training.");
    }

    // User reached maxAttempts
    if (attempts === maxAttempts) {
      // Deactivate playing button
      playing = false;
      // Activate reset button
      reset = true;
      changeColor(buttonCheckEl, "#B2B1B9");
      changeColor(buttonStartEl, "#B2B1B9");
      changeColor(buttonResetEl, "#FFD523");
      // Check new highscore
      if (scores <= highscore) {
        setText(infoEl, "Keep training. Game over.");
      } else {
        highscore = scores;
        setText(highscoreEl, highscore);
        // Check next level
        if (highscore === maxAttempts) {
          setText(infoEl, "You are ready for the next level.");
          changeColor(buttonLevelEl, "#FFD523");
          level = true;
        } else {
          setText(infoEl, "Congrats. New highscore!");
        }
      }
    } else {
      changeColor(buttonCheckEl, "#b2b1b9");
      changeColor(buttonStartEl, "#ffd523");
    }
  }
}

// Reset
function resetGame() {
  // Initialize game except highscore
  scores = 0;
  attempts = 0;
  // Activate playing button
  playing = true;
  // Deactive reset button
  reset = false;
  // Deactive level up button
  level = false;
  setText(scoresEl, scores);
  setText(attemptsEl, attempts);
  setText(infoEl, "Let´s start.");
  changeColor(buttonResetEl, "#B2B1B9");
  changeColor(buttonStartEl, "#FFD523");
  changeColor(buttonLevelEl, "#B2B1B9");
}

// Start game
buttonStartEl.addEventListener("click", function () {
  if (playing) {
    randomNumbers = [];
    userInputNumbers = [];
    changeColor(buttonStartEl, "#b2b1b9");
    createRandom();
    showBlinkingFields();
  }
});

// Check user input
buttonCheckEl.addEventListener("click", function () {
  if (checking) {
    checkUserInput();
  }
});

// Reset game
buttonResetEl.addEventListener("click", function () {
  if (reset) {
    resetGame();
  }
});

// Level up
buttonLevelEl.addEventListener("click", function () {
  if (level) {
    resetGame();
    // Initialize highscore
    highscore = 0;
    setText(highscoreEl, highscore);
    // Increase number of blinks according to level
    if (numberBlinks === 5) {
      numberBlinks = 7;
      setText(levelEl, "Advanced");
    } else if (numberBlinks === 7) {
      numberBlinks = 9;
      setText(levelEl, "Guru");
    }
    setText(
      infoEl,
      "Let´s continue. Now " + numberBlinks + " numbers to memorize."
    );
  }
});
