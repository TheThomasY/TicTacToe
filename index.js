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
      let randomSquare = pickRandomSquare();
      squareClicked(document.getElementById(randomSquare));
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

  // Fill it with the player icon and then change relevant text
  square.innerHTML = next;
  if (next === 'X') {
    document.getElementById('to-go').innerHTML = "O's go:";
    next = 'O';
    xLocations += square.id;
  } else {
    document.getElementById('to-go').innerHTML = "X's go:";
    next = 'X';
    oLocations += square.id;
  }

  checkWinner(square.innerHTML);

  if (computer && clickedBy === 'player') {
    squareClicked(document.getElementById(pickRandomSquare()), 'computer');
  }
};

const pickRandomSquare = () => empty[Math.floor(Math.random() * empty.length)];

const checkWinner = (icon) => {
  let locations = '';

  if (icon === 'X') {
    locations = xLocations;
  } else locations = oLocations;

  if (locations.length < 3) return;

  for (let i = 0; i < winners.length; i++) {
    let regexStr = winners[i].split('').join('|');
    let regex = new RegExp(regexStr, 'g');
    if (regex.test(locations)) {
      if (locations.match(regex).length === 3) {
        gameOver(icon);
        return;
      }
    }
    if (locations.length === 5) {
      gameOver('');
    }
  }
};

const gameOver = (winner) => {
  let winnerModal = document.getElementById('winner-modal');
  let winnerBanner = document.getElementById('winner-banner');

  winnerModal.style.display = 'block';

  if (winner) {
    winnerBanner.innerHTML = 'Congratulations, ' + winner + ' is the winner!';
  } else {
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
