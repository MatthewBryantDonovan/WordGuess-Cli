//TODO: make words have ',' and ' '. When they do make it so they are already answered as true (possibly done in word.js or letter.js).
//TODO: Make a better user interface. (new game // exit) 
//TODO: user input (make it so letters guessed already display an error) (only accept letters and a single character)

var Word = require("./Word");
var inquirer = require("inquirer");
var guessesRemaining = 10;
var lastGuess = "";
var wordPool = ["Psychokinesis", "Vulcan", "Raven", "Mantis", "Ocelot", "Campbell", "Nanomachines", "Zanzibar", "Foxhound", "Foxdie"];
var guessThisWord;

function newWord(){
    guessThisWord = new Word(wordPool[Math.floor(Math.random() * wordPool.length) + 1]);
    lastGuess = guessThisWord.wordCurrent();
};

function game() {

    if (!guessThisWord.wordCurrent().includes("_")) {
        console.log("Finished");
    } else {
        console.log("keep going");

        inquirer.prompt([{
            type: "input",
            message: "Guess a letter!",
            name: "guess"
        }, ]).then(function (response) {
            guessThisWord.wordCheck(response.guess);
            console.log(guessThisWord.wordCurrent());
            if (lastGuess == guessThisWord.wordCurrent()) {
                guessesRemaining--;
                console.log("You now have " + guessesRemaining + " wrong guesses remaining!");
            }
            lastGuess = guessThisWord.wordCurrent();

            if (guessesRemaining == 0){
                console.log("You lose!");

                return;
            } else {

                if (!guessThisWord.wordCurrent().includes("_")) {
                    console.log("Finished\n\nTime to play a new game!");
                    newWord();
                    guessesRemaining = 10;
                    game();
                } else {
                    game();
                }

            }


        });
    }


};

newWord();

game();