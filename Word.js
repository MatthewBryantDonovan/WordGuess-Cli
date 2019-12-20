var Letter = require("./Letter")

var Word = function (word){
    this.wordSolved = [];

    for (var index = 0; index < word.length; index++) {
        var newLetter = new Letter(word.charAt(index))
        this.wordSolved.push(newLetter);
    }

    this.wordCurrent = function(){
        this.wordString = "";
        for (var index = 0; index < this.wordSolved.length; index++) {
            this.wordString += this.wordSolved[index].display() + " ";
        }
        return this.wordString;
    }

    this.wordCheck = function(guess){
        for (var index = 0; index < this.wordSolved.length; index++) {
            this.wordSolved[index].letterCheck(guess);
        }
    }

}

module.exports = Word;