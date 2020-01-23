// Letter stores an individual that will eventually make up a word
var Letter = function (letter) {
    this.letter = letter;
    this.solved = false;

    //if the letter hasn't been guessed yet display a '_' if it has then display the letter.
    this.display = function (){
        // || this.solved.toLowerCase().search(/[a-z]/) === 0
        if (this.solved == true || this.letter.toLowerCase().search(/[a-z]/) != 0) {
            return this.letter;
        } else {
            return "_";
        }
    }

    // Take the users guess and and make it solved if it matches.
    this.letterCheck = function(guess){
        if (guess.toLowerCase() == this.letter.toLowerCase()){
            this.solved = true;
        }
    }
}

// To be used in Word.js
module.exports = Letter;