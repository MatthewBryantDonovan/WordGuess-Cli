//TODO: make words have ',' and ' '. When they do make it so they are already answered as true (possibly done in word.js or letter.js).
//TODO: Make a better user interface. (new game // exit) 


var Word = require("./Word");
var inquirer = require("inquirer");
var guessesRemaining = 10;
var lastGuess = "";
var wordPool = ["Psychokinesis", "Vulcan", "Raven", "Mantis", "Ocelot", "Campbell", "Nanomachines", "Zanzibar","Fox hound", "Fox die"];
var guessThisWord;
var prevGuessLetter = [];

// Pick a word out of the word pool for the user to guess
function newWord() {
    guessThisWord = new Word(wordPool[Math.floor(Math.random() * wordPool.length)]);
    lastGuess = guessThisWord.wordCurrent();
    console.log("\n" + guessThisWord.wordCurrent());

}

//  Ask the user if they would like to play again. Thank them for playing if they don't!
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
}


// Start the game
function game() {

        //Ask the user to guess a letter
        inquirer.prompt([{
            type: "input",
            message: "Guess a letter!",
            name: "guess"
        }, ]).then(function (response) {

            // User guess validation
            if (response.guess.toLowerCase().search(/[a-z]/) === 0 && response.guess.length == 1) {

                //Check the word with the users guess
                guessThisWord.wordCheck(response.guess);
                console.log(guessThisWord.wordCurrent() + "\n\n");

                // If they guessed incorrect take a guess away
                if (lastGuess == guessThisWord.wordCurrent() && !prevGuessLetter.includes(response.guess.toLowerCase())) {
                    guessesRemaining--;
                    if (guessesRemaining > 0){
                        console.log("You now have " + guessesRemaining + " wrong guesses remaining!");
                    }

                // If the user guessed the letter already let them know.
                } else if (prevGuessLetter.includes(response.guess.toLowerCase())) {
                    console.log("You have guessed '" + response.guess.toUpperCase() + "' already!");
                }

                // lastGuess will be used to determine if the user guesses correct
                lastGuess = guessThisWord.wordCurrent();
                
                // Keep all the letters the user guessed so we can let them know if they guess it again
                if (!prevGuessLetter.includes(response.guess.toLowerCase())) {
                    prevGuessLetter.push(response.guess.toLowerCase());
                }
                
                // If they used all their guesses the game is over!
                if (guessesRemaining == 0) {
                    console.log("\n---- You couldn't quite guess the word! ----\n\n");
                    newGame();
                } else {
                    
                    //They win if the word doesn't include any blank spaces
                    if (!guessThisWord.wordCurrent().includes("_")) {
                        console.log("---- You guessed the word! Congratulations! ----\n\n");
                        newGame();
                    } else {
                        game();
                    }
    
                }
            // If multiple characters were submitted by the user let them know only one letter can be used.
            } else {
                console.log("\n\nPlease guess a single letter! Try again!\n\n" + guessThisWord.wordCurrent());
                game();
            }




        });



}

//Call the functions to start the game
newWord();
game();