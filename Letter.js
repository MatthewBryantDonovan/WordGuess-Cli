var Letter = function (letter) {
    this.letter = letter;
    this.solved = false;
    this.display = function (){
        // || this.solved.toLowerCase().search(/[a-z]/) === 0
        if (this.solved == true || this.letter.toLowerCase().search(/[a-z]/) != 0) {
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