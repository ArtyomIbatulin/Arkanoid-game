let field = document.querySelector('.field');
let platform = document.querySelector('.platform');
let ball = document.querySelector('.ball');
let blocks = document.querySelector('.blocks');

platform.style.left =
  Math.round(field.clientWidth / 2 - platform.offsetWidth / 2) + 'px';

ball.style.left =
  Math.round(field.clientWidth / 2 - ball.offsetWidth / 2) + 'px';
ball.style.top = field.clientHeight - 25 + 'px';

const start = function () {
  let posB = ball.getBoundingClientRect();
  let posP = platform.getBoundingClientRect();

  document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
      ball.classList.add('ball-fly');
    }

    if (event.code === 'ArrowLeft' && platform.style.left > 0 + 'px') {
      platform.style.left = parseInt(platform.style.left) - 5 + 'px';
      console.log(platform.style.left);
    }

    if (event.code === 'ArrowRight') {
      platform.style.left = parseInt(platform.style.left) + 5 + 'px';
      console.log(platform.style.left);
    }
  });
};

// let game = function () {
//   setInterval(start, 1000 / 50);
// };

start();

// game();
