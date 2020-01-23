var Letter = require("./Letter");

// Word stores an array of letters to make up the word
var Word = function (word){
    this.wordSolved = [];

    // Push all letters to the word array
    for (var index = 0; index < word.length; index++) {
        var newLetter = new Letter(word.charAt(index));
        this.wordSolved.push(newLetter);
    }

    // Display the current solved state of the word as a string IE(FoxHound -> F o _ _ _ u _ d)
    this.wordCurrent = function(){
        this.wordString = "";
        for (var index = 0; index < this.wordSolved.length; index++) {
            this.wordString += this.wordSolved[index].display() + " ";
        }
        return this.wordString;
    }

    // Check the users guessed letter against the word
    this.wordCheck = function(guess){
        for (var index = 0; index < this.wordSolved.length; index++) {
            this.wordSolved[index].letterCheck(guess);
        }
    }

}

// To be used in index.js
module.exports = Word;