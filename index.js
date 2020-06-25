const Word = require("./word.js");
const inquirer = require("inquirer");

const wordBank =["bears", "bengals", "bills","broncos", "browns","cardinals", "chargers", "chiefs", "colts","cowboys", "dolphins", "eagles", "falcons", "fortyniners","giants", "jaguars", "jets",
"lions", "packers","panthers", "patriots", "raiders", "rams", "ravens", "redskins","saints","seahawks","steelers", "buccaneers", "texans", "titans","vikings"];



let guesses;
let pickedWords;
let word;
let pickedWord;

function begin() {
  pickedWords = [];
  console.log("================================");
  console.log("CAN YOU GUESS THE NFL TEAM NAME?");
  // console.log("(not the cities/states)");
  console.log("================================");
  playGame();
}

function playGame() {
  pickedWord = "";
  guesses = 15;
  if(pickedWords.length < wordBank.length) {
    pickedWord = getWord();
  } else {
    continuePrompt();
  }
  if(pickedWord) {
    word = new Word(pickedWord);
    word.makeLetters();
    makeGuess();
  }
}

function getWord() {
  let rand = Math.floor(Math.random() * wordBank.length);
  let randomWord = wordBank[rand];
  if(pickedWords.indexOf(randomWord) === -1) {
    pickedWords.push(randomWord);
    return randomWord;
  } else {
    return getWord();
  }
}

function makeGuess() {
  let checker = [];
  inquirer.prompt([
    {
      name: "guessedLetter",
      message: word.update() + 
              "\nGuess a letter" +
              "\nGuesses Left: " + guesses
    }
  ])
  .then(data => {
    word.letters.forEach(letter => {
      letter.checkLetter(data.guessedLetter);
      checker.push(letter.getLetter());
    });
    if(guesses > 0 && checker.indexOf("_") !== -1) {
      guesses--;
      if(guesses === 0) {
        console.log("OUT OF GUESSES! YOU LOSE");
        continuePrompt();
      } else {
        makeGuess();
      }
    } else {
      console.log("YOU KNOW YOUR NFL TEAMS!! CONGRATS!!");
      console.log(word.update());
      playGame();
    }
  });
}

function continuePrompt() {
  inquirer.prompt([
      {
        name: "continue",
        type: "list",
        message: "Play again?",
        choices: ["Yes", "No"]
      }
    ])
  .then(data => {
      if(data.continue === "Yes") {
        begin();
      } else {
        console.log("Thanks for playing!!");
      }
  });
}

begin();