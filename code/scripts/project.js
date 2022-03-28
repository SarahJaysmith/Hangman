// main script file for the project

// constants
const $guessSoFarDiv        = $("#hangmanGuessSoFar");
const $hangmanHintDiv       = $("#hangmanHint");
const $hangmanStatusDiv     = $("#hangmanStatus");
const $instructionsDiv      = $("#instructionsDiv");
const $hangmanLettersDiv    = $("#hangmanLetters");
const $letterNeutral        = $(".letterNeutral");
const $hangmanImage         = $("#hangmanImage");
const $playAgain            = $("#playAgain");

const imagePathStart   = "hangman-images/"
const imagePathEnd     = ".jpg";
const firstImage       = 4;
const lastImage        = 10;
const totalGuesses     = 6;
const alphabet         = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const wordIndex        = 0;
const hintIndex        = 1;
const victoryImage     = "hangman-images/trophy.jpeg";
const failureImage     = "hangman-images/fail.jpg";

// page variables
let hangman;
let chosenEntry;
let wordToGuess;
let hint; 
let numberOfLetters;

// event handling
$hangmanLettersDiv.on("click", ".letter", function(){
    hangman.currentLetter = $(this).text();
    processLetter(hangman.currentLetter);
});

$(document).on("keypress", function(event){
    if(hangman.gameOver){
        return false;
    }
    const keyPressed = String.fromCharCode(event.which);
    if(keyPressed.match(/[a-zA-Z]/)){
        processLetter(keyPressed.toUpperCase());
    }else{
        alert(`${keyPressed} is not a valid guess. Please try again.`);
    }
})

$($playAgain).on("click", function(event){
    event.preventDefault();
    location.reload(true);
});

// functions
function processLetter(letter){

    // check to see if letter is disabled
    if ($(`#${letter}`).hasClass(`letterDisabled`)){
        return; // skip everything - letter has already been guessed
    }

    if(wordToGuess.includes(letter)){
        // add letter to correct guesses array
        hangman.correctLetters.add(letter);
    } else {
        // register that a guess has been made, and update the status - only incorrect guesses count
        hangman.numberOfGuessesMade++;
        hangman.numberOfGuessesRemaining--;

        // update image
        hangman.currentImage++;
        $hangmanImage.attr("src", displayCurrentImage(hangman.currentImage)); 
    }

    // update class for that letter
    $(`#${letter}`).removeClass("letterNeutral");
    $(`#${letter}`).addClass("letterDisabled");

    // update the guess so far
    hangman.guessSoFar = displayGuessSoFar();
    $guessSoFarDiv.html(`<p>${hangman.guessSoFar}</p>`);
    $hangmanStatusDiv.html(`<p>${displayStatus()}</p>`);
}

function displayCurrentImage(imageNumber){
    return imagePathStart + imageNumber + imagePathEnd;
}

function displayGuessSoFar(){
    let result = "";
    if (hangman.correctLetters.size == 0){
        for(let c of wordToGuess){
            result += " _ ";
        }
    } else {
        for(let c of wordToGuess){
            if(hangman.correctLetters.has(c)){
                result += ` ${c} `;
            } else {
                result += ` _ `;
            }
        }
    }
    return result;
}

function displayStatus(){ 
    let result = "";

    result = `Incorrect guesses: ${hangman.numberOfGuessesMade} of ${hangman.totalGuesses}. <br />${hangman.numberOfGuessesRemaining} guesses remaining.`;

    if(hangman.guessSoFar.length > 0){ // user has started guessing
        if(!(hangman.guessSoFar.includes(" _ "))){
            // user has correctly guessed word
            $hangmanImage.attr("src", victoryImage);
            $hangmanStatusDiv.removeClass("warning");
            $hangmanStatusDiv.addClass("success");
            result = "You have correctly guessed the word!";
            hangman.gameOver = true;
        }else{
            if(hangman.numberOfGuessesRemaining == 1){
                $hangmanStatusDiv.addClass("warning");
                result = `Incorrect guesses: ${hangman.numberOfGuessesMade} of ${hangman.totalGuesses}. <br />You only have 1 guess left!`;
            } else if(hangman.numberOfGuessesRemaining == 0){
                // user has failed to guess word
                $hangmanImage.attr("src", failureImage);
                $hangmanStatusDiv.removeClass("warning");
                $hangmanStatusDiv.addClass("failure");
                result = `You have failed to guess the word! The word was: ${wordToGuess}.`;
                hangman.gameOver = true;
            }
        }
    }

    if(hangman.gameOver){
        // hide all keys
        $hangmanLettersDiv.hide();
        $instructionsDiv.html(`<p>Click Play Again to start a new game.</p>`);
        for (let letter of alphabet){
           if(!($(`#${letter}`).hasClass("disabled"))){
                console.log(letter);
                $(`#${letter}`).addClass("disabled");
            }
        }
        // show Play again button
        $playAgain.show();
    }

    return result;
}

function displayLetters(){
    let result = "";
    for(let i = 0; i < alphabet.length; i++){
        result += `<div class="letter letterNeutral" id="${alphabet[i]}">${alphabet[i]}</div>`;
    }
    return result;
}

function chooseWord(){
    const randomNumber = Math.floor(Math.random() * dictionary.length);
    return dictionary[randomNumber];
}

function startGame(){
    // create game object
    hangman = new Game(totalGuesses);

    // choose a new word
    chosenEntry                 = chooseWord();
    wordToGuess                 = chosenEntry[wordIndex].toUpperCase();
    hint                        = chosenEntry[hintIndex]; 
    numberOfLetters             = wordToGuess.length;

    // fade in the first image
    $hangmanImage.hide();
    $hangmanImage.attr("src", displayCurrentImage(hangman.currentImage)); 
    $hangmanImage.fadeIn(5000);

    // hide Play Again button
    $playAgain.hide();

    // remove classes from status div
    $hangmanStatusDiv.removeClass("warning failure success");

    // update html
    $guessSoFarDiv.html(`<p>${displayGuessSoFar()}</p>`);
    $hangmanHintDiv.html(`<p>Hint: ${hint}</p>`);
    $hangmanStatusDiv.html(`<p>${displayStatus()}</p>`);
    $hangmanLettersDiv.html(displayLetters);
    $instructionsDiv.html(`<p>Type or click a letter to guess whether it appears in the word. <br />You have ${hangman.totalGuesses} guesses!</p>`);
}

// load the inital page information
startGame();











