//TODO: make words have ',' and ' '. When they do make it so they are already answered as true (possibly done in word.js or letter.js).
//TODO: Make a better user interface. (new game // exit) 


var Word = require("./Word");
var inquirer = require("inquirer");
var guessesRemaining = 10;
var lastGuess = "";
var wordPool = ["Psychokinesis", "Vulcan", "Raven", "Mantis", "Ocelot", "Campbell", "Nanomachines", "Zanzibar","Fox hound", "Fox die"];
var guessThisWord;
var prevGuessLetter = [];

function newWord() {
    guessThisWord = new Word(wordPool[Math.floor(Math.random() * wordPool.length)]);
    lastGuess = guessThisWord.wordCurrent();
    console.log("\n" + guessThisWord.wordCurrent());

};

function newGame() {
    inquirer.prompt([{
        type: "confirm",
        message: "Would you like to play again?",
        name: "answer"
    }, ]).then(function (response) {
        if (response.answer == true) {
            newWord();
            guessesRemaining = 10;
            prevGuessLetter = [];
            game();
        } else if (response.answer == false) {
            console.log("Thanks for playing!");
        }
    });
};

function game() {

        inquirer.prompt([{
            type: "input",
            message: "Guess a letter!",
            name: "guess"
        }, ]).then(function (response) {

            if (response.guess.toLowerCase().search(/[a-z]/) === 0 && response.guess.length == 1) {
                guessThisWord.wordCheck(response.guess);
                console.log(guessThisWord.wordCurrent() + "\n\n");
                if (lastGuess == guessThisWord.wordCurrent() && !prevGuessLetter.includes(response.guess.toLowerCase())) {
                    guessesRemaining--;
                    if (guessesRemaining > 0){
                        console.log("You now have " + guessesRemaining + " wrong guesses remaining!");
                    }
                } else if (prevGuessLetter.includes(response.guess.toLowerCase())) {
                    console.log("You have guessed '" + response.guess.toUpperCase() + "' already!");
                }
                lastGuess = guessThisWord.wordCurrent();
    
                if (!prevGuessLetter.includes(response.guess.toLowerCase())) {
                    prevGuessLetter.push(response.guess.toLowerCase());
                }
    
                if (guessesRemaining == 0) {
                    console.log("\n---- You couldn't quite guess the word! ----\n\n");
                    newGame();
                } else {
    
                    if (!guessThisWord.wordCurrent().includes("_")) {
                        console.log("---- You guessed the word! Congratulations! ----\n\n");
                        newGame();
                    } else {
                        game();
                    }
    
                }
            } else {
                console.log("\n\nPlease guess a single letter! Try again!\n\n" + guessThisWord.wordCurrent());
                game();
            }




        });



};

newWord();
game();