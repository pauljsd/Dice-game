'use strict';

// Selecting Elements
const player0EL = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRollDice = document.querySelector('.btn--roll');
const btnHoldDice = document.querySelector('.btn--hold');
const btnNewGame = document.querySelector('.btn--new');

//Starting Conditions

let scores, currentScore, activePlayer, playing;

const initialiaze = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--active');
  document.querySelector('.player--0').classList.add('player--active');
  diceEl.classList.add('hidden');
};

initialiaze();

//Switch Function

const switchFunction = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling the dice

// displaying the image value of dice rolled
// adding the dice value to the current score when the dice value is not 1
// switching the player

btnRollDice.addEventListener('click', function () {
  if (playing) {
    //Generating random number between 1 to 6
    const diceRoll = Math.trunc(Math.random() * 6) + 1;

    //Showing the rolled dice image
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${diceRoll}.png`;
    //adding dice to the current score
    if (diceRoll !== 1) {
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore;
    } else {
      //switching the player
      switchFunction();
    }
  }
});

//To hold the current score and switch to next player if the total score is not up to 100

btnHoldDice.addEventListener('click', function () {
  if (playing) {
    scores[activePlayer] = scores[activePlayer] + currentScore;

    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      // diceEl.classList.add('hidden');
      diceEl.src = 'winner.jpeg';
    } else {
      //switch
      switchFunction();
    }
  }
});

//Resetting the game with new-game-btn

btnNewGame.addEventListener('click', initialiaze);
