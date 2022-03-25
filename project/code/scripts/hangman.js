// game object
class Game {
    constructor(totalGuesses){
        this.guessSoFar                 = "";
        this.totalGuesses               = totalGuesses;
        this.currentImage               = firstImage;
        this.numberOfGuessesMade        = 0;
        this.numberOfGuessesRemaining   = 6;
        this.correctLetters             = new Set();
        this.currentLetter              = "";
        this.gameOver                   = false;
    }
}

// Dictionary of words and hints
// words list adapted from https://futureofworking.com/40-hardest-words-to-guess-in-hangman 
const dictionary = [
    ["avenue", "another word for street"],
    ["beekeeper", "someone who works with hives"],
    ["boggle", "to confuse"], 
    ["cobweb", "spun by an arachnid"],
    ["druid", "a celtic sorcerer" ],
    ["elephant", "one of the largest land mammals" ],
    ["funny", "amusing" ],
    ["galaxy", "a large area of space" ],
    ["jackpot", "a big win" ],
    ["joyful", "exuberant" ],
    ["jumbo", "giant" ],
    ["kayak", "something to ride on a river" ],
    ["lucky", "fortunate" ],
    ["nightclub", "somewhere to dance while listening to music" ],
    ["pneumonia", "an illness of the lungs" ],
    ["rabbit", "a small animal with large ears" ],
    ["scratch", "what you do when something is itchy" ]
]