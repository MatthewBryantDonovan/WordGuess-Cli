var Letter = function (letter) {
    this.letter = letter;
    this.solved = false;
    this.display = function (){
        if (this.solved == true) {
            return this.letter;
        } else {
            return "_";
        }
    }
    this.letterCheck = function(guess){
        if (guess.toLowerCase() == this.letter.toLowerCase()){
            this.solved = true;
        }
    }
}

module.exports = Letter;