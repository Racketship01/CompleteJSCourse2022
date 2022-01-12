'use strict';

// Selecting elements

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Starting conditions
let scores, currentScore, activePlayer, playing;
//declaring a value is not the same as assigning them a value

const init = function () {
  scores = [0, 0];
  currentScore = 0; //should be outside the event listener/handler not inside
  // Note: should not only display current score on UI, instead need to define a variable in our code.
  activePlayer = 0;
  playing = true;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
};
init(); //calling init function

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // if (activePlayer === 0) {1} else {0}
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; // select the element dynamically for the current player and display currentScore

      //current0El.textContent = currentScore; // selecting only for player 1 - change later
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

// HOLD Feature
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // scores[1] = scores[1] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // If yes, finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner', 'name');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // if not, switch to the next player
      switchPlayer();
    }
  }
});

// RESET Game
btnNew.addEventListener('click', init);
// we dont declare anonymous function for event handler instead we pass n the init function --okay to pass as other function

// const name = 'jonas';

// const first = () => {
//   let a = 1;
//   const b = second(7, 9);
//   a += b;
//   return a;
// };

// function second(x, y) {
//   var c = 2;
//   return c;
// }

// const x = first();

// console.log(x);
