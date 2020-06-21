

// Game values
let min = 2,
    max = 8,
    winningNum  = getRandomNum(min,max),
    guessesLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessbtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min & Max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }

} );


// Listen for guess
guessbtn.addEventListener('click',function(){
    let guess = parseInt(guessInput.value);
   // console.log(guess);
    // validate input
    if(isNaN(guess) || guess < min || guess > max){
        setMessage('Please enter a number between '+ min +' and '+ max ,'red');
    }

    // Check if Won
    if (guess === winningNum){

        gameOver(true, winningNum +' is Correct!');

    } else {
        // Guesses Left
        guessesLeft -= 1;

        if(guessesLeft === 0){
            // Game Over Lost
            gameOver(false, 'Game Over the winning number was '+ winningNum);

        } else { 
            // Game Continues - Answer Wrong
            // Reset value
            guessInput.value = '';
            // Change Border
            guessInput.style.borderColor = 'red';
            // set Message
            setMessage(guess + ' was not correct, guesses remain '+ guessesLeft,'red');
        }

    }

})

// Game over

function gameOver (won, msg){
    let color;
    won === true ? color = 'green' : color = 'red';

        // Disable Input
        guessInput.disabled = true;
        
        // Change Border
        guessInput.style.borderColor = color;
        // Change text color
        message.style.color = color;
        // set Message
        setMessage(msg);

        // Play again?
        guessbtn.value = 'Play Again';
        guessbtn.className += 'play-again';
}

// Get winning number

function getRandomNum(min, max){
    return(Math.floor(Math.random()*(max - min + 1)+ min))

}

// set Message

function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}