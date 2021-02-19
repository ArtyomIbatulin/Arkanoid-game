let platform = document.querySelector('.platform');
let bita = document.querySelector('.platform');
let ball = document.querySelector('.ball');
let blocks = document.querySelector('.blocks');

bita.style.left =
  Math.round(platform.clientWidth / 2 - bita.offsetWidth / 2) + 'px';

ball.style.left =
  Math.round(platform.clientWidth / 2 - ball.offsetWidth / 2) + 'px';
ball.style.top = platform.clientHeight - 25 + 'px';

const start = function () {
  let posB = ball.getBoundingClientRect();
  let posP = bita.getBoundingClientRect();

  document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
      ball.classList.add('ball-fly');
    }

    if (event.code === 'ArrowLeft' && bita.style.left > 0 + 'px') {
      bita.style.left = parseInt(bita.style.left) - 5 + 'px';
      console.log(bita.style.left);
    }

    if (event.code === 'ArrowRight') {
      bita.style.left = parseInt(bita.style.left) + 5 + 'px';
      console.log(bita.style.left);
    }
  });
};

// let game = function () {
//   setInterval(start, 1000 / 50);
// };

start();

// game();
