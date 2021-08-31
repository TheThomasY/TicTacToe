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
  let winnerBanner = document.getElementById('winner-banner');

  if (winner) {
    winnerBanner.innerHTML = 'Congratulations ' + winner;
  } else {
    winnerBanner.innerHTML = "It's a draw!";
  }
};

const Restart = () => {
  window.location.reload();
};
