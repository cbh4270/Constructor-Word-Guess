function Letter(value) {

    this.letter = value;
    this.guessed = false;
  
    this.getLetter = function() {
      if(!this.guessed) {
        return "_";
      } else {
        return this.letter.toUpperCase();
      }
    }
  
    this.checkLetter = function(guess) {
      if(guess === this.letter) {
        this.guessed = true;
        return true
      }
    }
}
  
  
  
  module.exports = Letter;