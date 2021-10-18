window.addEventListener('load', (event) => {
  // On load check if the user had previously changed the colour theme
  if (localStorage.getItem('currentTheme') === 'light') {
    changeTheme();
  } else document.getElementById('check').checked = true;
});

const icons = ['X', 'O'];
const winners = ['123', '456', '789', '147', '258', '369', '159', '357'];
let empty = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
let xLocations = '';
let oLocations = '';
let next = '';
let computer = false;

const startGame = (players) => {
  // Once game has started, hide the intro screen
  document.getElementById('start-modal').style.display = 'none';

  // Randomly decide whether X or O goes first
  next = icons[Math.round(Math.random())];

  if (players === 2) {
    document.getElementById('to-go').innerHTML = next + "'s go:";
  } else {
    computer = true;
    document.getElementById('to-go').innerHTML = 'your turn (' + next + '):';
    if (Math.round(Math.random()) === 0) {
      let randomSquare = empty[Math.floor(Math.random() * empty.length)];
      squareClicked(document.getElementById(randomSquare), 'computer');
      document.getElementById('to-go').innerHTML = 'your turn (' + next + '):';
    }
  }
};

const squareClicked = (square, clickedBy) => {
  // Prevent clicks if square full or game over
  if (square.innerHTML) return;
  if (document.getElementById('winner-banner').innerHTML) return;

  // Click is valid so continue:

  // Remove the clicked square from the 'empty' array
  const index = empty.indexOf(square.id);
  empty.splice(index, 1);

  // Fill square with the player icon and then change relevant text
  square.innerHTML = next;
  // 'next' just played, therefore it swaps
  if (next === 'X') {
    document.getElementById('to-go').innerHTML = "O's go:";
    next = 'O';
    xLocations += square.id;
  } else {
    document.getElementById('to-go').innerHTML = "X's go:";
    next = 'X';
    oLocations += square.id;
  }

  // Now 'next' is for the player about to go
  // 'locations' is for the turn that just happened
  let locations = next === 'O' ? xLocations : oLocations;

  if (checkWinner(locations) === 'win') {
    gameOver(square.innerHTML, clickedBy);
  } else if (checkWinner(locations) === 'draw') {
    gameOver('', '');
  }

  if (computer && clickedBy === 'player') {
    // If computer is turned on and the player just went,
    // the computer picks a place to go
    squareClicked(
      document.getElementById(smartComputerPicks(next)),
      'computer'
    );
    document.getElementById('to-go').innerHTML = 'your turn (' + next + '):';
  }
};

// Function to pick a random square - EASY MODE?
// const pickRandomSquare = () => empty[Math.floor(Math.random() * empty.length)];

const smartComputerPicks = (next) => {
  // Pick a random square
  let id = empty[Math.floor(Math.random() * empty.length)];

  // Locations of the computer pieces
  let testPlay = next === 'X' ? xLocations : oLocations;
  // Locations of the player pieces
  let opponentPlay = next === 'X' ? oLocations : xLocations;

  // Check to see if computer can win
  for (let i = 0; i < empty.length; i++) {
    testPlay += empty[i];
    if (checkWinner(testPlay) === 'win') return empty[i];
    testPlay = testPlay.slice(0, -1);
  }

  // If it can't win, check if player is about to win and block
  for (let i = 0; i < empty.length; i++) {
    opponentPlay += empty[i];
    if (checkWinner(opponentPlay) === 'win') return empty[i];
    opponentPlay = opponentPlay.slice(0, -1);
  }

  // If no smart moves, go randomly
  return id;
};

const checkWinner = (locations) => {
  if (locations.length < 3) return;

  // See if the new play matches any of the winning combinations
  for (let i = 0; i < winners.length; i++) {
    let regexStr = winners[i].split('').join('|');
    let regex = new RegExp(regexStr, 'g');
    // Regex looks like: /1|2|3/g
    if (regex.test(locations)) {
      if (locations.match(regex).length === 3) return 'win';
    }
  }
  if (empty.length === 0) return 'draw';
};

const gameOver = (winner, clickedBy) => {
  let winnerModal = document.getElementById('winner-modal');
  let winnerBanner = document.getElementById('winner-banner');

  winnerModal.style.display = 'block';

  if (computer) {
    if (winner && clickedBy === 'player') {
      winnerBanner.innerHTML = 'Congratulations, you won!';
    }
    if (winner && clickedBy === 'computer') {
      winnerBanner.innerHTML = 'The computer won. Better luck next time!';
    }
  }
  if (winner && !computer) {
    winnerBanner.innerHTML = 'Congratulations, ' + winner + ' is the winner!';
  }
  if (!winner) {
    winnerBanner.innerHTML = "It's a draw!";
  }
};

const Restart = () => {
  window.location.reload();
};

// Theme changing --------
const changeTheme = () => {
  let themeSwitch = document.getElementById('theme-name');
  if (themeSwitch.innerHTML === 'Dark Theme') {
    document.getElementById('body').classList.add('body-light');
    document.getElementById('modal-header').classList.add('modal-header-light');
    document.getElementById('grid').classList.add('grid-light', 'square-light');
    themeSwitch.innerHTML = 'Light Theme';
    localStorage.setItem('currentTheme', 'light');
  } else {
    document.getElementById('body').classList.remove('body-light');
    document
      .getElementById('modal-header')
      .classList.remove('modal-header-light');
    document
      .getElementById('grid')
      .classList.remove('grid-light', 'square-light');
    themeSwitch.innerHTML = 'Dark Theme';
    localStorage.setItem('currentTheme', 'dark');
  }
};
