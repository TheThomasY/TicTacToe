window.addEventListener('load', (event) => {
  const icons = ['X', 'O'];
  let first = icons[Math.round(Math.random())];
  document.getElementById('to-go').innerHTML = first;
});

const winners = ['123', '456', '789', '147', '258', '369', '159', '357'];
let xLocations = '';
let oLocations = '';

const squareClicked = (square) => {
  if (square.innerHTML) return;
  if (document.getElementById('winner-banner').innerHTML) return;

  let icon = document.getElementById('to-go').innerHTML;
  square.innerHTML = icon;
  if (icon === 'X') {
    document.getElementById('to-go').innerHTML = 'O';
    xLocations += square.id;
  } else {
    document.getElementById('to-go').innerHTML = 'X';
    oLocations += square.id;
  }
  checkWinner(icon, square.id);
};

const checkWinner = (icon, id) => {
  // console.log(icon, id);

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

const changeTheme = () => {
  let themeSwitch = document.getElementById('theme-switch');
  if (themeSwitch.innerHTML === 'Light Theme') {
    document.getElementById('body').classList.add('body-light');
    document.getElementById('modal-header').classList.add('modal-header-light');
    document.getElementById('grid').classList.add('grid-light', 'square-light');
    themeSwitch.innerHTML = 'Dark Theme';
  } else {
    document.getElementById('body').classList.remove('body-light');
    document
      .getElementById('modal-header')
      .classList.remove('modal-header-light');
    document
      .getElementById('grid')
      .classList.remove('grid-light', 'square-light');
    themeSwitch.innerHTML = 'Light Theme';
  }
};
