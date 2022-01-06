'use strict';

// document.querySelector(); //method thats available on the document object

// mutiple dot operator are executed from left to right

//////////////////////////////////////////////////
/*
//Seclecting and Manipulating Elements
console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = '🎉 Correct Number!';

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/
//////////////////////////////////////////////////
/*
// Handling Click Events

//  1st: Need to select the element where the event should happen
// 2nd: On that element, can call a method e.g addEventListener() so we need to call it once more using parenthesis. Then need to pass in the type of event, just a simple click (1st arg)
// 3rd: Need to specify the REACTION  (code that executed when click happens called EVENT HANDLER) to the Click event by defining a function

//   Note:
//     - addEventListener() is a special kind of function --in second argument is the event handler, need a function value as 2nd argument.
//     - only define function (2nd arg) then pass it into event handler, then JS engine will call this function as events happens

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No number!';
  }
});
*/
//////////////////////////////////////////////////
/*
// Implementing Game Logic

const numberSecret = Math.trunc(Math.random() * 20) + 1;
//console.log(number);
document.querySelector('.number').textContent = numberSecret;

let score = 20;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No number!';
  } else if (guess === numberSecret) {
    document.querySelector('.message').textContent = '🎉 Correct Number!';
  } else if (guess > numberSecret) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📈 Number too high!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '🤯 You lost the game!';
      document.querySelector('.score').textContent = 0;
    }
  } else if (guess < numberSecret) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📉 Number too low!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '🤯 You lost the game!';
      document.querySelector('.score').textContent = 0;
    }
  }
});

// Note: All data should always be available in our code not just in the DOM.
*/
//////////////////////////////////////////////////
/*
// Manipulating CSS Styles
let numberSecret = Math.trunc(Math.random() * 20) + 1;
//console.log(number);

let score = 20;
let highScore = 0;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  //  when no input
  if (!guess) {
    document.querySelector('.message').textContent = '⛔ No number!';

    // when player wins
  } else if (guess === numberSecret) {
    document.querySelector('.message').textContent = '🎉 Correct Number!';
    document.querySelector('.number').textContent = numberSecret;

    document.querySelector('body').style.backgroundColor = '#60b347';

    document.querySelector('.number').style.width = '30rem';

    //Implementing Highscore
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }

    //  when guess too high
  } else if (guess > numberSecret) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📈 Number too high!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '🤯 You lost the game!';
      document.querySelector('.score').textContent = 0;
    }

    // when guess too low
  } else if (guess < numberSecret) {
    if (score > 1) {
      document.querySelector('.message').textContent = '📉 Number too low!';
      score--;
      document.querySelector('.score').textContent = score;
    } else {
      document.querySelector('.message').textContent = '🤯 You lost the game!';
      document.querySelector('.score').textContent = 0;
    }
  }
});

// Coding Challenge 01
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  numberSecret = Math.trunc(Math.random() * 20) + 1;

  document.querySelector('.message').textContent = 'Start guessing...';

  document.querySelector('.score').textContent = score;

  document.querySelector('.number').textContent = '?';

  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';

  document.querySelector('.number').style.width = '15rem';
});
*/
/////////////////////////////////////////////////
/*
// Refractoring : DRY Principle
let numberSecret = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMsg = function (msg) {
  document.querySelector('.message').textContent = msg;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  //  when no input
  if (!guess) {
    //document.querySelector('.message').textContent = '⛔ No number!';
    displayMsg('⛔ No number!');

    // when player wins
  } else if (guess === numberSecret) {
    //document.querySelector('.message').textContent = '🎉 Correct Number!';
    displayMsg('🎉 Correct Number!');

    document.querySelector('.number').textContent = numberSecret;

    document.querySelector('body').style.backgroundColor = '#60b347';

    document.querySelector('.number').style.width = '30rem';

    //Implementing Highscore
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }

    //when guess is wrong
    else if (guess !== numberSecret) {
      if (score > 1) {
        // document.querySelector('.message').textContent =
        //   guess > numberSecret ? '📈 Number too high!' : '📉 Number too low!';
        displayMsg(
          guess > numberSecret ? '📈 Number too high!' : '📉 Number too low!'
        );
        score--;
        document.querySelector('.score').textContent = score;
      } else {
        // document.querySelector('.message').textContent =
        //   '🤯 You lost the game!';
        displayMsg('🤯 You lost the game!');
        document.querySelector('.score').textContent = 0;
      }
    }
  }
});

// Coding Challenge 01
document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  numberSecret = Math.trunc(Math.random() * 20) + 1;

  // document.querySelector('.message').textContent = 'Start guessing...';
  displayMsg('Start guessing...');

  document.querySelector('.score').textContent = score;

  document.querySelector('.number').textContent = '?';

  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#222';

  document.querySelector('.number').style.width = '15rem';
});
*/
///////////////////////////////////////////////////

// PROJECT 2: MODAL WINDOW
